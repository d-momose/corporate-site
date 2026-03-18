"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
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

export default function MessageSection() {
  // グレースケール→カラー スクロールアニメーション
  // 元に戻す場合: この useRef・useEffect と画像コンテナの ref・style を削除
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imageContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      // 要素がビューポート下端に入った時 progress=0 (B&W)
      // 要素上端がビューポートの上30%に達した時 progress=1 (カラー)
      const progress = Math.max(0, Math.min(1, (wh - rect.top) / (wh * 0.7 + rect.height * 0.5)));
      el.style.filter = `grayscale(${1 - progress})`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 初期値を適用
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="message" className="py-24 bg-white relative overflow-hidden">
      <MessageParticles />
      <div className="max-w-7xl mx-auto px-6">
        {/* セクションタイトル */}
        <ShurikenIn className="text-center mb-16">
          <p className="text-base font-medium tracking-widest text-[#E67376] uppercase mb-1">
            CEO Message
          </p>
          {/* 元に戻す場合: style を { fontFamily: "var(--font-yuji-syuku)" } に戻す */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-5 whitespace-nowrap" style={{ fontFamily: 'var(--font-kaisei-tokumin)', fontWeight: 800 }}>
            代表メッセージ
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-16 bg-[#E67376]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#E67376]" />
            <div className="h-[1px] w-16 bg-[#E67376]" />
          </div>
        </ShurikenIn>

        <div className="flex flex-col min-[1440px]:flex-row gap-12 min-[1440px]:gap-16 items-start">
          {/* 左：画像 */}
          <FadeIn delay={150} className="w-full min-[1440px]:w-2/5 flex-shrink-0">
            <div
              ref={imageContainerRef}
              className="relative w-full aspect-[3/4] max-w-sm mx-auto min-[1440px]:mx-0 overflow-hidden rounded-2xl"
              style={{ filter: "grayscale(1)", transition: "filter 0.15s ease-out" }}
            >
              <Image
                src="/ceo.jpg"
                alt="代表取締役"
                fill
                className="object-cover object-top"
                priority
              />
              {/* キャプション：画像下部にオーバーレイ */}
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-16"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)" }}
              >
                <p className="text-sm text-white/80 tracking-widest mb-1">
                  Delight株式会社代表
                </p>
                <p
                  className="text-3xl text-white"
                  style={{ fontFamily: 'var(--font-kaisei-tokumin)', fontWeight: 800 }}
                >
                  山中 翔太
                </p>
              </div>
            </div>
          </FadeIn>

          {/* 右：テキスト */}
          <div className="w-full min-[1440px]:w-3/5 flex flex-col gap-6 text-gray-700 leading-9 text-lg md:text-xl">
            <FadeIn delay={300}>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-snug" style={{ fontFamily: 'var(--font-kaisei-tokumin)', fontWeight: 800 }}>
                喜びの源泉は、
                <br />
                いつも「ヒト」にある。
              </h3>
            </FadeIn>

            <FadeIn delay={370}>
              <div className="flex items-center gap-3 my-1">
                <div className="h-[1px] w-8 bg-[#E67376]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#E67376]" />
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#E67376]/50 to-transparent" />
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <p >
                この会社は、誰のためにあるのか。<br />
                その答えは、経営者のためでも、株主のためでもありません。<br />
                ここで働く一人ひとりの仲間と、その先にいるお客様の「喜び」のためにあります。
              </p>
            </FadeIn>

            <FadeIn delay={500}>
              <p >
                かつて私が見てきたのは、努力や成果が正当に報われず、働く人の人生が少しも豊かにならないという現実でした。<br />
                どれだけ素晴らしいスキルを持っていても、その「ヒト」自身が輝けなければ、本当の価値は生まれない。その痛切な想いが、私の原点です。
              </p>
            </FadeIn>

            <FadeIn delay={600}>
              <p className="text-2xl md:text-3xl font-semibold text-gray-900" style={{ fontFamily: 'var(--font-kaisei-tokumin)', fontWeight: 800 }}>
                「社会はもっとフェアであるべきだ。」
                <br />
                「ヒトはもっと充実した人生を送るべきだ」
              </p>
            </FadeIn>

            <FadeIn delay={670}>
              <div className="flex items-center gap-3 my-1">
                <div className="h-[1px] w-8 bg-[#E67376]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#E67376]" />
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#E67376]/50 to-transparent" />
              </div>
            </FadeIn>

            <FadeIn delay={700}>
              <p >
                この信念を形にしたのが、当社です。<br />
                私たちが掲げる「高還元」「休日増」「教育投資」。<br />
                これらは福利厚生という言葉では足りません。<br />
                あなたの価値と貢献への「最大限の敬意」であり、あなたの人生が豊かになることを願う「会社からの投資」です。
              </p>
            </FadeIn>

            <FadeIn delay={800}>
              <p >
                メンバーの笑顔が、お客様の笑顔につながる。<br />
                私たちは、そんなシンプルな真実を、どこまでもまっすぐに追い求めます。<br />
                この『喜びの連鎖』を、当社から巻き起こしたいのです。
              </p>
            </FadeIn>

            <FadeIn delay={900}>
              <p >
                喜びの連鎖が生み出すエネルギーこそが、お客さまの最も困難な課題を解決する力となり、しいては良い社会を創造する力になると、私たちは信じています。
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
