"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Check } from "lucide-react";

const statement =
  "We don't work with everyone. We work where we believe we can win.";
const words = statement.split(" ");

const principles = [
  "A free entry point on every Lab — we prove fit first",
  "You own all code, assets, and systems. No lock-in",
  "Weekly, fully-tracked execution. No black box",
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
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={accent ? "text-[color:var(--color-accent-2)]" : undefined}
    >
      {children}{" "}
    </motion.span>
  );
}

/**
 * Manifesto strip — a darker band that breaks the rhythm and states the brand's
 * point of view. The line resolves word-by-word as it crosses the viewport,
 * driven by scroll progress (opacity only). The single cold signal-blue moment.
 */
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
          <span className="h-px w-8" style={{ background: "var(--color-accent-2)" }} />
          <span className="overline">Our bias</span>
        </div>

        <p className="mt-8 max-w-4xl font-display text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.1] tracking-[-0.02em] text-ink [text-wrap:balance]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word
                key={`${word}-${i}`}
                progress={scrollYProgress}
                range={[start, end]}
                accent={word === "win."}
              >
                {word}
              </Word>
            );
          })}
        </p>

        <ul className="mt-14 grid gap-4 border-t border-line pt-8 md:grid-cols-3">
          {principles.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <Check
                className="mt-0.5 size-4 shrink-0"
                strokeWidth={2.5}
                style={{ color: "var(--color-accent-2)" }}
              />
              <span className="text-[0.95rem] leading-relaxed text-muted">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
