"use client";

import { useState, useEffect } from "react";

const IMAGES = [
  "/hero-blob-1.jpg",
];

export default function HeroBlob() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMedium, setIsMedium] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia("(min-width: 768px)");
    const mqMedium = window.matchMedia("(min-width: 768px) and (max-width: 1090px)");
    const check = () => {
      setIsMobile(!mqMobile.matches);
      setIsMedium(mqMedium.matches);
    };
    check();
    mqMobile.addEventListener("change", check);
    mqMedium.addEventListener("change", check);
    return () => {
      mqMobile.removeEventListener("change", check);
      mqMedium.removeEventListener("change", check);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current);
      setCurrent(c => (c + 1) % IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [current]);

  const SIZE = isMobile ? "clamp(280px, 80vw, 400px)" : "clamp(420px, 48vw, 620px)";

  return (
    <div
      style={{
        position: "absolute",
        ...(isMobile
          ? { left: "50%", top: "63%", transform: "translateX(-50%)" }
          : isMedium
          ? { left: "45%", top: "72%", transform: "translateY(-50%)" }
          : { left: "45%", top: "50%", transform: "translateY(-50%)" }
        ),
        width: SIZE,
        height: SIZE,
        zIndex: 5,
      }}
    >
      {/* バウンスイン（球体出現後に登場） */}
      <div style={{ width: "100%", height: "100%", opacity: 0, animation: "blobBounceIn 1.2s ease-out forwards", animationDelay: "5.6s" }}>
      {/* グロー */}
      <div
        style={{
          position: "absolute",
          inset: "-16px",
          background: "radial-gradient(circle, rgba(230,115,118,0.3) 0%, transparent 70%)",
          animation: "blobMorph 14s ease-in-out infinite",
          filter: "blur(16px)",
        }}
      />

      {/* 画像コンテナ（blobMorph で切り抜き形状が変化） */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          animation: "blobMorph 14s ease-in-out infinite",
        }}
      >
        {IMAGES.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: i === current ? 1 : 0,
              transition: "opacity 1s ease-in-out",
              zIndex: i === current ? 2 : i === prev ? 1 : 0,
            }}
          />
        ))}
      </div>
      </div>
    </div>
  );
}
