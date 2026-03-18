"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

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

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-0 md:gap-16">

          {/* テキスト：左側 */}
          <div className="w-full md:w-3/5 py-16 md:py-0 flex flex-col gap-7">
            <FadeIn delay={100}>
              <p className="text-xs font-bold tracking-[0.3em] text-[#E67376] uppercase">
                Join Us
              </p>
            </FadeIn>

            <FadeIn delay={200}>
              <h2
                className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
                style={{ fontFamily: 'var(--font-kaisei-tokumin)', fontWeight: 800 }}
              >
                一緒に、<br />
                Delightを<br className="md:hidden" />つくりませんか。
              </h2>
            </FadeIn>

            <FadeIn delay={350}>
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-[#E67376]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#E67376]" />
                <div className="h-[1px] w-32 bg-gradient-to-r from-[#E67376]/50 to-transparent" />
              </div>
            </FadeIn>

            <FadeIn delay={450}>
              <p className="text-gray-600 leading-9 text-base md:text-lg">
                私たちは、一人ひとりが輝ける場所を大切にしています。<br />
                スキルや経験よりも、誠実さと熱意を持った仲間を求めています。
              </p>
            </FadeIn>

            <FadeIn delay={600}>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link
                  href="/entry"
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold text-white text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ background: "linear-gradient(135deg, #E67376, #C9A84C)" }}
                >
                  採用情報を見る →
                </Link>
                <Link
                  href="/entry#apply"
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold text-gray-700 text-base border-2 border-gray-300 transition-all duration-300 hover:scale-105 hover:border-[#E67376] hover:text-[#E67376]"
                >
                  エントリーする
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* 写真：右側 */}
          <FadeIn className="w-full md:w-2/5 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/cta-team.jpg"
              alt="Delightのチーム"
              className="w-full h-[420px] md:h-[520px] object-cover object-top rounded-2xl"
            />
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
