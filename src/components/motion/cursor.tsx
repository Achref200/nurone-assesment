"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: a crisp accent dot that tracks 1:1, plus a trailing ring
 * that catches up via rAF-lerp (organic lag — not a CSS transition). The ring
 * expands and fills with the accent glow over interactive targets.
 *
 * Rendered only on fine pointers with motion allowed; otherwise the native
 * cursor is left untouched.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!fine || reduced || !dot || !ring) return;

    document.documentElement.setAttribute("data-cursor", "on");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      const target = (e.target as HTMLElement | null)?.closest?.(
        'a, button, [data-hover="link"]',
      );
      ring.dataset.active = target ? "true" : "false";
    };

    const tick = () => {
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;
      ring.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    const setVisible = (v: boolean) => {
      const o = v ? "1" : "0";
      dot.style.opacity = o;
      ring.style.opacity = o;
    };
    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", hide);
    document.addEventListener("pointerenter", show);
    window.addEventListener("blur", hide);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("pointerenter", show);
      window.removeEventListener("blur", hide);
      document.documentElement.removeAttribute("data-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
