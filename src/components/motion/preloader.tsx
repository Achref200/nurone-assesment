"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Mark } from "@/components/brand/logo";

/**
 * Cinematic intro: a mono counter races 000 → 100 while a rail fills, then the
 * whole panel wipes up to reveal the site. Shown once per session; skipped
 * entirely under reduced motion (content is simply visible).
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const seen = sessionStorage.getItem("nurone-intro") === "1";
      if (reduced || seen) {
        requestAnimationFrame(() => {
          setDone(true);
          window.dispatchEvent(new Event("nurone:reveal"));
        });
        return;
      }

      document.body.style.overflow = "hidden";
      const counter = { v: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          sessionStorage.setItem("nurone-intro", "1");
          setDone(true);
          window.dispatchEvent(new Event("nurone:reveal"));
        },
      });

      tl.to(".preloader__bar", { scaleX: 1, duration: 1.35, ease: "power2.inOut" }, 0)
        .to(
          counter,
          {
            v: 100,
            duration: 1.35,
            ease: "power2.inOut",
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
              }
            },
          },
          0,
        )
        .to(".preloader__inner", { opacity: 0, y: -12, duration: 0.4, ease: "power2.in" }, ">-0.05")
        .to(root.current, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, ">");
    },
    { scope: root },
  );

  useEffect(() => () => {
    document.body.style.overflow = "";
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="preloader" aria-hidden>
      <div className="preloader__inner relative z-10 flex flex-col items-center gap-6">
        <Mark className="size-10 text-accent" />
        <span ref={countRef} className="numeral text-5xl text-ink md:text-6xl">
          000
        </span>
        <span className="overline text-faint">Initialising system</span>
      </div>
      <span className="preloader__bar" />
    </div>
  );
}
