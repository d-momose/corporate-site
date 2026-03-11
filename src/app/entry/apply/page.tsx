"use client";

import { useState, useRef, useEffect } from "react";
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
      { threshold: 0.05 }
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

/* ─── 型定義 ─── */
type FormData = {
  name: string;
  kana: string;
  gender: string;
  age: string;
  zip: string;
  prefecture: string;
  city: string;
  addressRest: string;
  phone: string;
  email: string;
  emailConfirm: string;
  school: string;
  department: string;
  graduationYear: string;
  graduationMonth: string;
  remarks: string;
  agreed: boolean;
};

const initialForm: FormData = {
  name: "",
  kana: "",
  gender: "",
  age: "",
  zip: "",
  prefecture: "",
  city: "",
  addressRest: "",
  phone: "",
  email: "",
  emailConfirm: "",
  school: "",
  department: "",
  graduationYear: "",
  graduationMonth: "",
  remarks: "",
  agreed: false,
};

const PREFECTURES = [
  "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
  "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
  "新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県",
  "静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県",
  "奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県",
  "徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県",
  "熊本県","大分県","宮崎県","鹿児島県","沖縄県",
];

const YEARS = Array.from({ length: 50 }, (_, i) => String(new Date().getFullYear() - i));
const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));

/* ─── 確認画面用ラベル ─── */
const confirmFields = [
  { key: "name", label: "お名前" },
  { key: "kana", label: "フリガナ" },
  { key: "gender", label: "性別" },
  { key: "age", label: "ご年齢" },
  { key: "_address", label: "ご住所" },
  { key: "phone", label: "電話番号" },
  { key: "email", label: "メールアドレス" },
  { key: "school", label: "最終学歴学校名" },
  { key: "department", label: "学部学科" },
  { key: "_graduation", label: "卒業年月" },
  { key: "remarks", label: "その他特記事項" },
] as const;

