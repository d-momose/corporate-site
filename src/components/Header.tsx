"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "事業内容", href: "/#business" },
  { label: "Delightの強み", href: "/#strength" },
  { label: "代表メッセージ", href: "/#message" },
  { label: "お知らせ", href: "/#news" },
  { label: "会社概要", href: "/#company" },
  { label: "パートナー募集", href: "/partner" },
  { label: "お問い合わせ", href: "/contact" },
];

const ctaItems = [
  { label: "ENTRYはこちら", href: "/entry" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [headerReady, setHeaderReady] = useState(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeaderReady(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.45;
      const companyEl = document.getElementById("company");
      const headerH = 80;

      let light = false;
      if (scrollY > heroThreshold) {
        light = true;
        if (companyEl && scrollY >= companyEl.offsetTop - headerH) {
          light = false;
        }
      }
      setIsLight(light);

      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      setIsVisible(true);
      if (scrollY >= 10) {
        scrollTimer.current = setTimeout(() => setIsVisible(false), 1000);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
    <header
      className="header-enter fixed top-0 left-0 w-full z-[120] bg-transparent"
      style={headerReady ? {
        animation: "none",
        transform: isMenuOpen || !isVisible ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      } : {}}
    >
      <div className="pl-4 pr-4 md:pl-8 md:pr-8 min-[1440px]:pl-16 min-[1440px]:pr-8 h-16 md:h-20 flex items-center justify-between">

        {/* ロゴ */}
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Delight"
            className={`h-9 md:h-10 w-auto object-contain brightness-0 transition-all duration-300 ${isLight ? "" : "invert"}`}
          />
        </Link>

        {/* PC用ナビ */}
        <nav className="hidden min-[1440px]:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-underline text-base font-bold px-3 py-2 whitespace-nowrap transition-colors duration-300 ${isLight ? "text-gray-900 nav-underline-dark" : "text-white"}`}
            >
              {item.label}
            </Link>
          ))}

          <div className={`w-[1px] h-4 mx-2 transition-colors duration-300 ${isLight ? "bg-gray-900/20" : "bg-white/20"}`} />

          {/* 採用情報：常に白背景・黒文字ボタン */}
          {ctaItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-base font-bold px-8 py-2 rounded-full whitespace-nowrap inline-flex items-center justify-center gap-1 transition-all duration-300 hover:scale-105 hover:shadow-lg ${isLight ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
            >
              {item.label} →
            </Link>
          ))}
        </nav>

        {/* ハンバーガーボタン */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`min-[1440px]:hidden p-2 transition-colors duration-300 ${isLight ? "text-gray-900" : "text-white"}`}
          aria-label="メニュー"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

    </header>

      {/* モバイルメニュー：ドロワー */}
      <div
        className={`min-[1440px]:hidden fixed inset-0 z-[110] flex flex-col transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "rgba(30,30,30,0.92)",
          backdropFilter: "blur(6px)",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* ロゴ＋×ボタン */}
        <div className="px-4 pt-7 pb-6 border-b border-white/10 flex items-center justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Delight" className="h-7 brightness-0 invert" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-1 text-white hover:text-[#E67376] transition-colors"
            aria-label="閉じる"
          >
            <X size={22} />
          </button>
        </div>

        {/* ナビゲーション */}
        <nav className="flex-1 flex flex-col items-center justify-center gap-9 pb-12">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-xl font-bold tracking-wide hover:text-[#E67376] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          <div className="w-10 border-t border-white/20 my-1" aria-hidden />
          {ctaItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-xl font-bold tracking-wide hover:text-[#E67376] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
