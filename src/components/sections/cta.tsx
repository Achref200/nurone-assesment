import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/motion/magnetic";

export function Cta() {
  return (
    <section
      id="access"
      className="relative scroll-mt-24 overflow-hidden border-t border-line bg-surface"
    >
      {/* Single accent glow, off-center + a slow drifting aurora */}
      <div
        aria-hidden
        className="glow bottom-[-10rem] left-1/2 h-[26rem] w-[40rem] -translate-x-1/3 opacity-70"
      />
      <span
        aria-hidden
        className="orb right-[-6rem] top-[-6rem] h-[26rem] w-[26rem] bg-[radial-gradient(circle,rgba(165,180,252,0.18),transparent_65%)]"
      />

      <div className="shell relative py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="overline">Request access</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-7 text-display text-ink">
                Bring the ambition. We&apos;ll build the{" "}
                <em className="text-shimmer italic">system</em> behind it.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-fluid text-muted">
                Tell us where you are now — idea, product, operations, or growth.
                We&apos;ll show you where NURONE can create serious leverage.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="md:col-span-4 md:flex md:justify-end">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center md:flex-col md:items-end">
              <Magnetic>
                <Button href="#access" size="lg">
                  Request Access
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Magnetic>
              <p className="max-w-[15rem] text-sm text-faint md:text-right">
                We don&apos;t work with everyone. We work where we can win.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
