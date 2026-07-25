"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { faqs } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="overline">FAQ</span>
                <span className="overline text-faint">/ 06</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-h2">
                Questions before you request access.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                Everything you need to know before we decide, together, if NURONE
                is the right operating team for your next stage.
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;
              return (
                <div
                  key={faq.question}
                  className="glass-panel overflow-hidden rounded-2xl px-6"
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span
                        className={cn(
                          "font-display text-lg transition-colors md:text-xl",
                          isOpen ? "text-ink" : "text-ink/75",
                        )}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-[400ms] ease-[var(--ease-in-out-quart)]",
                          isOpen
                            ? "rotate-[135deg] border-accent/40 bg-accent/10 text-accent"
                            : "border-line text-muted",
                        )}
                      >
                        <Plus className="size-4" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="content"
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.36, ease: [0.76, 0, 0.24, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-6 text-sm leading-relaxed text-muted md:text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
