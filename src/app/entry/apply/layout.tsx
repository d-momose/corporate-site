import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, COMPANY } from "@/lib/seo";

const pageUrl = `${SITE_URL}/entry/apply`;

export const metadata: Metadata = {
  title: "エントリーフォーム",
  description:
    "Delight株式会社へのエントリーフォームです。ご応募いただきありがとうございます。",
  alternates: { canonical: pageUrl },
  robots: { index: false, follow: true },
};

export default function EntryApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "採用情報", item: `${SITE_URL}/entry` },
      { "@type": "ListItem", position: 3, name: "エントリーフォーム", item: pageUrl },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
