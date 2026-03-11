"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── 各セクションの背景色 ── */
const COLOR_STOPS = [
  { id: "hero",     color: "#ffffff" },
  { id: "strength", color: "#f3f4f6" },
  { id: "business", color: "#fef6f6" },
  { id: "message",  color: "#ffffff" },
  { id: "company",  color: "#030712" },
];

export default function BackgroundController() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    bg.style.backgroundColor = COLOR_STOPS[0].color;

    const triggers: ScrollTrigger[] = [];

    for (let i = 1; i < COLOR_STOPS.length; i++) {
      const from = COLOR_STOPS[i - 1].color;
      const to   = COLOR_STOPS[i].color;

      const tween = gsap.fromTo(
        bg,
        { backgroundColor: from },
        {
          backgroundColor: to,
          ease: "none",
          scrollTrigger: {
            trigger: `#${COLOR_STOPS[i].id}`,
            start: "top 85%",
            end: "top 15%",
            scrub: true,
            onUpdate(self) {
              // ScrollTrigger インスタンスを後で破棄できるよう保持
              if (!triggers.includes(self)) triggers.push(self);
            },
          },
        }
      );
      // tween に紐付いた ST を取得して管理
      const st = ScrollTrigger.getById(tween.vars.scrollTrigger as string);
      if (st) triggers.push(st);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={bgRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
      }}
    />
  );
}
