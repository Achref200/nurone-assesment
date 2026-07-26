import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { NewsletterForm } from "@/components/layout/newsletter-form";

export function Cta() {
  return (
    <section
      id="access"
      className="relative scroll-mt-24 overflow-hidden border-t border-line bg-surface"
    >
      <div
        aria-hidden
        className="glow bottom-[-10rem] left-1/2 h-[28rem] w-[42rem] -translate-x-1/2 opacity-70"
      />
      <span
        aria-hidden
        className="orb right-[-6rem] top-[-6rem] h-[26rem] w-[26rem] bg-[radial-gradient(circle,rgba(165,180,252,0.18),transparent_65%)]"
      />

      <div className="shell relative py-24 md:py-32">
        <div className="glass-panel relative overflow-hidden rounded-4xl border border-line-strong p-8 backdrop-blur-2xl shadow-2xl md:p-14">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-accent" />
                  <span className="overline text-accent">Request Access</span>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-7 text-display text-ink font-semibold">
                  Bring the ambition. We&apos;ll build the{" "}
                  <em className="text-shimmer font-serif italic font-normal">system</em> behind it.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-fluid leading-relaxed text-muted">
                  Tell us where you stand today — idea, fragile MVP, scaling operations, or growth.
                  We&apos;ll run a FitCheck and show you where NURONE creates asymmetric leverage.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8 grid gap-3 sm:grid-cols-2 text-sm text-ink/80">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 text-accent" />
                    <span>Free 20-min technical audit</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 text-accent" />
                    <span>72h Prototype Sprint option</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 text-accent" />
                    <span>100% IP ownership guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 text-accent" />
                    <span>Zero agency retainers</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="lg:col-span-5 lg:flex lg:flex-col lg:items-end">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center lg:flex-col lg:items-stretch lg:w-full lg:max-w-md">
                <Magnetic>
                  <Button href="#access" size="lg" className="w-full shine py-4 text-base font-semibold">
                    Request Access Now
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </Magnetic>

                <div className="w-full border-t border-line/60 pt-6">
                  <p className="text-xs text-faint mb-3 font-mono uppercase tracking-wider">
                    Or subscribe for tech & growth insights
                  </p>
                  <NewsletterForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
