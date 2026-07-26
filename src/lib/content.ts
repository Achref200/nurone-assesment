import type { ComponentType, SVGProps } from "react";
import {
  TechBackboneIcon,
  AgenticOpsIcon,
  GrowthInfraIcon,
  LabFoundationIcon,
  LabScaleIcon,
  LabOpsIcon,
  LabGrowthIcon,
  ProcessScanIcon,
  ProcessRouteIcon,
  ProcessBoxesIcon,
  ProcessShieldIcon,
  ProcessDoorIcon,
} from "@/components/ui/custom-icons";

export type CustomIconType = ComponentType<SVGProps<SVGSVGElement>>;

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

export const hero = {
  eyebrow: "AI-Powered Tech & Growth Lab",
  titleLead: "You bring the ambition.",
  titleAccent: "We build the system to scale it.",
  body: "NURONE is an AI-augmented operating team of elite engineers, product architects, and growth hackers. We turn ideas, broken MVPs, and stalled businesses into scalable products, automated systems, and revenue engines built to dominate their market.",
  note: "We don't work with everyone. We work where we believe we can win.",
  primaryCta: { label: "Request Access", href: "#access" },
  secondaryCta: { label: "Explore the Lab System", href: "#labs" },
} as const;

export type Pillar = {
  id: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  icon: CustomIconType;
};

export const pillars: Pillar[] = [
  {
    id: "technical-backbone",
    title: "Technical Backbone",
    description:
      "We build and rebuild products with the architecture, code quality, and delivery discipline needed to scale — handing you production code you 100% own.",
    metric: "72h",
    metricLabel: "First Prototype Sprint",
    icon: TechBackboneIcon,
  },
  {
    id: "agentic-operations",
    title: "Agentic Operations",
    description:
      "We combine AI systems, autonomous agents, and expert human operators to eliminate internal bottlenecks and accelerate execution across your entire workflow.",
    metric: "100%",
    metricLabel: "Code Ownership & IP",
    icon: AgenticOpsIcon,
  },
  {
    id: "growth-infrastructure",
    title: "Growth Infrastructure",
    description:
      "We turn positioning, outbound, inbound, and ads into repeatable engines for qualified leads, pipeline, and actual revenue — never vanity metrics.",
    metric: "€10M+",
    metricLabel: "Tracked Revenue Pipeline",
    icon: GrowthInfraIcon,
  },
];

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "72h", label: "Prototype Sprint" },
  { value: "100%", label: "Code & IP Ownership" },
  { value: "€10M+", label: "Revenue Pipeline" },
  { value: "07", label: "Products Shipped" },
];

export type Lab = {
  id: string;
  index: string;
  name: string;
  stage: string;
  summary: string;
  audience: string[];
  entry: string;
  icon: CustomIconType;
};

export const labs: Lab[] = [
  {
    id: "foundation",
    index: "01",
    name: "Foundation Lab",
    stage: "Idea → First Serious Product",
    summary:
      "We turn raw ambition and fragile MVPs into a first serious product foundation: clear scope, clean flows, production architecture, and launch-ready logic.",
    audience: [
      "You have an idea, domain expertise, or market insight",
      "You built a rough prototype, no-code app, or vibe-coded MVP",
      "You need real foundations before showing users or investors",
    ],
    entry: "72h Prototype Sprint or Free MVP Review",
    icon: LabFoundationIcon,
  },
  {
    id: "scale",
    index: "02",
    name: "Scale Lab",
    stage: "Traction → Built to Grow",
    summary:
      "For products slowing under growth. We add resilient architecture, AI capabilities, automation, and fractional CTO execution so your system keeps up with demand.",
    audience: [
      "You have active users, revenue, or real market traction",
      "The product is slowing down or accumulating tech debt under growth",
      "You need scalable architecture, AI integration, or a fractional CTO",
    ],
    entry: "Free Scale Diagnosis",
    icon: LabScaleIcon,
  },
  {
    id: "operations",
    index: "03",
    name: "Operations Lab",
    stage: "Chaos → Operating System",
    summary:
      "We replace tool sprawl and manual grunt work with internal tools, automations, real-time dashboards, and custom AI agents built around your real process.",
    audience: [
      "You pay for dozens of tools that still don't fit your workflow",
      "You run operations manually across spreadsheets, CRMs, and docs",
      "You need internal tools, custom automations, or AI agents",
    ],
    entry: "Free Workflow Prototype",
    icon: LabOpsIcon,
  },
  {
    id: "growth",
    index: "04",
    name: "Growth Lab",
    stage: "Product → Pipeline & Revenue",
    summary:
      "We turn something worth selling into qualified leads, predictable pipeline, and recurring revenue with hands-on GTM execution — not generic agency retainers.",
    audience: [
      "You have a product worth selling or scaling further",
      "You need qualified leads, pipeline, revenue, and market momentum",
      "You want sharp GTM execution without generic marketing retainers",
    ],
    entry: "Free GTM Plan for selected businesses",
    icon: LabGrowthIcon,
  },
];

