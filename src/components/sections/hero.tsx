"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { Mark } from "@/components/brand/logo";
import { hero } from "@/lib/content";

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

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20"
    >
      {/* Background: subtle dot grid + ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_30%,black,transparent)]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <span className="absolute h-[50rem] w-[50rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08),transparent_60%)]" style={{ top: "-10rem", left: "50%", transform: "translateX(-50%)" }} />
      </div>

      {/* Centered Vertical Layout */}
      <motion.div
        className="relative flex flex-col items-center text-center px-6"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {/* Title */}
        <motion.div style={reduce ? undefined : { y: titleY }}>
          <Reveal>
            <h1 className="text-[clamp(2.6rem,7vw,5.8rem)] font-bold tracking-[-0.05em] text-ink leading-[0.9]">
              {hero.titleLead.split(".")[0]}.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-3 text-[clamp(1.6rem,3.5vw,3rem)] font-semibold tracking-[-0.035em] text-accent/80 leading-[1.1]">
              {hero.titleAccent}
            </h2>
          </Reveal>
        </motion.div>

        {/* Subtitle */}
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-md text-[0.88rem] leading-[1.75] text-muted/50 tracking-[-0.005em] font-normal">
            {hero.body}
          </p>
        </Reveal>

        {/* Exclusivity note */}
        <Reveal delay={0.28}>
          <p className="mt-4 text-[0.72rem] tracking-[0.08em] text-accent/35 font-medium italic">
            {hero.note}
          </p>
        </Reveal>

        {/* 3D Logo - the focal point, with generous breathing space */}
        <Reveal delay={0.3} y={40} className="relative mt-14 md:mt-20">
          <motion.div
            className="relative mx-auto aspect-square w-[18rem] max-w-[70vw] md:w-[26rem]"
            style={reduce ? undefined : { scale: logoScale, opacity: logoOpacity }}
          >
            <div
              aria-hidden
              className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08),transparent_60%)]"
            />
            <div className="relative size-full touch-none select-none">
              <HeroLogo3D />
            </div>
          </motion.div>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={0.45}>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
            <Magnetic>
              <Button
                href={hero.primaryCta.href}
                size="lg"
                className="shine px-8 py-4 text-[0.9rem] font-semibold tracking-[-0.01em]"
              >
                {hero.primaryCta.label}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                href={hero.secondaryCta.href}
                variant="ghost"
                size="lg"
                className="group text-[0.9rem] font-medium text-muted/60 hover:text-ink"
              >
                {hero.secondaryCta.label}
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </Button>
            </Magnetic>
          </div>
        </Reveal>

        {/* Scroll hint */}
        <Reveal delay={0.6}>
          <div className="mt-20 flex flex-col items-center gap-2 opacity-30">
            <span className="text-[0.6rem] tracking-[0.3em] uppercase text-muted/50 font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-muted/30 to-transparent"
            />
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}
