"use client";

import { useEffect, useRef } from "react";

/**
 * Hero backdrop — an engineered "signal field": a hairline grid masked to a
 * soft vignette, an off-center parallax aurora (never dead-center — that's the
 * #1 AI-template tell), a slow scan line, and a faint glow that tracks the
 * pointer. Everything is transform/opacity or a cheap CSS-var write; the whole
 * thing goes static under reduced motion.
 */
export function SignalField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--px", `${x}%`);
        el.style.setProperty("--py", `${y}%`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [--px:32%] [--py:24%]"
    >
      {/* Hairline grid, vignette-masked */}
      <div
        className="absolute inset-0 opacity-[0.6] [mask-image:radial-gradient(120%_100%_at_30%_0%,black,transparent_72%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "62px 62px",
        }}
      />

      {/* Off-center parallax aurora (signal lime) */}
      <div
        className="glow parallax-back h-[46rem] w-[46rem]"
        style={{ top: "-14rem", left: "-10rem" }}
      />

      {/* Pointer-tracking glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(28rem 28rem at var(--px) var(--py), rgba(85,123,255,0.12), transparent 60%)",
        }}
      />

      {/* Slow scan line */}
      <div className="scanline absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </div>
  );
}
