"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const statement =
  "Ambition rarely dies in the idea. It breaks in the system behind it.";
const words = statement.split(" ");

const ACCENT = new Set(["system", "breaks"]);

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.3"],
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 md:py-48"
    >
      {/* Subtle ambient orb */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.05),transparent_60%)]" />
      </div>

      <div className="shell relative">
        <p className="overline text-muted/30 mb-16">
          Core belief
        </p>

        <p className="max-w-5xl text-[clamp(2rem,5vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.04em] text-ink">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            const opacity = useTransform(scrollYProgress, [start, end], [0.06, 1]);
            const y = useTransform(scrollYProgress, [start, end], [8, 0]);
            const clean = word.toLowerCase().replace(/[^a-z]/g, "");
            const isAccent = ACCENT.has(clean);
            return (
              <motion.span
                key={`${word}-${i}`}
                style={{ opacity, y }}
                className={`inline-block ${isAccent ? "text-accent" : undefined}`}
              >
                {word}{" "}
              </motion.span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
