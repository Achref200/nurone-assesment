"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, MoveRight, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tilt } from "@/components/motion/tilt";
import { caseStudies } from "@/lib/content";
import type { CaseStudy } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

function StudyCard({ item }: { item: CaseStudy }) {
  return (
    <Tilt className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface/80 p-8 backdrop-blur-xl transition-all duration-300 hover:border-accent/40 hover:bg-surface">
        <div className="relative flex items-center justify-between gap-3">
          <span className="font-mono text-xs font-medium text-accent uppercase tracking-wider">{item.category}</span>
          {item.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-0.5 font-mono text-[0.68rem] text-accent">
              <Sparkles className="size-3" /> Flagship
            </span>
          )}
        </div>

        <h3 className="relative mt-6 font-display text-2xl font-medium text-ink md:text-3xl transition-colors group-hover:text-accent">
          {item.name}
        </h3>
        <p className="relative mt-4 flex-1 text-base leading-relaxed text-muted">
          {item.summary}
        </p>

        <div className="relative mt-6 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="font-mono text-xs border border-line bg-white/[0.02] px-2.5 py-1 rounded-full text-muted">
              {tag}
            </span>
          ))}
        </div>

        <div className="relative mt-8 flex items-end justify-between gap-4 border-t border-line/60 pt-6">
          <div>
            <div className="numeral text-2xl font-semibold text-ink">{item.metric.value}</div>
            <div className="mt-1 font-mono text-xs text-faint uppercase tracking-wider">{item.metric.label}</div>
          </div>
          <a
            href="#work"
            data-hover="link"
            aria-label={`Read the ${item.name} case study`}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-white/[0.03] text-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-void"
          >
            <ArrowUpRight className="size-4" />
          </a>
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
      title={
        <>
          An index of{" "}
          <span className="font-serif italic font-normal text-accent">shipped systems.</span>
        </>
      }
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
      className="relative scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      {mode === "scroll" ? (
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16">
          <div className="shell">{heading}</div>
          <div className="mt-12 overflow-hidden lg:mt-16">
            <div
              ref={track}
              className="flex gap-6 pl-[clamp(1.25rem,5vw,3rem)] will-change-transform"
            >
              {caseStudies.map((item) => (
                <div key={item.id} className="w-[26rem] max-w-[85vw] shrink-0">
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
            <div className="flex snap-x snap-mandatory gap-6 pl-[clamp(1.25rem,5vw,3rem)]">
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
