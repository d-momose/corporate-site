import type { Metadata } from "next";
import { Noto_Sans_JP, Yuji_Syuku, Kaisei_Tokumin } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, COMPANY } from "@/lib/seo";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const yujiSyuku = Yuji_Syuku({
  variable: "--font-yuji-syuku",
  subsets: ["latin"],
  weight: "400",
});

const kaiseiTokumin = Kaisei_Tokumin({
  variable: "--font-kaisei-tokumin",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Delight株式会社 | 喜びが、次の喜びを生む。",
    template: "%s | Delight株式会社",
  },
  description:
    "一人ひとりのエンジニアが持つ無限の可能性を信じ、その才能が最大限に輝くための舞台を創り出す企業です。Web開発・インフラ・AIシステム開発でお客様のビジネスを支援します。",
  keywords: [
    "Delight株式会社",
    "ITエンジニア",
    "Web開発",
    "インフラ開発",
    "AIシステム開発",
    "エンジニア採用",
    "フルリモート",
    "高還元",
  ],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: COMPANY.name,
    title: "Delight株式会社 | 喜びが、次の喜びを生む。",
    description:
      "一人ひとりのエンジニアが持つ無限の可能性を信じ、その才能が最大限に輝くための舞台を創り出す企業です。",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "Delight株式会社" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Delight株式会社 | 喜びが、次の喜びを生む。",
    description:
      "一人ひとりのエンジニアが持つ無限の可能性を信じ、その才能が最大限に輝くための舞台を創り出す企業です。",
    images: ["/images/og-default.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    url: COMPANY.url,
    logo: COMPANY.logo,
    description: COMPANY.description,
    foundingDate: COMPANY.foundingDate,
    address: {
      "@type": "PostalAddress",
      ...COMPANY.address,
    },
    knowsAbout: COMPANY.knowsAbout,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: COMPANY.contactEmail,
      availableLanguage: "Japanese",
    },
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY.name,
    url: COMPANY.url,
    description: COMPANY.description,
    publisher: { "@type": "Organization", name: COMPANY.name },
    inLanguage: "ja-JP",
  };

  return (
    <html lang="ja">
      <head>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={webSiteJsonLd} />
      </head>
      <body className={`${notoSansJP.variable} ${yujiSyuku.variable} ${kaiseiTokumin.variable} font-sans antialiased`}>
        <LoadingScreen />
        <Header />
        {children}
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
