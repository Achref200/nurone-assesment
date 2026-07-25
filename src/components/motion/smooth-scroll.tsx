"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide momentum scrolling (Lenis) wired into GSAP ScrollTrigger so every
 * pinned / scrubbed section rides the same smoothed scroll position — this is
 * what gives the page its buttery, "designed" feel.
 *
 * - Driven by GSAP's ticker (single rAF for the whole page, no double loop).
 * - `prefers-reduced-motion`: Lenis is skipped entirely; native scroll is used.
 * - Anchor links (`#labs`, …) are intercepted and eased with the nav offset.
 * - Held stopped until the intro preloader fires `nurone:reveal`, so the page
 *   can't be scrolled behind the curtain.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    // Feed Lenis' virtual scroll into ScrollTrigger.
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Publish velocity for scroll-reactive effects (marquee skew, etc.).
    const root = document.documentElement;
    lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      root.style.setProperty("--scroll-velocity", velocity.toFixed(3));
    });

    // Hold until the intro curtain lifts.
    const introPending =
      sessionStorage.getItem("nurone-intro") !== "1" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (introPending) lenis.stop();
    const reveal = () => {
      lenis.start();
      ScrollTrigger.refresh();
    };
    window.addEventListener("nurone:reveal", reveal);

    // Ease in-page anchor navigation with the fixed-nav offset. Next's <Link>
    // components pass `scroll={false}`, so Lenis is the only thing that scrolls.
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      // Scroll to an explicit position (raw number) so CSS scroll-margin /
      // scroll-padding don't compound — just clear the fixed nav.
      const y =
        (target as HTMLElement).getBoundingClientRect().top +
        window.scrollY -
        80;
      lenis.scrollTo(y, { duration: 1.3 });
      if (location.hash !== id) history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("nurone:reveal", reveal);
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return null;
}
