"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ScrollTextRevealProps = {
  children: string | ReactNode[];
  className?: string;
  accentWords?: string[];
};


export function ScrollTextReveal({
  children,
  className = "",
  accentWords = [],
}: ScrollTextRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  // If children is a string, split into words
  const words =
    typeof children === "string"
      ? children.split(" ")
      : (children as ReactNode[]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
        const isAccent =
          typeof word === "string" &&
          accentWords.some((aw) => word.toLowerCase().includes(aw.toLowerCase()));

        return (
          <motion.span
            key={i}
            style={{ opacity }}
            className={isAccent ? "text-accent" : undefined}
          >
            {word}
            {typeof word === "string" ? " " : ""}
          </motion.span>
        );
      })}
    </p>
  );
}
