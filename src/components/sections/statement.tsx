"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Check } from "lucide-react";

const statement =
  "Ambition rarely dies in the idea. It breaks in the system behind it.";
const words = statement.split(" ");

const principles = [
  "Free entry point on every Lab — we prove fit first before any commitment.",
  "100% IP & code ownership. Zero vendor lock-in or proprietary traps.",
  "Transparent weekly sprint logs. Full visibility into every line & hour.",
];

function Word({
  progress,
  range,
  children,
  accent,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={accent ? "font-serif italic text-accent font-normal" : undefined}
    >
      {children}{" "}
    </motion.span>
  );
}

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-line bg-surface"
    >
      <div
        aria-hidden
        className="glow left-[-6rem] top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 opacity-70"
        style={{ background: "rgba(85,123,255,0.18)" }}
      />

      <div className="shell relative py-20 md:py-28">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />
          <span className="overline text-accent">Our Core Bias</span>
        </div>

        <p className="mt-8 max-w-4xl font-display text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.1] tracking-[-0.025em] text-ink [text-wrap:balance]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            const isAccent = word.toLowerCase().includes("system");
            return (
              <Word
                key={`${word}-${i}`}
                progress={scrollYProgress}
                range={[start, end]}
                accent={isAccent}
              >
                {word}
              </Word>
            );
          })}
        </p>

        <ul className="mt-14 grid gap-5 border-t border-line pt-8 md:grid-cols-3">
          {principles.map((p) => (
            <li key={p} className="flex items-start gap-3 rounded-2xl border border-line bg-white/[0.02] p-4 backdrop-blur-sm">
              <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Check className="size-3.5" strokeWidth={2.5} />
              </span>
              <span className="text-[0.92rem] leading-relaxed text-muted">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
