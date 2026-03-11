"use client";

import { useState, useEffect } from "react";
import HeroTerminal from "./HeroTerminal";

const slides = [
  { src: "/hero-tokyo.jpg",   position: "object-center" },
  { src: "/hero-skytree.jpg", position: "object-center" },
];

const INTERVAL = 5500; // ms

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % slides.length;
        setPrev(c);
        setTransitioning(true);
        return next;
      });
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  // 前スライドのフェードアウトが終わったらクリア
  useEffect(() => {
    if (!transitioning) return;
    const t = setTimeout(() => { setPrev(null); setTransitioning(false); }, 1000);
    return () => clearTimeout(t);
  }, [transitioning, current]);

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-start overflow-hidden bg-white"
    >
      {/* スライドショー背景 */}
      <div className="absolute inset-0 z-0">
        {/* 前スライド（フェードアウト） */}
        {prev !== null && (
          <img
            key={`prev-${prev}`}
            src={slides[prev].src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover ${slides[prev].position}`}
            style={{ opacity: 0, transition: "opacity 1s ease" }}
          />
        )}
        {/* 現スライド（フェードイン） */}
        {slides.map((slide, i) => (
          <img
            key={`slide-${i}`}
            src={slide.src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover ${slide.position}`}
            style={{
              opacity: i === current ? 1 : 0,
              transition: "opacity 1s ease",
            }}
          />
        ))}
      </div>

      {/* 左：テキストエリア */}
      <div className="relative z-10 flex flex-col justify-center w-full md:w-1/2 pl-[8vw] pr-6 select-none pt-[clamp(130px,18vh,190px)]">
        {/* h1：3行を時間差で手裏剣のように投擲 — ローディング退場(3.6s)直後から開始 */}
        {/* 元に戻す場合: style を削除して font-bold を戻す */}
        <h1 className="text-white leading-tight mb-3"
          style={{ fontFamily: 'var(--font-kaisei-tokumin), "ヒラギノ角ゴ ProN W6", sans-serif', fontWeight: 800, fontSize: "clamp(62px, 16.5vw, 86px)" }}>
          <span className="shuriken-in" style={{ animationDelay: "3.85s", whiteSpace: "nowrap" }}>喜びが、</span>
          <span className="shuriken-in" style={{ animationDelay: "4.05s", whiteSpace: "nowrap" }}>次の喜びを</span>
          <span className="shuriken-in" style={{ animationDelay: "4.25s", whiteSpace: "nowrap" }}>生む。</span>
        </h1>


        <p className="max-w-xl font-bold hero-slide-up leading-[2.2]" style={{ animationDelay: "4.9s", fontSize: "clamp(17px, 4.53vw, 24px)" }}>
          <span style={{ background: "rgba(0,0,0,0.82)", color: "#fff", padding: "2px 10px", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone", whiteSpace: "nowrap" }}>
            メンバーの喜びが、お客様の喜びへ。
          </span>
          <br />
          <span style={{ background: "rgba(0,0,0,0.82)", color: "#fff", padding: "2px 10px", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone", whiteSpace: "nowrap" }}>
            私たちはその「喜びの連鎖」を、
          </span>
          <br />
          <span style={{ background: "rgba(0,0,0,0.82)", color: "#fff", padding: "2px 10px", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone", whiteSpace: "nowrap" }}>
            仕事を通じて広げ続けます。
          </span>
        </p>

        {/* スクロールインジケーター */}
        <div className="mt-16 flex flex-col gap-2 opacity-60 hero-slide-up" style={{ animationDelay: "5.3s" }}>
          <span className="text-sm tracking-widest text-gray-400 uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent animate-pulse" />
        </div>
      </div>

      {/* 波線：画像の上に重ねて下から色が入る */}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 90, zIndex: 3, overflow: "hidden" }}>
        <svg style={{ position: "absolute", bottom: 0, left: 0, width: "200%", height: "100%", opacity: 0.5, animation: "waveScroll 12s linear infinite" }} viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,45 C120,65 240,65 360,45 C480,25 600,25 720,45 C840,65 960,65 1080,45 C1200,25 1320,25 1440,45 L1440,90 L0,90 Z" fill="#e8eef5" />
        </svg>
        <svg style={{ position: "absolute", bottom: 0, left: 0, width: "200%", height: "100%", animation: "waveScroll 8s linear infinite" }} viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,45 C120,20 240,20 360,45 C480,70 600,70 720,45 C840,20 960,20 1080,45 C1200,70 1320,70 1440,45 L1440,90 L0,90 Z" fill="#e8eef5" />
        </svg>
      </div>

      {/* スライドインジケーター（右下） */}
      <div className="absolute bottom-8 right-8 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(current); setCurrent(i); setTransitioning(true); }}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: i === current ? "#E67376" : "rgba(255,255,255,0.5)",
              transform: i === current ? "scale(1.3)" : "scale(1)",
            }}
            aria-label={`スライド ${i + 1}`}
          />
        ))}
      </div>

      {/* 右：ターミナル演出 */}
      {/* 元に戻す場合: HeroTerminal を削除し import も削除。<div className="hidden md:block w-1/2 h-full" /> に戻す */}
      <div className="hidden md:block absolute top-[96px] right-10 z-10">
        <HeroTerminal />
      </div>
    </section>
  );
}
