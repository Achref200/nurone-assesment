"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { processSteps } from "@/lib/content";

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
    offset: ["start 0.9", "start 0.45"],
  });

  const headingWords = "From ambition to execution.".split(" ");

  return (
    <section
      id="process"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden border-t border-white/[0.05] py-28 md:py-40"
    >
      <div className="shell relative">
        {/* Header with scroll text reveal */}
        <div ref={headingRef} className="mb-24 md:mb-32">
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-muted/40 font-medium mb-8">
            How it works
          </p>

          <p className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold text-ink tracking-[-0.04em] leading-[0.93] max-w-xl">
            {headingWords.map((word, i) => {
              const start = i / headingWords.length;
              const end = start + 1 / headingWords.length;
              const opacity = useTransform(
                headingProgress,
                [start, end],
                [0.1, 1],
              );
              return (
                <motion.span key={i} style={{ opacity }}>
                  {word}{" "}
                </motion.span>
              );
            })}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Animated spine */}
          <motion.div
            aria-hidden
            style={{ scaleY: spineScale }}
            className="absolute left-[1.5rem] top-0 bottom-0 w-px origin-top bg-gradient-to-b from-accent/60 via-accent/20 to-transparent"
          />

          <div className="flex flex-col gap-0">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.05,
                  }}
                  viewport={{ once: true, margin: "-10%" }}
                  className="relative grid gap-8 pl-16 py-12 border-b border-white/[0.04] last:border-0 md:grid-cols-[1fr_2fr] md:gap-16 md:pl-20"
                >
                  {/* Node */}
                  <div className="absolute left-0 top-12 flex size-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-void">
                    <Icon className="size-4 text-accent/70" />
                  </div>

                  {/* Index + Title */}
                  <div className="flex flex-col justify-center">
                    <span className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-muted/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 text-[1.5rem] font-bold text-ink tracking-[-0.025em] leading-[1.1]">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-[0.97rem] leading-[1.75] text-muted/80 tracking-[-0.005em]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
