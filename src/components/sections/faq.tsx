"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/content";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.9", "start 0.4"],
  });
  const headingWords = "Everything you need to know.".split(" ");

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
    <section id="faq" className="scroll-mt-24 py-28 md:py-40 relative">
      <div className="shell relative">
        <div ref={headingRef} className="mb-16">
          <p className="overline text-muted/30 mb-6">
            Questions & Answers
          </p>
          <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3.8rem)] font-bold tracking-[-0.04em] leading-[0.95] text-ink">
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
          <p className="mt-6 max-w-xl text-[1rem] leading-[1.7] text-muted/65 tracking-[-0.005em]">
            Clear answers about how NURONE partners with founders to build, rebuild, and scale products.
          </p>
        </div>

        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="rounded-2xl border border-white/[0.07] bg-surface p-6 md:p-10" style={{ boxShadow: '0 2px 24px rgba(0,0,0,0.3)' }}
        >
          <div className="flex flex-col">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="border-b border-white/[0.04] last:border-b-0"
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
                            : "border-white/[0.08] bg-white/[0.02] text-muted/50 group-hover:border-white/[0.15] group-hover:text-ink"
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
                        className={`text-[1.05rem] md:text-[1.15rem] font-medium tracking-[-0.02em] transition-colors duration-300 ${
                          isOpen ? "text-ink" : "text-muted/70 group-hover:text-ink"
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
                          <p className="text-[0.95rem] leading-[1.8] text-muted/60 tracking-[-0.005em] max-w-2xl">
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

        <div className="mt-8 flex items-center justify-between text-[0.8rem] text-muted/40">
          <span>Can&apos;t find your answer?</span>
          <a
            href="#access"
            className="inline-flex items-center gap-1.5 font-medium text-accent/60 hover:text-accent transition-colors"
          >
            <span>Get in touch</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
