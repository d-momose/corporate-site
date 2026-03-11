"use client";

import { useRef, useEffect, useState } from "react";
import type React from "react";
import ShurikenIn from "./ShurikenIn";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      transition: "opacity 0.7s ease, transform 0.7s ease",
      transitionDelay: `${delay}ms`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
    }}>
      {children}
    </div>
  );
}

type Category = "お知らせ" | "プレスリリース" | "採用情報";

const categoryStyle: Record<Category, string> = {
  "お知らせ":      "bg-rose-50 text-[#E67376] border border-[#E67376]/30",
  "プレスリリース": "bg-amber-50 text-amber-600 border border-amber-300/40",
  "採用情報":      "bg-blue-50 text-blue-500 border border-blue-300/40",
};

const news: { date: string; category: Category; title: string }[] = [
  { date: "2026.04.01", category: "お知らせ", title: "弊社ウェブサイトをリニューアルいたしました。" },
];

export default function NewsSection() {
  return (
    <section id="news" className="py-24 bg-[#eef4fb] relative scroll-mt-28">
      <div className="max-w-5xl mx-auto px-6">

        {/* セクションタイトル */}
        <ShurikenIn className="text-center mb-16">
          <p className="text-base font-medium tracking-widest text-[#E67376] uppercase mb-1">
            News
          </p>
          {/* 元に戻す場合: style を削除 */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-5 whitespace-nowrap" style={{ fontFamily: 'var(--font-kaisei-tokumin)', fontWeight: 800 }}>
            お知らせ
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-16 bg-[#E67376]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#E67376]" />
            <div className="h-[1px] w-16 bg-[#E67376]" />
          </div>
        </ShurikenIn>

        {/* ニュースリスト */}
        <div className="flex flex-col divide-y divide-gray-100">
          {news.map((item, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-5 group cursor-default">
                {/* 日付 */}
                <span className="text-sm text-gray-400 tracking-widest shrink-0 w-28">
                  {item.date}
                </span>
                {/* カテゴリタグ */}
                <span className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 w-fit ${categoryStyle[item.category]}`}>
                  {item.category}
                </span>
                {/* タイトル */}
                <p className="text-base md:text-lg text-gray-700 leading-relaxed group-hover:text-[#E67376] transition-colors duration-200">
                  {item.title}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
