# NURONE — Homepage Redesign

A modern, futuristic redesign of the [dev.nurone.io](https://dev.nurone.io) homepage, built as a responsive, production-grade Next.js frontend for the NURONE UI/UX & Frontend Engineering Assessment.

> **Live demo:** _add your deployment URL here (e.g. https://nurone-assessment.vercel.app)_

NURONE is an AI-augmented operating team that helps founders turn ideas, broken MVPs, and stalled businesses into scalable products and revenue engines. This redesign reframes that story with a clean, futuristic, artistic art direction and a rigorously structured, accessible frontend.

---

## Technologies

| Area | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router, RSC) | Modern React, static prerendering, first-class performance |
| Language | **TypeScript** | Type-safe content model and components |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) | Design tokens live in CSS; fast, consistent, no config sprawl |
| Animation | **Framer Motion** | Accessible, declarative scroll and disclosure motion |
| Scroll Effects | **GSAP + ScrollTrigger** | Pinned sections, scrub-linked reveals, momentum scrolling |
| Smooth Scroll | **Lenis** | Buttery, designed scroll feel; wired into GSAP ticker |
| 3D | **React Three Fiber** | Interactive 3D logo in hero section |
| Icons | **lucide-react** + inline SVG | Lightweight icons; brand/social marks hand-drawn as SVG |
| Font | **Syne** (`next/font/google`) | Geometric, futuristic display typeface — self-hosted, zero layout shift |
| Utilities | `clsx`, `tailwind-merge`, `class-variance-authority` | Ergonomic, conflict-free class composition |

---

## Design decisions

### Art direction — "Clean, clear, futuristic, artistic, humanized"

The original site uses a common dark AI SaaS aesthetic. The redesign preserves the dark canvas but elevates it with:
- **Futuristic luxury** feel using Syne's geometric letterforms
- **Artistic patterns**: dot-grid backgrounds, ambient radial orbs, grain overlay
- **Humanized interaction**: cursor-tracking dot, magnetic buttons, scroll-linked reveals
- **Clean, not bombarded**: generous whitespace, clear hierarchy, restrained accent use

### Color system
- **Void** `#050711` — deep near-black canvas
- **Surface** `#0a0e20` — elevated card background with subtle blue tint
- **Surface 2** `#121833` — secondary elevation
- **Accent** `#3b82f6` — electric blue for interactive elements and highlights
- **Ink** `#f5f7fd` — primary text
- **Muted** `#94a3b8` — secondary text

### Typography
- **Syne** carries every headline and key numeral — geometric, bold, futuristic
- Scroll-linked word-by-word reveal for section headings
- Monospace `.overline` utility for section eyebrows (small, uppercase, tracked)

### Motion & interaction
- **Preloader**: Cinematic 000→100 counter with progress bar, skips for reduced motion
- **Lenis smooth scroll**: Wired into GSAP ScrollTrigger for unified momentum
- **Scroll-linked reveals**: Words fade in on scroll for section headings
- **Typewriter testimonials**: Letter-by-letter quote display with blinking cursor
- **Marquee ribbon**: Dual-row bidirectional partner logos, scroll-linked direction
- **3D hero logo**: Interactive React Three Fiber model with cursor-following rotation
- **Custom cursor**: Minimal accent dot on fine-pointer devices

### Layout
- **10-section homepage**: Hero → Marquee → Pillars → Statement → Labs → Case Studies → Process → Testimonials → FAQ → CTA
- **Collapsible navbar**: Hides on scroll-down, reveals on scroll-up
- **Responsive grids**: Asymmetric pillar cards (5/4/3 columns), stacked mobile
- **Solid card backgrounds**: `bg-surface` with `box-shadow`, not transparent glass

