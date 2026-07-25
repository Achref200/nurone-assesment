import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  BotMessageSquare,
  TrendingUp,
  Boxes,
  Gauge,
  Workflow,
  Rocket,
  ScanSearch,
  Route,
  Radar,
  ShieldCheck,
  DoorOpen,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Site-wide constants                                                        */
/* -------------------------------------------------------------------------- */

export const siteConfig = {
  name: "NURONE",
  tagline: "You bring the ambition. We build the system to scale it.",
  description:
    "NURONE is an AI-augmented operating team of elite engineers, product architects, and growth hackers. We turn ideas, broken MVPs, and stalled businesses into scalable products and revenue engines.",
  url: "https://nurone-assessment.vercel.app",
} as const;

export const navLinks = [
  { label: "The System", href: "#system" },
  { label: "Labs", href: "#labs" },
  { label: "Case Studies", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "AI-Powered Tech & Growth Lab",
  titleLead: "You bring the ambition.",
  titleAccent: "We build the system to scale it.",
  body: "NURONE is an AI-augmented operating team of elite engineers, product architects, and growth hackers. We turn ideas, broken MVPs, and stalled businesses into scalable products, automated systems, and revenue engines built to dominate their market.",
  note: "We don't work with everyone. We work where we believe we can win.",
  primaryCta: { label: "Request Access", href: "#access" },
  secondaryCta: { label: "Explore the Lab System", href: "#labs" },
} as const;

/* -------------------------------------------------------------------------- */
/*  Pillars                                                                    */
/* -------------------------------------------------------------------------- */

export type Pillar = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const pillars: Pillar[] = [
  {
    id: "technical-backbone",
    title: "Technical Backbone",
    description:
      "We build and rebuild products with the architecture, code quality, and delivery discipline needed to scale — and hand you code you fully own.",
    icon: Blocks,
  },
  {
    id: "agentic-operations",
    title: "Agentic Operations",
    description:
      "We combine AI systems, automations, and expert operators to remove bottlenecks and accelerate execution across your entire workflow.",
    icon: BotMessageSquare,
  },
  {
    id: "growth-infrastructure",
    title: "Growth Infrastructure",
    description:
      "We turn positioning, outbound, inbound, and ads into repeatable systems for leads, pipeline, and revenue — not vanity metrics.",
    icon: TrendingUp,
  },
];

/* -------------------------------------------------------------------------- */
/*  Stats                                                                      */
/* -------------------------------------------------------------------------- */

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "72h", label: "Prototype Sprint" },
  { value: "100%", label: "Tracked Execution" },
  { value: "€10M+", label: "Revenue Pipeline" },
  { value: "07", label: "Products Shipped" },
];

/* -------------------------------------------------------------------------- */
/*  The Lab System                                                             */
/* -------------------------------------------------------------------------- */

export type Lab = {
  id: string;
  index: string;
  name: string;
  stage: string;
  summary: string;
  audience: string[];
  entry: string;
  icon: LucideIcon;
};

export const labs: Lab[] = [
  {
    id: "foundation",
    index: "01",
    name: "Foundation Lab",
    stage: "Idea → First Serious Product",
    summary:
      "We turn raw ambition and fragile MVPs into a first serious product foundation: clear scope, clean flows, real architecture, and launch-ready logic.",
    audience: [
      "You have an idea, expertise, or market insight",
      "You built a rough prototype, no-code app, or vibe-coded MVP",
      "You need real foundations before showing users or investors",
    ],
    entry: "72h Prototype Sprint or Free MVP Review",
    icon: Rocket,
  },
  {
    id: "scale",
    index: "02",
    name: "Scale Lab",
    stage: "Traction → Built to Grow",
    summary:
      "For products slowing under growth. We add stronger architecture, AI features, automation, and fractional CTO execution so the system keeps up with demand.",
    audience: [
      "You have users, revenue, or real traction",
      "The product is slowing down under growth",
      "You need architecture, AI, automation, or a fractional CTO",
    ],
    entry: "Free Scale Diagnosis",
    icon: Gauge,
  },
  {
    id: "operations",
    index: "03",
    name: "Operations Lab",
    stage: "Chaos → Operating System",
    summary:
      "We replace tool sprawl and manual work with internal tools, automations, dashboards, and AI agents built around your real process — not a template.",
    audience: [
      "You pay for too many tools that still don't fit",
      "You run workflows manually across spreadsheets, CRMs, and docs",
      "You need internal tools, automations, dashboards, or AI agents",
    ],
    entry: "Free Workflow Prototype",
    icon: Workflow,
  },
  {
    id: "growth",
    index: "04",
    name: "Growth Lab",
    stage: "Product → Pipeline & Revenue",
    summary:
      "We turn something worth selling into qualified leads, pipeline, and revenue with GTM execution — not generic retainers or vanity metrics.",
    audience: [
      "You have something worth selling or scaling",
      "You need qualified leads, pipeline, revenue, or momentum",
      "You want GTM execution without generic marketing retainers",
    ],
    entry: "Free GTM Plan for selected businesses",
    icon: Radar,
  },
];

