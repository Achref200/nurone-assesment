"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { NewsletterForm } from "@/components/layout/newsletter-form";

export function Cta() {
  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.9", "start 0.4"],
  });
  const headingWords = "Bring the ambition. We build the system.".split(" ");
  return (
    <section
      id="access"
      className="relative scroll-mt-24 overflow-hidden py-28 md:py-40"
    >
      <div className="shell relative">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-surface p-8 md:p-16" style={{ boxShadow: '0 2px 24px rgba(0,0,0,0.3)' }}>
          {/* Subtle corner glow */}
          <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06),transparent_70%)]" />

          <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7" ref={headingRef}>
              <p className="overline text-muted/30 mb-8">
                Request Access
              </p>
              <h2 className="text-[clamp(2rem,4.5vw,3.8rem)] font-bold text-ink tracking-[-0.04em] leading-[0.95] max-w-xl">
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
              <p className="mt-8 max-w-xl text-[1rem] leading-[1.7] text-muted/65 tracking-[-0.005em]">
                Tell us where you stand today — idea, fragile MVP, scaling operations, or growth.
                We&apos;ll run a FitCheck and show you where NURONE creates asymmetric leverage.
              </p>

              <div className="mt-10">
                <Magnetic>
                  <Button href="#access" size="lg" className="shine px-8 py-4 text-[0.9rem] font-semibold tracking-[-0.01em]">
                    Request Access Now
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Magnetic>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border-t border-white/[0.04] pt-8 lg:border-t-0 lg:border-l lg:border-white/[0.04] lg:pl-10">
                <p className="overline text-muted/30 mb-5">
                  Or subscribe for insights
                </p>
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
