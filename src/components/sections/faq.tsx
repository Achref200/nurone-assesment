"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, HelpCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { faqs } from "@/lib/content";

export function Faq() {
  const [activeTab, setActiveTab] = useState(0);
  const currentFaq = faqs[activeTab];

  return (
    <section id="faq" className="scroll-mt-24 border-t border-line/60 py-24 md:py-36 relative">
      <div aria-hidden className="glow top-1/2 left-1/4 h-[24rem] w-[24rem] -translate-y-1/2 opacity-40" />

      <div className="shell relative">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <span className="font-mono text-xs tracking-widest uppercase text-accent font-medium">
              FAQ
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl md:text-5xl tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted">
            Everything you need to know about partnering with NURONE to build, rebuild, and scale your product.
          </p>
        </Reveal>

        {/* Image 1 Inspired Split-Screen FAQ Layout */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Interactive Question Tabs */}
          <div className="flex flex-col gap-3 lg:col-span-5">
            {faqs.map((faq, index) => {
              const isActive = activeTab === index;
              return (
                <motion.button
                  key={faq.question}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative flex w-full items-center justify-between gap-4 rounded-2xl border px-6 py-4.5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-accent bg-accent/10 shadow-lg shadow-accent/5 text-ink"
                      : "border-line/70 bg-surface/50 text-muted hover:border-line-strong hover:bg-surface/90 hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFaqIndicator"
                      className="absolute inset-0 rounded-2xl border border-accent bg-accent/10 -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        isActive
                          ? "bg-white text-void shadow-md"
                          : "bg-accent text-white"
                      }`}
                    >
                      <span className="size-2 rounded-full bg-current" />
                    </span>
                    <span className="text-base font-medium truncate sm:text-lg">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronRight
                    className={`size-5 shrink-0 transition-transform duration-300 ${
                      isActive
                        ? "translate-x-1 text-accent"
                        : "text-faint group-hover:text-muted"
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Right Column: Active Question Detail Card (Overlapping Luxury Card) */}
          <div className="lg:col-span-7">
            <div className="relative min-h-[22rem] rounded-3xl border-2 border-white/20 bg-surface/90 p-8 shadow-2xl backdrop-blur-2xl md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col h-full justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-accent font-mono text-xs font-medium uppercase tracking-wider mb-4">
                      <HelpCircle className="size-4" />
                      <span>Question 0{activeTab + 1}</span>
                    </div>

                    <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl leading-snug">
                      {currentFaq.question}
                    </h3>

                    <div className="mt-6 h-px w-full bg-line" />

                    <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
                      {currentFaq.answer}
                    </p>
                  </div>

                  <div className="mt-10 flex items-center justify-between border-t border-line/60 pt-6 text-xs text-faint">
                    <span>NURONE Operating Model Guarantee</span>
                    <a
                      href="#access"
                      className="font-medium text-accent hover:underline"
                    >
                      Have a custom question? Talk to us →
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
