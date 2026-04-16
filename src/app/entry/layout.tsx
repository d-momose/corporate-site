import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, COMPANY } from "@/lib/seo";

const pageUrl = `${SITE_URL}/entry`;

export const metadata: Metadata = {
  title: "採用情報",
  description:
    "Delight株式会社の採用情報ページ。エンジニアが主役の職場で、あなたの可能性を最大限に発揮しませんか。還元率80%・月残業5時間以下・フルリモート・年間130日以上の休日で一緒に喜びを創りましょう。",
  keywords: [
    "エンジニア採用",
    "フルリモート",
    "高還元率",
    "ITエンジニア求人",
    "東京",
    "Delight株式会社",
    "中途採用",
  ],
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "採用情報 | Delight株式会社",
    description:
      "還元率80%・フルリモート・年間130日以上の休日。エンジニアが主役のDelight株式会社で一緒に喜びを創りませんか。",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "採用情報 | Delight株式会社" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "採用情報 | Delight株式会社",
    description: "還元率80%・フルリモート・年間130日以上の休日。エンジニアが主役の会社です。",
    images: ["/images/og-default.png"],
  },
  alternates: { canonical: pageUrl },
};

export default function EntryLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "採用情報", item: pageUrl },
    ],
  };

  const jobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "システムエンジニア（中途採用）",
    description:
      "Delight株式会社では、ITエンジニアを募集しています。還元率80%・フルリモート・月平均残業5時間以下・年間130日以上の休日など、エンジニアファーストの環境を提供しています。",
    datePosted: "2024-01-01",
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: COMPANY.name,
      sameAs: COMPANY.url,
      logo: COMPANY.logo,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        ...COMPANY.address,
      },
    },
    jobLocationType: "TELECOMMUTE",
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "JPY",
      value: {
        "@type": "QuantitativeValue",
        minValue: 400000,
        maxValue: 1000000,
        unitText: "MONTH",
      },
    },
    skills: "TypeScript, React, Next.js, Go, AWS, GCP, Terraform, Kubernetes",
    workHours: "09:00〜18:00（月平均残業5時間以下）",
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={jobPostingJsonLd} />
      {children}
    </>
  );
}
