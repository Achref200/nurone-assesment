import { Reveal } from "@/components/ui/reveal";
import { Tilt } from "@/components/motion/tilt";
import { pillars } from "@/lib/content";

export function Pillars() {
  return (
    <section id="system" className="relative scroll-mt-24 py-20 md:py-28">
      {/* Off-center drifting aurora */}
      <span
        aria-hidden
        className="orb right-[-8rem] top-24 h-[32rem] w-[32rem] bg-[radial-gradient(circle,rgba(85,123,255,0.22),transparent_65%)]"
      />

      <div className="shell relative">
        {/* Manifesto / problem framing */}
        <div className="max-w-4xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="overline">The problem</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-7 text-h2 text-ink">
              Ambition rarely dies in the idea. It breaks in the{" "}
              <em className="italic text-accent">system behind it</em> —
              prototypes that collapse with real users, products that slow under
              growth, teams bolting AI on top of chaos.
            </p>
          </Reveal>
        </div>

        {/* Pillars intro */}
        <div className="mt-16 flex flex-col gap-5 border-t border-line pt-8 md:mt-20 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="overline text-faint">01 — The System</span>
            <h2 className="mt-4 max-w-xl text-h3 md:text-[2.4rem]">
              One team. Three layers of leverage.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-muted">
            Built for founders who want product velocity and revenue growth from
            a single, accountable team — not five disconnected vendors.
          </p>
        </div>

        {/* Three glass pillar cards, staggered + tilt on hover */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.id} delay={i * 0.09}>
                <Tilt className="h-full">
                  <article className="glass-panel shine group relative flex h-full flex-col overflow-hidden rounded-3xl p-8 transition-colors duration-300 hover:border-line-strong">
                    {/* pointer-follow sheen (driven by Tilt's --mx/--my) */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(16rem 16rem at var(--mx) var(--my), rgba(85,123,255,0.14), transparent 55%)",
                      }}
                    />
                    <div className="relative flex items-center justify-between">
                      <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-line bg-white/[0.03] text-accent transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-accent/40 group-hover:bg-accent/10">
                        <Icon className="size-5" strokeWidth={1.6} />
                      </span>
                      <span className="numeral text-2xl text-faint transition-colors group-hover:text-accent">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="relative mt-7 font-display text-xl text-ink">
                      {pillar.title}
                    </h3>
                    <p className="relative mt-3 text-[0.95rem] leading-relaxed text-muted">
                      {pillar.description}
                    </p>
                    <span
                      aria-hidden
                      className="relative mt-auto block h-px w-full origin-left scale-x-0 bg-gradient-to-r from-accent to-transparent pt-6 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                    />
                  </article>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
