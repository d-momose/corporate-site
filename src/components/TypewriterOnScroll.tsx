"use client";

import { useRef, useEffect, useState } from "react";

export default function TypewriterOnScroll({
  text,
  className,
  speed = 75,
  delay = 0,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setStarted(true); observer.disconnect(); }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    setShowCursor(true);
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setTyped(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(iv);
          setShowCursor(false);
        }
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [started, text, speed, delay]);

  return (
    <span ref={ref} className={className} style={{ position: "relative" }}>
      {started ? typed : <span className="invisible">{text}</span>}
      {showCursor && (
        <span style={{ position: "absolute", animation: "cursorBlink 0.7s step-end infinite" }}>|</span>
      )}
    </span>
  );
}