export type CaseStudy = {
  id: string;
  index: string;
  name: string;
  category: string;
  summary: string;
  tags: string[];
  metric: { value: string; label: string };
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "trucking88",
    index: "001",
    name: "Trucking88",
    category: "Transportation SaaS",
    summary:
      "A fragile AI prototype transformed into a production-ready transportation platform with scalable microservices, real-time tracking, and automated dispatch.",
    tags: ["AI Load Creation", "Web + Mobile App", "Real-Time Tracking"],
    metric: { value: "Web + Mobile", label: "Production SaaS" },
    featured: true,
  },
  {
    id: "hirekey",
    index: "002",
    name: "HireKey",
    category: "AI Career Platform",
    summary:
      "An end-to-end career acceleration system featuring instant ATS resume scoring, smart job matching, and automated candidate positioning.",
    tags: ["ATS Resume Scoring", "Smart Job Matching", "Career Workflow"],
    metric: { value: "AI ATS", label: "Resume scoring engine" },
  },
  {
    id: "mediform",
    index: "003",
    name: "MediForm AI",
    category: "Clinical Documentation",
    summary:
      "Transforms doctor-patient dialogues into structured SOAP notes with speech recognition, medical NLP, confidence scoring, and EHR integration.",
    tags: ["SOAP AI Notes", "Medical NLP", "EHR Ready"],
    metric: { value: "80%", label: "Clinical time saved" },
    featured: true,
  },
  {
    id: "ministry-legal-ai",
    index: "004",
    name: "Ministry of Higher Education",
    category: "Public-Sector Legal AI",
    summary:
      "Enterprise legal advisory platform built on document intelligence, RAG-based legal search, and bilingual Arabic/French NLP for public sector operations.",
    tags: ["RAG Legal Search", "AI Document Review", "Bilingual NLP"],
    metric: { value: "AR / FR", label: "Bilingual legal NLP" },
  },
  {
    id: "youthschedule",
    index: "005",
    name: "YouthSchedule",
    category: "Platform Rescue & Rebuild",
    summary:
      "Rescued from proprietary vendor lock-in. Migrated and rebuilt 300+ legacy files, reconstructed relational database schemas, and redeployed to custom cloud.",
    tags: ["300+ Files Migrated", "Rebuilt Schema", "Zero Lock-in"],
    metric: { value: "300+", label: "Files rescued & rebuilt" },
  },
  {
    id: "sg-solutions",
    index: "006",
    name: "SG Solutions",
    category: "B2B HR Directory",
    summary:
      "From napkin sketch to live B2B directory in 48 hours: comprehensive vendor index, custom admin dashboard, visitor attribution, and AI matching pipeline.",
    tags: ["48h Prototype", "B2B Directory", "AI Matching Roadmap"],
    metric: { value: "48h", label: "Rapid prototype sprint" },
  },
  {
    id: "remedy-tax",
    index: "007",
    name: "Remedy Tax Solutions",
    category: "AI Operating System",
    summary:
      "All-in-one AI operating layer for tax relief firms — automated client onboarding, document intelligence, case RAG search, and compliance workflow agents.",
    tags: ["RAG Case Search", "Workflow Agents", "Tax Ops OS"],
    metric: { value: "1 OS", label: "Unified Tax Operations" },
  },
];

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
  icon: CustomIconType;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "FitCheck",
    description:
      "Before any commitment, we audit your idea, MVP, codebase, or growth bottlenecks. We identify what's solid, what's fragile, and whether NURONE is the right partner.",
    icon: ProcessScanIcon,
  },
  {
    index: "02",
    title: "Choose the Right Lab",
    description:
      "You enter the exact Lab matching your current stage (Foundation, Scale, Operations, or Growth). Targeted leverage for your specific challenge — zero wasted motion.",
    icon: ProcessRouteIcon,
  },
  {
    index: "03",
    title: "Build with Visibility",
    description:
      "Execution runs on disciplined 1-week sprint cycles. Live dashboard access to commits, active tasks, team assignments, and transparent hour tracking. No black box.",
    icon: ProcessBoxesIcon,
  },
  {
    index: "04",
    title: "Stay Accountable",
    description:
      "You own 100% of the code, IP, and assets. We guarantee agreed deliverables. If a scope detail needs refinement, we stay until it's right. Complete peace of mind.",
    icon: ProcessShieldIcon,
  },
  {
    index: "05",
    title: "Scale or Exit Cleanly",
    description:
      "When your stage milestone is achieved, you decide next steps: scale into the next Lab stage, transition to internal team, or exit cleanly with full documentation.",
    icon: ProcessDoorIcon,
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Job seekers don't just need a basic resume builder. They need an intelligent system that understands their profile, improves positioning, and guides them toward real opportunities.",
    name: "Nela D.",
    role: "Co-Founder @ HireKey",
    initials: "ND",
  },
  {
    quote:
      "Clinicians don't need another admin burden to manage. They need an AI system that listens, structures clinical notes accurately, and gives them back time with patient care.",
    name: "Pablo C.",
    role: "Founder @ MediForm AI",
    initials: "PC",
  },
  {
    quote:
      "Tax relief isn't just client notes. It's strict deadlines, IRS documents, case strategy, and trust — all unified into one seamless, agentic operating system.",
    name: "Tomy C.",
    role: "COO @ Remedy Tax Solutions",
    initials: "TC",
  },
  {
    quote:
      "Legal information is only useful when institutional teams can search it, query it, and act on it instantly. NURONE turned complex law into actionable intelligence.",
    name: "Strategic AI Initiative",
    role: "Ministry of Higher Education, Tunisia",
    initials: "AI",
  },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Do you work with founders who only have an idea?",
    answer:
      "Yes. The Foundation Lab is designed specifically for this stage. If you have domain expertise or an unbuilt concept, we help turn it into a production foundation — starting with a 72h prototype sprint or MVP review.",
  },
  {
    question: "Is the 72h prototype sprint really free?",
    answer:
      "For qualified projects, yes. It's our initial entry point — a zero-risk way to demonstrate technical execution and product fit before any long-term commitment.",
  },
  {
    question: "What if I already built an MVP with no-code or freelancers?",
    answer:
      "That's one of our core specialties. We regularly rescue fragile MVPs — refactoring code, rebuilding database schemas, and migrating products onto production cloud infrastructure you fully own.",
  },
  {
    question: "Are you a traditional software development agency?",
    answer:
      "No. NURONE is an AI-augmented operating team (engineers, product architects, growth hackers). We embed directly with you to solve specific bottlenecks and deliver owned systems — not endless agency billing.",
  },
  {
    question: "Do you act as a Fractional CTO or work with our existing engineering team?",
    answer:
      "Both. We can serve as your Fractional CTO to direct tech strategy, or embed elite developers into your team to accelerate product delivery.",
  },
  {
    question: "Do we own 100% of the code and intellectual property?",
    answer:
      "Always. You own every line of code, design asset, database schema, and deployment pipeline. Zero vendor lock-in, zero proprietary software dependencies.",
  },
  {
    question: "Do you offer equity or revenue-share arrangements?",
    answer:
      "Selectively. For exceptional founders with validated market pull, we consider hybrid cash/equity structures where our goals align completely.",
  },
  {
    question: "What happens after I request access?",
    answer:
      "We schedule a 20-minute FitCheck. We evaluate your current product/stage, identify the key bottleneck, and propose the matching Lab path — or point you in the right direction if we're not the ideal fit.",
  },
];

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
