import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { NewsletterForm } from "@/components/layout/newsletter-form";

export function Cta() {
  return (
    <section
      id="access"
      className="relative scroll-mt-24 overflow-hidden border-t border-line/60 bg-surface/20 py-28 md:py-40"
    >
      <div className="shell relative">
        <div className="relative overflow-hidden rounded-3xl border border-line/60 bg-gradient-to-b from-white/[0.03] to-transparent p-8 backdrop-blur-2xl md:p-16">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-3 mb-8">
                  <span className="h-px w-10 bg-accent/60" />
                  <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-muted/80 font-medium">
                    Request Access
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold text-ink tracking-[-0.035em] leading-[0.95]">
                  Bring the ambition.<br />
                  <span className="text-accent">We build the system.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-xl text-[1.05rem] leading-[1.7] text-muted/90 tracking-[-0.005em]">
                  Tell us where you stand today — idea, fragile MVP, scaling operations, or growth.
                  We&apos;ll run a FitCheck and show you where NURONE creates asymmetric leverage.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-10">
                  <Magnetic>
                    <Button href="#access" size="lg" className="shine px-8 py-4 text-[0.9rem] font-semibold tracking-[-0.01em]">
                      Request Access Now
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Magnetic>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="lg:col-span-5">
              <div className="border-t border-line/40 pt-8 lg:border-t-0 lg:border-l lg:border-line/40 lg:pl-10">
                <p className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-muted/60 mb-4">
                  Or subscribe for insights
                </p>
                <NewsletterForm />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
