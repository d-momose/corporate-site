"use client";

import { useRef, useEffect, useState } from "react";
import type React from "react";
import { Users, Heart, ClipboardList } from "lucide-react"; // ワンポイントアイコン — 削除して戻す場合はこの行とStrengthCircle内の <Icon> 部分を削除
import MessageParticles from "./MessageParticles";
import ShurikenIn from "./ShurikenIn";

/* ─── セクションタイトル用シンプルFadeIn ─── */
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

/* ─── 強みデータ ─── */
const strengths = [
  {
    number: "01",
    title: "企画から運用まで、\nすべてをワンチームで。",
    description:
      "「企画」「開発」「運用」で担当がバラバラ…なんてことはありません。最初のアイディア出しから完成後のサポートまで、同じチームが責任をもって担当します。だから話が早く、ブレのないシステムづくりが可能です。",
    icon: Users,
    iconImage: "/icon-team.png",
    iconFilter: "hue-rotate(240deg) saturate(2) brightness(1.1)",
    gradient: "linear-gradient(135deg, #c04050 0%, #E67376 50%, #f4a8a8 100%)",
    accentColor: "#E67376",
    floatDelay: "0s",
  },
  {
    number: "02",
    title: "本音で向き合う、\nあなたの事業パートナー。",
    description:
      "私たちは、言われたものを作るだけの業者ではありません。お客様の成功のために「それは本当に最適か？」を共に考え、時には率直な意見もお伝えする誠実なパートナーです。",
    icon: Heart,
    iconImage: "/icon-partner.png",
    iconFilter: "hue-rotate(300deg) saturate(2) brightness(1.1)",
    gradient: "linear-gradient(135deg, #92400e 0%, #d97706 55%, #fbbf24 100%)",
    accentColor: "#d97706",
    floatDelay: "1.4s",
  },
  {
    number: "03",
    title: "面倒なプロジェクト管理は、\nまるっとお任せ。",
    description:
      "開発に必要な人材の手配から、複雑なプロジェクト全体の管理まで、すべてお引き受けします。お客様は、一番大切なご自身のビジネスに集中していただけます。",
    icon: ClipboardList,
    iconImage: "/icon-task.png",
    iconFilter: "hue-rotate(120deg) saturate(2) brightness(1.1)",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #7dd3fc 100%)",
    accentColor: "#3b82f6",
    floatDelay: "2.8s",
  },
];

