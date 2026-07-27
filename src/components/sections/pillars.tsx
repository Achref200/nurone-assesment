"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { pillars } from "@/lib/content";

export function Pillars() {
  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.9", "start 0.45"],
  });

  const headingText = "The problem is never the idea.";
  const words = headingText.split(" ");

  return (
    <section id="system" className="relative scroll-mt-24 py-28 md:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 dot-grid-sm opacity-30" />
        <span className="absolute top-1/4 right-0 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.04),transparent_60%)]" />
        <span className="absolute bottom-0 left-0 h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.03),transparent_60%)]" />
      </div>
      <div className="shell relative">
        <div ref={headingRef} className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
          <div className="flex flex-col justify-end pb-1">
            <p className="overline text-accent/60 mb-5">
              The Problem We Solve
            </p>
            <p className="text-[0.9rem] leading-[1.75] text-muted/50">
              Most teams fail not from lack of vision,
              but from the absence of the right system to carry it.
            </p>
          </div>

          <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-bold text-ink tracking-[-0.04em] leading-[1.0]">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              const opacity = useTransform(scrollYProgress, [start, end], [0.08, 1]);
              return (
                <motion.span key={i} style={{ opacity }}>
                  {word}{" "}
                </motion.span>
              );
            })}
            <br />
            <span className="text-accent italic">It&apos;s the system.</span>
          </h2>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-12">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            const span = i === 0 ? "md:col-span-5" : i === 1 ? "md:col-span-4" : "md:col-span-3";
            const height = i === 0 ? "min-h-[22rem]" : i === 1 ? "min-h-[20rem]" : "min-h-[18rem]";
            return (
              <motion.article
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-surface p-7 md:p-8 transition-all duration-700 hover:border-white/[0.14] hover:bg-surface-2 ${span} ${height}`} style={{ boxShadow: '0 2px 24px rgba(0,0,0,0.3)' }}
              >
                <div
                  aria-hidden
                  className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.1),transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />

                <div className="flex items-start justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] transition-all duration-500 group-hover:border-accent/25 group-hover:bg-accent/5">
                    <Icon className="size-[18px] text-accent/55 group-hover:text-accent/75 transition-colors duration-500" />
                  </div>
                  <span className="text-[0.55rem] font-medium tracking-[0.22em] text-white/[0.12] mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-7 text-[1.2rem] font-semibold text-ink tracking-[-0.02em] leading-[1.25]">
                  {pillar.title}
                </h3>

                <p className="mt-3 flex-1 text-[0.85rem] leading-[1.75] text-muted/55 tracking-[-0.005em]">
                  {pillar.description}
                </p>

                <div className="mt-6 flex items-end justify-between pt-5">
                  <span className="text-[0.65rem] uppercase tracking-[0.14em] text-white/[0.18]">
                    {pillar.metricLabel}
                  </span>
                  <span className="text-[1.4rem] font-bold text-ink/20 tracking-[-0.02em] group-hover:text-accent/60 transition-colors duration-500">
                    {pillar.metric}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
