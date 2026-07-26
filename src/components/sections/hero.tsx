"use client";

import { useRef, type ReactNode } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { Mark } from "@/components/brand/logo";
import { hero } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const HeroLogo3D = dynamic(
  () => import("./hero-logo-3d").then((m) => m.HeroLogo3D),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full w-full place-items-center">
        <Mark className="size-20 animate-pulse text-accent/30" />
      </div>
    ),
  },
);

const lineVariant = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1.05, ease: EASE, delay: 0.15 + i * 0.1 },
  }),
};

function Line({ i, children }: { i: number; children: ReactNode }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        custom={i}
        variants={lineVariant}
        className="block pb-[0.06em] leading-[1.0]"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20"
    >
      {/* Subtle ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <span
          className="absolute h-[50rem] w-[50rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_65%)]"
          style={{ top: "-8rem", left: "50%", transform: "translateX(-50%)" }}
        />
      </div>

      {/* Hero Content */}
      <motion.div
        className="shell relative flex flex-1 flex-col justify-center"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
          {/* Left: Editorial Text Block */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-accent/60" />
                <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-muted/80 font-medium">
                  {hero.eyebrow}
                </span>
              </div>
            </Reveal>

            {/* Main headline - editorial, artistic spacing */}
            <motion.h1
              initial="hidden"
              animate="show"
              className="mt-10 text-[clamp(2.6rem,5.5vw,4.8rem)] font-bold tracking-[-0.04em] text-ink leading-[0.92]"
            >
              <Line i={0}>You bring</Line>
              <Line i={1}>
                the <span className="text-accent">ambition.</span>
              </Line>
              <Line i={2}>
                <span className="text-muted font-medium">We engineer</span>
              </Line>
              <Line i={3}>
                the <span className="text-accent">system</span>
              </Line>
              <Line i={4}>to scale it.</Line>
            </motion.h1>

            {/* Subtitle - generous spacing */}
            <Reveal delay={0.3}>
              <p className="mt-10 max-w-lg text-[1.05rem] leading-[1.7] text-muted/90 font-normal tracking-[-0.005em]">
                {hero.body}
              </p>
            </Reveal>

            {/* CTAs - clean, minimal */}
            <Reveal delay={0.38}>
              <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <Magnetic>
                  <Button href={hero.primaryCta.href} size="lg" className="shine px-7 py-3.5 text-[0.9rem] font-semibold tracking-[-0.01em]">
                    {hero.primaryCta.label}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Magnetic>
                <a
                  href={hero.secondaryCta.href}
                  data-hover="link"
                  className="group inline-flex items-center gap-2 text-[0.9rem] font-medium text-ink/80 transition-colors hover:text-ink tracking-[-0.01em]"
                >
                  <span className="relative">
                    {hero.secondaryCta.label}
                    <span className="absolute -bottom-px left-0 h-px w-0 bg-accent/60 transition-all duration-300 group-hover:w-full" />
                  </span>
                  <ArrowUpRight className="size-3.5 text-accent/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: 3D Logo Stage - vertical, artistic placement */}
          <Reveal delay={0.2} y={40} className="relative">
            <motion.div
              className="relative mx-auto aspect-square w-full max-w-[24rem] lg:max-w-[32rem]"
              style={reduce ? undefined : { scale: logoScale, opacity: logoOpacity }}
            >
              {/* Subtle glow ring behind logo */}
              <div
                aria-hidden
                className="absolute inset-[15%] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08),transparent_70%)]"
              />
              <div className="relative size-full touch-none select-none">
                <HeroLogo3D />
              </div>
            </motion.div>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