export default function EntryApplyPage() {
  const [step, setStep] = useState<"input" | "confirm" | "complete">("input");
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData | "_address" | "_graduation", string>>>({});
  const [zipLoading, setZipLoading] = useState(false);

  /* 郵便番号自動入力 */
  const handleZipSearch = async () => {
    const zip = form.zip.replace(/-/g, "").trim();
    if (zip.length !== 7) return;
    setZipLoading(true);
    try {
      const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const r = data.results[0];
        setForm((prev) => ({
          ...prev,
          prefecture: r.address1,
          city: r.address2 + r.address3,
        }));
        setErrors((prev) => ({ ...prev, prefecture: undefined, city: undefined }));
      }
    } catch {
      // 失敗時は何もしない
    } finally {
      setZipLoading(false);
    }
  };

  /* フィールド変更 */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /* バリデーション */
  const validate = () => {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = "お名前を入力してください";
    if (!form.kana.trim()) {
      errs.kana = "フリガナを入力してください";
    } else if (!/^[ァ-ヶー\s]+$/.test(form.kana)) {
      errs.kana = "全角カタカナで入力してください";
    }
    if (!form.gender) errs.gender = "性別を選択してください";
    if (!form.age.trim()) {
      errs.age = "ご年齢を入力してください";
    } else if (isNaN(Number(form.age)) || Number(form.age) < 15 || Number(form.age) > 99) {
      errs.age = "正しい年齢を入力してください";
    }
    if (!form.zip.trim()) errs.zip = "郵便番号を入力してください";
    if (!form.prefecture.trim()) errs.prefecture = "都道府県を選択してください";
    if (!form.city.trim()) errs.city = "市区町村を入力してください";
    if (!form.phone.trim()) {
      errs.phone = "電話番号を入力してください";
    } else if (!/^[0-9\-+() ]+$/.test(form.phone)) {
      errs.phone = "正しい電話番号を入力してください";
    }
    if (!form.email.trim()) {
      errs.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "正しいメールアドレスを入力してください";
    }
    if (!form.emailConfirm.trim()) {
      errs.emailConfirm = "確認用メールアドレスを入力してください";
    } else if (form.email !== form.emailConfirm) {
      errs.emailConfirm = "メールアドレスが一致しません";
    }
    if (!form.agreed) errs.agreed = "個人情報保護方針への同意が必要です";
    return errs;
  };

  const handleToConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErrKey = Object.keys(errs)[0];
      const el = document.querySelector(`[name="${firstErrKey}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
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
      const res = await fetch("/api/entry", {
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

  /* 確認画面用の値を整形 */
  const getConfirmValue = (key: string): string => {
    if (key === "_address") {
      return [
        form.zip ? `〒${form.zip}` : "",
        form.prefecture,
        form.city,
        form.addressRest,
      ].filter(Boolean).join(" ");
    }
    if (key === "_graduation") {
      if (!form.graduationYear && !form.graduationMonth) return "";
      return `${form.graduationYear}年 ${form.graduationMonth}月`;
    }
    return form[key as keyof FormData] as string;
  };

  /* ── 共通スタイル ── */
  const inputCls = (err?: string) =>
    `w-full border rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-[#E67376] focus:ring-1 focus:ring-[#E67376] transition-colors ${err ? "border-red-400 bg-red-50" : "border-gray-200"}`;

  const selectCls = (err?: string) =>
    `w-full border rounded-lg px-4 py-3 text-sm text-gray-900 bg-white appearance-none focus:outline-none focus:border-[#E67376] focus:ring-1 focus:ring-[#E67376] transition-colors ${err ? "border-red-400 bg-red-50" : "border-gray-200"}`;

  return (
    <main>
      {/* ─── ヒーロー ─── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        {/* 背景画像 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/entry-apply-hero.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />
        {/* 暗めのオーバーレイ */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(20,20,30,0.55)" }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <ShurikenIn>
            <p className="text-xs font-semibold tracking-[0.3em] text-[#E67376] uppercase mb-3">
              Recruit / Entry Form
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6"
              style={{ fontFamily: "var(--font-kaisei-tokumin)", fontWeight: 800 }}
            >
              エントリーフォーム
            </h1>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-[1px] w-16 bg-[#E67376]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#E67376]" />
              <div className="h-[1px] w-16 bg-[#E67376]" />
            </div>
          </ShurikenIn>
          <p className="text-white/60 text-sm md:text-base leading-8 max-w-xl mx-auto">
            ご応募いただきありがとうございます。<br />
            以下のフォームにご記入の上、ご送信ください。
          </p>
        </div>
      </section>

      {/* ─── フォームエリア ─── */}
      <section className="bg-[#fdf8f8] py-20 min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-6">

          {/* ── ステップ：入力 ── */}
          {step === "input" && (
            <FadeIn>
              <div className="bg-white rounded-2xl shadow-sm border border-[#f0e0e0] p-8 md:p-12">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  応募情報のご入力
                </h2>
                <p className="text-sm text-gray-500 mb-8">
                  <span className="text-[#E67376]">*</span> は必須項目です
                </p>

                <form onSubmit={handleToConfirm} noValidate className="space-y-7">

                  {/* お名前 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      お名前 <span className="text-[#E67376] ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="例：山田 太郎"
                      className={inputCls(errors.name)}
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  {/* フリガナ */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      フリガナ <span className="text-[#E67376] ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="kana"
                      value={form.kana}
                      onChange={handleChange}
                      placeholder="例：ヤマダ タロウ"
                      className={inputCls(errors.kana)}
                    />
                    {errors.kana && <p className="mt-1.5 text-xs text-red-500">{errors.kana}</p>}
                  </div>

                  {/* 性別 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      性別 <span className="text-[#E67376] ml-1">*</span>
                    </label>
                    <div className="flex gap-6">
                      {["男性", "女性", "その他"].map((g) => (
                        <label key={g} className="flex items-center gap-2 cursor-pointer group">
                          <div className="relative w-5 h-5 flex-shrink-0">
                            <input
                              type="radio"
                              name="gender"
                              value={g}
                              checked={form.gender === g}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                form.gender === g ? "border-[#E67376]" : "border-gray-300 group-hover:border-[#E67376]"
                              }`}
                            >
                              {form.gender === g && (
                                <div className="w-2.5 h-2.5 rounded-full bg-[#E67376]" />
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-gray-700">{g}</span>
                        </label>
                      ))}
                    </div>
                    {errors.gender && <p className="mt-1.5 text-xs text-red-500">{errors.gender}</p>}
                  </div>

                  {/* ご年齢 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ご年齢 <span className="text-[#E67376] ml-1">*</span>
                    </label>
                    <div className="flex items-center gap-2 w-36">
                      <input
                        type="number"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        placeholder="例：28"
                        min={15}
                        max={99}
                        className={inputCls(errors.age)}
                      />
                      <span className="text-sm text-gray-500 whitespace-nowrap">歳</span>
                    </div>
                    {errors.age && <p className="mt-1.5 text-xs text-red-500">{errors.age}</p>}
                  </div>

                  {/* ご住所 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      ご住所 <span className="text-[#E67376] ml-1">*</span>
                    </label>

                    {/* 郵便番号 */}
                    <div>
                      <p className="text-xs text-gray-400 mb-1.5">郵便番号</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="zip"
                          value={form.zip}
                          onChange={handleChange}
                          placeholder="例：170-0013"
                          maxLength={8}
                          className={`flex-1 ${inputCls(errors.zip)}`}
                        />
                        <button
                          type="button"
                          onClick={handleZipSearch}
                          disabled={zipLoading}
                          className="px-4 py-3 text-xs font-semibold rounded-lg text-white whitespace-nowrap transition-opacity hover:opacity-80 disabled:opacity-50"
                          style={{ background: "linear-gradient(135deg, #E67376, #C9A84C)" }}
                        >
                          {zipLoading ? "検索中…" : "住所を検索"}
                        </button>
                      </div>
                      {errors.zip && <p className="mt-1.5 text-xs text-red-500">{errors.zip}</p>}
                    </div>

                    {/* 都道府県 */}
                    <div>
                      <p className="text-xs text-gray-400 mb-1.5">都道府県</p>
                      <div className="relative">
                        <select
                          name="prefecture"
                          value={form.prefecture}
                          onChange={handleChange}
                          className={selectCls(errors.prefecture)}
                        >
                          <option value="">選択してください</option>
                          {PREFECTURES.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {errors.prefecture && <p className="mt-1.5 text-xs text-red-500">{errors.prefecture}</p>}
                    </div>

                    {/* 市区町村 */}
                    <div>
                      <p className="text-xs text-gray-400 mb-1.5">市区町村・番地</p>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="例：豊島区東池袋1-34-5"
                        className={inputCls(errors.city)}
                      />
                      {errors.city && <p className="mt-1.5 text-xs text-red-500">{errors.city}</p>}
                    </div>

                    {/* 建物名・部屋番号 */}
                    <div>
                      <p className="text-xs text-gray-400 mb-1.5">建物名・部屋番号（任意）</p>
                      <input
                        type="text"
                        name="addressRest"
                        value={form.addressRest}
                        onChange={handleChange}
                        placeholder="例：いちご東池袋ビル 601号室"
                        className={inputCls()}
                      />
                    </div>
                  </div>

                  {/* 電話番号 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      電話番号 <span className="text-[#E67376] ml-1">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="例：090-0000-0000"
                      className={inputCls(errors.phone)}
                    />
                    {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
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
                      onChange={handleChange}
                      placeholder="例：info@example.com"
                      autoComplete="email"
                      className={inputCls(errors.email)}
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  {/* メールアドレス確認 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      メールアドレス（確認用） <span className="text-[#E67376] ml-1">*</span>
                    </label>
                    <input
                      type="email"
                      name="emailConfirm"
                      value={form.emailConfirm}
                      onChange={handleChange}
                      placeholder="もう一度入力してください"
                      autoComplete="off"
                      onPaste={(e) => e.preventDefault()}
                      className={inputCls(errors.emailConfirm)}
                    />
                    {errors.emailConfirm && <p className="mt-1.5 text-xs text-red-500">{errors.emailConfirm}</p>}
                  </div>

                  {/* 区切り */}
                  <div className="border-t border-gray-100 pt-2">
                    <p className="text-xs text-gray-400 tracking-wider">学歴情報（任意）</p>
                  </div>

                  {/* 最終学歴学校名 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      最終学歴学校名
                    </label>
                    <input
                      type="text"
                      name="school"
                      value={form.school}
                      onChange={handleChange}
                      placeholder="例：○○大学"
                      className={inputCls()}
                    />
                  </div>

                  {/* 学部学科 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      学部学科
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                      placeholder="例：情報工学部 情報システム学科"
                      className={inputCls()}
                    />
                  </div>

                  {/* 卒業年月 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      卒業年月
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1">
                        <select
                          name="graduationYear"
                          value={form.graduationYear}
                          onChange={handleChange}
                          className={selectCls()}
                        >
                          <option value="">年</option>
                          {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">年</span>
                      <div className="relative w-28">
                        <select
                          name="graduationMonth"
                          value={form.graduationMonth}
                          onChange={handleChange}
                          className={selectCls()}
                        >
                          <option value="">月</option>
                          {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">月</span>
                    </div>
                  </div>

                  {/* 区切り */}
                  <div className="border-t border-gray-100 pt-2">
                    <p className="text-xs text-gray-400 tracking-wider">その他</p>
                  </div>

                  {/* その他特記事項 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      その他特記事項
                    </label>
                    <textarea
                      name="remarks"
                      value={form.remarks}
                      onChange={handleChange}
                      rows={5}
                      placeholder="ご質問、ご要望、自己PRなど自由にご記入ください"
                      className={`${inputCls()} resize-none`}
                    />
                  </div>

                  {/* プライバシーポリシー */}
                  <div className="rounded-xl border border-[#f0e0e0] bg-[#fdf8f8] p-5">
                    <p className="text-xs text-gray-500 leading-6 mb-4">
                      入力された個人情報は個人情報保護法に基づき取り扱われます。
                      <Link href="/privacy" className="text-[#E67376] underline underline-offset-2 hover:opacity-70 transition-opacity mx-1" target="_blank" rel="noopener noreferrer">
                        個人情報保護方針
                      </Link>
                      に同意いただける場合は以下にチェックを入れてください。
                    </p>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex-shrink-0">
                        <input
                          type="checkbox"
                          name="agreed"
                          checked={form.agreed}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            form.agreed ? "bg-[#E67376] border-[#E67376]" : "bg-white border-gray-300 group-hover:border-[#E67376]"
                          }`}
                        >
                          {form.agreed && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        個人情報保護方針に同意する
                      </span>
                    </label>
                    {errors.agreed && <p className="mt-2 text-xs text-red-500">{errors.agreed}</p>}
                  </div>

                  {/* 確認ボタン */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg active:scale-[0.99]"
                      style={{ background: "linear-gradient(135deg, #E67376, #C9A84C)" }}
                    >
                      ENTRY内容を確認する →
                    </button>
                  </div>

                </form>
              </div>
            </FadeIn>
          )}

          {/* ── ステップ：確認 ── */}
          {step === "confirm" && (
            <FadeIn>
              <div className="bg-white rounded-2xl shadow-sm border border-[#f0e0e0] p-8 md:p-12">
                <h2 className="text-xl font-bold text-gray-900 mb-1">入力内容の確認</h2>
                <p className="text-sm text-gray-500 mb-8">
                  以下の内容でエントリーします。ご確認ください。
                </p>

                <div className="divide-y divide-gray-100">
                  {confirmFields.map(({ key, label }) => {
                    const val = getConfirmValue(key);
                    return (
                      <div key={key} className="flex gap-6 py-4">
                        <span className="text-xs font-semibold text-gray-400 w-32 shrink-0 pt-0.5 leading-6">
                          {label}
                        </span>
                        <span className="text-sm text-gray-800 leading-7 whitespace-pre-wrap break-all flex-1">
                          {val || <span className="text-gray-300">未入力</span>}
                        </span>
                      </div>
                    );
                  })}
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
                    className="flex-1 py-4 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg active:scale-[0.99] disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #E67376, #C9A84C)" }}
                  >
                    {submitting ? "送信中…" : "エントリーを送信する"}
                  </button>
                </div>
              </div>
            </FadeIn>
          )}

          {/* ── ステップ：完了 ── */}
          {step === "complete" && (
            <FadeIn>
              <div className="bg-white rounded-2xl shadow-sm border border-[#f0e0e0] p-8 md:p-12 text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #E67376, #C9A84C)" }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2
                  className="text-2xl font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "var(--font-kaisei-tokumin)", fontWeight: 800 }}
                >
                  エントリーを受け付けました
                </h2>
                <p className="text-sm text-gray-500 leading-8 mb-10">
                  ご応募いただきありがとうございます。<br />
                  内容を確認の上、担当者よりご連絡いたします。<br />
                  しばらくお待ちください。
                </p>
                <Link
                  href="/entry"
                  className="inline-block px-8 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                  style={{ background: "linear-gradient(135deg, #E67376, #C9A84C)" }}
                >
                  採用情報へ戻る
                </Link>
              </div>
            </FadeIn>
          )}

        </div>
      </section>

      {/* ─── フッターバー ─── */}
      <footer
        className="py-10 text-center"
        style={{
          background: "linear-gradient(160deg, #1a1a2e 0%, #2d1f2f 100%)",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
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