/* -------------------------------------------------------------------------- */
/*  Case studies                                                               */
/* -------------------------------------------------------------------------- */

export type CaseStudy = {
  id: string;
  index: string;
  name: string;
  category: string;
  summary: string;
  tags: string[];
  metric: { value: string; label: string };
};

export const caseStudies: CaseStudy[] = [
  {
    id: "trucking88",
    index: "001",
    name: "Trucking88",
    category: "Transportation SaaS",
    summary:
      "A first AI-built MVP transformed into a production-ready transportation platform with stronger foundations, cleaner UX, and AI-assisted workflows.",
    tags: ["AI Load Creation", "Web + Mobile", "Real-Time Tracking"],
    metric: { value: "Web + Mobile", label: "SaaS platform" },
  },
  {
    id: "hirekey",
    index: "002",
    name: "HireKey",
    category: "AI Career Platform",
    summary:
      "An AI career platform with resume parsing, ATS scoring, job matching, application tracking, and personalized guidance for graduates and professionals.",
    tags: ["ATS Resume Scoring", "Smart Job Matching", "Career Workflow"],
    metric: { value: "AI ATS", label: "Resume scoring" },
  },
  {
    id: "mediform",
    index: "003",
    name: "MediForm AI",
    category: "Clinical Documentation",
    summary:
      "Turns patient conversations into structured SOAP notes with speech recognition, medical NLP, confidence scoring, human review, and EHR-ready workflows.",
    tags: ["SOAP AI Notes", "Medical NLP", "EHR Ready"],
    metric: { value: "80%", label: "Time reduced" },
  },
  {
    id: "ministry-legal-ai",
    index: "004",
    name: "Ministry of Higher Education",
    category: "Public-Sector Legal AI",
    summary:
      "AI legal advisory built on document intelligence, RAG-based legal search, and Arabic / French NLP to modernize public-sector legal workflows.",
    tags: ["RAG Legal Search", "AI Document Review", "AR / FR NLP"],
    metric: { value: "AR / FR", label: "Legal NLP" },
  },
  {
    id: "youthschedule",
    index: "005",
    name: "YouthSchedule",
    category: "Platform Rescue & Rebuild",
    summary:
      "Extracted from a locked no-code cloud, we migrated and rebuilt 300+ files, reconstructed the database, and moved the platform onto real SaaS infrastructure.",
    tags: ["300+ Files Migrated", "Rebuilt Schema", "Escaped Lock-in"],
    metric: { value: "300+", label: "Files migrated" },
  },
  {
    id: "sg-solutions",
    index: "006",
    name: "SG Solutions",
    category: "B2B HR Directory",
    summary:
      "From founder idea to a B2B HR provider directory with a large database, admin panel, visitor tracking, UTM analytics, and a roadmap toward AI matching.",
    tags: ["48h Prototype", "B2B Directory", "AI Matching Roadmap"],
    metric: { value: "48h", label: "Prototype sprint" },
  },
  {
    id: "remedy-tax",
    index: "007",
    name: "Remedy Tax Solutions",
    category: "AI Operating System",
    summary:
      "A modern AI operating system for tax relief teams — CRM workflows, case management, document intelligence, RAG retrieval, and agentic automation.",
    tags: ["RAG Case Intelligence", "Workflow Agents", "Tax Ops OS"],
    metric: { value: "1 OS", label: "For tax operations" },
  },
];

