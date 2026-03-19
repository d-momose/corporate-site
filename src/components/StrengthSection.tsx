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

/* ─── イラストアイコン ─── */
const TeamIllustration = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20">
    {/* 左の人 */}
    <path d="M8 40 Q8 29 17 29 Q26 29 26 40" fill="#f87171"/>
    <circle cx="17" cy="40" r="9" fill="#fde8d8"/>
    <path d="M9.5 63 Q9.5 52 17 52 Q24.5 52 24.5 63" fill="#f87171"/>
    <circle cx="15" cy="39.5" r="1.4" fill="#7c2d12"/>
    <circle cx="19" cy="39.5" r="1.4" fill="#7c2d12"/>
    <path d="M14.5 43.5 Q17 45.5 19.5 43.5" stroke="#7c2d12" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
    {/* 中央の人（やや大きく・高い位置） */}
    <path d="M30 31 Q30 19.5 40 19.5 Q50 19.5 50 31" fill="#E67376"/>
    <circle cx="40" cy="31" r="10.5" fill="#fde8d8"/>
    <path d="M31 62 Q31 49.5 40 49.5 Q49 49.5 49 62" fill="#E67376"/>
    <circle cx="37.5" cy="30.5" r="1.6" fill="#7c2d12"/>
    <circle cx="42.5" cy="30.5" r="1.6" fill="#7c2d12"/>
    <path d="M37 34.5 Q40 37 43 34.5" stroke="#7c2d12" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    {/* 右の人 */}
    <path d="M54 40 Q54 29 63 29 Q72 29 72 40" fill="#be123c"/>
    <circle cx="63" cy="40" r="9" fill="#fde8d8"/>
    <path d="M55.5 63 Q55.5 52 63 52 Q70.5 52 70.5 63" fill="#be123c"/>
    <circle cx="61" cy="39.5" r="1.4" fill="#7c2d12"/>
    <circle cx="65" cy="39.5" r="1.4" fill="#7c2d12"/>
    <path d="M60.5 43.5 Q63 45.5 65.5 43.5" stroke="#7c2d12" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
    {/* 星 */}
    <path d="M40 5 L41.8 10.5 H47.5 L43 14 L44.8 19.5 L40 16 L35.2 19.5 L37 14 L32.5 10.5 H38.2 Z" fill="#fbbf24"/>
    {/* 連結ライン */}
    <path d="M26 55 Q40 61 54 55" stroke="#fca5a5" strokeWidth="1.8" strokeDasharray="3,2.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const PartnerIllustration = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20">
    {/* 左の人 */}
    <path d="M5 40 Q5 29 14 29 Q23 29 23 40" fill="#92400e"/>
    <circle cx="14" cy="40" r="9" fill="#fde8d8"/>
    <path d="M6 63 Q6 52 14 52 Q22 52 22 63" fill="#d97706"/>
    <circle cx="12" cy="39.5" r="1.4" fill="#5c2b00"/>
    <circle cx="16" cy="39.5" r="1.4" fill="#5c2b00"/>
    <path d="M11.5 43.5 Q14 45.5 16.5 43.5" stroke="#5c2b00" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
    {/* 右の人 */}
    <path d="M57 40 Q57 29 66 29 Q75 29 75 40" fill="#78350f"/>
    <circle cx="66" cy="40" r="9" fill="#fde8d8"/>
    <path d="M58 63 Q58 52 66 52 Q74 52 74 63" fill="#b45309"/>
    <circle cx="64" cy="39.5" r="1.4" fill="#5c2b00"/>
    <circle cx="68" cy="39.5" r="1.4" fill="#5c2b00"/>
    <path d="M63.5 43.5 Q66 45.5 68.5 43.5" stroke="#5c2b00" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
    {/* ハート */}
    <path d="M40 23 C40 23 33 17 33 23.5 C33 28.5 40 33.5 40 33.5 C40 33.5 47 28.5 47 23.5 C47 17 40 23 40 23Z" fill="#fbbf24"/>
    <path d="M35.5 20.5 Q37.5 19 39.5 20" stroke="white" strokeWidth="1.1" strokeLinecap="round" opacity="0.7"/>
    {/* 握手 */}
    <path d="M22 53 Q31 51.5 37 54" stroke="#d97706" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
    <path d="M58 53 Q49 51.5 43 54" stroke="#b45309" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
    <ellipse cx="40" cy="54" rx="5.5" ry="4" fill="#fbbf24"/>
  </svg>
);

