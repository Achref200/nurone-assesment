# NURONE — Homepage Redesign

A modern, editorial redesign of the [dev.nurone.io](https://dev.nurone.io) homepage, built as a
responsive, production-grade Next.js frontend.

> **Live demo:** _add your deployment URL here (e.g. https://nurone-assessment.vercel.app)_

NURONE is an AI-augmented operating team that helps founders turn ideas, broken MVPs, and stalled
businesses into scalable products and revenue engines. This redesign reframes that story with a
confident, human art direction and a rigorously structured, accessible frontend.

---

## Technologies used

| Area | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router, RSC) | Modern React, static prerendering, first-class performance |
| Language | **TypeScript** | Type-safe content model and components |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) | Design tokens live in CSS; fast, consistent, no config sprawl |
| Animation | **Framer Motion** | Accessible, declarative scroll and disclosure motion |
| Icons | **lucide-react** + inline SVG | Lightweight icons; brand/social marks hand-drawn as SVG |
| Fonts | **Fraunces** + **Inter** (`next/font`) | Serif display for warmth, grotesque for UI clarity — self-hosted, zero layout shift |
| Utilities | `clsx`, `tailwind-merge`, `class-variance-authority` | Ergonomic, conflict-free class composition |

---

## Design decisions

The original site uses the now-ubiquitous "AI SaaS" aesthetic — near-black canvas, neon accent,
glows, and gradient text. The redesign deliberately moves in the opposite direction to feel
**crafted, premium, and human**.

### Art direction — "Editorial engineering"
A warm, Swiss-influenced editorial system: a bone-paper canvas, espresso ink, and a single
restrained ember accent. The look references design-studio and premium-fintech typography rather
than template landing pages.

### Typography
- **Fraunces** (an optical serif with real character) carries every headline and key numeral,
  giving the page a hand-set, human quality. An **italic ember word** anchors each major statement.
- **Inter** handles body copy and UI for maximum legibility.
- Restraint on monospace/uppercase "eyebrows" — replaced with hairline ticks + small-caps labels.

### Color
- `paper #EEEAE1` · `card #F7F4EE` · `ink #1B1813` · `muted #6C665B`
- Accent **ember `#C1451D`**, used sparingly (numerals, links, the italic word, small marks).
- Two **inverted ink sections** (the "Our bias" band and the closing CTA/footer) create tonal
  rhythm and drama instead of relying on glows.

### Layout & hierarchy
- A **12-column editorial hero** pairs an oversized headline with a numbered "operating index".
- **Numbered sections** (`01 — The System`, `02`, `03`…), hairline rules, and generous negative
  space give a magazine-like reading rhythm.
- Case studies use a **feature card + "index of work" table** — a senior editorial pattern that
  scans quickly and scales cleanly.
- Subtle paper grain adds high-fidelity texture without noise.

### Motion & accessibility
- Scroll reveals and the FAQ disclosure use Framer Motion, and **all motion respects
  `prefers-reduced-motion`**.
- Semantic landmarks (`header`/`main`/`nav`/`footer`), an accessible accordion
  (`aria-expanded` / `aria-controls` / `role="region"`), labelled form controls, visible focus
  rings, and AA-minded contrast.

---

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx        # Fonts, metadata, grain overlay
│  ├─ page.tsx          # Homepage composition
│  ├─ globals.css       # Design tokens (@theme) + base + utilities
│  └─ icon.svg          # Brand favicon
├─ components/
│  ├─ brand/            # Logo + mark
│  ├─ ui/               # Button, Reveal, SectionHeading (primitives)
│  ├─ layout/           # Navbar, Footer, NewsletterForm
│  └─ sections/         # Hero, Pillars, Statement, Labs, CaseStudies, Process, …
└─ lib/
   ├─ content.ts        # Single typed source of truth for all page content
   └─ utils.ts          # `cn()` class helper
```

Content is fully decoupled from presentation in [`src/lib/content.ts`](src/lib/content.ts), so copy
and data can change without touching layout.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

### Scripts
```bash
npm run build    # production build (statically prerenders /)
npm run start    # serve the production build
npm run lint     # ESLint
```

---

## Deployment

The app statically prerenders and deploys to any Node/edge host with **zero configuration**.

**Vercel (recommended)**
1. Push this repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — the framework preset is detected
   automatically.
3. Deploy. No environment variables are required.

> Optionally set `NEXT_PUBLIC_SITE_URL` and update `siteConfig.url` in
> [`src/lib/content.ts`](src/lib/content.ts) so canonical/OG metadata point at your domain.

---

## Performance & accessibility

- Homepage is **statically prerendered** — fast TTFB, cache-friendly.
- Fonts are self-hosted via `next/font` with `display: swap` (no CLS, no third-party requests).
- Hero artwork is pure SVG/CSS — no hero image payload.
- Reduced-motion, semantic HTML, keyboard-navigable accordion, and labelled inputs throughout.

---

## Assumptions

- **Home page only** was in scope; nav/footer links point to in-page anchors (or `#`) as
  placeholders rather than building secondary routes.
- The newsletter form is a **frontend-only** demo (client-side validation + success state); no data
  leaves the browser. Wiring a real provider is a drop-in.
- Copy was adapted and lightly rewritten from the live site for clarity and hierarchy; product
  facts, case studies, and testimonials are preserved.
- Branding (type, color, spacing, layout) was intentionally redefined, as permitted by the brief,
  while keeping a professional SaaS tone.
```
