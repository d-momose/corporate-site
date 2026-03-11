import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "個人情報保護方針 | Delight株式会社",
  description: "Delight株式会社の個人情報保護方針をご確認いただけます。",
};

const sections = [
  {
    title: "個人情報の取得について",
    content:
      "当社は、個人情報を取得する際には、利用目的を明示したうえで、適法かつ公正な手段により、業務上必要な範囲内で取得します。",
  },
  {
    title: "個人情報の利用および共同利用について",
    content:
      "取得した個人情報は、お客様からご同意をいただいた範囲内で、取得目的の範囲内において利用します。具体的には、業務上のご連絡、サービスに関する情報のご案内、お問い合わせへの対応、その他ご同意をいただいた目的のために利用します。",
  },
  {
    title: "個人情報の第三者への提供について",
    content:
      "当社は、お客様の同意なく個人情報を第三者に提供することはありません。ただし、法令に基づく場合はこの限りではありません。",
  },
  {
    title: "個人情報の開示・訂正等の手続きについて",
    content:
      "お客様ご本人から個人情報の照会・訂正・削除等のご要望があった場合は、合理的な範囲で速やかに対応します。",
  },
  {
    title: "開示等の手数料について",
    content:
      "個人情報の開示等の手続きにあたって手数料が生じる場合は、事前にご案内いたします。",
  },
  {
    title: "法令・規範の遵守について",
    content:
      "当社は、個人情報の取り扱いに関し、日本の法令およびその他の規範を遵守します。",
  },
  {
    title: "安全管理措置について",
    content:
      "当社は、個人情報への不正アクセス、個人情報の紛失・破壊・改ざん・漏えい等を防止するため、施設・設備面での対策や従業員教育など、適切な安全管理措置を講じます。",
  },
  {
    title: "継続的改善について",
    content:
      "当社は、個人情報保護方針を定期的に見直し、法令の変更や業務の実態に応じて継続的に改善していきます。",
  },
  {
    title: "お問い合わせについて",
    content:
      "個人情報の取り扱いに関するお問い合わせは、お問い合わせフォームよりご連絡ください。",
    hasContactLink: true,
  },
];

export default function PrivacyPage() {
  return (
    <main>
      {/* ─── ヒーロー ─── */}
      <section
        className="relative bg-gray-950 pt-36 pb-20"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(230,115,118,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#E67376] uppercase mb-3">
            Privacy Policy
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            個人情報保護方針
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-16 bg-[#E67376]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#E67376]" />
            <div className="h-[1px] w-16 bg-[#E67376]" />
          </div>
        </div>
      </section>

      {/* ─── 本文エリア ─── */}
      <section className="bg-[#f9f9f9] py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">

            {/* 前文 */}
            <p className="text-sm text-gray-600 leading-8 mb-10 pb-10 border-b border-gray-100">
              Delight株式会社（以下「当社」）は、お客様からの信頼を最優先に考え、個人情報を適切に取り扱うことが重要な社会的責務であると認識しております。個人情報保護方針を定め、全社一丸となって取り組んでまいります。
            </p>

            {/* 各条項 */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index} className="flex gap-6">
                  {/* 番号 */}
                  <div className="shrink-0 pt-0.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, #c04050 0%, #E67376 100%)",
                      }}
                    >
                      {index + 1}
                    </div>
                  </div>
                  {/* テキスト */}
                  <div>
                    <h2 className="text-sm font-bold text-gray-900 mb-2 leading-6">
                      {section.title}
                    </h2>
                    <p className="text-sm text-gray-600 leading-8">
                      {section.content}
                      {section.hasContactLink && (
                        <>
                          {" "}
                          <Link
                            href="/contact"
                            className="text-[#E67376] underline underline-offset-2 hover:opacity-70 transition-opacity"
                          >
                            お問い合わせフォーム
                          </Link>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 会社情報 */}
            <div className="mt-12 pt-10 border-t border-gray-100">
              <p className="text-xs text-gray-400 leading-7 text-right">
                Delight株式会社<br />
                〒170-0013 東京都豊島区東池袋 1-34-5<br />
                いちご東池袋ビル 6階
              </p>
            </div>

          </div>

          {/* 戻るリンク */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block text-sm text-gray-500 hover:text-[#E67376] transition-colors underline underline-offset-4"
            >
              ← トップページへ戻る
            </Link>
          </div>
        </div>
      </section>

      {/* ─── フッター ─── */}
      <footer
        className="bg-gray-950 py-10 text-center"
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
