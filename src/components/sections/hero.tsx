"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, Rocket, ShieldCheck, TrendingUp, Layers } from "lucide-react";
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
    transition: { duration: 0.9, ease: EASE, delay: 0.1 + i * 0.08 },
  }),
};

function Line({ i, children }: { i: number; children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        custom={i}
        variants={lineVariant}
        className="block pb-[0.08em] leading-[1.02]"
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

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-between overflow-hidden pt-32 pb-20 md:pt-40"
    >
      {/* Background ambient light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <span
          className="orb h-[42rem] w-[42rem] bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_70%)]"
          style={{ top: "-10rem", left: "50%", transform: "translateX(-50%)" }}
        />
      </div>

      {/* Vertical Hero Layout Container */}
      <motion.div
        className="shell relative flex flex-col items-center text-center"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {/* Eyebrow */}
        <Reveal>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 backdrop-blur-md">
            <span className="size-2 rounded-full bg-accent" />
            <span className="font-mono text-xs tracking-wider uppercase text-muted font-medium">
              {hero.eyebrow}
            </span>
          </div>
        </Reveal>

        {/* Central Vertical Headline */}
        <motion.h1
          initial="hidden"
          animate="show"
          className="mt-8 max-w-4xl text-[clamp(2.8rem,6.2vw,5.5rem)] font-semibold tracking-[-0.035em] text-ink"
        >
          <Line i={0}>You bring the ambition.</Line>
          <Line i={1}>
            We build the{" "}
            <span className="text-accent font-semibold">
              system
            </span>{" "}
            to scale it.
          </Line>
        </motion.h1>

        {/* Subtitle */}
        <Reveal delay={0.12}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted font-normal md:text-xl">
            {hero.body}
          </p>
        </Reveal>

        {/* Action Buttons */}
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic>
              <Button href={hero.primaryCta.href} size="lg" className="shine px-8 py-4 text-base font-medium">
                {hero.primaryCta.label}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Magnetic>
            <a
              href={hero.secondaryCta.href}
              data-hover="link"
              className="group inline-flex items-center gap-2 text-base font-medium text-ink/90 transition-colors hover:text-ink px-4 py-3"
            >
              <span className="link-underline">{hero.secondaryCta.label}</span>
              <ArrowUpRight className="size-4 text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>

        {/* Vertical 3D Logo Stage (Positioned Directly Below Text) */}
        <Reveal delay={0.24} y={30} className="w-full mt-12 md:mt-16">
          <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[26rem] md:max-w-[30rem]">
            <div className="relative size-full touch-none select-none">
              <HeroLogo3D />
            </div>
          </div>
        </Reveal>

        {/* Image 2 Inspired Luxury Badges Bar (Replacing standard table grid) */}
        <Reveal delay={0.3} className="w-full mt-16">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <div className="luxury-badge">
              <span className="luxury-badge__icon">
                <Rocket className="size-4.5" />
              </span>
              <span className="luxury-badge__pill">72h Prototype Sprint</span>
            </div>

            <div className="luxury-badge">
              <span className="luxury-badge__icon">
                <ShieldCheck className="size-4.5" />
              </span>
              <span className="luxury-badge__pill">100% Code & IP Ownership</span>
            </div>

            <div className="luxury-badge">
              <span className="luxury-badge__icon">
                <TrendingUp className="size-4.5" />
              </span>
              <span className="luxury-badge__pill">€10M+ Revenue Pipeline</span>
            </div>

            <div className="luxury-badge">
              <span className="luxury-badge__icon">
                <Layers className="size-4.5" />
              </span>
              <span className="luxury-badge__pill">07 Products Shipped</span>
            </div>
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}
