"use client";

import { useRef, useEffect, useState } from "react";
import type React from "react";
import { Pointer } from "lucide-react";
import MessageParticles from "./MessageParticles";
import ShurikenIn from "./ShurikenIn";

/* ── グレースケール→カラー スクロールリビール ── */
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
    icon: Pointer,
    photo: "/business-photo.jpg",
    photoAlt: "ITソリューション事業の作業風景",
    tagline: "システム戦略の立案から\n開発、運用保守までをワンストップで解決",
    points: [
      "要件定義・システム設計から開発・テストまで一貫対応",
      "クラウド・オンプレミス双方に対応した柔軟なインフラ構築",
      "リリース後も安心の継続的な運用保守・機能改善",
    ],
    headerBg: "linear-gradient(135deg, #E67376 0%, #c9545a 100%)",
    headerText: "#ffffff",
    reverse: false,
  },
  {
    number: "02",
    tag: "AI Solution",
    title: "AI業務効率化支援",
    icon: Pointer,
    photo: "/business-photo2.jpg",
    photoAlt: "AI業務効率化支援のコンサルティング風景",
    tagline: "最新AIの力で、繰り返しを自動化。\n人の力を、より価値ある仕事へ。",
    points: [
      "ChatGPT、Claude等のAI導入・社内活用の設計・定着支援",
      "業務フロー分析によるボトルネック特定と自動化提案",
      "AI活用人材の育成・ワークショップ・継続サポート",
    ],
    headerBg: "linear-gradient(135deg, #edd200 0%, #c9b000 100%)",
    headerText: "#ffffff",
    reverse: true,
  },
];

export default function BusinessSection() {
  return (
    <section id="business" className="py-28 scroll-mt-28 relative overflow-hidden" style={{ background: "#f9fafb" }}>
      {/* 背景画像 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/business-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none" style={{ opacity: 0.35 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(249,250,251,0.55)" }} />
      <div className="absolute inset-x-0 top-0 h-56 pointer-events-none" style={{ background: "linear-gradient(to bottom, #f9fafb 40%, transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-56 pointer-events-none" style={{ background: "linear-gradient(to top, #ffffff 40%, transparent)" }} />
      <MessageParticles />
      <div className="max-w-[1200px] mx-auto px-6">

        {/* セクションタイトル */}
        <ShurikenIn className="text-center mb-20">
          <p className="text-base font-medium tracking-widest text-[#E67376] uppercase mb-1">
            Our Business
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-5 whitespace-nowrap" style={{ fontFamily: 'var(--font-kaisei-tokumin)', fontWeight: 800 }}>
            事業内容
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-16 bg-[#E67376]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#E67376]" />
            <div className="h-[1px] w-16 bg-[#E67376]" />
          </div>
        </ShurikenIn>

        {/* ── Our Promise ── */}
        <div className="mb-16 relative overflow-hidden">
          <FadeIn delay={100}>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#E67376] to-transparent" />
              <span className="text-xs font-bold tracking-[0.3em] text-[#E67376] uppercase">Our Promise</span>
              <div className="h-[1px] w-8 bg-[#E67376]/30" />
            </div>
          </FadeIn>

          <div className="relative flex flex-col min-[1200px]:flex-row gap-10 min-[1200px]:gap-16 items-start">
            <FadeIn delay={200} className="min-[1200px]:w-1/2">
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-kaisei-tokumin)', fontWeight: 800 }}>
                同じゴールを目指す
                <br />
                <span style={{ color: "#edd200" }}>最高のパートナー</span>で
                <br />
                ありたい
              </h3>
            </FadeIn>

            <div className="hidden min-[1200px]:block w-[1px] self-stretch bg-gray-300 flex-shrink-0" />

            <FadeIn delay={600} className="min-[1200px]:w-1/2 flex flex-col gap-5">
              <p className="text-gray-600 leading-9 text-base md:text-lg">
                私たちは、お客様の「一番の味方」でありたいと思っています。<br />
                言われた通りに作るだけでなく「どうすればもっと良くなるか」をとことん考え、提案します。
              </p>
              <p className="text-gray-600 leading-9 text-base md:text-lg">
                最初の企画会議から、完成後のサポートまで。あなたの事業に寄り添い、一番近くで伴走する、誠実なパートナーであり続けます。
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={2000}>
            <div className="flex items-center gap-4 mt-10">
              <div className="h-[1px] w-8 bg-[#E67376]/30" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-[#E67376] to-transparent" />
            </div>
          </FadeIn>
        </div>

        {/* ── 交互レイアウト ── */}
        <div className="flex flex-col gap-8 mb-20">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.number} delay={idx * 150}>
                <div className="bg-white rounded-2xl border border-gray-300 overflow-hidden max-w-[80%] mx-auto">

                  {/* ヘッダー */}
                  <div
                    className="px-8 py-4 flex items-center justify-center gap-3"
                    style={{ background: service.headerBg }}
                  >
                    <Icon className="w-6 h-6" style={{ color: service.headerText, opacity: 0.85 }} strokeWidth={1.5} />
                    <span className="text-lg font-bold tracking-widest uppercase" style={{ color: service.headerText }}>
                      {service.tag}
                    </span>
                    <span style={{ color: service.headerText, opacity: 0.5 }}>|</span>
                    <span className="text-lg font-bold" style={{ color: service.headerText }}>{service.title}</span>
                  </div>


                  {/* コンテンツ：画像＋テキスト */}
                  <div className={`flex flex-col md:flex-row ${service.reverse ? "md:flex-row-reverse" : ""}`}>

                    {/* 写真 */}
                    <div className="md:w-[40%] flex-shrink-0 flex items-center justify-center p-2 md:p-3">
                      <GrayscaleReveal className="w-full relative h-52 md:h-64 rounded-xl overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={service.photo}
                          alt={service.photoAlt}
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{ animation: "photoZoomIn 6s ease-out forwards, photoBreath 6s 6s ease-in-out infinite", transformOrigin: "center center" }}
                        />
                      </GrayscaleReveal>
                    </div>

                    {/* テキスト */}
                    <div className="md:w-[60%] px-5 py-6 md:px-7 md:py-8 flex flex-col gap-5 justify-center">
                      <p className="text-gray-900 text-xl md:text-2xl leading-9 whitespace-pre-line" style={{ fontFamily: 'var(--font-kaisei-tokumin)', fontWeight: 800 }}>
                        {service.tagline}
                      </p>
                      <ul className="flex flex-col gap-2.5">
                        {service.points.map((p, i) => (
                          <li key={i} className="flex items-start gap-3 text-base md:text-lg text-gray-600 leading-7 whitespace-nowrap">
                            <Pointer className="mt-[3px] w-4 h-4 flex-shrink-0 text-[#E67376]" strokeWidth={1.5} style={{ transform: "rotate(90deg)" }} />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}
