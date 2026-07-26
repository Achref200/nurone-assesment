import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  eyebrow?: string;
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
            <span className="h-px w-10 bg-accent/60" />
            <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-muted/80 font-medium">
              {eyebrow}
            </span>
          </div>
        </Reveal>
      ) : null}

      <Reveal delay={0.05}>
        <h2 className="mt-5 max-w-3xl text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[0.95] tracking-[-0.035em] text-ink">
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-6 max-w-2xl text-[1.05rem] leading-[1.7] text-muted/90 tracking-[-0.005em]",
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
