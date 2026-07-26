"use client";

import { caseStudies } from "@/lib/content";

const SEPARATOR = (
  <span className="mx-8 inline-block h-px w-12 bg-white/10 align-middle" />
);

export function Marquee() {
  // Two rows: one going right, one going left
  const row1 = [...caseStudies, ...caseStudies];
  const row2 = [...caseStudies, ...caseStudies].reverse();

  return (
    <section
      aria-label="Shipped Systems Ticker"
      className="relative overflow-hidden border-y border-white/[0.05] py-6 select-none"
    >
      {/* Fade edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-void to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-void to-transparent"
      />

      {/* Row 1 — scrolls right */}
      <div className="marquee-track mb-3" style={{ animationDirection: "normal" }}>
        {row1.map((study, i) => (
          <span key={`r1-${study.id}-${i}`} className="inline-flex items-center shrink-0">
            <span className="whitespace-nowrap text-[0.78rem] font-medium text-ink/50 tracking-[0.02em] uppercase">
              {study.name}
            </span>
            <span className="mx-8 inline-flex size-1 rounded-full bg-accent/30" />
          </span>
        ))}
      </div>

      {/* Row 2 — scrolls left */}
      <div
        className="marquee-track"
        style={{ animationDirection: "reverse", animationDuration: "50s" }}
      >
        {row2.map((study, i) => (
          <span key={`r2-${study.id}-${i}`} className="inline-flex items-center shrink-0">
            <span className="whitespace-nowrap text-[0.78rem] font-medium text-muted/35 tracking-[0.02em] uppercase">
              {study.category}
            </span>
            <span className="mx-8 inline-flex size-1 rounded-full bg-white/[0.08]" />
          </span>
        ))}
      </div>
    </section>
  );
}
