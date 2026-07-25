"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";

/** Mount-once side-effect component that drives the global `--scroll` var. */
export function ScrollProgress() {
  useScrollProgress();
  return null;
}
