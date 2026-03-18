"use client";

import { useRef, useEffect, useState } from "react";
import type React from "react";
import MessageParticles from "./MessageParticles";
import ShurikenIn from "./ShurikenIn";

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: "opacity 0.8s ease, transform 0.8s ease",
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
      }}
    >
      {children}
    </div>
  );
}

/* ─── カスタムSVGアイコン ─── */
const RocketIcon = () => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 h-11">
    <defs>
      <linearGradient id="si-rocket-body" x1="22" y1="3" x2="22" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fca5a5" />
        <stop offset="1" stopColor="#be123c" />
      </linearGradient>
      <linearGradient id="si-rocket-flame" x1="22" y1="36" x2="22" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fde68a" />
        <stop offset="1" stopColor="#f97316" />
      </linearGradient>
    </defs>
    {/* ボディ */}
    <path d="M22 3C22 3 33 13 33 26V31L22 36L11 31V26C11 13 22 3 22 3Z" fill="url(#si-rocket-body)" />
    {/* 左フィン */}
    <path d="M11 24L5 32L11 32Z" fill="#f87171" />
    {/* 右フィン */}
    <path d="M33 24L39 32L33 32Z" fill="#f87171" />
    {/* ウィンドウ */}
    <circle cx="22" cy="19" r="5.5" fill="white" fillOpacity="0.9" />
    <circle cx="22" cy="19" r="3.5" fill="#fca5a5" fillOpacity="0.45" />
    {/* ウィンドウの光沢 */}
    <path d="M19 16.5C19.8 15.5 21 15 22.5 15" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.85" />
    {/* 炎 */}
    <path d="M16 36L22 44L28 36Z" fill="url(#si-rocket-flame)" />
    <path d="M19.5 36L22 41.5L24.5 36Z" fill="#fef3c7" fillOpacity="0.75" />
  </svg>
);

const DiamondIcon = () => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 h-11">
    <defs>
      <linearGradient id="si-gem-topleft" x1="8" y1="8" x2="22" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fef9c3" />
        <stop offset="1" stopColor="#fbbf24" />
      </linearGradient>
      <linearGradient id="si-gem-topright" x1="22" y1="8" x2="36" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fde68a" />
        <stop offset="1" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="si-gem-botleft" x1="8" y1="20" x2="22" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fbbf24" />
        <stop offset="1" stopColor="#92400e" />
      </linearGradient>
      <linearGradient id="si-gem-botright" x1="22" y1="20" x2="36" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fde68a" />
        <stop offset="1" stopColor="#78350f" />
      </linearGradient>
    </defs>
    {/* 上左 */}
    <path d="M22 7L9 20H22Z" fill="url(#si-gem-topleft)" />
    {/* 上右 */}
    <path d="M22 7L35 20H22Z" fill="url(#si-gem-topright)" />
    {/* 下左 */}
    <path d="M9 20L22 41L22 20Z" fill="url(#si-gem-botleft)" />
    {/* 下右 */}
    <path d="M35 20L22 41L22 20Z" fill="url(#si-gem-botright)" />
    {/* エッジライン */}
    <path d="M9 20H35M22 20V41M22 7L9 20M22 7L35 20" stroke="#fef9c3" strokeWidth="0.4" strokeOpacity="0.5" />
    {/* 光沢 */}
    <path d="M14 11L11 19" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.85" />
    <path d="M17 8.5L15.5 12" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.6" />
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 h-11">
    <defs>
      <linearGradient id="si-trophy-cup" x1="10" y1="5" x2="34" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#bfdbfe" />
        <stop offset="1" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="si-trophy-base" x1="14" y1="38" x2="30" y2="43" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60a5fa" />
        <stop offset="1" stopColor="#1e3a8a" />
      </linearGradient>
    </defs>
    {/* カップ本体 */}
    <path d="M10 5H34V22C34 29.2 28.6 34 22 34C15.4 34 10 29.2 10 22V5Z" fill="url(#si-trophy-cup)" />
    {/* 左ハンドル */}
    <path d="M10 8C6 9 3 13 3 17C3 21 6 23 10 23" stroke="#93c5fd" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* 右ハンドル */}
    <path d="M34 8C38 9 41 13 41 17C41 21 38 23 34 23" stroke="#93c5fd" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* ステム */}
    <rect x="19.5" y="34" width="5" height="5" fill="#3b82f6" />
    {/* 台座 */}
    <rect x="13" y="39" width="18" height="3.5" rx="1.75" fill="url(#si-trophy-base)" />
    {/* 星 */}
    <path d="M22 11L23.5 15.8H28.5L24.5 18.6L26 23.4L22 20.6L18 23.4L19.5 18.6L15.5 15.8H20.5Z" fill="white" fillOpacity="0.92" />
    {/* 光沢 */}
    <path d="M14 9C15.5 7.5 17.5 6.5 19.5 6" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.75" />
  </svg>
);

