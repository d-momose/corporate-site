"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ShurikenIn from "@/components/ShurikenIn";
import { Mail } from "lucide-react";

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

/* ─── 型定義 ─── */
type FormData = {
  type: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  agreed: boolean;
};

const initialForm: FormData = {
  type: "サービスについて",
  company: "",
  name: "",
  email: "",
  phone: "",
  message: "",
  agreed: false,
};

/* ─── ラベル表示マップ ─── */
const fieldLabels: Record<keyof Omit<FormData, "agreed">, string> = {
  type: "お問い合わせ種別",
  company: "法人名",
  name: "お名前",
  email: "メールアドレス",
  phone: "電話番号",
  message: "お問い合わせ内容",
};

/* ─── ページ本体 ─── */
export default function ContactPage() {
  const [step, setStep] = useState<"input" | "confirm" | "complete">("input");
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  /* バリデーション */
  const validate = () => {
    const next: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) next.name = "お名前を入力してください";
    if (!form.email.trim()) {
      next.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "正しいメールアドレスを入力してください";
    }
    if (!form.message.trim()) next.message = "お問い合わせ内容を入力してください";
    if (!form.agreed) next.agreed = "個人情報保護方針への同意が必要です";
    return next;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleToConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStep("confirm");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStep("complete");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    setStep("input");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      {/* ─── ヒーロー ─── */}
      <section
        className="relative bg-slate-800 pt-36 pb-20"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        {/* グラデーションアクセント */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(230,115,118,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <ShurikenIn>
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                <Mail className="w-8 h-8 text-[#E67376]" strokeWidth={1.5} />
              </div>
            </div>
            <p className="text-xs font-semibold tracking-[0.3em] text-[#E67376] uppercase mb-3">
              Contact
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: 'var(--font-kaisei-tokumin)', fontWeight: 800 }}>
              お問い合わせ
            </h1>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-[1px] w-16 bg-[#E67376]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#E67376]" />
              <div className="h-[1px] w-16 bg-[#E67376]" />
            </div>
          </ShurikenIn>
          <p className="text-white/60 text-sm md:text-base leading-8 max-w-xl mx-auto hero-slide-up" style={{ animationDelay: "0.4s" }}>
            ご質問・ご相談はお気軽にお問い合わせください。<br />
            メールフォームでのご連絡から返信まで、数日かかる場合もございます。
          </p>
        </div>
      </section>

      {/* ─── フォームエリア ─── */}
      <section className="bg-[#f9f9f9] py-20 min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-6">

          {/* ── ステップ：入力 ── */}
          {step === "input" && (
            <FadeIn>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  フォームでのお問い合わせ
                </h2>
                <p className="text-sm text-gray-500 mb-8">
                  <span className="text-[#E67376]">*</span> は必須項目です
                </p>

                <form onSubmit={handleToConfirm} noValidate className="space-y-7">

                  {/* お問い合わせ種別 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      お問い合わせ種別
                    </label>
                    <div className="relative">
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleInputChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 bg-white appearance-none focus:outline-none focus:border-[#E67376] focus:ring-1 focus:ring-[#E67376] transition-colors"
                      >
                        <option value="サービスについて">サービスについて</option>
                        <option value="その他">その他</option>
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* 法人名 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      法人名
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleInputChange}
                      placeholder="例：Delight株式会社"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-[#E67376] focus:ring-1 focus:ring-[#E67376] transition-colors"
                    />
                  </div>

                  {/* お名前 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      お名前 <span className="text-[#E67376] ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="例：山田 太郎"
                      className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-[#E67376] focus:ring-1 focus:ring-[#E67376] transition-colors ${
                        errors.name ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* メールアドレス */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      メールアドレス <span className="text-[#E67376] ml-1">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="例：info@example.com"
                      className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-[#E67376] focus:ring-1 focus:ring-[#E67376] transition-colors ${
                        errors.email ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* 電話番号 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      電話番号
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="例：03-0000-0000"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-[#E67376] focus:ring-1 focus:ring-[#E67376] transition-colors"
                    />
                  </div>

                  {/* お問い合わせ内容 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      お問い合わせ内容 <span className="text-[#E67376] ml-1">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder="お問い合わせ内容をご記入ください"
                      className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-300 resize-none focus:outline-none focus:border-[#E67376] focus:ring-1 focus:ring-[#E67376] transition-colors ${
                        errors.message ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>
                    )}
                  </div>

                  {/* プライバシーポリシー */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          name="agreed"
                          checked={form.agreed}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            form.agreed
                              ? "bg-[#E67376] border-[#E67376]"
                              : "bg-white border-gray-300 group-hover:border-[#E67376]"
                          }`}
                        >
                          {form.agreed && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 leading-6">
                        <Link
                          href="/privacy"
                          className="text-[#E67376] underline underline-offset-2 hover:opacity-70 transition-opacity"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          個人情報保護方針
                        </Link>
                        に同意する
                      </span>
                    </label>
                    {errors.agreed && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.agreed}</p>
                    )}
                  </div>

                  {/* 送信ボタン */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg active:scale-[0.99]"
                      style={{
                        background: "linear-gradient(135deg, #c04050 0%, #E67376 50%, #f4a8a8 100%)",
                      }}
                    >
                      入力内容を確認する →
                    </button>
                  </div>

                </form>
              </div>
            </FadeIn>
          )}

          {/* ── ステップ：確認 ── */}
          {step === "confirm" && (
            <FadeIn>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                <h2 className="text-xl font-bold text-gray-900 mb-1">入力内容の確認</h2>
                <p className="text-sm text-gray-500 mb-8">
                  以下の内容で送信します。ご確認ください。
                </p>

                <div className="divide-y divide-gray-100">
                  {(Object.keys(fieldLabels) as (keyof typeof fieldLabels)[]).map((key) => (
                    <div key={key} className="flex gap-6 py-5">
                      <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase w-32 shrink-0 pt-0.5">
                        {fieldLabels[key]}
                      </span>
                      <span className="text-sm text-gray-800 leading-7 whitespace-pre-wrap break-all">
                        {form[key] || <span className="text-gray-300">未入力</span>}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-10">
                  <button
                    onClick={handleBack}
                    className="flex-1 py-4 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    ← 入力に戻る
                  </button>
                  {submitError && (
                    <p className="text-xs text-red-500 text-center">{submitError}</p>
                  )}
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex-1 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg active:scale-[0.99] disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg, #c04050 0%, #E67376 50%, #f4a8a8 100%)",
                    }}
                  >
                    {submitting ? "送信中…" : "送信する"}
                  </button>
                </div>
              </div>
            </FadeIn>
          )}

          {/* ── ステップ：完了 ── */}
          {step === "complete" && (
            <FadeIn>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
                {/* アイコン */}
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #c04050 0%, #E67376 50%, #f4a8a8 100%)",
                  }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  お問い合わせを受け付けました
                </h2>
                <p className="text-sm text-gray-500 leading-8 mb-10">
                  お問い合わせいただきありがとうございます。<br />
                  内容を確認の上、数日以内にご連絡いたします。<br />
                  しばらくお待ちください。
                </p>

                <Link
                  href="/"
                  className="inline-block px-8 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #c04050 0%, #E67376 50%, #f4a8a8 100%)",
                  }}
                >
                  トップページへ戻る
                </Link>
              </div>
            </FadeIn>
          )}

        </div>
      </section>

      {/* ─── フッターバー ─── */}
      <footer
        className="bg-slate-800 py-10 text-center"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        <p className="text-xs text-gray-600 tracking-widest">
          © {new Date().getFullYear()} Delight株式会社. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
