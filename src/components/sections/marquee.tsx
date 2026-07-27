"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { caseStudies } from "@/lib/content";

const ITEMS = [...caseStudies, ...caseStudies];

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-120, 0]);

  return (
    <section
      ref={ref}
      aria-label="Shipped Systems Index"
      className="relative overflow-hidden py-6 md:py-8 select-none"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-void to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-void to-transparent" />
      </div>
      <motion.div style={{ x: x1 }} className="flex whitespace-nowrap gap-8 items-center">
        {ITEMS.map((study, i) => (
          <span
            key={`a-${study.id}-${i}`}
            className="inline-flex items-center gap-4 shrink-0 group cursor-default"
          >
            <span className="inline-block size-1.5 rounded-full bg-accent/35 group-hover:bg-accent transition-colors duration-500" />
            <span className="text-[0.72rem] font-medium text-muted/35 tracking-[0.2em] uppercase tabular-nums">
              {study.index}
            </span>
            <span className="text-[0.9rem] font-semibold text-ink/45 tracking-[-0.01em] group-hover:text-ink/75 transition-colors duration-500">
              {study.name}
            </span>
            <span className="text-[0.72rem] text-muted/25 tracking-[0.04em] hidden sm:inline">
              {study.category}
            </span>
            <span className="text-white/[0.08] text-[0.7rem] font-extralight select-none mx-2 hidden md:inline">·</span>
          </span>
        ))}
      </motion.div>

      <motion.div style={{ x: x2 }} className="flex whitespace-nowrap gap-8 items-center mt-4">
        {[...ITEMS].reverse().map((study, i) => (
          <span
            key={`b-${study.id}-${i}`}
            className="inline-flex items-center gap-4 shrink-0 group cursor-default"
          >
            <span className="text-white/[0.08] text-[0.7rem] font-extralight select-none mx-2 hidden md:inline">·</span>
            <span className="text-[0.72rem] text-muted/25 tracking-[0.04em] hidden sm:inline">
              {study.category}
            </span>
            <span className="text-[0.9rem] font-semibold text-ink/45 tracking-[-0.01em] group-hover:text-ink/75 transition-colors duration-500">
              {study.name}
            </span>
            <span className="text-[0.72rem] font-medium text-muted/35 tracking-[0.2em] uppercase tabular-nums">
              {study.index}
            </span>
            <span className="inline-block size-1.5 rounded-full bg-accent/35 group-hover:bg-accent transition-colors duration-500" />
          </span>
        ))}
      </motion.div>

    </section>
  );
}
