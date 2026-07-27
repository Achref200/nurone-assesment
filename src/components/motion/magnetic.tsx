"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  /** Fraction of the cursor→center offset applied as displacement. */
  strength?: number;
  /** Hard cap on displacement in px (keep restrained). */
  max?: number;
  className?: string;
};

export function Magnetic({
  children,
  strength = 0.3,
  max = 8,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const relX = e.clientX - (r.left + r.width / 2);
      const relY = e.clientY - (r.top + r.height / 2);
      const x = Math.max(-max, Math.min(max, relX * strength));
      const y = Math.max(-max, Math.min(max, relY * strength));
      el.style.transform = `translate(${x}px, ${y}px)`;
    };

    const onEnter = () => {
      el.style.willChange = "transform";
    };
    const onLeave = () => {
      el.style.transform = "";
      el.style.willChange = "auto";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength, max]);

  return (
    <span
      ref={ref}
      className={cn("inline-block transition-transform duration-300 ease-[var(--ease-out-expo)]", className)}
    >
      {children}
    </span>
  );
}
