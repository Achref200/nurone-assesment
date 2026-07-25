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
import { TextScramble } from "@/components/motion/text-scramble";
import { Mark } from "@/components/brand/logo";
import { hero, stats } from "@/lib/content";
import { SignalField } from "./signal-field";

const EASE = [0.16, 1, 0.3, 1] as const;

const HeroLogo3D = dynamic(
  () => import("./hero-logo-3d").then((m) => m.HeroLogo3D),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full w-full place-items-center">
        <Mark className="size-20 animate-pulse text-accent/40" />
      </div>
    ),
  },
);

const lineVariant = {
  hidden: { y: "115%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.95, ease: EASE, delay: 0.15 + i * 0.1 },
  }),
};

/** One masked headline line that rises into view. */
function Line({ i, children }: { i: number; children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        custom={i}
        variants={lineVariant}
        className="block pb-[0.12em] leading-[1.0]"
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Floating glass spec chip anchored around the 3D mark. */
function SpecChip({
  className,
  k,
  v,
  float = "float-slow",
  delay = 0,
}: {
  className: string;
  k: string;
  v: string;
  float?: string;
  delay?: number;
}) {
  return (
    <div
      className={`glass-strong ${float} absolute z-20 hidden items-center gap-2.5 rounded-full px-3.5 py-2 md:flex ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--accent-glow)]" />
      <span className="numeral text-sm text-ink">{v}</span>
      <span className="overline text-faint">{k}</span>
    </div>
  );
}

/** Live "build feed" streamed inside the console card. */
const feed = [
  "N—OS kernel · online",
  "surface scan · complete",
  "architecture · provisioning",
  "ai agents · 12 active",
  "prototype · ready in 72h",
  "ownership · transferred",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const modelY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 md:pt-32"
    >
      {/* ---- Ambient background stack (scroll-parallaxed) ---- */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={reduce ? undefined : { y: bgY, scale: bgScale }}
      >
        <SignalField />
        {/* drifting aurora orbs */}
        <span
          className="orb h-[34rem] w-[34rem] bg-[radial-gradient(circle,rgba(85,123,255,0.5),transparent_65%)]"
          style={{ top: "-8rem", right: "-6rem" }}
        />
        <span
          className="orb h-[26rem] w-[26rem] bg-[radial-gradient(circle,rgba(165,180,252,0.28),transparent_65%)]"
          style={{ bottom: "2rem", left: "-8rem", animationDelay: "-8s" }}
        />
        {/* perspective floor grid */}
        <div className="floor-grid absolute inset-x-0 bottom-0 h-[42%]" />
      </motion.div>

      {/* ---- HUD frame — corner brackets + telemetry (desktop) ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="shell relative h-full py-6">
          <span className="absolute left-0 top-6 size-5 border-l-2 border-t-2 border-line-strong/70" />
          <span className="absolute right-0 top-6 size-5 border-r-2 border-t-2 border-line-strong/70" />
          <span className="absolute bottom-6 left-0 size-5 border-b-2 border-l-2 border-line-strong/70" />
          <span className="absolute bottom-6 right-0 size-5 border-b-2 border-r-2 border-line-strong/70" />
          <span className="absolute left-8 top-4 overline text-faint/80">
            N—OS · v2.4
          </span>
          <span className="absolute right-8 top-4 inline-flex items-center gap-2 overline text-faint/80">
            <span className="size-1.5 rounded-full bg-accent pulse-soft" />
            system · operational
          </span>
        </div>
      </div>

      {/* ---- Main content ---- */}
      <motion.div
        className="shell relative flex flex-1 items-center py-8 lg:py-10"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="grid w-full items-center gap-y-14 lg:grid-cols-12 lg:gap-x-8">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] py-1.5 pl-2.5 pr-4 backdrop-blur-sm">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/60" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                <TextScramble
                  text={hero.eyebrow}
                  className="overline text-ink/90"
                />
              </div>
            </Reveal>

            <motion.h1
              initial="hidden"
              animate="show"
              className="mt-7 text-[clamp(2.5rem,5.4vw,4.9rem)] font-semibold leading-[1.0] tracking-[-0.045em] text-ink"
            >
              <Line i={0}>You bring the ambition.</Line>
              <Line i={1}>
                We build the{" "}
                <span className="text-shimmer italic">system</span>
              </Line>
              <Line i={2}>to scale it.</Line>
            </motion.h1>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-xl text-fluid text-muted">{hero.body}</p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <Magnetic>
                  <Button href={hero.primaryCta.href} size="lg" className="shine">
                    {hero.primaryCta.label}
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </Magnetic>
                <a
                  href={hero.secondaryCta.href}
                  data-hover="link"
                  className="group inline-flex items-center gap-2 text-[0.95rem] font-medium text-ink"
                >
                  <span className="link-underline">{hero.secondaryCta.label}</span>
                  <ArrowUpRight className="size-4 text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-8 flex max-w-md items-center gap-3 text-sm text-faint">
                <span className="h-px w-8 shrink-0 bg-line-strong" />
                {hero.note}
              </p>
            </Reveal>
          </div>

          {/* 3D mark stage */}
          <Reveal delay={0.2} y={28} className="lg:col-span-6">
            <motion.div
              className="relative mx-auto aspect-square w-full max-w-[24rem] sm:max-w-[28rem] lg:max-w-[36rem]"
              style={reduce ? undefined : { y: modelY }}
            >
              {/* rotating reactor beam */}
              <div aria-hidden className="beam absolute inset-0 -z-10" />
              {/* radial spotlight */}
              <div aria-hidden className="glow absolute inset-8 -z-10 opacity-80" />

              {/* orbital rings — counter-rotating for depth */}
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                className="orbit pointer-events-none absolute inset-0 size-full text-line-strong"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  strokeDasharray="1 3"
                />
                <circle cx="50" cy="3" r="1.3" fill="var(--color-accent)" />
              </svg>
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                className="orbit-reverse pointer-events-none absolute inset-[9%] size-[82%] text-line"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  strokeDasharray="0.5 4"
                />
                <circle cx="98" cy="50" r="1" fill="var(--color-accent-2)" />
              </svg>

              <div className="relative size-full touch-none select-none">
                <HeroLogo3D />
              </div>

              {/* floating spec chips */}
              <SpecChip
                className="-left-2 top-10"
                v="72h"
                k="first build"
                float="float-slow"
              />
              <SpecChip
                className="-right-2 top-[28%]"
                v="100%"
                k="ownership"
                float="float-slower"
                delay={1}
              />

              {/* live console card */}
              <div className="glass-strong float-slowest absolute -bottom-3 -right-2 hidden w-52 overflow-hidden rounded-2xl p-3 lg:block">
                <div className="flex items-center gap-1.5">
                  <span className="win-dot" />
                  <span className="win-dot" />
                  <span className="win-dot" />
                  <span className="ml-auto inline-flex items-center gap-1.5 overline text-faint/80">
                    <span className="size-1.5 rounded-full bg-success pulse-soft" />
                    live
                  </span>
                </div>
                <div className="mt-2 h-[4.5rem] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_28%,black_72%,transparent)]">
                  <ul className="ticker-up space-y-1.5">
                    {[...feed, ...feed].map((line, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 font-mono text-[0.62rem] text-muted"
                      >
                        <span className="size-1 shrink-0 rounded-full bg-accent" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* drag hint */}
              <div className="absolute bottom-1 left-1 flex items-center gap-2 md:bottom-2 md:left-2">
                <span className="size-1.5 rounded-full bg-accent" />
                <span className="overline text-faint">Drag to rotate</span>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </motion.div>

      {/* ---- Bottom telemetry bar — stats + scroll cue ---- */}
      <div className="relative mt-auto">
        <div aria-hidden className="rule-accent" />
        <div className="shell">
          <dl className="grid grid-cols-2 items-stretch md:grid-cols-[auto_repeat(4,1fr)]">
            <div className="col-span-2 hidden items-center gap-3 py-5 pr-6 md:col-span-1 md:flex">
              <MoveDown className="size-4 animate-bounce text-accent" />
              <span className="overline text-faint">Scroll to explore</span>
            </div>
            {stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 0.06}
                className="flex flex-col gap-1 py-5 md:border-l md:border-line md:pl-6"
              >
                <dd className="numeral text-3xl text-ink md:text-[2.25rem]">
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
