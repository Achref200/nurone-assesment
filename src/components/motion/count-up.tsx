"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Full display string, e.g. "72h", "€10M+", "100%", "07". */
  value: string;
  className?: string;
  /** Animation length in ms. */
  duration?: number;
};

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Split "€10M+" → ["€", "10", "M+"] (prefix / number / suffix). */
function parse(value: string) {
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const clean = numStr.replace(/,/g, "");
  const decimals = clean.includes(".") ? clean.split(".")[1].length : 0;
  const pad = numStr.length - (numStr.startsWith("-") ? 1 : 0);
  return {
    prefix,
    suffix,
    target: parseFloat(clean),
    decimals,
    hasLeadingZero: /^0\d/.test(numStr),
    width: pad,
  };
}

/**
 * Counts a numeral up from 0 when it scrolls into view, using rAF with an
 * eased (not linear) progress curve. Prefix/suffix and leading zeros are
 * preserved. SSR / reduced-motion render the final value directly.
 */
export function CountUp({ value, className, duration = 1600 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const parsed = parse(value);
    if (!el || !parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { prefix, suffix, target, decimals, hasLeadingZero, width } = parsed;

    const format = (n: number) => {
      let body =
        decimals > 0 ? n.toFixed(decimals) : String(Math.round(n));
      if (hasLeadingZero) body = body.padStart(width, "0");
      return `${prefix}${body}${suffix}`;
    };

    // Prime to zero on the next frame (dodges a final→0 flash and the
    // set-state-in-effect lint by staying asynchronous).
    let raf = requestAnimationFrame(() => setDisplay(format(0)));

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          setDisplay(format(target * easeOutExpo(t)));
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