/* ─── 強みデータ ─── */
const strengths = [
  {
    number: "01",
    title: "企画から運用まで、\nすべてをワンチームで。",
    description:
      "「企画」「開発」「運用」で担当がバラバラ…なんてことはありません。最初のアイディア出しから完成後のサポートまで、同じチームが責任をもって担当します。だから話が早く、ブレのないシステムづくりが可能です。",
    renderIcon: <RocketIcon />,
    gradient: "linear-gradient(135deg, #c04050 0%, #E67376 50%, #f4a8a8 100%)",
    accentColor: "#E67376",
    floatDelay: "0s",
  },
  {
    number: "02",
    title: "本音で向き合う、\nあなたの事業パートナー。",
    description:
      "私たちは、言われたものを作るだけの業者ではありません。お客様の成功のために「それは本当に最適か？」を共に考え、時には率直な意見もお伝えする誠実なパートナーです。",
    renderIcon: <DiamondIcon />,
    gradient: "linear-gradient(135deg, #92400e 0%, #d97706 55%, #fbbf24 100%)",
    accentColor: "#d97706",
    floatDelay: "1.4s",
  },
  {
    number: "03",
    title: "面倒なプロジェクト管理は、\nまるっとお任せ。",
    description:
      "開発に必要な人材の手配から、複雑なプロジェクト全体の管理まで、すべてお引き受けします。お客様は、一番大切なご自身のビジネスに集中していただけます。",
    renderIcon: <TrophyIcon />,
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #7dd3fc 100%)",
    accentColor: "#3b82f6",
    floatDelay: "2.8s",
  },
];

/* ─── 強みアイテム ─── */
function StrengthItem({
  item,
  delay,
  visible,
}: {
  item: (typeof strengths)[0];
  delay: number;
  visible: boolean;
}) {
  return (
    <div
      className="flex flex-col items-center text-center"
      style={{
        transition: "opacity 0.8s ease, transform 0.8s ease",
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
      }}
    >
      {/* 番号 */}
      <div
        className="text-6xl font-bold leading-none mb-5 select-none"
        style={{
          fontFamily: 'var(--font-kaisei-tokumin)',
          color: "white",
        }}
      >
        {item.number}
      </div>

      {/* 小さなアイコン円 */}
      <div
        className="relative mb-6"
        style={visible ? {
          animation: `circleFloat 5s ease-in-out infinite`,
          animationDelay: item.floatDelay,
        } : {}}
      >
        {/* パルスリング */}
        <div
          className="absolute -inset-2 rounded-full pointer-events-none"
          style={{
            background: item.gradient,
            animation: visible ? `ringPulse 3s ease-out infinite` : "none",
            animationDelay: item.floatDelay,
          }}
        />
        {/* グラデーションボーダー円 */}
        <div
          className="relative rounded-full p-[2px]"
          style={{ background: item.gradient }}
        >
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
            {item.renderIcon}
          </div>
        </div>
      </div>

      {/* タイトル */}
      <h3
        className="text-xl md:text-2xl font-bold text-white mb-4 whitespace-pre-line leading-snug"
        style={{ fontFamily: 'var(--font-kaisei-tokumin)', fontWeight: 800 }}
      >
        {item.title}
      </h3>

      {/* 区切り */}
      <div className="flex items-center gap-1.5 mb-4">
        <div className="h-[1px] w-6 bg-white" />
        <div className="w-1 h-1 rounded-full bg-white" />
        <div className="h-[1px] w-6 bg-white" />
      </div>

      {/* 説明文 */}
      <p className="text-base md:text-lg text-white/80 leading-7">
        {item.description}
      </p>
    </div>
  );
}

/* ─── セクション本体 ─── */
export default function StrengthSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="strength" className="py-28 scroll-mt-28 relative overflow-hidden" style={{ background: "#E67376" }}>
      {/* 背景写真 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/strength-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        style={{ opacity: 0.75 }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(230,115,118,0.55)" }} />
      <div className="absolute inset-x-0 top-0 h-44 pointer-events-none" style={{ background: "linear-gradient(to bottom, #E67376 0%, transparent 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-44 pointer-events-none" style={{ background: "linear-gradient(to top, #E67376 0%, transparent 100%)" }} />
      <MessageParticles />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* セクションタイトル */}
        <ShurikenIn className="text-center mb-20">
          <p className="text-base font-medium tracking-widest text-white uppercase mb-1">
            Our Strength
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-5 whitespace-nowrap" style={{ fontFamily: 'var(--font-kaisei-tokumin)', fontWeight: 800 }}>
            Delightの強み
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-16 bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <div className="h-[1px] w-16 bg-white" />
          </div>
        </ShurikenIn>

        {/* チームバナー */}
        <FadeIn delay={400} className="mb-20">
        <div className="relative rounded-2xl overflow-hidden" style={{ height: "clamp(220px, 30vw, 420px)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/strength-team.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[center_60%]"
            style={{ animation: "photoZoomIn 8s ease-out forwards, photoBreath 8s 8s ease-in-out infinite" }}
          />
          {/* オーバーレイ */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(20,5,5,0.65) 0%, rgba(20,5,5,0.2) 60%, transparent 100%)" }} />
          {/* テキスト */}
          <div className="absolute inset-0 flex flex-col justify-start pt-8 md:pt-10 px-10 md:px-16">
            <p className="text-white/60 text-xs font-bold tracking-[0.3em] uppercase mb-3">Our Team</p>
            <h3
              className="text-white text-2xl md:text-4xl font-bold leading-snug"
              style={{ fontFamily: "var(--font-kaisei-tokumin)", fontWeight: 800 }}
            >
              Delightをつくる、<br />強みがある。
            </h3>
          </div>
        </div>
        </FadeIn>

        {/* 3カラム */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-10"
        >
          {strengths.map((item, idx) => (
            <StrengthItem key={item.number} item={item} delay={idx * 200} visible={visible} />
          ))}
        </div>

      </div>
    </section>
  );
}
