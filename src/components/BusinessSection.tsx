"use client";

import { useRef, useEffect, useState } from "react";
import type React from "react";
import { Server, Cpu } from "lucide-react"; // ワンポイントアイコン — 削除して戻す場合はこの行とカード内の <Icon> 部分を削除
import MessageParticles from "./MessageParticles";
import ShurikenIn from "./ShurikenIn";
import TypewriterOnScroll from "./TypewriterOnScroll";

/* ── グレースケール→カラー スクロールリビール — 元に戻す場合: この関数と各カード写真の <GrayscaleReveal> を div に戻す ── */
function GrayscaleReveal({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (wh - rect.top) / (wh * 0.7 + rect.height * 0.5)));
      el.style.filter = `grayscale(${1 - progress})`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div ref={ref} className={className} style={{ filter: "grayscale(1)", transition: "filter 0.15s ease-out" }}>
      {children}
    </div>
  );
}

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

/* ── 事業データ ── */
const services = [
  {
    number: "01",
    tag: "IT Solution",
    title: "ITソリューション",
    icon: Server, // 元に戻す場合: この行を削除
    tagline: "システム戦略の立案から\n開発、運用保守までをワンストップで解決",
    points: [
      "要件定義・システム設計から開発・テストまで一貫対応",
      "クラウド・オンプレミス双方に対応した柔軟なインフラ構築",
      "リリース後も安心の継続的な運用保守・機能改善",
    ],
  },
  {
    number: "02",
    tag: "AI Solution",
    title: "AI業務効率化支援",
    icon: Cpu, // 元に戻す場合: この行を削除
    tagline: "最新AIの力で、繰り返しを自動化。\n人の力を、より価値ある仕事へ。",
    points: [
      "ChatGPT、Claude等のAI導入・社内活用の設計・定着支援",
      "業務フロー分析によるボトルネック特定と自動化提案",
      "AI活用人材の育成・ワークショップ・継続サポート",
    ],
  },
];

