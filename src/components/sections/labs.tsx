"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { labs } from "@/lib/content";
import type { Lab } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/*  A single Lab card — shared by the pinned deck and the static fallback       */
/* -------------------------------------------------------------------------- */

function LabCard({ lab }: { lab: Lab }) {
  const Icon = lab.icon;
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface p-8 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_30px_70px_-30px_rgba(0,0,0,0.7)] md:p-10">
      {/* Oversized ghost numeral bled into the corner */}
      <span
        aria-hidden
        className="chapter-ghost pointer-events-none absolute -right-2 -top-6 text-[10rem] leading-none opacity-40 md:text-[13rem]"
      >
        {lab.index}
      </span>

      <div className="relative flex items-start justify-between gap-4">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-line bg-white/[0.03] text-accent">
          <Icon className="size-6" strokeWidth={1.6} />
        </span>
        <span className="tag">{lab.stage}</span>
      </div>

      <h3 className="relative mt-7 font-display text-[1.7rem] leading-tight text-ink md:text-[2rem]">
        {lab.name}
      </h3>
      <p className="relative mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted">
        {lab.summary}
      </p>

      <ul className="relative mt-6 grid gap-2.5">
        {lab.audience.map((point) => (
          <li key={point} className="flex gap-3 text-sm text-ink/75">
            <span className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
            {point}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-7">
        <div className="h-px w-full bg-line" />
        <div className="mt-5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className="overline text-accent">Free entry</span>
          <span className="text-sm font-medium text-ink">{lab.entry}</span>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Labs — pinned card deck (desktop + motion) / static grid (fallback)         */
/* -------------------------------------------------------------------------- */

export function Labs() {
  const root = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
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

      const slideDist = () => window.innerHeight * 0.62; // start position below the stage
      const backY = 14; // px each covered card recedes upward
      const backScale = 0.035;
      const maxBack = 3;
      let lastActive = -1;

      // Position every card for a given float-index `p` (0 … n-1). Cards are
      // fully opaque: each one slides up from below and *covers* the previous,
      // which recedes a touch behind. No fades, so layers never bleed.
      const layout = (p: number) => {
        cards.forEach((card, k) => {
          const rel = p - k;
          let y: number;
          let scale: number;
          let opacity: number;

          if (rel < 0) {
            // Sliding up into the front slot (rel −1 → 0), or waiting below.
            const t = Math.max(-1, rel);
            y = -t * slideDist();
            scale = 1;
            opacity = rel < -1.05 ? 0 : 1;
          } else {
            // Front card (rel 0) → receding behind as later cards cover it.
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

        // Drive the readout without React re-renders.
        const active = gsap.utils.clamp(0, n - 1, Math.round(p));
        if (active !== lastActive) {
          lastActive = active;
          if (counterRef.current)
            counterRef.current.textContent = labs[active].index;
          if (nameRef.current) nameRef.current.textContent = labs[active].name;
        }
        if (fillRef.current)
          fillRef.current.style.transform = `scaleY(${n > 1 ? p / (n - 1) : 1})`;
      };

      layout(0);

      // Sticky stage + scrubbed progress (no JS pin → no spacer glitches, and
      // it stays glued through fast flicks with Lenis driving the scroll).
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
      index="02"
      title={
        <>
          Start from where you are.{" "}
          <span className="italic text-muted">Enter the Lab built for it.</span>
        </>
      }
      description="Every founder arrives with a different bottleneck. Each Lab turns a specific stage into leverage — with a free entry point, so we both prove fit before any commitment."
    />
  );

  return (
    <section
      id="labs"
      ref={root}
      className="relative scroll-mt-24 border-t border-line"
      style={
        mode === "deck"
          ? { height: `${(n - 1) * 90 + 116}vh` }
          : undefined
      }
    >
      {mode === "deck" ? (
        <div className="sticky top-0 flex h-screen items-center overflow-hidden py-16">
          <div className="shell grid w-full items-center gap-12 lg:grid-cols-[0.82fr_1.18fr]">
            {/* Left — pinned readout */}
            <div>
              {heading}

              <div className="mt-12 flex items-stretch gap-6">
                {/* Vertical progress rail */}
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

                <div className="flex items-baseline gap-4">
                  <span
                    ref={counterRef}
                    className="numeral text-[4rem] leading-none text-accent md:text-[5.5rem]"
                  >
                    {labs[0].index}
                  </span>
                  <div className="flex flex-col">
                    <span className="numeral text-sm text-faint">/ 0{n}</span>
                    <span
                      ref={nameRef}
                      className="mt-1 font-display text-xl text-ink"
                    >
                      {labs[0].name}
                    </span>
                    <span className="mt-2 max-w-[16rem] text-sm text-muted">
                      Scroll to deal through the system.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — the card deck */}
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
        <div className="shell py-20 md:py-28">
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
