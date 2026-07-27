"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tilt } from "@/components/motion/tilt";
import { caseStudies } from "@/lib/content";
import type { CaseStudy } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

function StudyCard({ item }: { item: CaseStudy }) {
  return (
    <Tilt className="h-full">
      <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-surface p-7 transition-all duration-700 hover:border-white/[0.14] hover:bg-surface-2" style={{ boxShadow: '0 2px 24px rgba(0,0,0,0.3)' }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: "radial-gradient(500px circle at 30% 0%, rgba(59,130,246,0.05), transparent 60%)" }}
        />

        <div>
          <p className="overline text-muted/35 mb-4">
            {item.category}
          </p>

          <h3 className="text-[1.3rem] font-bold text-ink tracking-[-0.02em] leading-[1.15] transition-colors duration-500 group-hover:text-accent/90">
            {item.name}
          </h3>
          <p className="mt-3 text-[0.85rem] leading-[1.7] text-muted/60">
            {item.summary}
          </p>
        </div>

        <div className="mt-7 flex items-end justify-between gap-4 pt-5">
          <div>
            <div className="text-[1.5rem] font-bold text-ink/35 tracking-[-0.03em] group-hover:text-ink/65 transition-colors duration-500">
              {item.metric.value}
            </div>
            <div className="mt-0.5 text-[0.68rem] text-muted/40 uppercase tracking-[0.1em]">
              {item.metric.label}
            </div>
          </div>
          <span
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/[0.06] text-muted/35 transition-all duration-500 group-hover:border-accent/50 group-hover:bg-accent group-hover:text-white group-hover:scale-110"
          >
            <ArrowUpRight className="size-3.5" />
          </span>
        </div>
      </article>
    </Tilt>
  );
}

export function CaseStudies() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"static" | "scroll">("static");

  useGSAP(
    () => {
      if (mode === "static") {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const desktop = window.matchMedia("(min-width: 1024px)").matches;
        if (desktop && !reduced) requestAnimationFrame(() => setMode("scroll"));
        return;
      }

      const trackEl = track.current;
      const rootEl = root.current;
      if (!trackEl || !rootEl) return;

      const getDistance = () =>
        Math.max(0, trackEl.scrollWidth - window.innerWidth + 48);

      const setHeight = () => {
        rootEl.style.height = `${window.innerHeight + getDistance()}px`;
      };
      const layout = (p: number) => {
        gsap.set(trackEl, { x: -getDistance() * p });
        rootEl.style.setProperty("--hx", String(p));
      };

      ScrollTrigger.addEventListener("refreshInit", setHeight);
      setHeight();
      layout(0);

      const st = ScrollTrigger.create({
        trigger: rootEl,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: (self) => layout(self.progress),
        onRefresh: (self) => layout(self.progress),
      });

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", setHeight);
        st.kill();
        rootEl.style.height = "";
      };
    },
    { scope: root, dependencies: [mode] },
  );

  const heading = (
    <SectionHeading
      eyebrow="Selected Production Work"
      title="An index of shipped systems."
      description="Not promises — production systems founders and users rely on every day. Scroll sideways through our shipped index."
    />
  );

  const railFooter = (
    <div className="shell mt-8 flex items-center gap-5">
      <span className="inline-flex shrink-0 items-center gap-2 font-mono text-xs text-faint uppercase tracking-wider">
        <MoveRight className="size-4 text-accent" /> {caseStudies.length} production systems shipped
      </span>
      <span aria-hidden className="hx-rail hidden flex-1 lg:block">
        <span className="hx-rail__fill" />
      </span>
    </div>
  );

  return (
    <section
      id="work"
      ref={root}
      className="relative scroll-mt-24 py-20 md:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 dot-grid-sm opacity-10" />
        <span className="absolute top-1/4 left-1/3 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.025),transparent_60%)]" />
      </div>
      {mode === "scroll" ? (
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-10">
          <div className="shell">{heading}</div>
          <div className="mt-8 overflow-hidden lg:mt-10">
            <div
              ref={track}
              className="flex gap-5 pl-[clamp(1.25rem,5vw,3rem)] will-change-transform"
            >
              {caseStudies.map((item) => (
                <div key={item.id} className="w-[24rem] max-w-[82vw] shrink-0">
                  <StudyCard item={item} />
                </div>
              ))}
              <div aria-hidden className="w-[clamp(1.25rem,5vw,3rem)] shrink-0" />
            </div>
          </div>
          {railFooter}
        </div>
      ) : (
        <div className="shell">
          {heading}
          <div className="mt-12 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex snap-x snap-mandatory gap-5 pl-[clamp(1.25rem,5vw,3rem)]">
              {caseStudies.map((item) => (
                <div
                  key={item.id}
                  className="w-[85vw] max-w-[25rem] shrink-0 snap-start sm:w-[26rem]"
                >
                  <StudyCard item={item} />
                </div>
              ))}
              <div aria-hidden className="w-[clamp(1.25rem,5vw,3rem)] shrink-0" />
            </div>
          </div>
          {railFooter}
        </div>
      )}
    </section>
  );
}
