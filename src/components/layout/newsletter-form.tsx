"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

type Status = "idle" | "error" | "success";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <label htmlFor="newsletter-email" className="text-sm font-medium text-ink">
        Stay in the loop
      </label>
      <p className="mt-1.5 text-[0.82rem] leading-[1.6] text-muted/55">
        Quarterly signal on building and scaling products. No noise, no spam.
      </p>

      {status === "success" ? (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
          <Check className="size-4" strokeWidth={2.5} />
          You&apos;re on the list. Talk soon.
        </p>
      ) : (
        <div className="mt-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id="newsletter-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              aria-invalid={status === "error"}
              aria-describedby={status === "error" ? "newsletter-error" : undefined}
              className="h-11 flex-1 rounded-full border border-line-strong bg-white/[0.03] px-4 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
            />
            <button
              type="submit"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-void transition-colors hover:bg-accent-dim"
            >
              Subscribe
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
          {status === "error" ? (
            <p id="newsletter-error" role="alert" className="mt-2 text-xs text-danger">
              Please enter a valid email address.
            </p>
          ) : null}
        </div>
      )}
    </form>
  );
}
