"use client";

import { caseStudies } from "@/lib/content";

export function Marquee() {
  const items = caseStudies;
  // Duplicate for seamless infinite loop
  const doubledItems = [...items, ...items];

  return (
    <section
      aria-label="Shipped Systems"
      className="relative border-y border-line/60 bg-surface/30 py-8 select-none overflow-hidden"
    >
      <div className="marquee-track">
        {doubledItems.map((study, i) => (
          <div
            key={`${study.id}-${i}`}
            className="flex shrink-0 items-center gap-6 px-8"
          >
            <span className="flex size-1.5 rounded-full bg-accent/60" />
            <span className="whitespace-nowrap text-[0.85rem] font-medium text-ink/80 tracking-[-0.01em]">
              {study.name}
            </span>
            <span className="whitespace-nowrap text-[0.75rem] text-muted/60 tracking-[-0.005em]">
              {study.category}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
