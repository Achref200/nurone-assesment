"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { labs } from "@/lib/content";
import type { Lab } from "@/lib/content";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function LabCard({ lab }: { lab: Lab }) {
  const Icon = lab.icon;
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line/80 bg-surface/80 p-8 backdrop-blur-xl transition-all duration-300 hover:border-accent/40 md:p-10">
      <div className="relative flex items-start justify-between gap-4">
        {/* Image 2 Luxury Badge */}
        <div className="luxury-badge">
          <span className="luxury-badge__icon">
            <Icon className="size-4.5" />
          </span>
          <span className="luxury-badge__pill">
            {lab.stage}
          </span>
        </div>
      </div>

      <h3 className="relative mt-8 font-display text-2xl font-semibold text-ink sm:text-3xl">
        {lab.name}
      </h3>
      <p className="relative mt-3 text-base leading-relaxed text-muted font-normal">
        {lab.summary}
      </p>

      <ul className="relative mt-6 grid gap-3">
        {lab.audience.map((point) => (
          <li key={point} className="flex items-start gap-3 text-sm text-ink/85 font-normal">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-8">
        <div className="h-px w-full bg-line/60" />
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs text-accent uppercase tracking-wider font-medium">
            Free Entry Point
          </span>
          <span className="font-mono text-xs font-medium text-ink px-3 py-1 rounded-full border border-accent/30 bg-accent/10">
            {lab.entry}
          </span>
        </div>
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
      title={
        <>
          Start from where you stand.{" "}
          <span className="text-accent font-semibold">Enter the Lab built for it.</span>
        </>
      }
      description="Every founder arrives with a specific bottleneck. Each Lab converts your stage into leverage — with a free entry point, so we prove fit before any commitment."
    />
  );

  return (
    <section
      id="labs"
      ref={root}
      className="relative scroll-mt-24 border-t border-line/60 py-20 md:py-32"
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
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
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
