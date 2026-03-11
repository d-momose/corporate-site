"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const FULL_TEXT = "喜びが、次の喜びを生む。";

const SKIP_PATHS = ["/privacy"];

export default function LoadingScreen() {
  const pathname = usePathname();
  // 元に戻す場合: "logo-exit" を削除し "visible" | "exit" | "done" に戻す
  const [phase, setPhase] = useState<"visible" | "exit" | "logo-exit" | "done">("visible");
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  // タイプライターアニメーション
  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setTyped(FULL_TEXT.slice(0, i));
        if (i >= FULL_TEXT.length) {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 600);
        }
      }, 100);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(start);
  }, []);

  // 元に戻す場合: t2 を 3600ms・"done" に戻し、t3 を削除。"logo-exit" → "exit" に戻す
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 2800);
    const t2 = setTimeout(() => setPhase("logo-exit"), 3300);
    const t3 = setTimeout(() => setPhase("done"), 3900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // マウス操作でスキップ
  useEffect(() => {
    if (phase !== "visible") return;
    const skip = () => setPhase("exit");
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchmove", skip, { passive: true });
    return () => {
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
    };
  }, [phase]);

  if (SKIP_PATHS.includes(pathname) || phase === "done") return null;

  return (
    // 元に戻す場合: backgroundColor・backgroundImage・backgroundSize を直接ここに戻し、
    // transform: phase==="exit" ? "translateY(-100%)" : "translateY(0)"、
    // transition: "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)" に戻す
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        backgroundColor: "#fff8f8",
        backgroundImage: "radial-gradient(rgba(230,115,118,0.12) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        opacity: phase === "visible" ? 1 : 0,
        transition: "opacity 0.7s ease",
        pointerEvents: phase !== "visible" ? "none" : "auto",
      }}
    >
      <div className="relative flex flex-col items-center gap-6 select-none">
        {/* ロゴ */}
        <div className="intro-item" style={{ animationDelay: "0.1s" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Delight"
            className="h-8 md:h-11 w-auto"
          />
        </div>

        {/* キャッチコピー：タイプライター */}
        <p
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-900 leading-snug whitespace-nowrap"
          style={{ fontFamily: 'var(--font-kaisei-tokumin), "ヒラギノ角ゴ ProN W6", sans-serif', fontWeight: 800 }}
        >
          {typed}
          <span
            className="inline-block ml-0.5 align-baseline"
            style={{ animation: "cursorBlink 0.7s step-end infinite", visibility: showCursor ? "visible" : "hidden" }}
          >
            |
          </span>
        </p>
      </div>
    </div>
  );
}
