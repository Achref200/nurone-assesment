"use client";

import { Reveal } from "@/components/ui/reveal";
import { Tilt } from "@/components/motion/tilt";
import { pillars } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

export function Pillars() {
  const [p1, p2, p3] = pillars;
  const Icon1 = p1.icon;
  const Icon2 = p2.icon;
  const Icon3 = p3.icon;

  return (
    <section id="system" className="relative scroll-mt-24 py-20 md:py-28">
      {/* Ambient background light */}
      <span
        aria-hidden
        className="orb right-[-8rem] top-24 h-[32rem] w-[32rem] bg-[radial-gradient(circle,rgba(85,123,255,0.22),transparent_65%)]"
      />

      <div className="shell relative">
        {/* Problem Framing */}
        <div className="max-w-4xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="overline text-accent">The Problem We Solve</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-7 text-h2 text-ink">
              Ambition rarely dies in the idea. It breaks in the{" "}
              <em className="font-serif italic text-accent font-normal">
                system behind it
              </em>{" "}
              — prototypes that collapse with real users, tech stack debt that slows momentum, and teams bolting AI on top of chaos.
            </p>
          </Reveal>
        </div>

        {/* Section Header */}
        <div className="mt-16 flex flex-col gap-5 border-t border-line pt-8 md:mt-20 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="overline text-faint">01 — The NURONE Difference</span>
            <h2 className="mt-4 max-w-xl text-h3 md:text-[2.4rem]">
              One team. Three layers of asymmetric leverage.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-muted">
            Built for founders who demand engineering velocity and revenue growth from a single accountable team — not five disconnected agencies.
          </p>
        </div>

        {/* Asymmetric Bento Grid (7-col / 5-col top row, 12-col bottom row) */}
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Bento Card 1: Technical Backbone (7 cols) */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <Tilt className="h-full">
              <article className="glass-panel shine group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-8 md:p-10">
                {/* Pointer follow sheen */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(20rem 20rem at var(--mx) var(--my), rgba(85,123,255,0.14), transparent 60%)",
                  }}
                />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-line bg-white/[0.04] text-accent transition-all duration-300 group-hover:scale-105 group-hover:border-accent/50 group-hover:bg-accent/15 shadow-inner">
                      <Icon1 className="size-7" />
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="glass-strong numeral rounded-full border border-accent/30 px-3 py-1 text-xs font-semibold text-accent">
                        {p1.metric}
                      </span>
                      <span className="numeral text-xl text-faint">01</span>
                    </div>
                  </div>

                  <h3 className="mt-8 font-display text-2xl text-ink md:text-3xl">
                    {p1.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-muted">
                    {p1.description}
                  </p>
                </div>

                {/* Micro tech stack interactive widget preview */}
                <div className="mt-8 rounded-2xl border border-line bg-void/60 p-4 font-mono text-xs text-muted">
                  <div className="flex items-center justify-between border-b border-line/60 pb-2.5">
                    <span className="flex items-center gap-2 text-ink">
                      <span className="size-2 rounded-full bg-success" />
                      production-architecture.config.ts
                    </span>
                    <span className="text-[0.65rem] text-faint">100% OWNED</span>
                  </div>
                  <div className="mt-3 space-y-1.5 text-[0.72rem]">
                    <div className="flex justify-between">
                      <span className="text-accent">▸ core_stack</span>
                      <span className="text-ink">Next.js 16 + Rust Agent Microservices</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-accent">▸ deployment</span>
                      <span className="text-ink">Vercel / AWS Terraform (Zero Lock-in)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-accent">▸ sprint_velocity</span>
                      <span className="text-ink">72h Prototype to Production</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-line/50 pt-4">
                  <span className="overline text-faint">{p1.metricLabel}</span>
                  <ArrowUpRight className="size-4 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
                </div>
              </article>
            </Tilt>
          </Reveal>

          {/* Bento Card 2: Agentic Operations (5 cols) */}
          <Reveal delay={0.14} className="lg:col-span-5">
            <Tilt className="h-full">
              <article className="glass-panel shine group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-8 md:p-10">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(18rem 18rem at var(--mx) var(--my), rgba(165,180,252,0.14), transparent 60%)",
                  }}
                />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-line bg-white/[0.04] text-accent transition-all duration-300 group-hover:scale-105 group-hover:border-accent/50 group-hover:bg-accent/15 shadow-inner">
                      <Icon2 className="size-7" />
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="glass-strong numeral rounded-full border border-accent/30 px-3 py-1 text-xs font-semibold text-accent">
                        {p2.metric}
                      </span>
                      <span className="numeral text-xl text-faint">02</span>
                    </div>
                  </div>

                  <h3 className="mt-8 font-display text-2xl text-ink md:text-3xl">
                    {p2.title}
                  </h3>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
                    {p2.description}
                  </p>
                </div>

                {/* Workflow orchestration visual */}
                <div className="mt-8 rounded-2xl border border-line bg-void/60 p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="overline text-faint">Autonomous Agents</span>
                    <span className="inline-flex items-center gap-1.5 text-[0.68rem] text-success font-mono">
                      <span className="size-1.5 rounded-full bg-success pulse-soft" />
                      12 Active
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[0.68rem] text-center">
                    <div className="rounded-lg border border-line bg-white/[0.03] p-2 text-ink">
                      Triage Bot
                    </div>
                    <div className="rounded-lg border border-accent/40 bg-accent/10 p-2 text-accent">
                      Orchestrator
                    </div>
                    <div className="rounded-lg border border-line bg-white/[0.03] p-2 text-ink">
                      Auto QA
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-line/50 pt-4">
                  <span className="overline text-faint">{p2.metricLabel}</span>
                  <ArrowUpRight className="size-4 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
                </div>
              </article>
            </Tilt>
          </Reveal>

          {/* Bento Card 3: Growth Infrastructure (12 cols full width bottom strip) */}
          <Reveal delay={0.2} className="lg:col-span-12">
            <Tilt className="h-full">
              <article className="glass-panel shine group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-8 md:p-10 lg:flex-row lg:items-center">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(24rem 24rem at var(--mx) var(--my), rgba(85,123,255,0.12), transparent 60%)",
                  }}
                />

                <div className="max-w-2xl">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-line bg-white/[0.04] text-accent transition-all duration-300 group-hover:scale-105 group-hover:border-accent/50 group-hover:bg-accent/15 shadow-inner">
                      <Icon3 className="size-7" />
                    </span>
                    <div>
                      <span className="overline text-accent">Pillar 03</span>
                      <h3 className="font-display text-2xl text-ink md:text-3xl">
                        {p3.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">
                    {p3.description}
                  </p>
                </div>

                {/* Metric Counter Card Callout */}
                <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-line-strong bg-white/[0.03] p-6 backdrop-blur-md lg:mt-0 lg:min-w-[18rem]">
                  <div className="flex items-center justify-between">
                    <span className="overline text-faint">Proven Result</span>
                    <span className="size-2 rounded-full bg-accent" />
                  </div>
                  <div className="numeral text-4xl font-bold text-ink">
                    {p3.metric}
                  </div>
                  <div className="text-xs text-muted">
                    {p3.metricLabel}
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-line">
                    <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-accent to-accent-2" />
                  </div>
                </div>
              </article>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
