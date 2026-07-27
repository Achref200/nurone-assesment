# NURONE Homepage Redesign — Final Review & Technical Documentation

**Author:** Achref BEN YAAGOUB — Software Engineer & UX Product Designer (3 years B2B product focus)

**Date:** July 2026

---

## Table of Contents

1. [Professional Context](#1-professional-context)
2. [Assessment Requirements Checklist](#2-assessment-requirements-checklist)
3. [Development Process](#3-development-process)
4. [Design Decisions](#4-design-decisions)
5. [Technical Architecture](#5-technical-architecture)
6. [Code Review Findings & Cleanup](#6-code-review-findings--cleanup)
7. [Accessibility Audit](#7-accessibility-audit)
8. [Performance Considerations](#8-performance-considerations)
9. [SEO Implementation](#9-seo-implementation)
10. [Known Limitations & Assumptions](#10-known-limitations--assumptions)

---

## 1. Professional Context

I'm Achref BEN YAAGOUB, a software engineer and UX product designer with 3 years of dedicated experience building **B2B products**. My professional orientation has been deeply rooted in:

- **Client-driven, standards-compliant design** — minimalistic, clean, and functional
- **UX-first philosophy** — I prioritize user experience (task completion, clarity, flow) over decorative UI
- **Professional over artistic** — my work targets business users who need to complete tasks efficiently, not casual users browsing for entertainment
- **Minimalism with purpose** — every element earns its place; nothing is there for visual spectacle alone

This context explains why the NURONE redesign leans toward **clean hierarchy, generous whitespace, restrained color use, and interaction patterns that serve comprehension** rather than visual complexity. The design is intentionally not maximalist or "dribbble-style" — it's a **production-grade B2B landing page** that prioritizes:

- Fast information scanning
- Clear content hierarchy
- Professional trust signals
- Accessible, performant interactions

---

## 2. Assessment Requirements Checklist

| Requirement | Status | Implementation |
|---|---|---|
| Next.js with App Router | ✅ | `src/app/` directory, RSC composition |
| TypeScript | ✅ | All components fully typed |
| Tailwind CSS v4 | ✅ | CSS-first `@theme` config in `globals.css` |
| Framer Motion | ✅ | Scroll-linked reveals, accordion, preloader, page transitions |
| GSAP + ScrollTrigger | ✅ | Pinned lab cards, horizontal case studies, scrub-linked effects |
| Lenis smooth scroll | ✅ | Wired to GSAP ticker, disabled under reduced motion |
| React Three Fiber (3D) | ✅ | Interactive extruded logo in hero |
| Responsive design | ✅ | Mobile-first, breakpoints at `sm`, `md`, `lg` |
| Dark theme | ✅ | `#050711` void canvas, `#0a0e20` surfaces |
| Syne typeface | ✅ | Self-hosted via `next/font/google`, geometric display face |
| Semantic HTML | ✅ | `header`, `main`, `nav`, `footer`, `section`, `article` |
| Accessibility | ✅ | `aria-expanded`, `aria-controls`, focus rings, reduced motion |
| SEO metadata | ✅ | OpenGraph, Twitter cards, JSON-LD, canonical, robots |
| Preloader | ✅ | 000→100 counter, session-cached, reduced motion skipped |
| Custom cursor | ✅ | Fine-pointer only, accent dot |
| Magnetic buttons | ✅ | Pointer-tracking displacement on hover |
| Tilt cards | ✅ | 3D perspective tilt on case study cards |
| Scroll-linked reveals | ✅ | Word-by-word opacity reveal on headings |
| Typewriter testimonials | ✅ | Letter-by-letter quote display with blinking cursor |
| Marquee | ✅ | Dual-row bidirectional scroll, hover-pausable |
| Accordion FAQ | ✅ | `aria-expanded`/`aria-controls`, animated height |
| Newsletter form | ✅ | Client-side validation, success state |
| Content decoupled from UI | ✅ | All data in `src/lib/content.ts` |
| 10-section layout | ✅ | Hero → Marquee → Pillars → Statement → Labs → Case Studies → Process → Testimonials → FAQ → CTA |
| Collapsible navbar | ✅ | Hide on scroll-down, reveal on scroll-up |
| Reduced motion | ✅ | `prefers-reduced-motion` respected globally |

---

## 3. Development Process

### Phase 1: Figma Design

The design started in Figma with:
- **Moodboard** — research of modern B2B SaaS landing pages (Linear, Vercel, Stripe)
- **Wireframe** — 10-section layout mapping content hierarchy
- **High-fidelity mockups** — dark theme, Syne typography, blue accent system
- **Responsive variants** — desktop, tablet, mobile layouts
- **Component inventory** — cards, buttons, nav states, footer

### Phase 2: v0 Initial Build

Generated an initial scaffold using v0 (AI code generation):
- Basic section structure with placeholder styling
- Component shells for all 10 sections
- Initial Tailwind token setup
- Basic Framer Motion animations

### Phase 3: Section-by-Section Enhancement

Each section was rebuilt from the v0 scaffold with intentional, manual refinement:

1. **Hero** — Rebuilt with vertical layout, 3D logo integration, scroll-linked parallax, exclusivity note
2. **Marquee** — Converted to scroll-linked dual-row bidirectional motion (not CSS animation-only)
3. **Pillars** — Designed asymmetric grid (5/4/3 columns), editorial card layout with metrics
4. **Statement** — Large-format scroll-linked word reveal with accent highlighting
5. **Labs** — Two-mode rendering: static grid (mobile/tablet) vs. GSAP-pinned deck scroll (desktop)
6. **Case Studies** — Horizontal scroll with GSAP ScrollTrigger + snap fallback for mobile
7. **Process** — Timeline layout with scroll-linked spine and per-row opacity/scale transitions
8. **Testimonials** — Typewriter letter-by-letter effect with auto-advance and manual controls
9. **FAQ** — Accessible accordion with cursor-following glow and animated plus/minus
10. **CTA** — Split layout with newsletter form, scroll-linked heading reveal

### Phase 4: Polish & Integration

- Smooth scroll (Lenis) integration with GSAP ScrollTrigger
- Preloader with session caching
- Custom cursor (fine-pointer only)
- Magnetic button effects
- Tilt hover on case study cards
- Background patterns (dot-grid, grain overlay, ambient orbs)
- Card hover glows and border transitions

### Phase 5: Final Review & Cleanup

- Removed dead/unused files (5 default Next.js SVGs, orphaned `Nurone_logo.svg`, unused `scroll-text-reveal.tsx`)
- Cleaned AI-generated verbose comments across all source files
- Added `.gitignore` entries for auto-generated files
- Verified all assessment requirements are met

---

## 4. Design Decisions

### Color Palette: "Void + Accent Blue"

**Why this palette:**

The original NURONE site uses a dark AI SaaS aesthetic. Rather than reinventing the brand, I refined it with intentional restraint:

| Token | Value | Purpose |
|---|---|---|
| `void` | `#050711` | Deep near-black canvas — not pure black, slightly blue-shifted to feel premium, not dead |
| `surface` | `#0a0e20` | Card backgrounds — subtle blue tint separates them from void without looking like glass |
| `surface-2` | `#121833` | Secondary elevation for hover states |
| `accent` | `#3b82f6` | Electric blue — the single interactive color, used sparingly for maximum signal |
| `ink` | `#f5f7fd` | Primary text — not pure white, slightly warm to reduce eye strain |
| `muted` | `#94a3b8` | Secondary text — desaturated for hierarchy without losing readability |

**Rationale:** In B2B context, color must communicate hierarchy, not emotion. One accent color (blue) is enough to mark every interactive element, link, and highlight. Using multiple accent colors would dilute the signal and increase cognitive load.

### Typography: Syne

**Why Syne:**

- **Geometric letterforms** feel futuristic without being techy/cold
- **High weight range** (400-800) allows hierarchy through weight alone
- **Distinctive character** — the "a" and "g" in Syne give NURONE a recognizable voice
- **Performance** — self-hosted via `next/font`, zero CLS, zero third-party requests

### 3D Logo: React Three Fiber

**Why 3D:**

The NURONE glyph (the custom "N" symbol) is the brand's most distinctive asset. Extruding it into 3D serves multiple purposes:

1. **Focal point** — the hero needs a visual anchor beyond text; the 3D mark is that anchor
2. **Interactivity** — drag-to-rotate invites exploration, signaling this is a tech-forward company
3. **Premium feel** — 3D rendering with metallic material + studio lighting signals craft and attention
4. **Technical demonstration** — it shows frontend engineering capability (the assessment's core signal)

**Implementation details:**
- SVG path extracted from the official logo → `SVGLoader` → `ExtrudeGeometry`
- Metallic material (`metalness: 0.90`, `roughness: 0.20`) with blue emissive
- Self-contained environment map using `Lightformer` components (no network requests)
- `IntersectionObserver` pauses render loop when off-screen (performance)
- `prefers-reduced-motion` disables idle animation but preserves drag

### Animation Strategy

| Animation | Library | Why |
|---|---|---|
| Scroll-linked word reveal | Framer Motion `useScroll` + `useTransform` | Declarative, composable, accessible |
| Pinned lab card deck | GSAP ScrollTrigger | Pinned sections + scrub progress = GSAP's core strength |
| Horizontal case studies | GSAP ScrollTrigger | Complex scroll-pinning + distance calculation |
| Smooth scroll | Lenis + GSAP ticker | Unified momentum feel, single rAF loop |
| Accordion open/close | Framer Motion `AnimatePresence` | Height auto-animation is cleanest with FM |
| Typewriter effect | `setInterval` + React state | Simple, reliable, no library needed |
| Marquee | CSS `translateX(-50%)` + Framer `useScroll` | Base motion is CSS (GPU), scroll modulation is FM |
| Preloader | GSAP timeline | Multi-step sequenced animation |
| Magnetic/tilt hover | Vanilla DOM + `requestAnimationFrame` | Micro-interaction, no framework overhead |
| Cursor tracking | Vanilla DOM | Single `pointermove` listener, 1:1 transform |

**Why not use one library for everything:** Each animation has different requirements. Scroll-pinning needs GSAP. Declarative component animations need Framer Motion. Micro-interactions are best as vanilla DOM. Mixing libraries by their strengths produces a more performant, maintainable result than forcing one library to do everything.

---

## 5. Technical Architecture

### Stack

```
Next.js 16 (App Router, RSC)
├── TypeScript
├── Tailwind CSS v4 (CSS-first @theme)
├── Framer Motion (declarative animations)
├── GSAP + ScrollTrigger (scroll-pinning, scrub)
├── Lenis (smooth scroll)
├── React Three Fiber + drei (3D)
├── lucide-react (icons)
└── class-variance-authority + clsx + tailwind-merge (class utilities)
```

### File Structure

```
src/
├── app/
│   ├── layout.tsx          — Fonts, metadata, grain overlay, JSON-LD
│   ├── page.tsx            — Homepage (10 sections)
│   └── globals.css         — Design tokens, patterns, animations
├── components/
│   ├── brand/logo.tsx      — SVG Logo + Mark components
│   ├── layout/             — Navbar, Footer, NewsletterForm
│   ├── motion/             — Cursor, Preloader, ScrollProgress, SmoothScroll, Magnetic, Tilt, TextScramble
│   ├── sections/           — All 10 homepage sections + 3D logo
│   └── ui/                 — Button, SectionHeading, Reveal, CustomIcons
└── lib/
    ├── content.ts          — Single source of truth for all page data
    └── utils.ts            — cn() class helper
```

### Content Architecture

All copy, data, and configuration lives in `src/lib/content.ts`. This means:
- Copy changes don't require component edits
- Content is fully typed (TypeScript catches errors at compile time)
- The same data drives multiple sections (e.g., `caseStudies` feeds both marquee and case studies section)

---

## 6. Code Review Findings & Cleanup

### Files Removed (Dead Code)

| File | Reason |
|---|---|
| `public/file.svg` | Default Next.js template, never imported |
| `public/globe.svg` | Default Next.js template, never imported |
| `public/next.svg` | Default Next.js template, never imported |
| `public/vercel.svg` | Default Next.js template, never imported |
| `public/window.svg` | Default Next.js template, never imported |
| `src/Nurone_logo.svg` | Logo inlined in `logo.tsx`, this SVG was orphaned |
| `src/components/ui/scroll-text-reveal.tsx` | Never imported by any component |

### Comments Cleaned

Removed ~50 AI-generated verbose comments (multi-line JSDocs, section labels, decorative HTML comments) across all source files. Kept only comments that serve functional purposes (e.g., explaining non-obvious behavior like `scroll={false}` on Next.js links).

### .gitignore Updated

Added `src/Nurone_logo.svg` to `.gitignore` to prevent orphaned asset from being re-committed.

---

## 7. Accessibility Audit

| Feature | Implementation |
|---|---|
| Semantic landmarks | `header`, `main`, `nav`, `footer`, `section`, `article` |
| Accordion a11y | `aria-expanded`, `aria-controls`, `role="region"` |
| Focus management | Visible `focus-visible` rings with accent color on all interactive elements |
| Reduced motion | Global `prefers-reduced-motion` check disables: preloader, Lenis, all CSS animations, 3D idle bob, cursor |
| Form accessibility | `label` elements, `aria-invalid`, `aria-describedby` for error states |
| Screen readers | `aria-label` on icon-only buttons, `aria-hidden` on decorative elements |
| Keyboard navigation | Esc-to-close mobile menu, Tab-navigable accordion |
| Touch devices | Custom cursor disabled on coarse pointers, magnetic/tilt effects disabled |
| Color contrast | `#f5f7fd` on `#050711` = ratio > 15:1 (AAA); muted text `#94a3b8` on void = ~5.5:1 (AA) |

---

## 8. Performance Considerations

- **Static prerendering** — homepage is statically generated at build time
- **Font self-hosting** — Syne loaded via `next/font`, zero CLS, zero third-party requests
- **3D lazy-loaded** — `next/dynamic` with `ssr: false` + loading fallback
- **3D paused off-screen** — `IntersectionObserver` sets `frameloop="never"` when hero is scrolled away
- **Single rAF loop** — Lenis is wired into GSAP ticker (no duplicate animation loops)
- **CSS GPU animations** — marquee uses CSS `translateX`, grain overlay uses `pointer-events: none`
- **Reduced motion** — everything gracefully degrades: content is visible, motion is optional
- **Grain overlay** — SVG filter at 3% opacity, `mix-blend-mode: overlay`, `pointer-events: none`

---

## 9. SEO Implementation

| Element | Implementation |
|---|---|
| `<title>` | Template: `%s · NURONE`, default: `NURONE — AI-Augmented Operating Team` |
| `<meta description>` | From `siteConfig.description` |
| `<meta keywords>` | 6 targeted keywords (AI development, product engineering, etc.) |
| OpenGraph | Type, URL, title, description, siteName, locale |
| Twitter | `summary_large_image` card with title + description |
| JSON-LD | `Organization` schema with name, URL, description, slogan |
| Canonical | `<link rel="canonical" href="/" />` |
| Robots | `index: true, follow: true`, GoogleBot max-image-preview large |
| Viewport | `themeColor: #050711`, `colorScheme: dark` |
| Language | `<html lang="en">` |

---

## 10. Known Limitations & Assumptions

1. **Home page only** — assessment scope was the landing page; nav/footer links point to in-page anchors
2. **Newsletter form is frontend-only** — no backend; client-side validation + success state demo
3. **3D logo uses simplified geometry** — the SVG path is the official glyph, but custom GLTF models could replace it
4. **Copy adapted from live site** — content was restructured for hierarchy; product facts, case studies, and testimonials preserved
5. **No image assets** — the design is entirely type + code-driven; no photography or illustrations were required by the brief
6. **Brand color was preserved** — electric blue (`#3b82f6`) matches NURONE's existing brand identity

---

*This document serves as a comprehensive technical and design record for the NURONE homepage redesign assessment.*
