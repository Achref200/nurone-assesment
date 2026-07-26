"use client";

import { Reveal } from "@/components/ui/reveal";
import { pillars } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

export function Pillars() {
  return (
    <section id="system" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell relative">
        {/* Editorial Narrative Grid */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Problem Framing */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:h-fit">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="font-mono text-xs tracking-widest uppercase text-accent font-medium">
                  The Problem We Solve
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-[2.2rem] font-medium leading-[1.08] tracking-[-0.035em] text-ink md:text-[2.8rem]">
                Ambition rarely dies in the idea. It breaks in the{" "}
                <span className="font-serif italic font-normal text-accent">
                  system behind it.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-muted">
                Prototypes that collapse under real traffic, technical debt that stalls momentum, and teams bolting AI on top of organizational chaos. NURONE provides the unified foundation.
              </p>
            </Reveal>
          </div>

          {/* Right Column: 3 Pillars Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.id} delay={i * 0.08}>
                  <article className="group relative rounded-3xl border border-line bg-surface/60 p-8 md:p-10 backdrop-blur-xl transition-all duration-300 hover:border-accent/40 hover:bg-surface/90">
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-line bg-white/[0.04] text-accent transition-transform duration-300 group-hover:scale-105">
                        <Icon className="size-7" />
                      </span>
                      <span className="font-mono text-sm font-medium text-accent bg-accent/10 border border-accent/20 px-3.5 py-1 rounded-full">
                        {pillar.metric} — {pillar.metricLabel}
                      </span>
                    </div>

                    <h3 className="mt-8 font-display text-2xl font-medium text-ink md:text-3xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-muted font-normal">
                      {pillar.description}
                    </p>

                    <div className="mt-8 flex items-center justify-between border-t border-line/60 pt-5 text-sm">
                      <span className="font-mono text-xs text-faint uppercase tracking-wider">
                        Core System Layer
                      </span>
                      <ArrowUpRight className="size-4 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
