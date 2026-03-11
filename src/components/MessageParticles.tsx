"use client";

import { useEffect, useRef } from "react";

/* ── 虹色（HSLで均等分割） ── */
const COLORS = Array.from({ length: 36 }, (_, i) => {
  const h = Math.round((i / 36) * 60); // 0〜60°（赤→オレンジ→黄）
  return `hsl(${h}, 90%, 65%)`;
});

interface Particle {
  x: number;
  y: number;
  r: number;
  speed: number;
  opacity: number;
  color: string;
  drift: number;
  phase: number;
}

function spawn(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: h + Math.random() * 40,   // 常に画面下からスタート
    r: Math.random() * 3.5 + 1.2,
    speed: Math.random() * 0.55 + 0.2,
    opacity: Math.random() * 0.45 + 0.15,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    drift: (Math.random() - 0.5) * 0.4,
    phase: Math.random() * Math.PI * 2,
  };
}

export default function MessageParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const N = 240;
    // パーティクルは準備だけして下に待機
    const particles: Particle[] = Array.from({ length: N }, () => spawn(W, H));

    let raf: number;
    let t = 0;
    let running = false;

    function tick() {
      raf = requestAnimationFrame(tick);
      t += 0.012;
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.y -= p.speed;
        p.x += Math.sin(t + p.phase) * p.drift;

        if (p.y < -p.r * 2) {
          Object.assign(p, spawn(W, H));
        }

        const fadeRatio = Math.min(1, p.y / (H * 0.15));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * fadeRatio;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function activate() {
      if (running) return;
      running = true;
      // 全パーティクルを画面下に再配置してからスタート
      for (const p of particles) {
        Object.assign(p, spawn(W, H));
      }
      tick();
    }

    // 爆発完了イベントを受け取ったら開始
    window.addEventListener("sphereExploded", activate);

    // ページリロード時など、すでにstrengthを過ぎていれば即起動
    const strengthEl = document.getElementById("strength");
    if (strengthEl && window.scrollY > strengthEl.offsetTop + strengthEl.offsetHeight * 0.5) {
      activate();
    }

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("sphereExploded", activate);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
