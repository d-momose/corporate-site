import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "パートナー募集 | Delight株式会社",
  description:
    "Delight株式会社のパートナー募集ページ。ITソリューション・AI領域での協業をご希望のパートナー企業・フリーランスの方はお気軽にご連絡ください。",
};

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
