/**
 * ────────────────────────────────────────────────────────────────────
 *  Single source of truth for every piece of content on the site.
 *  Edit this file to update your portfolio — no component changes
 *  are required.
 * ────────────────────────────────────────────────────────────────────
 */

export type SocialIcon = "github" | "linkedin" | "x";

export interface Social {
  label: string;
  href: string;
  icon: SocialIcon;
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  type: string;
  points: string[];
}

export interface Project {
  id: string;
  name: string;
  year: string;
  tagline: string;
  tech: string[];
  repo?: string;
  demo?: string;
  /** Hex used for the mock-preview accent touches. */
  accent: string;
  mock: "board" | "chart" | "cards" | "link";
  mockUrl: string;
  featured?: boolean;
  caseStudy: {
    problem: string;
    architecture: string[];
    results: string[];
  };
}

/* ------------------------------------------------------------------ */
/*  Profile                                                            */
/* ------------------------------------------------------------------ */
export const profile = {
  name: "Aung Myint Myat",
  monogram: "AM",
  domain: "moggie.dev",
  role: "Software Engineer",
  location: {
    city: "Yangon",
    country: "Myanmar",
    timeZone: "Asia/Yangon",
  },
  email: "hello@aungmyintmyat.dev",
  availability: "Open to new opportunities",
  /** TODO: paste your résumé URL — the navbar CTA becomes a "Resume" button. */
  resumeUrl: "",
  /** TODO: add your real profile URLs — entries with an empty href are hidden. */
  socials: [
    { label: "GitHub", href: "https://github.com/aungmmyat111-debug", icon: "github" },
    { label: "LinkedIn", href: "", icon: "linkedin" },
    { label: "X", href: "", icon: "x" },
  ] satisfies Social[],
  facts: {
    education: "B.Sc. Computer Science",
    languages: "English · Burmese",
    experience: "6+ yrs across the stack",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
export const hero = {
  kicker: `${profile.name} — ${profile.role}`,
  headline: ["Building web products", "that feel effortless."],
  gradientWord: "effortless.",
  sub: "I own features end-to-end — from API and data architecture to the last pixel of UI — and sweat the details until the product feels right.",
} as const;

/* ------------------------------------------------------------------ */
/*  Bento — focus & tech stack                                         */
/* ------------------------------------------------------------------ */
export const bio = {
  heading: "Engineering philosophy",
  paragraphs: [
    "I'm a software engineer with a passion for turning complex problems into simple, elegant products. Over the past years I've worked across the stack — shipping web platforms, designing APIs, and optimizing systems that handle real traffic.",
    "I'm at my best when I own a feature end-to-end: talking to users, shaping the architecture, and sweating the details until it feels right. Outside of work, I contribute to open source and write about the things I learn.",
  ],
};

export const focus = {
  heading: "Current focus",
  items: [
    "Full-stack products",
    "APIs & system design",
    "Performance & DX",
  ],
};

export const stack: { category: string; items: string[] }[] = [
  { category: "Frontend", items: ["React", "Next.js", "Vue", "TypeScript", "Tailwind CSS", "Figma"] },
  { category: "Backend", items: ["Node.js", "Go", "Python", "GraphQL"] },
  { category: "Databases", items: ["PostgreSQL", "Redis", "ClickHouse"] },
  { category: "DevOps / Cloud", items: ["Docker", "AWS", "CI/CD", "Git"] },
];

/* ------------------------------------------------------------------ */
/*  Experience                                                         */
/* ------------------------------------------------------------------ */
export const experience: ExperienceItem[] = [
  {
    role: "Senior Software Engineer",
    org: "Nova Labs",
    period: "2023 — Now",
    type: "Full-time",
    points: [
      "Led architecture of a multi-tenant SaaS platform serving 40k+ users, cutting page-load times by 60%.",
      "Designed event-driven pipelines processing millions of records daily; mentored a team of 4 engineers.",
    ],
  },
  {
    role: "Full-Stack Developer",
    org: "Brightwave",
    period: "2021 — 2023",
    type: "Full-time",
    points: [
      "Shipped 15+ customer-facing features end-to-end with React and Node.js across 3 product releases.",
      "Introduced automated testing and CI, raising deployment frequency from monthly to weekly.",
    ],
  },
  {
    role: "Software Engineer",
    org: "PixelForge Studio",
    period: "2020 — 2021",
    type: "Full-time",
    points: [
      "Built and maintained client web applications and REST APIs in a small, fast-moving team.",
      "Reduced API response times by 45% through query optimization and caching.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/*  TODO: add real `repo` / `demo` URLs — links are hidden until set.  */
/* ------------------------------------------------------------------ */
export const projects: Project[] = [
  {
    id: "taskflow",
    name: "TaskFlow",
    year: "2026",
    tagline:
      "Real-time project management platform with kanban boards, collaborative editing, and granular permissions for distributed teams.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets"],
    accent: "#6366f1",
    mock: "board",
    mockUrl: "taskflow.dev",
    featured: true,
    caseStudy: {
      problem:
        "Distributed teams were planning work across chat threads, spreadsheets, and issue trackers. Status lived in people's heads, and every planning session started with a tedious re-sync before any real decisions could happen.",
      architecture: [
        "Next.js + TypeScript client with optimistic updates and offline-aware state",
        "WebSocket sync layer with per-board fan-out and conflict-free merges",
        "PostgreSQL with row-level security; Redis pub/sub for presence and cursors",
      ],
      results: [
        "Board state syncs to every teammate in under 100 ms",
        "Weekly planning cut from hours of re-syncing to a 20-minute ritual",
        "18 months of concurrent editing with zero data loss",
      ],
    },
  },
  {
    id: "devmetrics",
    name: "DevMetrics",
    year: "2025",
    tagline:
      "CI/CD analytics dashboard that turns pipeline data into clear, actionable engineering metrics for platform teams.",
    tech: ["React", "Go", "D3.js"],
    accent: "#10b981",
    mock: "chart",
    mockUrl: "devmetrics.io",
    caseStudy: {
      problem:
        "Platform teams were flying blind: pipelines failed silently, deploys were a black box, and engineering reviews relied on gut feeling rather than data.",
      architecture: [
        "Go ingestion service consuming CI/CD provider APIs and webhooks",
        "Time-series storage optimised for pipeline event queries",
        "React + D3.js dashboard with drill-downs from org level to a single job",
      ],
      results: [
        "Pipeline failures triaged ~40% faster",
        "One dashboard replaced five spreadsheets in weekly reviews",
        "Deploy frequency tracked live across 60+ repositories",
      ],
    },
  },
  {
    id: "shopstack",
    name: "ShopStack",
    year: "2025",
    tagline:
      "Headless e-commerce storefront with instant search, cart, and checkout — built on a GraphQL backend with Stripe payments.",
    tech: ["Next.js", "GraphQL", "Stripe"],
    accent: "#f59e0b",
    mock: "cards",
    mockUrl: "shopstack.store",
    caseStudy: {
      problem:
        "A monolithic storefront was slow to ship on, slower to load, and its checkout flow leaked users at every step.",
      architecture: [
        "Headless Next.js storefront decoupled from the commerce core",
        "GraphQL API stitching catalogue, pricing, and inventory data",
        "Stripe-powered checkout with webhooks and idempotent order handling",
      ],
      results: [
        "Checkout completion up 18% after the rebuild",
        "Storefront LCP under 1.5 s on mid-range mobile",
        "Catalogue updates ship independently of storefront releases",
      ],
    },
  },
  {
    id: "linkpulse",
    name: "LinkPulse",
    year: "2024",
    tagline:
      "Blazing-fast link shortener with real-time click analytics, custom domains, and an open REST API.",
    tech: ["Node.js", "Redis", "ClickHouse"],
    accent: "#38bdf8",
    mock: "link",
    mockUrl: "lnk.to",
    caseStudy: {
      problem:
        "Long links were ugly, untrackable, and impossible to manage — and existing shorteners were either slow or locked their data behind pricey plans.",
      architecture: [
        "Node.js REST API with per-key rate limiting and custom domain support",
        "Redis hot path serving redirects in single-digit milliseconds",
        "ClickHouse for real-time click analytics across millions of events",
      ],
      results: [
        "Redirects served in under 5 ms at p95",
        "Millions of click events queryable in real time",
        "Public API adopted by indie makers within launch week",
      ],
    },
  },
];
