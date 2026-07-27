"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;
  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.9", "start 0.4"],
  });

  const headingWords = "Not promises. Words from founders.".split(" ");

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => window.clearInterval(id);
  }, [paused, count]);

  const active = testimonials[index];

  return (
    <section id="voices" className="scroll-mt-24 border-t border-white/[0.04] py-28 md:py-40">
      <div className="shell">
        <div ref={headingRef} className="mb-12">
          <p className="overline text-muted/30 mb-6">
            What Founders Say
          </p>
          <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3.8rem)] font-bold leading-[0.95] tracking-[-0.04em] text-ink">
            {headingWords.map((word, i) => {
              const start = i / headingWords.length;
              const end = start + 1 / headingWords.length;
              const opacity = useTransform(scrollYProgress, [start, end], [0.08, 1]);
              return (
                <motion.span key={i} style={{ opacity }}>
                  {word}{" "}
                </motion.span>
              );
            })}
          </h2>
        </div>

        <div
          className="relative mt-16 overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-8 md:p-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Subtle background pattern */}
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.015] dot-grid-sm" />

          <div className="flex items-center justify-between pb-8">
            <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-accent/50">
              <Quote className="size-5" />
            </span>
          </div>

          <div className="relative min-h-[12rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="max-w-3xl text-[clamp(1.2rem,2.5vw,1.8rem)] font-semibold leading-[1.25] text-ink tracking-[-0.02em]">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/[0.06] bg-accent/10 text-sm font-semibold text-accent/80">
                    {active.initials}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[0.9rem] font-semibold text-ink tracking-[-0.01em]">{active.name}</span>
                    <span className="text-[0.8rem] text-muted/60 tracking-[-0.005em]">{active.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="relative mt-12 flex items-center justify-between border-t border-white/[0.04] pt-8">
            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === index ? "w-8 bg-accent" : "w-1.5 bg-white/[0.1] hover:bg-white/[0.2]"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(-1)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02] text-muted/50 transition-all duration-300 hover:border-accent/20 hover:text-accent/70"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(1)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02] text-muted/50 transition-all duration-300 hover:border-accent/20 hover:text-accent/70"
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
