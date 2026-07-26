"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { faqs } from "@/lib/content";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--faq-x", `${x}%`);
    cardRef.current.style.setProperty("--faq-y", `${y}%`);
  };

  return (
    <section id="faq" className="scroll-mt-24 border-t border-line/60 py-28 md:py-40 relative">
      <div aria-hidden className="glow top-1/3 left-1/3 h-[30rem] w-[30rem] -translate-y-1/2 opacity-30" />

      <div className="shell relative">
        <Reveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-accent/60" />
              <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-muted/80 font-medium">
                Questions & Answers
              </span>
            </div>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold text-ink tracking-[-0.035em] leading-[0.95]">
              Everything you need<br />
              <span className="text-accent">to know.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.7] text-muted/90 tracking-[-0.005em]">
              Clear answers about how NURONE partners with founders to build, rebuild, and scale products.
            </p>
          </div>
        </Reveal>

        {/* Elegant Accordion */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="faq-answer-card mt-16 p-6 md:p-10"
        >
          <div className="flex flex-col">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="border-b border-line/40 last:border-b-0"
                >
                  <motion.button
                    type="button"
                    onClick={() => toggle(index)}
                    className="group relative flex w-full items-center justify-between gap-6 py-7 text-left transition-colors"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center gap-5 min-w-0 flex-1">
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                          isOpen
                            ? "border-accent bg-accent text-white scale-110"
                            : "border-line/60 bg-white/[0.02] text-muted group-hover:border-line-strong group-hover:text-ink"
                        }`}
                      >
                        <AnimatePresence mode="wait">
                          {isOpen ? (
                            <motion.span
                              key="minus"
                              initial={{ rotate: -90, opacity: 0 }}
                              animate={{ rotate: 0, opacity: 1 }}
                              exit={{ rotate: 90, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Minus className="size-3.5" strokeWidth={2.5} />
                            </motion.span>
                          ) : (
                            <motion.span
                              key="plus"
                              initial={{ rotate: 90, opacity: 0 }}
                              animate={{ rotate: 0, opacity: 1 }}
                              exit={{ rotate: -90, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Plus className="size-3.5" strokeWidth={2.5} />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                      <span
                        className={`text-[1.1rem] md:text-[1.25rem] font-medium tracking-[-0.02em] transition-colors duration-300 ${
                          isOpen ? "text-ink" : "text-muted group-hover:text-ink"
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>
                  </motion.button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.3, delay: 0.1 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.3 },
                            opacity: { duration: 0.2 },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pl-[4.5rem] pr-4">
                          <p className="text-[1rem] leading-[1.75] text-muted tracking-[-0.005em] max-w-2xl">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subtle footer note */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex items-center justify-between text-xs text-faint/70">
            <span>Can't find your answer?</span>
            <a
              href="#access"
              className="inline-flex items-center gap-1.5 font-medium text-accent/80 hover:text-accent transition-colors"
            >
              <span>Get in touch</span>
              <span className="text-sm">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
