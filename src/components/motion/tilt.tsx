"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TiltProps = {
  children: ReactNode;
  /** Max rotation in degrees (kept restrained: 4–6). */
  max?: number;
  className?: string;
};

/**
 * Restrained 3D tilt: the card leans a few degrees toward the cursor, with a
 * faint pointer-following sheen. Capped, GPU-only, and a no-op under reduced
 * motion / coarse pointers.
 */
export function Tilt({ children, max = 5, className }: TiltProps) {
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
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateY(${(px - 0.5) * 2 * max}deg) rotateX(${(0.5 - py) * 2 * max}deg)`;
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
      });
    };
    const onEnter = () => {
      el.style.willChange = "transform";
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "";
      el.style.willChange = "auto";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-transform duration-300 ease-[var(--ease-out-expo)] [transform-style:preserve-3d]",
        className,
      )}
    >
      {children}
    </div>
  );
}
