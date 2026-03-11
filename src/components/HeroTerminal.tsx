"use client";

import { useState, useEffect } from "react";

type LineType = "cmd" | "brand" | "dim" | "ok" | "success" | "empty";

const LINES: { text: string; type: LineType }[] = [
  { text: "$ npx delight@latest", type: "cmd" },
  { text: "", type: "empty" },
  { text: "😊  Delight  IT  Solutions", type: "brand" },
  { text: "Initializing...", type: "dim" },
  { text: "", type: "empty" },
  { text: "[✓] チームを編成しました 🤝", type: "ok" },
  { text: "[✓] 企画フェーズ：完了 💡", type: "ok" },
  { text: "[✓] 開発フェーズ：進行中 🚀", type: "ok" },
  { text: "[✓] 運用サポート：準備完了 🛡️", type: "ok" },
  { text: "", type: "empty" },
  { text: "$ deploy --partner=you 🎉", type: "cmd" },
  { text: "", type: "empty" },
  { text: "🎊  SUCCESS  ─  喜びの連鎖、始動。", type: "success" },
];

const LINE_DELAY = 340;
const START_DELAY = 5200;

const colorMap: Record<LineType, string> = {
  cmd:     "text-green-400",
  brand:   "text-[#E67376] font-bold tracking-[0.25em]",
  dim:     "text-gray-500",
  ok:      "text-sky-300",
  success: "text-emerald-400 font-semibold",
  empty:   "",
};

export default function HeroTerminal() {
  const [windowVisible, setWindowVisible] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const start = setTimeout(() => {
      setWindowVisible(true);
      const interval = setInterval(() => {
        setRevealed((v) => {
          if (v >= LINES.length) { clearInterval(interval); return v; }
          return v + 1;
        });
      }, LINE_DELAY);
      return () => clearInterval(interval);
    }, START_DELAY);
    return () => clearTimeout(start);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCursor((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="w-full max-w-[340px] rounded-xl overflow-hidden shadow-2xl border border-white/10 select-none"
      style={{
        background: "rgba(12, 14, 22, 0.85)",
        backdropFilter: "blur(14px)",
        opacity: windowVisible ? 1 : 0,
        transform: windowVisible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
        animation: windowVisible ? "circleFloat 7s ease-in-out 0.9s infinite" : "none",
      }}
    >
      {/* ウィンドウクローム */}
      <div
        className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10"
        style={{ background: "rgba(255,255,255,0.035)" }}
      >
        <div className="w-3 h-3 rounded-full bg-red-400/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
        <div className="w-3 h-3 rounded-full bg-green-400/60" />
        <span className="ml-auto text-xs text-gray-600 tracking-widest font-mono">delight.sh</span>
      </div>

      {/* ターミナル本文 */}
      <div className="px-5 py-4 font-mono text-xs leading-6 min-h-[240px]">
        {LINES.slice(0, revealed).map((line, i) => (
          <div key={i} className={colorMap[line.type]}>
            {line.text || "\u00a0"}
          </div>
        ))}
        {revealed < LINES.length && (
          <span
            className="inline-block w-[7px] h-[14px] align-middle"
            style={{ background: cursor ? "#4ade80" : "transparent" }}
          />
        )}
      </div>
    </div>
  );
}