/* ─── 円コンポーネント（visible を親から受け取る） ─── */
function StrengthCircle({
  item,
  delay,
  visible,
}: {
  item: (typeof strengths)[0];
  delay: number;
  visible: boolean;
}) {
  const fade = (extra: number): React.CSSProperties => ({
    transition: "opacity 0.7s ease, transform 0.7s ease",
    transitionDelay: `${delay + extra}ms`,
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(16px)",
  });

  return (
    /* フェードイン用ラッパー */
    <div
      style={{
        transition: "opacity 0.8s ease, transform 0.8s ease",
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
      }}
    >
      {/* フロートラッパー（hover:scale と分離して transform 競合を防ぐ） */}
      <div
        className="relative"
        style={visible ? {
          animation: `circleFloat 5s ease-in-out infinite`,
          animationDelay: item.floatDelay,
        } : {}}
      >
        {/* パルスリング（後ろに配置） */}
        {/* 元に戻す場合: rounded-3xl min-[560px]:rounded-full → rounded-full */}
        <div
          className="absolute -inset-3 rounded-3xl min-[560px]:rounded-full pointer-events-none"
          style={{
            background: item.gradient,
            animation: visible ? `ringPulse 3s ease-out infinite` : "none",
            animationDelay: item.floatDelay,
          }}
        />

        {/* グラデーションボーダー＋ホバースケール */}
        {/* 元に戻す場合: rounded-3xl min-[560px]:rounded-full → rounded-full */}
        <div
          className="rounded-3xl min-[560px]:rounded-full p-[2px] transition duration-700 ease-in-out hover:scale-[1.12] hover:z-10 relative cursor-default"
          style={{ background: item.gradient }}
        >
          {/* 内側コンテナ */}
          {/* 元に戻す場合: h-auto py-10 min-[560px]:h-[min(85vw,600px)] min-[560px]:py-0 rounded-3xl min-[560px]:rounded-full → h-[min(85vw,600px)] rounded-full */}
          <div className="w-[min(85vw,600px)] h-auto py-10 min-[560px]:h-[min(85vw,600px)] min-[560px]:py-0 rounded-3xl min-[560px]:rounded-full flex flex-col items-center justify-center px-[max(1.5rem,5vw)] text-center relative bg-white">
            {/* 装飾リング */}
            {/* 元に戻す場合: rounded-3xl min-[560px]:rounded-full → rounded-full */}
            <div className="absolute inset-4 rounded-3xl min-[560px]:rounded-full border border-gray-200 pointer-events-none" />
            <div className="absolute inset-8 rounded-3xl min-[560px]:rounded-full border border-gray-100 pointer-events-none" />

            {/* スマイル装飾（球体モチーフ） */}
            <div className="relative z-10 mb-2" style={fade(0)}>
              <svg width="52" height="34" viewBox="0 0 52 34" fill="none" aria-hidden>
                <circle cx="14" cy="10" r="4" fill="#d97706" opacity="0.7" />
                <circle cx="38" cy="10" r="4" fill="#d97706" opacity="0.7" />
                <path d="M 6 20 Q 26 33 46 20" stroke="#d97706" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.6" />
              </svg>
            </div>

            {/* ワンポイントアイコン */}
            <div className="mb-4 relative z-10" style={fade(120)}>
              {item.iconImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.iconImage}
                  alt=""
                  className="w-12 h-12 mx-auto object-contain"
                  style={{ filter: item.iconFilter, opacity: 0.85, mixBlendMode: "multiply" }}
                />
              ) : (
                <item.icon
                  className="w-10 h-10 opacity-60 mx-auto text-gray-900"
                  strokeWidth={1.5}
                />
              )}
            </div>

            {/* 区切り飾り */}
            <div className="flex items-center gap-1.5 mb-4 relative z-10" style={fade(280)}>
              <div className="h-[1px] w-5 bg-gray-300" />
              <div className="w-1 h-1 rounded-full bg-gray-400" />
              <div className="h-[1px] w-5 bg-gray-300" />
            </div>

            {/* タイトル */}
            <h3
              className="text-2xl md:text-3xl font-bold mb-4 relative z-10 whitespace-pre-line leading-[2.2]"
              style={fade(400)}
            >
              <span style={{ background: "rgba(0,0,0,0.82)", color: "#fff", padding: "2px 8px", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>
                {item.title}
              </span>
            </h3>

            {/* 説明 */}
            <p
              className="text-base text-gray-600 leading-7 relative z-10"
              style={fade(560)}
            >
              {item.description}
            </p>
          </div>
        </div>
      </div>
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
    <section id="strength" className="py-28 scroll-mt-28 relative overflow-hidden" style={{ background: "#b88080" }}>
      {/* 背景写真 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/strength-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        style={{ opacity: 0.75 }}
      />
      {/* カラーオーバーレイ：写真とセクション色をブレンド */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(184,128,128,0.55)" }} />
      {/* 上端フェード：WaveDivider との境界を消す */}
      <div className="absolute inset-x-0 top-0 h-44 pointer-events-none" style={{ background: "linear-gradient(to bottom, #b88080 0%, transparent 100%)" }} />
      {/* 下端フェード：WaveDivider との境界を消す */}
      <div className="absolute inset-x-0 bottom-0 h-44 pointer-events-none" style={{ background: "linear-gradient(to top, #b88080 0%, transparent 100%)" }} />
      <MessageParticles />
      <div className="max-w-5xl mx-auto px-6">
        {/* セクションタイトル */}
        <ShurikenIn className="text-center mb-20">
          <p className="text-base font-medium tracking-widest text-[#E67376] uppercase mb-1">
            Our Strength
          </p>
          {/* 元に戻す場合: style を削除 */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-5 whitespace-nowrap" style={{ fontFamily: 'var(--font-kaisei-tokumin)', fontWeight: 800 }}>
            Delightの強み
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-16 bg-[#E67376]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#E67376]" />
            <div className="h-[1px] w-16 bg-[#E67376]" />
          </div>
        </ShurikenIn>

        {/* 三角形配置：上1つ、下2つ — containerRef で一括監視 */}
        <div ref={containerRef} className="flex flex-col items-center gap-6 min-[1440px]:gap-8">
          {/* ① 上（頂点）：最初に出現 */}
          <StrengthCircle item={strengths[0]} delay={0} visible={visible} />

          {/* ② 左・③ 右：順番に出現 */}
          <div className="flex flex-col min-[1440px]:flex-row items-center gap-6 min-[1440px]:gap-14">
            <StrengthCircle item={strengths[1]} delay={700} visible={visible} />
            <StrengthCircle item={strengths[2]} delay={1400} visible={visible} />
          </div>
        </div>
      </div>
    </section>
  );
}
