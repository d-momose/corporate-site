"use client";

import { useRef, useEffect, useState } from "react";
import type React from "react";
import { Dumbbell, ShieldCheck, Zap } from "lucide-react";
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

/* ─── 強みデータ ─── */
const strengths = [
  {
    number: "01",
    title: "企画から運用まで、\nすべてをワンチームで。",
    description:
      "「企画」「開発」「運用」で担当がバラバラ…なんてことはありません。最初のアイディア出しから完成後のサポートまで、同じチームが責任をもって担当します。だから話が早く、ブレのないシステムづくりが可能です。",
    icon: Dumbbell,
    iconImage: "",
    iconFilter: "",
    gradient: "linear-gradient(135deg, #c04050 0%, #E67376 50%, #f4a8a8 100%)",
    accentColor: "#E67376",
    floatDelay: "0s",
  },
  {
    number: "02",
    title: "本音で向き合う、\nあなたの事業パートナー。",
    description:
      "私たちは、言われたものを作るだけの業者ではありません。お客様の成功のために「それは本当に最適か？」を共に考え、時には率直な意見もお伝えする誠実なパートナーです。",
    icon: ShieldCheck,
    iconImage: "",
    iconFilter: "",
    gradient: "linear-gradient(135deg, #92400e 0%, #d97706 55%, #fbbf24 100%)",
    accentColor: "#d97706",
    floatDelay: "1.4s",
  },
  {
    number: "03",
    title: "面倒なプロジェクト管理は、\nまるっとお任せ。",
    description:
      "開発に必要な人材の手配から、複雑なプロジェクト全体の管理まで、すべてお引き受けします。お客様は、一番大切なご自身のビジネスに集中していただけます。",
    icon: Zap,
    iconImage: "",
    iconFilter: "",
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
          background: item.gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
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
            {item.iconImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.iconImage}
                alt=""
                className="w-11 h-11 object-contain"
                style={{ filter: item.iconFilter, opacity: 0.85, mixBlendMode: "multiply" }}
              />
            ) : (
              <item.icon className="w-10 h-10 opacity-60 text-gray-900" strokeWidth={1.5} />
            )}
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
        <div className="h-[1px] w-6" style={{ background: item.accentColor }} />
        <div className="w-1 h-1 rounded-full" style={{ background: item.accentColor }} />
        <div className="h-[1px] w-6" style={{ background: item.accentColor }} />
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

      <div className="max-w-7xl mx-auto px-6">
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
