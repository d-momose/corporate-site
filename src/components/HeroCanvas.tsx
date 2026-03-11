"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── スクリーン正規化座標 (0-1) → Three.js ワールド座標 ── */
function screenToWorld(
  nx: number,
  ny: number,
  camera: THREE.PerspectiveCamera
): THREE.Vector3 {
  const vFOV = (camera.fov * Math.PI) / 180;
  const h = 2 * Math.tan(vFOV / 2) * camera.position.z;
  const w = h * camera.aspect;
  return new THREE.Vector3((nx - 0.5) * w, -(ny - 0.5) * h, 0);
}

/* ── フィボナッチ球面分布で均一にパーティクルを配置 ── */
function fibonacciSphere(N: number, radius: number): Float32Array {
  const out = new Float32Array(N * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    // 微小な厚みで奥行き感を出す
    const dr = radius + (Math.random() - 0.5) * 0.08;
    out[i * 3]     = Math.cos(theta) * r * dr;
    out[i * 3 + 1] = y * dr;
    out[i * 3 + 2] = Math.sin(theta) * r * dr;
  }
  return out;
}

/* ── 球面座標 → デカルト座標 ── */
function sphToCart(theta: number, phi: number, r: number): [number, number, number] {
  return [
    r * Math.cos(phi) * Math.sin(theta),
    r * Math.sin(phi),
    r * Math.cos(phi) * Math.cos(theta),
  ];
}

