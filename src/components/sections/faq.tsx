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
    <section id="faq" className="scroll-mt-24 border-t border-line py-24 md:py-32">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="font-mono text-xs tracking-widest uppercase text-accent font-medium">
                  FAQ
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-h2 text-ink font-medium">
                Questions before you request access.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                Everything you need to know before we decide, together, if NURONE
                is the right operating team for your next product stage.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 rounded-2xl border border-line bg-surface/60 p-5 backdrop-blur-md">
                <span className="font-mono text-xs text-faint uppercase tracking-wider">
                  Direct Studio Inquiry
                </span>
                <p className="mt-2 text-sm text-muted">
                  Have a specific technical inquiry or non-disclosure agreement? Reach out directly.
                </p>
                <a
                  href="mailto:contact@nurone.ai"
                  className="mt-3 inline-block font-mono text-xs font-semibold text-accent link-underline"
                >
                  contact@nurone.ai
                </a>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;
              return (
                <div
                  key={faq.question}
                  className={cn(
                    "overflow-hidden rounded-2xl border px-6 transition-all duration-300",
                    isOpen ? "border-accent/40 bg-surface/90" : "border-line bg-surface/40",
                  )}
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
                          isOpen ? "text-ink font-medium" : "text-ink/80",
                        )}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-[400ms] ease-[var(--ease-in-out-quart)]",
                          isOpen
                            ? "rotate-[135deg] border-accent/40 bg-accent/15 text-accent"
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
                        <p className="max-w-xl pb-6 text-sm leading-relaxed text-muted md:text-base border-t border-line/40 pt-3 mt-1 font-normal">
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
