"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { TextScramble } from "@/components/motion/text-scramble";
import { navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const menuSocials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/nurone" },
  { label: "X", href: "https://x.com/nurone_io" },
  { label: "Instagram", href: "https://www.instagram.com/nurone.io" },
];

export function Navbar() {
  const [atTop, setAtTop] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setAtTop(y < 30);
      if (Math.abs(y - lastY.current) > 5) {
        setCollapsed(y > lastY.current && y > 140);
        lastY.current = y;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    window.dispatchEvent(
      new CustomEvent("nurone:scroll-lock", { detail: open }),
    );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const expanded = atTop || hovered || !collapsed;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 md:pt-4">
      <motion.nav
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        initial={false}
        animate={{ scale: expanded ? 1 : 0.97, opacity: open ? 0 : 1 }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{ pointerEvents: open ? "none" : "auto" }}
        aria-hidden={open}
        className={cn(
          "relative z-[60] flex items-center gap-3 rounded-full border px-3 py-2 transition-colors duration-500 md:gap-4 md:pl-5 md:pr-3",
          atTop && expanded
            ? "border-transparent bg-white/[0.02] backdrop-blur-sm"
            : "border-line bg-void/70 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl backdrop-saturate-150",
        )}
      >
        <Link
          href="#top"
          aria-label="NURONE — home"
          scroll={false}
          className="shrink-0 rounded-lg pl-1 transition-opacity hover:opacity-70"
        >
          <Logo />
        </Link>

        <motion.div
          initial={false}
          animate={{ width: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="hidden overflow-hidden lg:block"
        >
          <ul className="flex items-center gap-7 whitespace-nowrap px-2">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-hover="link"
                  scroll={false}
                  className="group inline-flex items-baseline gap-1.5 text-sm text-muted transition-colors hover:text-ink"
                >
                  <span className="numeral text-[0.7rem] text-faint/60 transition-colors group-hover:text-accent">
                    0{i + 1}
                  </span>
                  <TextScramble
                    text={link.label}
                    trigger="hover"
                    speed={22}
                    className="link-underline"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="hidden shrink-0 items-center lg:flex">
          <Magnetic>
            <Button href="#access" size="sm" className="pr-3.5">
              Request Access
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Magnetic>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-white/[0.05] lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-sheet"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="fixed inset-0 z-40 overflow-hidden bg-void lg:hidden"
          >
            <span
              aria-hidden
              className="orb h-[26rem] w-[26rem] bg-[radial-gradient(circle,rgba(85,123,255,0.4),transparent_65%)]"
              style={{ top: "-6rem", right: "-6rem" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(120%_80%_at_80%_0%,black,transparent_75%)]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />

            <div className="relative flex h-[100dvh] flex-col px-6 pb-9 pt-6">
              <div className="flex items-center justify-between">
                <Link
                  href="#top"
                  scroll={false}
                  onClick={() => setOpen(false)}
                  aria-label="NURONE — home"
                  className="rounded-lg transition-opacity hover:opacity-70"
                >
                  <Logo />
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  data-hover="link"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.03] py-2 pl-5 pr-2 text-sm text-ink transition-colors hover:border-accent/50 hover:text-accent"
                >
                  Close
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-void">
                    <X className="size-[18px]" />
                  </span>
                </button>
              </div>

              <motion.ul
                className="flex flex-1 flex-col justify-center"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
                }}
              >
                {navLinks.map((link, i) => (
                  <li key={link.href} className="border-b border-line/70">
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      scroll={false}
                      className="group flex items-center justify-between gap-4 py-3.5 sm:py-4"
                    >
                      <span className="flex items-baseline gap-4 overflow-hidden">
                        <span className="numeral text-sm text-faint/60">
                          0{i + 1}
                        </span>
                        <span className="overflow-hidden">
                          <motion.span
                            className="block font-display text-[clamp(2rem,9vw,2.9rem)] leading-none tracking-tight text-ink transition-colors group-hover:text-accent"
                            variants={{
                              hidden: { y: "110%" },
                              show: { y: 0, transition: { duration: 0.7, ease: EASE } },
                            }}
                          >
                            {link.label}
                          </motion.span>
                        </span>
                      </span>
                      <ArrowUpRight className="size-6 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                    </Link>
                  </li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6, ease: EASE }}
                className="flex flex-col gap-6"
              >
                <Button
                  href="#access"
                  size="lg"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Request Access
                  <ArrowUpRight className="size-4" />
                </Button>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {menuSocials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted/60 transition-colors hover:text-ink"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                  <span className="overline text-faint/60">Est. 2024</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
