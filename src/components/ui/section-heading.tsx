import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

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
      {eyebrow ? (
        <Reveal>
          <div
            className={cn(
              "flex items-center gap-3",
              align === "center" && "justify-center",
            )}
          >
            <span className="h-px w-8 bg-accent" />
            <span className="font-mono text-xs tracking-widest uppercase text-accent font-medium">
              {eyebrow}
            </span>
          </div>
        </Reveal>
      ) : null}

      <Reveal delay={0.05}>
        <h2 className="mt-5 max-w-3xl text-[2rem] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[2.5rem] md:text-[3rem] text-ink">
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-relaxed text-muted font-normal md:text-lg",
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
