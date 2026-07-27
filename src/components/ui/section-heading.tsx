"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  const words = title.split(" ");

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "overline text-muted/30 mb-6",
            align === "center" && "text-center",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2 className="max-w-3xl text-[clamp(1.65rem,5vw,3.8rem)] font-bold leading-[0.95] tracking-[-0.04em] text-ink">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          const opacity = useTransform(scrollYProgress, [start, end], [0.08, 1]);
          return (
            <motion.span key={i} style={{ opacity }}>
              {word}{" "}
            </motion.span>
          );
        })}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-6 max-w-2xl text-[1rem] leading-[1.7] text-muted/65 tracking-[-0.005em]",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
