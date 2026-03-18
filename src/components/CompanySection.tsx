"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

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

const companyData = [
  { label: "会社名", value: "Delight株式会社" },
  { label: "所在地", value: "〒170-0013 東京都豊島区東池袋1-34-5\nいちご東池袋ビル6階" },
  { label: "代表者名", value: "山中 翔太" },
  { label: "資本金", value: "3,000,000円" },
  { label: "設立", value: "2024年1月" },
  { label: "事業内容", value: "ITソリューション事業\nAI業務効率化支援事業" },
  { label: "顧問", value: "税理士　小林 弘和" },
  { label: "取引銀行", value: "みずほ銀行、巣鴨信用金庫" },
];

export default function CompanySection() {
  return (
    <section
      id="company"
      className="bg-slate-900 py-28"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* セクションタイトル */}
        <div className="mb-20">
          <div className="mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Delight"
              className="h-10 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="text-sm font-semibold tracking-[0.3em] text-gray-500 uppercase mb-2">
            Company
          </p>
          {/* 元に戻す場合: style を削除 */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight whitespace-nowrap" style={{ fontFamily: 'var(--font-kaisei-tokumin)', fontWeight: 800 }}>
            会社概要
          </h2>
        </div>

        <FadeIn delay={150}>
          <div className="grid grid-cols-1 min-[1440px]:grid-cols-2 min-[1440px]:gap-x-20">
            {[companyData.slice(0, 4), companyData.slice(4)].map((col, ci) => (
              <div key={ci} className={`flex flex-col divide-y divide-white/10 ${ci === 1 ? "border-t min-[1440px]:border-t-0 border-white/10" : ""}`}>
                {col.map(({ label, value }) => (
                  <div key={label} className="flex gap-8 py-6">
                    <span className="text-sm font-semibold tracking-widest text-gray-500 uppercase w-28 shrink-0 pt-0.5">
                      {label}
                    </span>
                    <span className="text-white/90 leading-8 whitespace-pre-line text-base md:text-xl">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
