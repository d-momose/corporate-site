"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import ShurikenIn from "@/components/ShurikenIn";

/* ─── FadeIn ─── */
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
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      transition: "opacity 0.8s ease, transform 0.8s ease",
      transitionDelay: `${delay}ms`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
    }}>
      {children}
    </div>
  );
}

/* ─── データ ─── */
const highlights = [
  { value: "80%", label: "還元率", sub: "業界最高水準" },
  { value: "130日+", label: "年間休日", sub: "充実の休暇制度" },
  { value: "5h以下", label: "月平均残業", sub: "ワークライフバランス" },
  { value: "100%", label: "フルリモート", sub: "場所を選ばない働き方" },
];

const benefits = [
  { icon: "🏖️", title: "リフレッシュ休暇", desc: "年10日間の特別休暇。稼働開始から1年待たずに付与されます。" },
  { icon: "🎓", title: "資格取得・学習支援", desc: "資格取得費用の補助、学習時間の確保など、スキルアップを全力支援。" },
  { icon: "👶", title: "各種休暇制度", desc: "慶弔・産前産後・育児・介護休暇など、ライフイベントに寄り添います。" },
  { icon: "🎄", title: "年末年始・夏季休暇", desc: "年末年始休暇＋夏季5日間。まとまったオフでリフレッシュできます。" },
];

const aboutFeatures = [
  {
    number: "01",
    title: "若手〜ベテランまで\n幅広く在籍",
    desc: "20代から50代まで、多様な経験を持つエンジニアが活躍中。世代を超えた知識共有と、互いに高め合える環境があります。",
    accent: "#E67376",
  },
  {
    number: "02",
    title: "業界最高水準の\n還元率80%",
    desc: "あなたのスキルと努力を、そのまま収入へ。商流を浅く保ち、正当な評価が報酬に直結する仕組みを徹底しています。",
    accent: "#C9A84C",
  },
  {
    number: "03",
    title: "1年頑張った自分へ\n10日間の特別休暇",
    desc: "稼働開始から1年で付与されるリフレッシュ休暇。十分に充電して、また全力で挑戦できる環境を大切にしています。",
    accent: "#E67376",
  },
  {
    number: "04",
    title: "「挑戦」から「成長」へ。\n自分らしさを尊重する社風",
    desc: "失敗を恐れず挑戦できる文化を育んでいます。あなたの個性とキャリアビジョンを尊重し、一人ひとりの成長を全力でサポートします。",
    accent: "#C9A84C",
  },
  {
    number: "05",
    title: "あなたの才能を活かすことが\n私たちの使命",
    desc: "エンジニアひとりひとりの強みを最大限に引き出すこと。それがDelight の存在意義であり、社会への最大の貢献だと考えています。",
    accent: "#E67376",
  },
  {
    number: "06",
    title: "年間休暇130日×\n残業月10H以内×フルリモート",
    desc: "仕事もプライベートも、どちらも本気で充実させてほしい。場所や時間に縛られない働き方で、自分らしい人生を設計できます。",
    accent: "#C9A84C",
  },
];

const jobDetails = [
  { label: "職種", value: "システムエンジニア（中途採用）" },
  { label: "給与", value: "月給 400,000円 〜 1,000,000円" },
  { label: "勤務地", value: "東京都豊島区東池袋1-34-5\nいちご東池袋ビル6階（フルリモート可）" },
  { label: "勤務時間", value: "09:00 〜 18:00" },
  { label: "休日・休暇", value: "年間130日以上\n（リフレッシュ休暇・夏季・年末年始・各種慶弔）" },
  { label: "残業", value: "月平均5時間以下（月10時間以内）" },
  { label: "雇用形態", value: "正社員" },
];