/* -------------------------------------------------------------------------- */
/*  Process                                                                    */
/* -------------------------------------------------------------------------- */

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "FitCheck",
    description:
      "Before we sell anything, we look at your idea, MVP, product, workflow, or growth system. We identify what's real, what's risky, and whether NURONE is the right team to move it forward.",
    icon: ScanSearch,
  },
  {
    index: "02",
    title: "Choose the Right Lab",
    description:
      "You enter the Lab that matches your current stage. Each path is built for a specific bottleneck — not a generic service package. No wrong team, no wasted motion.",
    icon: Route,
  },
  {
    index: "03",
    title: "Build with Visibility",
    description:
      "Execution runs on a clear weekly rhythm. You see what was done, what's next, what's blocked, who worked on what, and how every hour was used. No black box.",
    icon: Boxes,
  },
  {
    index: "04",
    title: "Stay Accountable",
    description:
      "You own the code, the assets, and the progress. If we underestimate a scoped build, we finish the agreed work. If a talent isn't the right fit, we replace them fast.",
    icon: ShieldCheck,
  },
  {
    index: "05",
    title: "Scale or Exit Cleanly",
    description:
      "When the stage is complete, you decide what happens next. Continue with the team, scale the system, or leave with everything in hand. No dependency, no messy handoff.",
    icon: DoorOpen,
  },
];

/* -------------------------------------------------------------------------- */
/*  Testimonials                                                               */
/* -------------------------------------------------------------------------- */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Job seekers don't just need a resume builder. They need an intelligent system that understands their profile, improves their positioning, and guides them toward the right opportunities.",
    name: "Nela D.",
    role: "Co-Founder @ HireKey",
    initials: "ND",
  },
  {
    quote:
      "Clinicians don't need another tool to manage. They need an AI system that listens, structures the clinical story, and gives them back time without losing control.",
    name: "Pablo C.",
    role: "Founder @ MediForm AI",
    initials: "PC",
  },
  {
    quote:
      "Tax relief isn't just about managing clients. It's deadlines, documents, IRS communication, case strategy, and trust — brought into one intelligent operating layer.",
    name: "Tomy C.",
    role: "COO @ Remedy Tax Solutions",
    initials: "TC",
  },
  {
    quote:
      "Legal knowledge is only useful when teams can access it, search it, and act on it quickly. The goal was to turn complex information into institutional intelligence.",
    name: "Strategic AI Initiative",
    role: "Ministry of Higher Education, Tunisia",
    initials: "AI",
  },
];

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Do you work with people who only have an idea?",
    answer:
      "Yes. The Foundation Lab exists exactly for that stage. If you have an idea, expertise, or market insight, we help you turn it into a real product foundation — often starting with a free 72h prototype or MVP review.",
  },
  {
    question: "Is the 72h prototype really free?",
    answer:
      "For selected founders, yes. It's our free entry point — a way to prove we can create real leverage before any commitment on either side.",
  },
  {
    question: "What if I already built an MVP with no-code or freelancers?",
    answer:
      "That's common. We regularly rescue and rebuild fragile MVPs — migrating code, reconstructing databases, and moving products onto real, scalable infrastructure you fully own.",
  },
  {
    question: "Are you a software agency?",
    answer:
      "No. We're an AI-augmented operating team. We embed with you, execute against a specific bottleneck, and hand you systems you own — not a generic service retainer.",
  },
  {
    question: "Do you replace a CTO or work with our existing team?",
    answer:
      "Both. We can act as a fractional CTO or plug elite engineers and operators into your existing team, depending on the stage and the bottleneck.",
  },
  {
    question: "Do we own the code and assets?",
    answer:
      "Always. You own the code, the assets, the systems, and the progress. No lock-in, no black box, no messy handoff.",
  },
  {
    question: "Do you work for equity?",
    answer:
      "Selectively. For the right founders and stage, we explore equity or hybrid models — but only where we genuinely believe we can win together.",
  },
  {
    question: "What happens after I request access?",
    answer:
      "We run a FitCheck. We look at where you stand, identify what's real and what's blocking you, and recommend the right Lab — or tell you honestly if we're not the right team.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Footer                                                                     */
/* -------------------------------------------------------------------------- */

export const footerNav = {
  Pages: [
    { label: "Home", href: "#top" },
    { label: "The System", href: "#system" },
    { label: "Case Studies", href: "#work" },
    { label: "FAQ", href: "#faq" },
  ],
  Resources: [
    { label: "Labs", href: "#labs" },
    { label: "Process", href: "#process" },
    { label: "Testimonials", href: "#voices" },
    { label: "Contact", href: "#access" },
  ],
} as const;
