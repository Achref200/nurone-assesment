"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/content";

function TypewriterText({ text, speed = 22 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    idx.current = 0;
    setDisplayed("");
    setDone(false);
    const id = window.setInterval(() => {
      idx.current++;
      if (idx.current <= text.length) {
        setDisplayed(text.slice(0, idx.current));
      } else {
        setDone(true);
        window.clearInterval(id);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[1px] bg-accent/60 animate-pulse" />
      )}
    </span>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fading, setFading] = useState(false);
  const count = testimonials.length;
  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.9", "start 0.4"],
  });

  const headingWords = "Not promises. Words from founders.".split(" ");

  const go = useCallback(
    (dir: number) => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + dir + count) % count);
        setFading(false);
      }, 300);
    },
    [count],
  );

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % count);
        setFading(false);
      }, 300);
    }, 7000);
    return () => window.clearInterval(id);
  }, [paused, count]);

  const active = testimonials[index];

  return (
    <section id="voices" className="scroll-mt-24 py-28 md:py-40">
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

        <div className="relative mt-16 rounded-2xl border border-white/[0.07] bg-surface p-8 md:p-14" style={{ boxShadow: '0 2px 24px rgba(0,0,0,0.3)' }}>
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            {/* Quote icon */}
            <div className="mb-8">
              <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-accent/50">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
                  <path d="M10 8c-1.1 0-2 .9-2 2v4h4v-4H8.5c0-1.38.62-2.5 1.5-2.5V5C8.57 5 7 6.79 7 9v3H4V8c0-2.21 1.79-4 4-4h2v4zm9 0c-1.1 0-2 .9-2 2v4h4v-4h-3.5c0-1.38.62-2.5 1.5-2.5V5c-2.93 0-4.5 1.79-4.5 4v3h-3V8c0-2.21 1.79-4 4-4h2v4z" />
                </svg>
              </span>
            </div>

            {/* Typewriter text area */}
            <div className="relative min-h-[14rem] md:min-h-[12rem]">
              <div
                className="transition-all duration-300"
                style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(6px)' : 'translateY(0)' }}
              >
                <blockquote className="max-w-3xl text-[clamp(1.2rem,2.5vw,1.8rem)] font-semibold leading-[1.3] text-ink tracking-[-0.02em]">
                  &ldquo;<TypewriterText text={active.quote} speed={18} />&rdquo;
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
              </div>
            </div>

            {/* Controls */}
            <div className="relative mt-12 flex items-center justify-between pt-8">
              <div className="flex items-center gap-2">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === index}
                    onClick={() => {
                      if (i === index) return;
                      setFading(true);
                      setTimeout(() => {
                        setIndex(i);
                        setFading(false);
                      }, 300);
                    }}
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
      </div>
    </section>
  );
}
