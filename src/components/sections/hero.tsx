"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
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

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20"
    >
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <span
          className="absolute h-[60rem] w-[60rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.10),transparent_60%)]"
          style={{ top: "-12rem", left: "50%", transform: "translateX(-50%)" }}
        />
      </div>

      {/* Centered Vertical Layout */}
      <motion.div
        className="relative flex flex-col items-center text-center"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {/* Title */}
        <Reveal>
          <h1 className="text-[clamp(2.8rem,6vw,5.2rem)] font-bold tracking-[-0.045em] text-ink leading-[0.9]">
            {hero.titleLead.split(".")[0]}.
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-[clamp(1rem,1.8vw,1.2rem)] leading-[1.65] text-muted/90 tracking-[-0.01em] font-normal">
            {hero.body.split(".").slice(0, 2).join(".")}.
          </p>
        </Reveal>

        {/* 3D Logo - centered, with breathing space */}
        <Reveal delay={0.3} y={30} className="relative mt-12 md:mt-16">
          <motion.div
            className="relative mx-auto aspect-square w-[20rem] max-w-[80vw] md:w-[28rem]"
            style={reduce ? undefined : { scale: logoScale, opacity: logoOpacity }}
          >
            {/* Subtle glow ring */}
            <div
              aria-hidden
              className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08),transparent_65%)]"
            />
            <div className="relative size-full touch-none select-none">
              <HeroLogo3D />
            </div>
          </motion.div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.45}>
          <div className="mt-10 flex items-center">
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
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}
