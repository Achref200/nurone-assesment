"use client";

import { useEffect } from "react";

/**
 * Publishes the raw scroll offset to a single CSS custom property
 * (`--scroll` on <html>) from ONE rAF-throttled listener — not per element.
 * Parallax layers then read it via `calc(var(--scroll) * -0.15px)` etc.,
 * so continuous scroll effects cost one write per frame, GPU-composited.
 *
 * Disabled entirely under `prefers-reduced-motion`.
 */
export function useScrollProgress() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let ticking = false;

    const update = () => {
      root.style.setProperty("--scroll", String(window.scrollY));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
