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
    offset: ["start 0.85", "start 0.35"],
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 md:py-48"
    >
      <div className="shell relative">
        <p className="text-[0.65rem] tracking-[0.3em] uppercase text-muted/40 font-medium mb-16">
          Core belief
        </p>

        <p className="max-w-5xl text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.0] tracking-[-0.04em] text-ink">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
            const clean = word.toLowerCase().replace(/[^a-z]/g, "");
            const isAccent = ACCENT.has(clean);
            return (
              <motion.span
                key={`${word}-${i}`}
                style={{ opacity }}
                className={isAccent ? "text-accent" : undefined}
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
