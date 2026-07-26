"use client";

import { Reveal } from "@/components/ui/reveal";
import { pillars } from "@/lib/content";

export function Pillars() {
  return (
    <section id="system" className="relative scroll-mt-24 py-28 md:py-40">
      <div aria-hidden className="glow top-1/3 right-1/4 h-[28rem] w-[28rem] opacity-25" />

      <div className="shell relative">
        {/* Header - Simple & Futuristic */}
        <Reveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-accent/60" />
              <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-muted/80 font-medium">
                The Problem We Solve
              </span>
            </div>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold text-ink tracking-[-0.035em] leading-[0.95]">
              Ambition breaks in the<br />
              <span className="text-accent">system behind it.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.7] text-muted/90 tracking-[-0.005em]">
              Prototypes collapse under traffic. Tech debt stalls momentum. Teams bolt AI on top of chaos. We deliver the infrastructure to scale cleanly.
            </p>
          </div>
        </Reveal>

        {/* Pillars - Clean, minimal cards */}
        <div className="mt-20 grid gap-6 md:grid-cols-3 md:gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.id} delay={i * 0.08}>
                <article className="group relative flex h-full flex-col rounded-3xl border border-line/60 bg-gradient-to-b from-white/[0.03] to-transparent p-8 backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:from-white/[0.05] md:p-10">
                  {/* Icon */}
                  <div className="flex size-14 items-center justify-center rounded-2xl border border-line/60 bg-white/[0.02] transition-colors duration-500 group-hover:border-accent/40 group-hover:bg-accent/10">
                    <Icon className="size-6 text-muted transition-colors duration-500 group-hover:text-accent" />
                  </div>

                  {/* Title */}
                  <h3 className="mt-8 text-[1.4rem] font-semibold text-ink tracking-[-0.02em] leading-[1.15]">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 flex-1 text-[0.95rem] leading-[1.7] text-muted tracking-[-0.005em]">
                    {pillar.description}
                  </p>

                  {/* Metric - subtle, elegant */}
                  <div className="mt-8 flex items-center gap-3 border-t border-line/40 pt-6">
                    <span className="text-[1.8rem] font-bold text-accent tracking-[-0.03em]">
                      {pillar.metric}
                    </span>
                    <span className="text-[0.8rem] text-muted/70 tracking-[-0.005em]">
                      {pillar.metricLabel}
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