/* ── ソフトグロー用 Canvas テクスチャ ── */
function makeGlowTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0,   "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,0.6)");
  g.addColorStop(1,   "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── レンダラー ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    /* ── シーン・カメラ ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    /* ── パーティクル設定（笑顔） ── */
    const N_BODY  = 4400; // フィボナッチ球体ベース
    const N_EYE   = 80;   // 片目あたり
    const N_SMILE = 160;  // 口アーク
    const N = N_BODY + N_EYE * 2 + N_SMILE;
    const RADIUS = 1.2;

    // 基準位置配列
    const basePos = new Float32Array(N * 3);

    // ── ボディ：フィボナッチ球面 ──
    const fibPos = fibonacciSphere(N_BODY, RADIUS);
    for (let i = 0; i < N_BODY * 3; i++) basePos[i] = fibPos[i];

    // ── 左目（theta=-0.35, phi=0.25） ──
    let faceIdx = N_BODY;
    for (let i = 0; i < N_EYE; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = Math.random() * 0.1;
      const [x, y, z] = sphToCart(-0.35 + Math.cos(a) * d, 0.25 + Math.sin(a) * d, RADIUS);
      basePos[faceIdx * 3] = x; basePos[faceIdx * 3 + 1] = y; basePos[faceIdx * 3 + 2] = z;
      faceIdx++;
    }

    // ── 右目（theta=+0.35, phi=0.25） ──
    for (let i = 0; i < N_EYE; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = Math.random() * 0.1;
      const [x, y, z] = sphToCart(0.35 + Math.cos(a) * d, 0.25 + Math.sin(a) * d, RADIUS);
      basePos[faceIdx * 3] = x; basePos[faceIdx * 3 + 1] = y; basePos[faceIdx * 3 + 2] = z;
      faceIdx++;
    }

    // ── 口：U字アーク（中央が最も低い） ──
    for (let i = 0; i < N_SMILE; i++) {
      const t = (i / (N_SMILE - 1)) * 2 - 1; // -1〜1
      const theta = t * 0.85;
      const phi = -0.35 + 0.22 * t * t; // 中央が低く、端が高い（ワイド笑顔）
      const [x, y, z] = sphToCart(
        theta + (Math.random() - 0.5) * 0.025,
        phi   + (Math.random() - 0.5) * 0.025,
        RADIUS
      );
      basePos[faceIdx * 3] = x; basePos[faceIdx * 3 + 1] = y; basePos[faceIdx * 3 + 2] = z;
      faceIdx++;
    }

    // 拡散先オフセット（中心相対）
    const scatterOffsets = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      scatterOffsets[i * 3]     = (Math.random() - 0.5) * 28;
      scatterOffsets[i * 3 + 1] = (Math.random() - 0.5) * 16;
      scatterOffsets[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }

    const pPos = new Float32Array(N * 3);
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));

    // 頂点カラー
    const pColors = new Float32Array(N * 3);
    const tmpColor = new THREE.Color();

    // ボディ：Y座標で赤→オレンジ→黄
    for (let i = 0; i < N_BODY; i++) {
      const by = basePos[i * 3 + 1];
      const hue = ((by + RADIUS) / (2 * RADIUS)) * 0.17;
      tmpColor.setHSL(hue, 1.0, 0.65);
      pColors[i * 3] = tmpColor.r; pColors[i * 3 + 1] = tmpColor.g; pColors[i * 3 + 2] = tmpColor.b;
    }

    // 目：白
    tmpColor.set(0xffffff);
    for (let i = N_BODY; i < N_BODY + N_EYE * 2; i++) {
      pColors[i * 3] = tmpColor.r; pColors[i * 3 + 1] = tmpColor.g; pColors[i * 3 + 2] = tmpColor.b;
    }

    // 口：明るいオレンジ
    tmpColor.setHSL(0.06, 1.0, 0.75);
    for (let i = N_BODY + N_EYE * 2; i < N; i++) {
      pColors[i * 3] = tmpColor.r; pColors[i * 3 + 1] = tmpColor.g; pColors[i * 3 + 2] = tmpColor.b;
    }

    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.04,
      transparent: true,
      opacity: 1,
      sizeAttenuation: true,
      depthWrite: false,
      vertexColors: true,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    /* ── 状態管理 ── */
    const sphereCenter = new THREE.Vector3();
    const startPos = screenToWorld(0.5, 0.5, camera);
    const endPos   = new THREE.Vector3(0, 0, 0);
    sphereCenter.copy(startPos);

    let time = 0;
    const proxy = { scatterT: 0 }; // 0=球体, 1=拡散済み
    const sizeProxy = { size: 0.04 }; // 拡散時に拡大

    type AnimState = "sphere" | "scattered";
    let animState: AnimState = "sphere";

    /* ── レンダーループ（毎フレーム位置を更新） ── */
    let raf: number;

    function animate() {
      raf = requestAnimationFrame(animate);

      time += 0.007;
      // Y軸：連続スピン、X軸：ゆったりうなずき、Z軸：斜め傾き
      const rotY = time;
      const rotX = Math.sin(time * 0.41) * 0.28;
      const rotZ = Math.sin(time * 0.27 + 1.2) * 0.18;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);
      const t = proxy.scatterT;

      for (let i = 0; i < N; i++) {
        const bx = basePos[i * 3];
        const by = basePos[i * 3 + 1];
        const bz = basePos[i * 3 + 2];

        // Y軸回転
        const y1x =  bx * cosY + bz * sinY;
        const y1y =  by;
        const y1z = -bx * sinY + bz * cosY;
        // X軸回転（うなずき）
        const x2x =  y1x;
        const x2y =  y1y * cosX - y1z * sinX;
        const x2z =  y1y * sinX + y1z * cosX;
        // Z軸回転（斜め傾き）
        const rx = x2x * cosZ - x2y * sinZ;
        const ry = x2x * sinZ + x2y * cosZ;
        const rz = x2z;

        // 球体位置と拡散位置をブレンド
        pPos[i * 3]     = sphereCenter.x + rx * (1 - t) + scatterOffsets[i * 3]     * t;
        pPos[i * 3 + 1] = sphereCenter.y + ry * (1 - t) + scatterOffsets[i * 3 + 1] * t;
        pPos[i * 3 + 2] = sphereCenter.z + rz * (1 - t) + scatterOffsets[i * 3 + 2] * t;
      }
      pGeo.attributes.position.needsUpdate = true;

      // 拡散度合いに応じて透明度・サイズを調整
      pMat.opacity = 1 - t;
      pMat.size = sizeProxy.size;

      renderer.render(scene, camera);
    }
    animate();

    /* ── オーバーレイ制御 ── */
    let overlayVisible = false;
    const showOverlay = () => {
      if (!overlayVisible) {
        overlayVisible = true;
        window.dispatchEvent(new CustomEvent("sphereOverlayShow"));
      }
    };
    const hideOverlay = () => {
      if (overlayVisible) {
        overlayVisible = false;
        window.dispatchEvent(new CustomEvent("sphereOverlayHide"));
      }
    };

    /* ── ScrollTrigger ── */
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: () => {
        const el = document.getElementById("business");
        if (!el) return "+=800";
        return `+=${el.offsetTop - window.innerHeight * 0.3}`;
      },
      scrub: 0.8,
      onLeaveBack() {
        hideOverlay();
      },
      onUpdate(self) {
        // スクロール量に連動して球体中心を移動
        sphereCenter.lerpVectors(startPos, endPos, self.progress);

        // オーバーレイ：球体が動いている間だけ表示（拡散後は非表示）
        if (self.progress > 0.04 && animState === "sphere") showOverlay();
        if (self.progress <= 0.04) hideOverlay();

        // 到達 → 拡散
        if (self.progress >= 0.45 && animState === "sphere") {
          animState = "scattered";
          gsap.killTweensOf(proxy);
          gsap.killTweensOf(sizeProxy);
          gsap.to(sizeProxy, { size: 0.08, duration: 1.5, ease: "power2.out" });
          gsap.to(proxy, {
            scatterT: 1,
            duration: 1.5,
            ease: "power2.out",
            onStart: () => {
              window.dispatchEvent(new CustomEvent("sphereExploded"));
              hideOverlay();
            },
          });
        }

        // 戻る → 再集合
        if (self.progress < 0.5 && animState === "scattered") {
          animState = "sphere";
          gsap.killTweensOf(proxy);
          gsap.killTweensOf(sizeProxy);
          gsap.to(sizeProxy, { size: 0.04, duration: 1.5, ease: "power2.inOut" });
          gsap.to(proxy, {
            scatterT: 0,
            duration: 1.5,
            ease: "power2.inOut",
          });
          showOverlay(); // 再集合中もオーバーレイ表示
        }
      },
    });

    /* ── リサイズ ── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    /* ── クリーンアップ ── */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 50,
        opacity: 0,
        animation: "shurikenIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        animationDelay: "4.8s",
      }}
    />
  );
}