export default function EntryPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero：画像背景 ── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        {/* 背景画像 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/entry-hero.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 10%", animation: "photoZoomIn 6s ease-out forwards", transformOrigin: "center center" }}
        />
        {/* グラデーションオーバーレイ：下から暗く */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.05) 100%)" }} />

        {/* テキスト */}
        <div className="relative max-w-6xl mx-auto px-6 pb-20 md:pb-28 w-full">
          <ShurikenIn>
            <p className="text-sm font-semibold tracking-[0.4em] uppercase mb-4 text-white/70">
              Recruit / Entry
            </p>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight mb-6"
              style={{ fontFamily: "var(--font-kaisei-tokumin)", fontWeight: 800 }}
            >
              喜びを、<br />
              <span style={{ background: "linear-gradient(90deg, #E67376, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                ともに創る。
              </span>
            </h1>
            <p className="text-white/75 text-lg md:text-xl max-w-xl leading-9">
              人を活かし、喜びあふれる未来を創造する。<br />
              あなたの可能性を、最大限に輝かせる場所です。
            </p>
          </ShurikenIn>
        </div>
      </section>

      {/* ── 数値ハイライト ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.4em] uppercase mb-3" style={{ color: "#E67376" }}>Why Delight</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900"
              style={{ fontFamily: "var(--font-kaisei-tokumin)", fontWeight: 800 }}
            >
              数字で見るDelight
            </h2>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="h-[1px] w-16 bg-[#E67376]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#E67376]" />
              <div className="h-[1px] w-16 bg-[#E67376]" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {highlights.map((h, i) => (
              <FadeIn key={h.label} delay={i * 100}>
                <div className="rounded-2xl p-8 text-center bg-[#fdf8f8] border border-[#f0e0e0] hover:border-[#E67376] transition-colors duration-300">
                  <p
                    className="text-4xl md:text-5xl font-bold mb-2 leading-none"
                    style={{ fontFamily: "var(--font-kaisei-tokumin)", fontWeight: 800, background: "linear-gradient(135deg, #E67376, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    {h.value}
                  </p>
                  <p className="text-gray-800 font-semibold text-lg mb-1">{h.label}</p>
                  <p className="text-gray-400 text-sm">{h.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Delightについて ── */}
      <section className="py-24" style={{ background: "#f5f0eb" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.4em] uppercase mb-3" style={{ color: "#E67376" }}>About Delight</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900"
              style={{ fontFamily: "var(--font-kaisei-tokumin)", fontWeight: 800 }}
            >
              Delightが選ばれる6つの理由
            </h2>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="h-[1px] w-16 bg-[#E67376]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#E67376]" />
              <div className="h-[1px] w-16 bg-[#E67376]" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {aboutFeatures.map((f, i) => (
              <FadeIn key={f.number} delay={i * 80}>
                <div className="bg-white rounded-2xl p-8 h-full border border-[#e8d8d8] hover:border-[#E67376] transition-colors duration-300 flex flex-col">
                  <p
                    className="text-5xl font-bold mb-4 leading-none"
                    style={{ fontFamily: "var(--font-kaisei-tokumin)", fontWeight: 800, color: f.accent, opacity: 0.2 }}
                  >
                    {f.number}
                  </p>
                  <h3
                    className="text-lg font-bold text-gray-900 mb-3 whitespace-pre-line leading-snug"
                    style={{ fontFamily: "var(--font-kaisei-tokumin)", fontWeight: 800 }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-7 flex-1">{f.desc}</p>
                  <div className="mt-5 h-[2px] rounded-full w-8" style={{ background: f.accent }} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── メッセージ ── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-xs font-bold tracking-[0.4em] uppercase mb-4" style={{ color: "#E67376" }}>Our Culture</p>
          </FadeIn>
          <FadeIn delay={150}>
            <h2
              className="text-3xl md:text-5xl font-bold text-gray-900 leading-snug mb-10"
              style={{ fontFamily: "var(--font-kaisei-tokumin)", fontWeight: 800 }}
            >
              エンジニアが、<br />
              <span style={{ color: "hsl(22, 100%, 65%)" }}>主役</span>の会社。
            </h2>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-col gap-6 text-gray-600 leading-9 text-base md:text-lg text-left max-w-2xl mx-auto">
              <p>
                私たちは「エンジニアファースト」を掲げ、商流を浅く保つことにこだわっています。
                あなたのスキルと努力が、正当に評価され、収入に直結する環境を追求しています。
              </p>
              <p>
                ITエンジニアは、社会を動かすインフラを支えている存在です。だからこそ、そのエンジニアが充実した人生を送れることが、社会全体をより良くすることにつながると信じています。
              </p>
              <p>
                Delightには「挑戦を恐れず、成長し続ける」という文化があります。あなたのキャリアビジョンや個性を尊重しながら、新しい挑戦を全力でサポートする環境を整えています。
              </p>
              <p>
                業界最高水準の80%還元率、月5時間以下の残業、年間130日以上の休日。
                これらは福利厚生ではなく、あなたへの<span className="text-gray-900 font-semibold">「最大限の敬意」</span>です。
              </p>
              <p>
                フルリモートで、場所に縛られず、自分らしいキャリアと充実した人生を。
                Delightで、喜びを一緒に創りませんか。
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 福利厚生 ── */}
      <section className="py-24" style={{ background: "#f5f0eb" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.4em] uppercase mb-3" style={{ color: "#E67376" }}>Benefits</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900"
              style={{ fontFamily: "var(--font-kaisei-tokumin)", fontWeight: 800 }}
            >
              福利厚生
            </h2>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="h-[1px] w-16 bg-[#E67376]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#E67376]" />
              <div className="h-[1px] w-16 bg-[#E67376]" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {benefits.map((b, i) => (
              <FadeIn key={b.title} delay={i * 100}>
                <div className="rounded-2xl p-8 flex gap-5 items-start bg-white border border-[#e8d8d8]">
                  <span className="text-3xl flex-shrink-0">{b.icon}</span>
                  <div>
                    <p className="text-gray-900 font-bold text-lg mb-2">{b.title}</p>
                    <p className="text-gray-500 leading-7 text-sm md:text-base">{b.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 募集要項 ── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.4em] uppercase mb-3" style={{ color: "#E67376" }}>Job Description</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900"
              style={{ fontFamily: "var(--font-kaisei-tokumin)", fontWeight: 800 }}
            >
              募集要項
            </h2>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="h-[1px] w-16 bg-[#E67376]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#E67376]" />
              <div className="h-[1px] w-16 bg-[#E67376]" />
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="rounded-2xl overflow-hidden shadow-sm border border-[#e8d8d8]">
              {/* ヘッダー */}
              <div className="px-8 py-6" style={{ background: "linear-gradient(135deg, #E67376, #C9A84C)" }}>
                <p className="text-xs tracking-widest text-white/70 uppercase mb-1">Position</p>
                <p className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-kaisei-tokumin)", fontWeight: 800 }}>
                  システムエンジニア
                </p>
                <p className="text-white/70 text-sm mt-1">中途採用</p>
              </div>
              {/* 詳細 */}
              <div className="bg-white divide-y divide-gray-100">
                {jobDetails.map(({ label, value }) => (
                  <div key={label} className="flex gap-6 px-8 py-5">
                    <span className="text-xs font-bold tracking-widest uppercase w-24 shrink-0 pt-1" style={{ color: "#E67376" }}>
                      {label}
                    </span>
                    <span className="text-gray-700 leading-7 whitespace-pre-line text-sm md:text-base">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, #E67376, transparent)" }} />
          <div className="absolute inset-0 opacity-5"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, #E67376 0%, transparent 60%)" }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-kaisei-tokumin)", fontWeight: 800 }}
            >
              あなたの挑戦を、<br />待っています。
            </h2>
            <p className="text-gray-500 text-lg leading-9 mb-12">
              まずはお気軽にエントリーください。<br />
              選考フローや待遇についても、丁寧にご説明します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/entry/apply"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #E67376, #C9A84C)" }}
              >
                今すぐエントリーする →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-lg text-gray-700 bg-gray-100 transition-all duration-300 hover:scale-105 hover:bg-gray-200"
              >
                まずは相談する
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
