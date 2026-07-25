"use client";

import { useEffect, useRef } from "react";
import { caseStudies } from "@/lib/content";

/**
 * Kinetic dual-band marquee — oversized display type, alternating solid and
 * outlined rows drifting in opposite directions for depth. Pure CSS transform
 * loops (duplicated tracks keep the -50% translate gapless).
 *
 * The whole band skews and stretches with scroll velocity — fast scrolling
 * shears the type, then it eases back to rest. Disabled under reduced motion.
 */
export function Marquee() {
  const skewRef = useRef<HTMLDivElement>(null);
  const items = caseStudies.map((c) => c.name);
  const track = [...items, ...items];

  useEffect(() => {
    const el = skewRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastY = window.scrollY;
    let velocity = 0;
    let skew = 0;
    let raf = 0;
    let visible = true;

    const onScroll = () => {
      const y = window.scrollY;
      velocity = y - lastY;
      lastY = y;
    };

    const tick = () => {
      // Ease the applied skew toward a clamped, velocity-driven target.
      const target = Math.max(-8, Math.min(8, velocity * 0.28));
      skew += (target - skew) * 0.1;
      velocity *= 0.9; // decay so it settles when scrolling stops
      const stretch = 1 + Math.min(0.06, Math.abs(skew) * 0.006);
      el.style.transform = `skewX(${skew.toFixed(2)}deg) scaleY(${stretch.toFixed(3)})`;
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(tick);
        else if (!visible && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
          el.style.transform = "";
        }
      },
      { threshold: 0 },
    );
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      aria-label="Products shipped with NURONE"
      className="relative overflow-hidden border-y border-line bg-white/[0.015] py-6 select-none md:py-8"
    >
      {/* Context label / live indicator */}
      <div className="shell mb-5 flex items-center justify-between md:mb-7">
        <span className="overline text-faint">Shipped systems</span>
        <span className="inline-flex items-center gap-2 overline text-muted">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/50" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          In production
        </span>
      </div>

      <div
        ref={skewRef}
        className="relative flex flex-col gap-2 will-change-transform [mask-image:linear-gradient(90deg,transparent,black_9%,black_91%,transparent)]"
      >
        {/* Row one — solid caps, drifts left */}
        <div className="overflow-hidden">
          <ul className="animate-marquee flex w-max items-center">
            {track.map((name, i) => (
              <li
                key={`a-${name}-${i}`}
                aria-hidden={i >= items.length}
                className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 font-display text-[clamp(1.4rem,2.6vw,2.4rem)] font-medium uppercase tracking-tight text-ink/80"
              >
                {name}
                <span className="text-accent">&#9670;</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Row two — outlined caps, drifts right */}
        <div className="overflow-hidden">
          <ul className="animate-marquee-reverse flex w-max items-center">
            {track.map((name, i) => (
              <li
                key={`b-${name}-${i}`}
                aria-hidden
                className="stroke-text flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 font-display text-[clamp(1.4rem,2.6vw,2.4rem)] font-medium uppercase tracking-tight text-faint"
              >
                {name}
                <span className="text-accent/40">&#9670;</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
