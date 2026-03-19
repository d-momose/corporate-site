import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | Delight株式会社",
  description:
    "Delight株式会社へのお問い合わせはこちらから。ITソリューション・AI業務効率化支援に関するご相談をお気軽にどうぞ。",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
