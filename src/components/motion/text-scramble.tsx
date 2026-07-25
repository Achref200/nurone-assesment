"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>-_*+";

type ScrambleProps = {
  text: string;
  className?: string;
  /** ms between decode frames. */
  speed?: number;
  /** "view" decodes once on scroll-in; "hover" re-decodes on pointer enter. */
  trigger?: "view" | "hover";
};

/**
 * Mission-control "decode" effect: the label scrambles through random glyphs
 * and resolves left-to-right. `view` fires once on entry; `hover` re-runs on
 * pointer enter (typewriter feel on nav / links). SSR / reduced-motion render
 * the final text immediately.
 */
export function TextScramble({
  text,
  className,
  speed = 28,
  trigger = "view",
}: ScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef(0);
  const [display, setDisplay] = useState(text);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.clearInterval(intervalRef.current);
    let frame = 0;
    const total = text.length * 3;
    intervalRef.current = window.setInterval(() => {
      frame += 1;
      const revealed = Math.floor(frame / 3);
      const next = text
        .split("")
        .map((ch, i) => {
          if (i < revealed || ch === " ") return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setDisplay(next);
      if (frame >= total) {
        window.clearInterval(intervalRef.current);
        setDisplay(text);
      }
    }, speed);
  }, [text, speed]);

  useEffect(() => {
    if (trigger !== "view") return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        run();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(intervalRef.current);
    };
  }, [trigger, run]);

  useEffect(() => () => window.clearInterval(intervalRef.current), []);

  return (
    <span
      ref={ref}
      className={className}
      onPointerEnter={trigger === "hover" ? run : undefined}
    >
      {display}
    </span>
  );
}

