"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, MoveDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { CountUp } from "@/components/motion/count-up";
import { Mark } from "@/components/brand/logo";
import { hero, stats } from "@/lib/content";

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
        className="block pb-[0.1em] leading-[0.98]"
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
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 md:pt-36"
    >
      {/* Subtle ambient light gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <span
          className="orb h-[40rem] w-[40rem] bg-[radial-gradient(circle,rgba(85,123,255,0.18),transparent_70%)]"
          style={{ top: "-10rem", right: "-10rem" }}
        />
        <span
          className="orb h-[32rem] w-[32rem] bg-[radial-gradient(circle,rgba(165,180,252,0.12),transparent_70%)]"
          style={{ bottom: "2rem", left: "-8rem", animationDelay: "-8s" }}
        />
      </div>

      {/* Main hero grid */}
      <motion.div
        className="shell relative flex flex-1 items-center py-8 lg:py-12"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="grid w-full items-center gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          {/* Editorial Copy Column */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md">
                <span className="size-2 rounded-full bg-accent" />
                <span className="font-mono text-xs tracking-wider uppercase text-muted">
                  {hero.eyebrow}
                </span>
              </div>
            </Reveal>

            <motion.h1
              initial="hidden"
              animate="show"
              className="mt-8 text-[clamp(2.6rem,5.6vw,5.2rem)] font-medium tracking-[-0.04em] text-ink"
            >
              <Line i={0}>You bring the ambition.</Line>
              <Line i={1}>
                We build the{" "}
                <span className="font-serif italic font-normal text-accent">
                  system
                </span>
              </Line>
              <Line i={2}>to scale it.</Line>
            </motion.h1>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted font-normal">
                {hero.body}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <Magnetic>
                  <Button href={hero.primaryCta.href} size="lg" className="shine px-8 py-4 text-base">
                    {hero.primaryCta.label}
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </Magnetic>
                <a
                  href={hero.secondaryCta.href}
                  data-hover="link"
                  className="group inline-flex items-center gap-2 text-base font-medium text-ink/90 transition-colors hover:text-ink"
                >
                  <span className="link-underline">{hero.secondaryCta.label}</span>
                  <ArrowUpRight className="size-4 text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-10 flex items-center gap-3 text-sm text-faint">
                <span className="h-px w-8 shrink-0 bg-line-strong" />
                {hero.note}
              </p>
            </Reveal>
          </div>

          {/* Clean Studio 3D Mark Stage */}
          <Reveal delay={0.2} y={24} className="lg:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-[24rem] sm:max-w-[28rem] lg:max-w-[32rem]">
              <div className="relative size-full touch-none select-none">
                <HeroLogo3D />
              </div>

              {/* Minimalist interactive hint */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-line bg-void/80 px-3.5 py-1 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[0.68rem] tracking-wider uppercase text-faint">
                  Drag to rotate
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </motion.div>

      {/* Bottom Editorial Stats Bar */}
      <div className="relative mt-auto border-t border-line">
        <div className="shell">
          <dl className="grid grid-cols-2 items-stretch md:grid-cols-[auto_repeat(4,1fr)]">
            <div className="col-span-2 hidden items-center gap-3 py-6 pr-8 md:col-span-1 md:flex border-r border-line">
              <MoveDown className="size-4 text-accent animate-bounce" />
              <span className="font-mono text-xs tracking-wider uppercase text-faint">
                Scroll to explore
              </span>
            </div>
            {stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 0.05}
                className="flex flex-col gap-1 py-6 md:pl-8 border-r border-line last:border-r-0"
              >
                <dd className="numeral text-3xl font-semibold text-ink md:text-4xl">
                  <CountUp value={stat.value} />
                </dd>
                <dt className="text-sm text-muted">{stat.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
