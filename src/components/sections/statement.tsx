"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const statement =
  "Ambition rarely dies in the idea. It breaks in the system behind it.";
const words = statement.split(" ");

const principles = [
  "Free entry point on every Lab — we prove fit first before any commitment.",
  "100% IP & code ownership. Zero vendor lock-in or proprietary traps.",
  "Transparent weekly sprint logs. Full visibility into every line & hour.",
];

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-line/60 bg-surface/30 py-24 md:py-32"
    >
      <div className="shell relative">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />
          <span className="font-mono text-xs tracking-wider uppercase text-accent font-medium">
            Our Core Principle
          </span>
        </div>

        <p className="mt-8 max-w-4xl font-display text-[clamp(2.2rem,4.8vw,3.8rem)] font-semibold leading-[1.1] tracking-tight text-ink [text-wrap:balance]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
            const isAccent = word.toLowerCase().includes("system");
            return (
              <motion.span
                key={`${word}-${i}`}
                style={{ opacity }}
                className={isAccent ? "text-accent font-semibold" : undefined}
              >
                {word}{" "}
              </motion.span>
            );
          })}
        </p>

        <ul className="mt-14 grid gap-6 border-t border-line/60 pt-10 md:grid-cols-3">
          {principles.map((p) => (
            <li key={p} className="flex items-start gap-3.5 rounded-2xl border border-line/60 bg-surface/50 p-5 backdrop-blur-sm">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
              <span className="text-base leading-relaxed text-muted font-normal">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
