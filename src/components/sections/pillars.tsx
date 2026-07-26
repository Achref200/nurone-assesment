"use client";

import { Reveal } from "@/components/ui/reveal";
import { pillars } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

export function Pillars() {
  return (
    <section id="system" className="relative scroll-mt-24 py-24 md:py-36">
      <div aria-hidden className="glow top-1/3 right-1/4 h-[28rem] w-[28rem] opacity-30" />

      <div className="shell relative">
        {/* Simple & Futuristic Problem Framing */}
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1 text-accent font-mono text-xs font-medium uppercase tracking-wider">
              The Problem We Solve
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 text-3xl font-semibold text-ink sm:text-4xl md:text-5xl tracking-tight leading-tight">
              Ambition rarely dies in the idea. It breaks in the{" "}
              <span className="text-accent">system behind it.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-lg leading-relaxed text-muted font-normal">
              Prototypes collapse under traffic, tech debt stalls momentum, and teams bolt AI on top of chaos. NURONE delivers the technical backbone, agentic ops, and growth infrastructure to scale cleanly.
            </p>
          </Reveal>
        </div>

        {/* Futuristic 3 Pillars Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.id} delay={i * 0.08}>
                <article className="group relative flex h-full flex-col justify-between rounded-3xl border border-line/80 bg-surface/60 p-8 backdrop-blur-xl transition-all duration-300 hover:border-accent/50 hover:bg-surface/90 hover:shadow-2xl hover:shadow-accent/5">
                  <div>
                    {/* Image 2 Inspired Header Badge */}
                    <div className="luxury-badge mb-6">
                      <span className="luxury-badge__icon">
                        <Icon className="size-4.5" />
                      </span>
                      <span className="luxury-badge__pill font-mono text-xs">
                        {pillar.metric}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-semibold text-ink">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted font-normal">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-line/50 pt-5">
                    <span className="font-mono text-xs text-faint uppercase tracking-wider">
                      {pillar.metricLabel}
                    </span>
                    <ArrowUpRight className="size-4 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
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
