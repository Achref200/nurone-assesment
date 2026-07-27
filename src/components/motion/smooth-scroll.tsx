"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const root = document.documentElement;
    lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      root.style.setProperty("--scroll-velocity", velocity.toFixed(3));
    });

    const introPending =
      sessionStorage.getItem("nurone-intro") !== "1" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (introPending) lenis.stop();
    const reveal = () => {
      lenis.start();
      ScrollTrigger.refresh();
    };
    window.addEventListener("nurone:reveal", reveal);

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
