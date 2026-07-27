"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { labs } from "@/lib/content";
import type { Lab } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function LabCard({ lab }: { lab: Lab }) {
  const Icon = lab.icon;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-surface p-7 md:p-9 transition-all duration-700 hover:border-white/[0.14] hover:bg-surface-2" style={{ boxShadow: '0 2px 24px rgba(0,0,0,0.3)' }}>
      {/* Soft corner glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.07),transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      {/* Stage tag */}
      <div className="flex items-center justify-between">
        <span className="overline text-muted/35">
          {lab.stage}
        </span>
        <span className="flex size-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.015] transition-all duration-500 group-hover:border-accent/20 group-hover:bg-accent/5">
          <Icon className="size-4 text-muted/40 group-hover:text-accent/60 transition-colors duration-500" />
        </span>
      </div>

      {/* Lab name */}
      <h3 className="mt-6 text-[1.35rem] font-bold text-ink tracking-[-0.02em] leading-[1.15]">
        {lab.name}
      </h3>

      {/* Summary */}
      <p className="mt-3 text-[0.88rem] leading-[1.75] text-muted/60 flex-1">
        {lab.summary}
      </p>

      {/* Audience — simple, clean bullets */}
      <ul className="mt-5 flex flex-col gap-1.5">
        {lab.audience.map((point) => (
          <li key={point} className="flex items-start gap-3 text-[0.8rem] text-muted/45 leading-[1.6]">
            <span className="mt-2 size-[3px] shrink-0 rounded-full bg-accent/30" />
            {point}
          </li>
        ))}
      </ul>

      {/* Entry point */}
      <div className="mt-6 border-t border-white/[0.04] pt-5 flex items-center justify-between">
        <span className="text-[0.68rem] tracking-[0.12em] uppercase text-muted/35">
          {lab.entry}
        </span>
        <span className="flex size-8 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.015] text-muted/35 transition-all duration-300 group-hover:border-accent/25 group-hover:text-accent/70 group-hover:bg-accent/5">
          <ArrowUpRight className="size-3.5" />
        </span>
      </div>
    </article>
  );
}

export function Labs() {
  const root = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<"static" | "deck">("static");
  const n = labs.length;

  useGSAP(
    () => {
      if (mode === "static") {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const desktop = window.matchMedia("(min-width: 1024px)").matches;
        if (desktop && !reduced) requestAnimationFrame(() => setMode("deck"));
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>(".lab-card");
      if (!cards.length) return;

      const slideDist = () => window.innerHeight * 0.62;
      const backY = 14;
      const backScale = 0.035;
      const maxBack = 3;
      let lastActive = -1;

      const layout = (p: number) => {
        cards.forEach((card, k) => {
          const rel = p - k;
          let y: number;
          let scale: number;
          let opacity: number;

          if (rel < 0) {
            const t = Math.max(-1, rel);
            y = -t * slideDist();
            scale = 1;
            opacity = rel < -1.05 ? 0 : 1;
          } else {
            const behind = Math.min(rel, maxBack);
            y = -behind * backY;
            scale = 1 - behind * backScale;
            opacity = rel > maxBack + 0.6 ? 0 : 1;
          }

          gsap.set(card, {
            y,
            scale,
            opacity,
            zIndex: k,
            pointerEvents: rel >= 0 && rel < 1 ? "auto" : "none",
          });
        });

        const active = gsap.utils.clamp(0, n - 1, Math.round(p));
        if (active !== lastActive) {
          lastActive = active;
          if (nameRef.current) nameRef.current.textContent = labs[active].name;
        }
        if (fillRef.current)
          fillRef.current.style.transform = `scaleY(${n > 1 ? p / (n - 1) : 1})`;
      };

      layout(0);

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: (self) => layout(self.progress * (n - 1)),
        onRefresh: (self) => layout(self.progress * (n - 1)),
      });

      return () => st.kill();
    },
    { scope: root, dependencies: [mode] },
  );

  const heading = (
    <SectionHeading
      eyebrow="The Lab System"
      title="Start from where you stand. Enter the Lab built for it."
      description="Every founder arrives with a specific bottleneck. Each Lab converts your stage into leverage — with a free entry point, so we prove fit before any commitment."
    />
  );

  return (
    <section
      id="labs"
      ref={root}
      className="relative scroll-mt-24 py-20 md:py-32"
      style={
        mode === "deck"
          ? { height: `${(n - 1) * 90 + 116}vh` }
          : undefined
      }
    >
      {mode === "deck" ? (
        <div className="sticky top-0 flex h-screen items-center overflow-hidden py-16">
          <div className="shell grid w-full items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              {heading}

              <div className="mt-12 flex items-stretch gap-6">
                <span
                  aria-hidden
                  className="relative block w-px shrink-0 overflow-hidden bg-line"
                >
                  <span
                    ref={fillRef}
                    className="absolute inset-0 block origin-top bg-accent"
                    style={{ transform: "scaleY(0)" }}
                  />
                </span>

                <div className="flex flex-col justify-center">
                  <span
                    ref={nameRef}
                    className="font-display text-2xl font-semibold text-ink"
                  >
                    {labs[0].name}
                  </span>
                  <span className="mt-2 text-sm text-muted">
                    Scroll to cycle through operating labs.
                  </span>
                </div>
              </div>
            </div>

            <div className="relative h-[34rem] [perspective:1600px]">
              {labs.map((lab) => (
                <div
                  key={lab.id}
                  className="lab-card absolute inset-0 will-change-transform"
                >
                  <LabCard lab={lab} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="shell">
          {heading}
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {labs.map((lab, i) => (
              <Reveal key={lab.id} delay={i * 0.06} className="h-full">
                <LabCard lab={lab} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
