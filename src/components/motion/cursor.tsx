"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    if (!fine || reduced || !dot) return;

    document.documentElement.setAttribute("data-cursor", "on");

    const onMove = (e: PointerEvent) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const setVisible = (v: boolean) => { dot.style.opacity = v ? "1" : "0"; };
    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", hide);
    document.addEventListener("pointerenter", show);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("pointerenter", show);
      document.documentElement.removeAttribute("data-cursor");
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden />;
}
