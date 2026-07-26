"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { processSteps } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.55"],
  });
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const headOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.96, 1],
    [0, 1, 1, 0],
  );

  return (
    <section
      id="process"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden border-t border-line py-24 md:py-32"
    >
      <div className="shell relative">
        <SectionHeading
          eyebrow="How It Works"
          title={
            <>
              A clear path from{" "}
              <span className="font-serif italic font-normal text-accent">ambition</span> to market execution.
            </>
          }
          description="First we evaluate where you stand. Then we select the matching Lab stage, assign your specialized team, and execute with weekly transparency."
        />

        <div className="relative mt-16 md:mt-24">
          {/* Static central spine track */}
          <span
            aria-hidden
            className="absolute bottom-0 left-[22px] top-0 w-px bg-line md:left-1/2 md:-translate-x-1/2"
          />
          {/* Animated scroll spine fill */}
          <motion.span
            aria-hidden
            style={{ scaleY: spineScale }}
            className="absolute bottom-0 left-[22px] top-0 w-px origin-top bg-gradient-to-b from-accent via-accent to-accent-2 md:left-1/2 md:-translate-x-1/2"
          />
          {/* Laser pulse head riding the spine */}
          <motion.span
            aria-hidden
            style={{ top: headTop, opacity: headOpacity }}
            className="absolute left-[22px] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_20px_5px_var(--accent-glow)] md:left-1/2"
          />

          <ol className="flex flex-col gap-12 md:gap-16">
            {processSteps.map((step, i) => {
              const onLeft = i % 2 === 0;
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="relative md:grid md:grid-cols-2 md:items-center md:gap-x-16"
                >
                  {/* Central Node Badge */}
                  <span
                    aria-hidden
                    className="absolute left-[22px] top-1 z-10 inline-flex size-12 -translate-x-1/2 items-center justify-center rounded-2xl border border-line bg-surface text-accent shadow-lg md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                  >
                    <Icon className="size-6" />
                  </span>

                  {/* Content Card */}
                  <Reveal
                    x={onLeft ? -24 : 24}
                    y={14}
                    className={cn(
                      "pl-16 md:pl-0",
                      onLeft
                        ? "md:col-start-1 md:pr-16 md:text-right"
                        : "md:col-start-2 md:pl-16",
                    )}
                  >
                    <div className="group relative rounded-3xl border border-line bg-surface/80 p-8 backdrop-blur-xl transition-all duration-300 hover:border-accent/40">
                      <div
                        className={cn(
                          "flex items-center gap-2",
                          onLeft && "md:justify-end",
                        )}
                      >
                        <span className="font-mono text-xs font-medium text-accent uppercase tracking-wider">
                          Phase 0{i + 1}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-xl font-medium text-ink md:text-2xl">
                        {step.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-3 max-w-md text-base leading-relaxed text-muted font-normal",
                          onLeft && "md:ml-auto",
                        )}
                      >
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