const ProjectIllustration = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20">
    {/* クリップボード */}
    <rect x="12" y="18" width="56" height="57" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5"/>
    {/* クリップ */}
    <rect x="28" y="11" width="24" height="14" rx="5" fill="#1d4ed8"/>
    <rect x="32" y="14" width="16" height="8" rx="3" fill="white"/>
    {/* タスク1 完了 */}
    <rect x="20" y="33" width="44" height="10" rx="5" fill="white"/>
    <circle cx="28.5" cy="38" r="4" fill="#22c55e"/>
    <path d="M26 38 L28 40 L31.5 36" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="36" y="35.5" width="22" height="5" rx="2.5" fill="#dbeafe"/>
    {/* タスク2 完了 */}
    <rect x="20" y="47" width="44" height="10" rx="5" fill="white"/>
    <circle cx="28.5" cy="52" r="4" fill="#22c55e"/>
    <path d="M26 52 L28 54 L31.5 50" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="36" y="49.5" width="17" height="5" rx="2.5" fill="#dbeafe"/>
    {/* タスク3 進行中 */}
    <rect x="20" y="61" width="44" height="10" rx="5" fill="white"/>
    <circle cx="28.5" cy="66" r="4" fill="#3b82f6"/>
    <circle cx="26.8" cy="66" r="1.2" fill="white"/>
    <circle cx="28.8" cy="66" r="1.2" fill="white"/>
    <circle cx="30.8" cy="66" r="1.2" fill="white" opacity="0.5"/>
    <rect x="36" y="63.5" width="24" height="5" rx="2.5" fill="#bfdbfe"/>
    {/* 管理者アイコン */}
    <circle cx="59" cy="27" r="5" fill="#bfdbfe"/>
    <path d="M54.5 32.5 Q54.5 29.5 59 29.5 Q63.5 29.5 63.5 32.5" fill="#3b82f6"/>
    <circle cx="57.5" cy="25.5" r="1.1" fill="#1d4ed8"/>
    <circle cx="60.5" cy="25.5" r="1.1" fill="#1d4ed8"/>
    <path d="M57.2 28 Q59 29.5 60.8 28" stroke="#1d4ed8" strokeWidth="0.9" strokeLinecap="round" fill="none"/>
  </svg>
);

/* ─── 強みデータ ─── */
const strengths = [
  {
    number: "01",
    title: "企画から運用まで、\nすべてをワンチームで。",
    description:
      "「企画」「開発」「運用」で担当がバラバラ…なんてことはありません。最初のアイディア出しから完成後のサポートまで、同じチームが責任をもって担当します。だから話が早く、ブレのないシステムづくりが可能です。",
    renderIcon: <TeamIllustration />,
    gradient: "linear-gradient(135deg, #c04050 0%, #E67376 50%, #f4a8a8 100%)",
    accentColor: "#E67376",
    floatDelay: "0s",
  },
  {
    number: "02",
    title: "本音で向き合う、\nあなたの事業パートナー。",
    description:
      "私たちは、言われたものを作るだけの業者ではありません。お客様の成功のために「それは本当に最適か？」を共に考え、時には率直な意見もお伝えする誠実なパートナーです。",
    renderIcon: <PartnerIllustration />,
    gradient: "linear-gradient(135deg, #92400e 0%, #d97706 55%, #fbbf24 100%)",
    accentColor: "#d97706",
    floatDelay: "1.4s",
  },
  {
    number: "03",
    title: "面倒なプロジェクト管理は、\nまるっとお任せ。",
    description:
      "開発に必要な人材の手配から、複雑なプロジェクト全体の管理まで、すべてお引き受けします。お客様は、一番大切なご自身のビジネスに集中していただけます。",
    renderIcon: <ProjectIllustration />,
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
        <div className="relative rounded-2xl overflow-hidden" style={{ height: "clamp(13.75rem, 18vw, 26.25rem)" }}>
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
