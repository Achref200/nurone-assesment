"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { processSteps } from "@/lib/content";

function StepRow({ step, index }: { step: (typeof processSteps)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "end 0.08"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [-24, 0, 0, -12]);
  const scale = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.97, 1, 1, 0.98]);

  const Icon = step.icon;
  return (
    <motion.div
      ref={ref}
      style={{ opacity, x, scale }}
      className="relative grid gap-8 pl-16 py-12 border-b border-white/[0.04] last:border-0 md:grid-cols-[1fr_2fr] md:gap-16 md:pl-20"
    >
      {/* Node */}
      <div className="absolute left-0 top-12 flex size-12 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.015] transition-colors duration-500 hover:border-accent/20 hover:bg-accent/5">
        <Icon className="size-4 text-accent/50" />
      </div>

      {/* Index + Title */}
      <div className="flex flex-col justify-center">
        <span className="text-[0.6rem] font-medium tracking-[0.22em] uppercase text-muted/30">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-2 text-[1.4rem] font-bold text-ink tracking-[-0.025em] leading-[1.1]">
          {step.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-[0.9rem] leading-[1.8] text-muted/65 tracking-[-0.005em]">
        {step.description}
      </p>
    </motion.div>
  );
}

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headingProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.9", "start 0.4"],
  });

  const headingWords = "From ambition to execution.".split(" ");

  return (
    <section
      id="process"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden py-28 md:py-40"
    >
      {/* Soft background pattern */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 dot-grid-sm opacity-20" />
        <span className="absolute bottom-1/4 right-1/4 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.03),transparent_60%)]" />
      </div>
      <div className="shell relative">
        <div ref={headingRef} className="mb-24 md:mb-32">
          <p className="overline text-muted/30 mb-8">
            How it works
          </p>

          <p className="text-[clamp(2rem,4.5vw,3.8rem)] font-bold text-ink tracking-[-0.04em] leading-[0.93] max-w-xl">
            {headingWords.map((word, i) => {
              const start = i / headingWords.length;
              const end = start + 1 / headingWords.length;
              const opacity = useTransform(
                headingProgress,
                [start, end],
                [0.08, 1],
              );
              const y = useTransform(
                headingProgress,
                [start, end],
                [6, 0],
              );
              return (
                <motion.span key={i} style={{ opacity, y }} className="inline-block">
                  {word}{" "}
                </motion.span>
              );
            })}
          </p>
        </div>

        <div className="relative">
          <motion.div
            aria-hidden
            style={{ scaleY: spineScale }}
            className="absolute left-[1.5rem] top-0 bottom-0 w-px origin-top bg-gradient-to-b from-accent/40 via-accent/10 to-transparent"
          />

          <div className="flex flex-col gap-0">
            {processSteps.map((step, i) => (
              <StepRow key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