export default function BusinessSection() {
  return (
    <section id="business" className="py-28 scroll-mt-28 relative overflow-hidden" style={{ background: "#e8eef5" }}>
      {/* 背景画像 — 元に戻す場合: この img と3つの div を削除 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/business-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none" style={{ opacity: 0.35 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(232,238,245,0.45)" }} />
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, #e8eef5, transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to top, #e8eef5, transparent)" }} />
      {/* /背景画像 */}
      <MessageParticles />
      <div className="max-w-6xl mx-auto px-6">

        {/* セクションタイトル */}
        <ShurikenIn className="text-center mb-20">
          <p className="text-base font-medium tracking-widest text-[#E67376] uppercase mb-1">
            Our Business
          </p>
          {/* 元に戻す場合: style を削除 */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-5 whitespace-nowrap" style={{ fontFamily: 'var(--font-kaisei-tokumin)', fontWeight: 800 }}>
            事業内容
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-16 bg-[#E67376]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#E67376]" />
            <div className="h-[1px] w-16 bg-[#E67376]" />
          </div>
        </ShurikenIn>

        {/* ── Our Promise：タイポグラフィステートメント ── */}
        <div className="mb-16 relative overflow-hidden">
          {/* 背景装飾：巨大ゴーストテキスト */}
          <div className="absolute inset-0 flex items-center justify-end pr-4 pointer-events-none select-none overflow-hidden">
            <span
              className="font-bold tracking-widest leading-none text-gray-300"
              style={{ fontSize: "clamp(60px, 14vw, 160px)", opacity: 0.18 }}
            >
              PROMISE
            </span>
          </div>

          {/* 上部ライン＋ラベル */}
          <FadeIn delay={100}>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#E67376] to-transparent" />
              <span className="text-xs font-bold tracking-[0.3em] text-[#E67376] uppercase">Our Promise</span>
              <div className="h-[1px] w-8 bg-[#E67376]/30" />
            </div>
          </FadeIn>

          {/* メインコンテンツ：左見出し ／ 右本文 */}
          <div className="relative flex flex-col min-[1440px]:flex-row gap-10 min-[1440px]:gap-16 items-start">

            {/* 左：大見出し */}
            <FadeIn delay={200} className="min-[1440px]:w-1/2">
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-kaisei-tokumin)', fontWeight: 800 }}>
                <TypewriterOnScroll text="同じゴールを目指す" speed={60} />
                <br />
                <span style={{ color: "#C9A84C" }}>
                  <TypewriterOnScroll text="最高のパートナー" speed={60} delay={700} />
                </span>
                <TypewriterOnScroll text="で" speed={60} delay={1180} />
                <br />
                <TypewriterOnScroll text="ありたい" speed={60} delay={1300} />
              </h3>
            </FadeIn>

            {/* 縦区切り */}
            <div className="hidden min-[1440px]:block w-[1px] self-stretch bg-gray-300 flex-shrink-0" />

            {/* 右：本文 */}
            <FadeIn delay={1700} className="min-[1440px]:w-1/2 flex flex-col gap-5">
              <p className="text-gray-600 leading-9 text-base md:text-lg">
                私たちは、お客様の「一番の味方」でありたいと思っています。<br />
                言われた通りに作るだけでなく「どうすればもっと良くなるか」をとことん考え、提案します。
              </p>
              <p className="text-gray-600 leading-9 text-base md:text-lg">
                最初の企画会議から、完成後のサポートまで。あなたの事業に寄り添い、一番近くで伴走する、誠実なパートナーであり続けます。
              </p>
            </FadeIn>
          </div>

          {/* 下部ライン */}
          <FadeIn delay={2000}>
            <div className="flex items-center gap-4 mt-10">
              <div className="h-[1px] w-8 bg-[#E67376]/30" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-[#E67376] to-transparent" />
            </div>
          </FadeIn>
        </div>

        {/* ── 2サービス × コネクター ── */}
        <div className="flex flex-col min-[1440px]:flex-row items-stretch gap-4 min-[1440px]:gap-0 mb-20">

          {/* Card 01 */}
          <div className="w-full max-w-2xl mx-auto min-[1440px]:flex-1 min-[1440px]:max-w-none min-[1440px]:mx-0 bg-white rounded-2xl p-5 pb-10 flex flex-col gap-5 relative border border-gray-200">
            {/* 内側グレーライン */}
            <div className="absolute inset-[5px] rounded-xl border border-gray-100 pointer-events-none z-10" />
            {/* カード写真：角丸でカード内に収める */}
            <GrayscaleReveal className="rounded-xl overflow-hidden h-56 flex-shrink-0 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/business-photo.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ animation: "photoZoomIn 6s ease-out forwards, photoBreath 6s 6s ease-in-out infinite", transformOrigin: "center center" }} />
              {/* タグバッジ：写真右上に重ねる */}
              <span className="absolute top-3 right-3 text-xs font-bold tracking-widest text-white uppercase px-3 py-1 rounded-full" style={{ background: "linear-gradient(135deg, #E67376, #C9A84C)" }}>
                {services[0].tag}
              </span>
            </GrayscaleReveal>

            {/* コンテンツ */}
            <div className="px-2 flex flex-col gap-4 flex-1">
              {/* 番号 + タイトル */}
              <FadeIn delay={0}>
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
                    {services[0].title}
                  </h3>
                  <Server className="w-5 h-5 text-[#E67376] opacity-50" strokeWidth={1.5} />
                </div>
              </FadeIn>

              {/* タグライン */}
              <FadeIn delay={180}>
                <p className="text-gray-500 text-base md:text-lg leading-8 whitespace-pre-line border-l-2 border-[#E67376] pl-4">
                  {services[0].tagline}
                </p>
              </FadeIn>

              {/* ポイント */}
              <FadeIn delay={320} className="mt-auto">
                <ul className="flex flex-col gap-2.5">
                  {services[0].points.map((p, i) => (
                    <li key={i} className="flex items-start gap-3 text-base md:text-lg text-gray-600 leading-7">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#E67376] flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>

          {/* & コネクター */}
          <FadeIn
            delay={200}
            className="flex items-center justify-center min-[1440px]:flex-none min-[1440px]:w-24 py-4 min-[1440px]:py-0"
          >
            <div className="flex min-[1440px]:flex-col items-center gap-2">
              <div className="h-[1px] min-[1440px]:h-16 min-[1440px]:w-[1px] w-16" style={{ background: "linear-gradient(to right, transparent, #E67376)" }} />
              <span
                className="select-none leading-none flex-shrink-0"
                style={{ fontFamily: 'var(--font-kaisei-tokumin)', fontWeight: 800, fontSize: '3.5rem', background: "linear-gradient(135deg, #E67376, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                &
              </span>
              <div className="h-[1px] min-[1440px]:h-16 min-[1440px]:w-[1px] w-16" style={{ background: "linear-gradient(to right, #C9A84C, transparent)" }} />
            </div>
          </FadeIn>

          {/* Card 02 */}
          <div className="w-full max-w-2xl mx-auto min-[1440px]:flex-1 min-[1440px]:max-w-none min-[1440px]:mx-0 bg-white rounded-2xl p-5 pb-10 flex flex-col gap-5 relative border border-gray-200">
            {/* 内側グレーライン */}
            <div className="absolute inset-[5px] rounded-xl border border-gray-100 pointer-events-none z-10" />
            {/* カード写真：角丸でカード内に収める */}
            <GrayscaleReveal className="rounded-xl overflow-hidden h-56 flex-shrink-0 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/business-photo2.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ animation: "photoZoomIn 6s ease-out forwards, photoBreath 6s 6s ease-in-out infinite", transformOrigin: "center center" }} />
              {/* タグバッジ：写真右上に重ねる */}
              <span className="absolute top-3 right-3 text-xs font-bold tracking-widest text-white uppercase px-3 py-1 rounded-full" style={{ background: "linear-gradient(135deg, #C9A84C, #E67376)" }}>
                {services[1].tag}
              </span>
            </GrayscaleReveal>

            {/* コンテンツ */}
            <div className="px-2 flex flex-col gap-4 flex-1">
              {/* 番号 + タイトル */}
              <FadeIn delay={300}>
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
                    {services[1].title}
                  </h3>
                  <Cpu className="w-5 h-5 text-[#E67376] opacity-50" strokeWidth={1.5} />
                </div>
              </FadeIn>

              {/* タグライン */}
              <FadeIn delay={480}>
                <p className="text-gray-500 text-base md:text-lg leading-8 whitespace-pre-line border-l-2 border-[#E67376] pl-4">
                  {services[1].tagline}
                </p>
              </FadeIn>

              {/* ポイント */}
              <FadeIn delay={620} className="mt-auto">
                <ul className="flex flex-col gap-2.5">
                  {services[1].points.map((p, i) => (
                    <li key={i} className="flex items-start gap-3 text-base md:text-lg text-gray-600 leading-7">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#E67376] flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