### Accessibility
- Semantic landmarks (`header`/`main`/`nav`/`footer`)
- Accessible accordion (`aria-expanded` / `aria-controls` / `role="region"`)
- `prefers-reduced-motion`: Preloader skipped, Lenis disabled, all animations reduced
- Visible focus rings with accent color
- Labelled form controls and interactive elements
- AA-minded contrast ratios for text

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Fonts (Syne), metadata, grain overlay, JSON-LD
│   ├── page.tsx            # Homepage composition (10 sections)
│   ├── globals.css         # Design tokens (@theme), patterns, animations
│   └── icon.svg            # Brand favicon
├── components/
│   ├── brand/
│   │   └── logo.tsx        # Mark + Wordmark + StrokeText
│   ├── layout/
│   │   ├── navbar.tsx      # Sticky nav with collapse/expand + mobile menu
│   │   ├── footer.tsx      # Footer with nav, socials, newsletter
│   │   └── newsletter-form.tsx
│   ├── motion/
│   │   ├── cursor.tsx      # Minimal accent dot cursor
│   │   ├── preloader.tsx   # Cinematic 000→100 intro
│   │   ├── scroll-progress.tsx
│   │   ├── smooth-scroll.tsx  # Lenis + GSAP integration
│   │   ├── magnetic.tsx    # Magnetic hover effect
│   │   ├── tilt.tsx        # Tilt hover effect
│   │   ├── text-scramble.tsx
│   │   └── count-up.tsx    # Animated counter
│   ├── sections/
│   │   ├── hero.tsx        # Vertical hero: title → subtitle → 3D logo → CTAs
│   │   ├── hero-logo-3d.tsx  # React Three Fiber 3D logo
│   │   ├── marquee.tsx     # Dual-row scroll-linked partner ribbon
│   │   ├── pillars.tsx     # "The Problem We Solve" — asymmetric card grid
│   │   ├── statement.tsx   # Core belief — scroll-linked word reveal
│   │   ├── labs.tsx        # Lab System cards (static + deck scroll mode)
│   │   ├── case-studies.tsx  # Production work cards, horizontal scroll
│   │   ├── process.tsx     # "How it works" — 5-step process
│   │   ├── testimonials.tsx  # Typewriter letter-by-letter quotes
│   │   ├── faq.tsx         # Accordion FAQ with cursor-follow glow
│   │   └── cta.tsx         # Request Access CTA
│   └── ui/
│       ├── button.tsx      # Variants: accent, solid, outline, ghost
│       ├── section-heading.tsx  # Reusable heading with scroll-linked word reveal
│       ├── reveal.tsx      # IntersectionObserver scroll-triggered fade+rise
│       ├── scroll-text-reveal.tsx
│       └── custom-icons.tsx  # Custom SVG icons for sections
└── lib/
    ├── content.ts          # Typed single source of truth for all page data
    └── utils.ts            # cn() class helper
```

Content is fully decoupled from presentation in `src/lib/content.ts`, so copy and data can change without touching layout.

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
2. Import it at [vercel.com/new](https://vercel.com/new) — the framework preset is detected automatically.
3. Deploy. No environment variables are required.

---

## Performance & accessibility

- Homepage is **statically prerendered** — fast TTFB, cache-friendly
- Fonts are self-hosted via `next/font` with `display: swap` (no CLS, no third-party requests)
- 3D logo is lazy-loaded only in the hero viewport
- All motion respects `prefers-reduced-motion` (preloader skipped, Lenis disabled, animations reduced)
- Semantic HTML, keyboard-navigable accordion, visible focus rings, and labelled inputs throughout
- Grain overlay and background patterns use `pointer-events: none` to avoid interaction interference
- Custom cursor only activates on fine-pointer devices

---

## Assumptions

- **Home page only** was in scope; nav/footer links point to in-page anchors as placeholders
- The newsletter form is a **frontend-only** demo (client-side validation + success state)
- Copy was adapted from the live site for clarity and hierarchy; product facts, case studies, and testimonials are preserved
- Branding (type, color, spacing, layout) was intentionally redesigned as permitted by the brief
- The 3D logo uses a simplified geometric shape as placeholder (custom GLTF models can replace it)
