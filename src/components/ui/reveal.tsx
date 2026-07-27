"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Delay in seconds before the transition starts (used for stagger). */
  delay?: number;
  /** Vertical offset (px) to rise from. */
  y?: number;
  /** Horizontal offset (px) to slide from (for directional reveals). */
  x?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 22, x = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = {
    "--reveal-delay": `${Math.round(delay * 1000)}ms`,
    "--reveal-y": `${y}px`,
    "--reveal-x": `${x}px`,
  } as CSSProperties;

  return (
    <div ref={ref} className={cn("reveal", className)} style={style}>
      {children}
    </div>
  );
}

