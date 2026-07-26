"use client";

import { caseStudies } from "@/lib/content";
import { Sparkles, CheckCircle2 } from "lucide-react";

export function Marquee() {
  return (
    <section
      aria-label="Shipped Systems Showcase"
      className="relative border-y border-line/60 bg-surface/40 py-10 select-none overflow-hidden"
    >
      <div className="shell">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Section Label */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex size-2 rounded-full bg-success" />
            <span className="font-mono text-xs tracking-wider uppercase text-muted font-medium">
              Shipped Systems In Production
            </span>
          </div>

          {/* Luxury Badge Pills Showcase */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
            {caseStudies.map((study) => (
              <div key={study.id} className="luxury-badge">
                <span className="luxury-badge__icon">
                  <CheckCircle2 className="size-4" />
                </span>
                <span className="luxury-badge__pill gap-2">
                  <span>{study.name}</span>
                  <span className="font-mono text-xs opacity-60">· {study.category}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
