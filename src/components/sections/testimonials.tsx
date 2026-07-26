"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => window.clearInterval(id);
  }, [paused, count]);

  const active = testimonials[index];

  return (
    <section id="voices" className="scroll-mt-24 border-t border-line/60 py-28 md:py-40">
      <div className="shell">
        <Reveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-accent/60" />
              <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-muted/80 font-medium">
                What Founders Say
              </span>
            </div>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold text-ink tracking-[-0.035em] leading-[0.95]">
              Not promises.<br />
              <span className="text-accent">Words from founders.</span>
            </h2>
          </div>
        </Reveal>

        <div
          className="relative mt-16 overflow-hidden rounded-3xl border border-line/60 bg-gradient-to-b from-white/[0.03] to-transparent p-8 backdrop-blur-2xl md:p-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="flex items-center justify-between pb-8">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-line/60 bg-white/[0.03] text-accent">
              <Quote className="size-5" />
            </span>
          </div>

          <div className="relative min-h-[14rem] md:min-h-[12rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="max-w-3xl text-[clamp(1.3rem,2.5vw,1.9rem)] font-semibold leading-[1.2] text-ink tracking-[-0.025em]">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-line/60 bg-white/[0.04] text-sm font-semibold text-accent">
                    {active.initials}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[0.95rem] font-semibold text-ink tracking-[-0.01em]">{active.name}</span>
                    <span className="text-[0.85rem] text-muted/70 tracking-[-0.005em]">{active.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="relative mt-12 flex items-center justify-between border-t border-line/40 pt-8">
            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === index ? "w-8 bg-accent" : "w-1.5 bg-line-strong/60 hover:bg-muted/40"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(-1)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-line/60 bg-white/[0.02] text-muted transition-all duration-300 hover:border-accent/30 hover:text-accent"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(1)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-line/60 bg-white/[0.02] text-muted transition-all duration-300 hover:border-accent/30 hover:text-accent"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
