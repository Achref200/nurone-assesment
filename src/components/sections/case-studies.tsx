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
      <article className="glass-panel group relative flex h-full flex-col overflow-hidden rounded-3xl p-8">
        {/* pointer-following sheen (driven by Tilt's --mx/--my) */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(18rem 18rem at var(--mx) var(--my), rgba(85,123,255,0.12), transparent 55%)",
          }}
        />
        <div className="relative flex items-center justify-between gap-3">
          <span className="numeral text-lg text-accent">{item.index}</span>
          <span className="overline text-faint">{item.category}</span>
        </div>

        <h3 className="relative mt-6 font-display text-3xl text-ink">
          {item.name}
        </h3>
        <p className="relative mt-4 flex-1 text-[0.95rem] leading-relaxed text-muted">
          {item.summary}
        </p>

        <div className="relative mt-6 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="relative mt-7 flex items-end justify-between gap-4 border-t border-line pt-6">
          <div>
            <div className="numeral text-2xl text-ink">{item.metric.value}</div>
            <div className="mt-1 overline text-faint">{item.metric.label}</div>
          </div>
          <a
            href="#work"
            data-hover="link"
            aria-label={`Read the ${item.name} case study`}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/40 hover:text-accent"
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

      // Section is made tall enough that vertical scroll maps to the sideways
      // travel; the inner stage is `sticky` (no GSAP pin → no fixed-position
      // collisions with the neighbouring sticky Lab deck).
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
      eyebrow="Selected work"
      index="03"
      title={
        <>
          An index of{" "}
          <em className="italic text-muted">shipped systems.</em>
        </>
      }
      description="Not promises — production systems founders rely on every day. Scroll sideways through the index."
    />
  );

  const railFooter = (
    <div className="shell mt-8 flex items-center gap-5">
      <span className="inline-flex shrink-0 items-center gap-2 overline text-faint">
        <MoveRight className="size-4" /> {caseStudies.length} shipped systems
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
      className="relative scroll-mt-24 border-t border-line"
    >
      {mode === "scroll" ? (
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16">
          <div className="shell">{heading}</div>
          <div className="mt-12 overflow-hidden lg:mt-16">
            <div
              ref={track}
              className="flex gap-5 pl-[clamp(1.25rem,5vw,3rem)] will-change-transform"
            >
              {caseStudies.map((item) => (
                <div key={item.id} className="w-[24rem] max-w-[85vw] shrink-0">
                  <StudyCard item={item} />
                </div>
              ))}
              <div aria-hidden className="w-[clamp(1.25rem,5vw,3rem)] shrink-0" />
            </div>
          </div>
          {railFooter}
        </div>
      ) : (
        <div className="py-20 md:py-28">
          <div className="shell">{heading}</div>
          <div className="mt-12 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex snap-x snap-mandatory gap-5 pl-[clamp(1.25rem,5vw,3rem)]">
              {caseStudies.map((item) => (
                <div
                  key={item.id}
                  className="w-[82vw] max-w-[23rem] shrink-0 snap-start sm:w-[24rem]"
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
