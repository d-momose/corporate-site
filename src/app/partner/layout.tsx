import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, COMPANY } from "@/lib/seo";

const pageUrl = `${SITE_URL}/partner`;

export const metadata: Metadata = {
  title: "パートナー募集",
  description:
    "Delight株式会社のパートナー募集ページ。ITソリューション・AI領域での協業をご希望のパートナー企業・フリーランスの方はお気軽にご連絡ください。",
  keywords: ["パートナー募集", "協業", "SES", "フリーランス", "Delight株式会社"],
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "パートナー募集 | Delight株式会社",
    description:
      "ITソリューション・AI領域での協業をご希望のパートナー企業・フリーランスの方はお気軽にご連絡ください。",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "パートナー募集 | Delight株式会社" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "パートナー募集 | Delight株式会社",
    description: "ITソリューション・AI領域での協業をご希望のパートナー企業・フリーランスの方はお気軽にどうぞ。",
    images: ["/images/og-default.png"],
  },
  alternates: { canonical: pageUrl },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "パートナー募集", item: pageUrl },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
