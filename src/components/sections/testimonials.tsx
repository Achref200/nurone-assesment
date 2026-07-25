"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  // Auto-advance, paused on hover / focus. Disabled under reduced motion.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => window.clearInterval(id);
  }, [paused, count]);

  const active = testimonials[index];

  return (
    <section id="voices" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="What founders say"
          index="05"
          title={
            <>
              Not promises.{" "}
              <em className="italic text-muted">Words from people who shipped.</em>
            </>
          }
        />

        <div
          className="glass-panel relative mt-14 overflow-hidden rounded-4xl p-8 md:p-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            aria-hidden
            className="glow right-[-4rem] top-[-4rem] h-[18rem] w-[18rem] opacity-50"
          />

          <span aria-hidden className="relative font-display text-6xl leading-none text-accent">
            &ldquo;
          </span>

          <div className="relative min-h-[13rem] md:min-h-[10rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="max-w-3xl font-display text-2xl leading-[1.35] text-ink md:text-[1.9rem]">
                  {active.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-white/[0.03] font-display text-sm text-ink">
                    {active.initials}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-ink">{active.name}</span>
                    <span className="text-xs text-muted">{active.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Minimal controls */}
          <div className="relative mt-10 flex items-center justify-between border-t border-line pt-6">
            <span className="numeral text-sm text-faint">
              {String(index + 1).padStart(2, "0")}{" "}
              <span className="text-faint/60">/ {String(count).padStart(2, "0")}</span>
            </span>

            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 sm:flex">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === index}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-6 bg-accent" : "w-1.5 bg-line-strong hover:bg-muted"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => go(-1)}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => go(1)}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
