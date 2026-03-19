import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "採用情報 | Delight株式会社",
  description:
    "Delight株式会社の採用情報ページ。エンジニアが主役の職場で、あなたの可能性を最大限に発揮しませんか。高還元・充実した福利厚生で一緒に喜びを創りましょう。",
};

export default function EntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
