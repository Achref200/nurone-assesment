"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const statement =
  "Ambition rarely dies in the idea. It breaks in the system behind it.";
const words = statement.split(" ");

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-line/60 bg-surface/20 py-28 md:py-40"
    >
      <div className="shell relative">
        <div className="flex items-center gap-3 mb-10">
          <span className="h-px w-10 bg-accent/60" />
          <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-muted/80 font-medium">
            Core Principle
          </span>
        </div>

        <p className="max-w-5xl text-[clamp(2rem,4.5vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.035em] text-ink">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
            const isAccent = word.toLowerCase().includes("system");
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
