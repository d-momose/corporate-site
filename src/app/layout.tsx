import type { Metadata } from "next";
import { Noto_Sans_JP, Yuji_Syuku, Kaisei_Tokumin } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollToTopButton from "@/components/ScrollToTopButton";

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
  title: "Delight株式会社",
  description: "一人ひとりのエンジニアが持つ無限の可能性を信じ、その才能が最大限に輝くための舞台を創り出す企業です。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
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
