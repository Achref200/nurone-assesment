import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { footerNav, siteConfig } from "@/lib/content";
import { NewsletterForm } from "./newsletter-form";

/* lucide-react removed brand marks, so socials use inline SVG paths. */
const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    path: "M4.98 3.5a2 2 0 1 1-.02 4 2 2 0 0 1 .02-4ZM3.5 8.98h3v11.5h-3V8.98Zm5.5 0h2.88v1.57h.04c.4-.76 1.38-1.57 2.84-1.57 3.04 0 3.6 2 3.6 4.6v6.9h-3V14.2c0-1.28-.02-2.93-1.78-2.93-1.78 0-2.06 1.4-2.06 2.84v6.37H9V8.98Z",
  },
  {
    label: "X",
    href: "https://x.com",
    path: "M17.53 3H20.5l-6.49 7.42L21.5 21h-5.9l-4.62-6.04L5.7 21H2.72l6.94-7.94L2.5 3h6.05l4.18 5.52L17.53 3Zm-1.04 16.2h1.64L7.6 4.71H5.84L16.49 19.2Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    path: "M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17C2.41 8.5 2.4 8.85 2.4 12s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4C15.5 4.01 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-.9a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-void">
      <div className="shell pb-8 pt-16">
        <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.tagline}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  data-hover="link"
                  className="inline-flex size-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerNav).map(([heading, links]) => (
            <nav key={heading} aria-label={heading}>
              <h2 className="overline text-faint">{heading}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      scroll={false}
                      className="link-underline text-sm text-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter */}
          <div className="max-w-sm">
            <NewsletterForm />
          </div>
        </div>

        {/* Oversized wordmark */}
        <div aria-hidden className="mt-16 select-none overflow-hidden">
          <div className="font-display leading-none tracking-[-0.04em] text-white/[0.045] text-[19vw] md:text-[15.5vw]">
            NURONE
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-faint sm:flex-row">
          <p>© {new Date().getFullYear()} NURONE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="transition-colors hover:text-ink">
              Terms &amp; Conditions
            </Link>
            <Link href="#" className="transition-colors hover:text-ink">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
