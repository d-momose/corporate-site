import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "エントリーフォーム | Delight株式会社",
  description:
    "Delight株式会社へのエントリーフォームです。ご応募いただきありがとうございます。",
};

export default function EntryApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
