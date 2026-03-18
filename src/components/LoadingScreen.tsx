"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const FULL_TEXT = "喜びが、次の喜びを生む。";

const SKIP_PATHS = ["/privacy"];

export default function LoadingScreen() {
  const pathname = usePathname();
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
          setTimeout(() => setShowCursor(false), 400);
        }
      }, 65);
      return () => clearInterval(interval);
    }, 200);
    return () => clearTimeout(start);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 2000);
    const t2 = setTimeout(() => setPhase("logo-exit"), 2500);
    const t3 = setTimeout(() => setPhase("done"), 3000);
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
            src="/logo.svg"
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
