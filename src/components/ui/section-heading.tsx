import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { TextScramble } from "@/components/motion/text-scramble";

type SectionHeadingProps = {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {/* Oversized outlined chapter watermark */}
      {index ? (
        <span
          aria-hidden
          className="chapter-ghost pointer-events-none absolute -top-10 right-0 hidden text-[9rem] leading-none opacity-60 lg:block xl:text-[12rem]"
        >
          {index}
        </span>
      ) : null}

      {eyebrow ? (
        <Reveal>
          <div
            className={cn(
              "flex items-center gap-3",
              align === "center" && "justify-center",
            )}
          >
            <span className="h-px w-8 bg-accent" />
            <TextScramble text={eyebrow} className="overline" />
            {index ? (
              <span className="overline text-faint">Chapter {index}</span>
            ) : null}
          </div>
        </Reveal>
      ) : null}

      <Reveal delay={0.05}>
        <h2 className="mt-6 max-w-3xl text-[1.85rem] leading-[1.05] tracking-[-0.03em] sm:text-[2.2rem] md:text-[2.7rem]">
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
