"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { processSteps } from "@/lib/content";

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden border-t border-line/60 py-28 md:py-40"
    >
      <div className="shell relative">
        {/* Header */}
        <Reveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-accent/60" />
              <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-muted/80 font-medium">
                How It Works
              </span>
            </div>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold text-ink tracking-[-0.035em] leading-[0.95]">
              From ambition<br />
              <span className="text-accent">to execution.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.7] text-muted/90 tracking-[-0.005em]">
              We evaluate where you stand, match the right Lab stage, assign your team, and execute with complete transparency.
            </p>
          </div>
        </Reveal>

        {/* Process Steps - Editorial staggered layout */}
        <div className="relative mt-20 md:mt-28">
          {/* Animated vertical spine */}
          <motion.div
            aria-hidden
            style={{ scaleY: spineScale }}
            className="absolute left-6 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-accent via-accent/60 to-transparent md:left-8"
          />

          <div className="flex flex-col gap-14 md:gap-20">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={i * 0.06}>
                  <div className="relative grid gap-8 pl-16 md:grid-cols-[auto_1fr] md:gap-12 md:pl-24">
                    {/* Node icon */}
                    <div className="absolute left-0 top-1 flex size-12 items-center justify-center rounded-2xl border border-line/60 bg-surface/80 backdrop-blur-sm md:size-16 md:rounded-3xl">
                      <Icon className="size-5 text-accent md:size-6" />
                    </div>

                    {/* Content */}
                    <div className="max-w-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-accent/70 font-medium">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px w-6 bg-line/60" />
                      </div>
                      <h3 className="text-[1.5rem] md:text-[1.8rem] font-semibold text-ink tracking-[-0.025em] leading-[1.1]">
                        {step.title}
                      </h3>
                      <p className="mt-4 text-[1rem] leading-[1.75] text-muted tracking-[-0.005em]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
