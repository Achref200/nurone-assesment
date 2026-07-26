"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { pillars } from "@/lib/content";

export function Pillars() {
  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.9", "start 0.45"],
  });

  const headingText = "Ambition breaks in the system behind it.";
  const words = headingText.split(" ");

  return (
    <section id="system" className="relative scroll-mt-24 py-28 md:py-40">
      <div className="shell relative">
        {/* Header with scroll text reveal */}
        <div ref={headingRef}>
          <Reveal>
            <p className="text-[0.7rem] tracking-[0.25em] uppercase text-muted/60 font-medium mb-8">
              The Problem We Solve
            </p>
          </Reveal>

          <p className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold text-ink tracking-[-0.035em] leading-[0.95] max-w-3xl">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              const opacity = useTransform(
                scrollYProgress,
                [start, end],
                [0.1, 1],
              );
              const isAccent =
                word.toLowerCase().includes("system") ||
                word.toLowerCase().includes("behind");
              return (
                <motion.span
                  key={i}
                  style={{ opacity }}
                  className={isAccent ? "text-accent" : undefined}
                >
                  {word}{" "}
                </motion.span>
              );
            })}
          </p>
        </div>

        {/* Pillars - Artistic cards with subtle glow */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.id} delay={i * 0.1}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.015] p-8 transition-all duration-700 hover:border-accent/20 md:p-10">
                  {/* Subtle gradient overlay on hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(600px circle at 50% 0%, rgba(59,130,246,0.06), transparent 60%)",
                    }}
                  />

                  {/* Number marker */}
                  <span className="text-[4rem] font-bold text-white/[0.04] leading-none tracking-[-0.05em] select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div className="mt-6 flex size-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] transition-all duration-500 group-hover:border-accent/30 group-hover:bg-accent/5">
                    <Icon className="size-5 text-muted/70 transition-colors duration-500 group-hover:text-accent" />
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-[1.3rem] font-bold text-ink tracking-[-0.02em] leading-[1.15]">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 flex-1 text-[0.95rem] leading-[1.7] text-muted/80 tracking-[-0.005em]">
                    {pillar.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
