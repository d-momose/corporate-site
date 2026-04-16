import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, COMPANY } from "@/lib/seo";

const pageUrl = `${SITE_URL}/contact`;

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "Delight株式会社へのお問い合わせはこちらから。ITソリューション・AI業務効率化支援・Web開発に関するご相談をお気軽にどうぞ。数日以内にご返信いたします。",
  keywords: ["お問い合わせ", "相談", "Delight株式会社", "ITコンサルティング", "AI開発"],
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "お問い合わせ | Delight株式会社",
    description:
      "Delight株式会社へのお問い合わせはこちらから。ITソリューション・AI業務効率化支援に関するご相談をお気軽にどうぞ。",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "お問い合わせ | Delight株式会社" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "お問い合わせ | Delight株式会社",
    description: "Delight株式会社へのお問い合わせはこちらから。",
    images: ["/images/og-default.png"],
  },
  alternates: { canonical: pageUrl },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "お問い合わせ", item: pageUrl },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "まずは相談だけでも大丈夫ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、もちろんです。費用・スケジュール・技術的な疑問など、お気軽にご相談ください。",
        },
      },
      {
        "@type": "Question",
        name: "費用はどのくらいかかりますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ご要件やプロジェクト規模により異なります。まずはお問い合わせフォームからご連絡いただき、詳細をお聞かせください。お見積もりは無料です。",
        },
      },
      {
        "@type": "Question",
        name: "返信までどのくらいかかりますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "通常、数日以内にご返信いたします。お急ぎの場合はその旨をお問い合わせ内容にご記載ください。",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      {children}
    </>
  );
}
