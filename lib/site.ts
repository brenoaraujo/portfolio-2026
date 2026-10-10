/**
 * Site content — single source of truth for the home page lists and contact
 * links. Copy is transcribed verbatim from the design handoff (Sections.jsx /
 * SiteFooter.jsx). Case-study bodies move to MDX in Milestone 3; the WORK list
 * here drives the "Recent work" grid and links to /work/[slug].
 */

export interface WorkEntry {
  slug: string;
  image: string;
  eyebrow: string;
  title: string;
}

/** Closing section + minimal footer copy (home only). */
export const CLOSING = {
  /** Large red statement, one array item per rendered line. */
  statementLines: ["light the fire", "of my", "utopia."],
  /** Short about blurb, set two-up beside the portrait. */
  about:
    "I'm just a regular everyday normal motherf****r who loves to design and build things. Proud of to bring inside my creative box things like drums, motorcycles, camping, family and a few other things that make me tick. I love to work with people who are passionate about what they do, and I love to help them bring their ideas to life in the better way.",
  photo: "/assets/breno-profile-halftone.webp",
  footer: {
    left: "Thanks for dropping by",
    center: "Breno Araujo",
    right: "Back to top",
  },
} as const;

export interface HomeContent {
  /** The poster word (the role) — rendered huge in brand red, one word per line. */
  display: string;
  /** Short intro line shown ABOVE the poster word. Variants override via `title`. */
  title: string;
  /** Short intro line(s) shown BELOW the poster word. Variants override via `description`. */
  paragraphs: string[];
}

/** Default home hero copy. Per-application variants override title/paragraphs —
 *  see lib/variants.ts. The poster word stays constant across variants. */
export const HOME: HomeContent = {
  display: "Product Designer",
  title:
    "I've designed complex B2B SaaS products in the past 16 years, always with people, businesses, and engineers in mind.",
  paragraphs: [
    "I lead hands-on UI and interaction design from customer research through shipped implementation.",
  ],
};

export const WORK: WorkEntry[] = [
    {
    slug: "change-it",
    image: "/assets/work-changeit.webp",
    eyebrow: "UX & Conversion",
    title: "Streamlining game-day sign-up",
  },
  {
    slug: "on-site-ticket-sales-app",
    image: "/assets/work-ticket-app.webp",
    eyebrow: "Mobile App",
    title: "Ticket sales for stadium volunteers",
  },

  {
    slug: "raffle-landing-design-system",
    image: "/assets/work-raffle-design-system.webp",
    eyebrow: "Design System",
    title: "Raffle Landing Page Design System",
  },
    {
    slug: "onboarding-revenue-streamline",
    image: "/assets/work-onboarding.webp",
    eyebrow: "User Flow and UI",
    title: "Onboarding for a new revenue stream",
  },
  

  {
    slug: "sales-commission",
    image: "/assets/work-sales-commissions.webp",
    eyebrow: "UX/UI design",
    title: "Replacing the commission spreadsheet",
  },
  {
    slug: "invoice",
    image: "/assets/work-invoice-management.webp",
    eyebrow: "Finance",
    title: "Invoice Management",
  },
];

export interface Role {
  period: string;
  title: string;
  description: string;
  /** Fan thumbnails shown on hover of the row (a/b/c per company). */
  images?: string[];
}

export const ROLES: Role[] = [
  {
    period: "2023-2026",
    title: "Senior Product Designer, Ascend",
    description:
      "Setting design direction across point-of-sale, checkout, design systems, and a marketing operations platform.",
    images: [
      "/assets/experience_1_a.webp",
      "/assets/experience_1_b.webp",
      "/assets/experience_1_c.webp",
    ],
  },
  {
    period: "2019-2023",
    title: "Lead Designer, VanHack",
    description:
      "Designing both sides of a talent marketplace — 500K+ engineers, and the recruiters hiring them.",
    images: [
      "/assets/experience_2_a.webp",
      "/assets/experience_2_b.webp",
      "/assets/experience_2_c.webp",
    ],
  },
  {
    period: "2019-2019",
    title: "Senior Product Designer, Hotmart",
    description:
      "Designing the analytics product every team used to monitor its indicators, built with Data Science.",
    images: [
      "/assets/experience_3_a.webp",
      "/assets/experience_3_b.webp",
      "/assets/experience_3_c.webp",
    ],
  },
  {
    period: "2012-2019",
    title: "Lead Product Designer, Siteware",
    description:
      "Owning the core product for KPIs, goals, and action plans, as the company's first designer.",
    images: [
      "/assets/experience_4_a.webp",
      "/assets/experience_4_b.webp",
      "/assets/experience_4_c.webp",
    ],
  },
];

export interface Article {
  year: string;
  title: string;
  /** Article URL. Omit to render the title as plain text (no link) for now. */
  href?: string;
}

export const ARTICLES: Article[] = [
  {
    year: "2020",
    title:
      "Using the Lightning Decision Jam to surface problems and prioritize a quarter",
    href: "https://brenoaraujo.substack.com/p/using-the-lightning-decision-jam",
  },
  {
    year: "2017",
    title:
      "The Chinese Room and why chatbots will never hold a real conversation",
    href: "https://brenoaraujo.substack.com/p/the-chinese-room-and-why-chatbots",
  },
  {
    year: "2017",
    title: "Why User Experience Makes or Breaks Your Product",
    href: "https://brenoaraujo.substack.com/p/why-user-experience-makes-or-breaks",
  },
];

/** Contact links, in the footer's source order: Email · Linkedin · Instagram · X. */
export const CONTACT = {
  linkedin: "https://www.linkedin.com/in/brenoaraujobh",
  /** Shown in the home header, right-aligned. */
  email: "hey@brenoaraujo.com",
  links: [
    { label: "Email", href: "mailto:brenoaraujobh@gmail.com", external: false, icon: "/assets/email.svg" },
    { label: "Linkedin", href: "https://www.linkedin.com/in/brenoaraujobh", external: true, icon: "/assets/linkedin.svg" },
    { label: "Instagram", href: "https://www.instagram.com/brenoaraujobh/", external: true, icon: "/assets/instagram.svg" },
    { label: "X", href: "https://x.com/brenoaraujo", external: true, icon: "/assets/x.svg" },
  ],
} as const;

export const NAV = [
  { label: "Work", href: "/#work", external: false, icon: "/assets/pen.svg" },
  { label: "Experience", href: "/#experience", external: false, icon: "/assets/experience.svg" },
  { label: "Let's talk", href: CONTACT.linkedin, external: true, icon: "/assets/linkedin.svg" },
] as const;

/* ───────────────────────── Homepage redesign (editorial bento) ─────────────
   Content transcribed from the design handoff (Portfolio Home.dc.html). The old
   HOME / WORK / ROLES above still feed the legacy HomeView until it's removed. */

export const BENTO_NAV = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Writing", href: "#writing" },
  { label: "Off the clock", href: "#off" },
] as const;

export const BENTO_HERO = {
  eyebrowLeft: "Product designer & design engineer",
  eyebrowRight: "16 yrs · B2B SaaS",
  headline: "I design complex B2B products that people, businesses and engineers all agree on.",
  subcopy:
    "Hands-on UI and interaction design, from customer research through shipped implementation. Recently shaped the design direction for point-of-sale, checkout and design systems at Ascend.",
  shippedLabel: "Shipped Globally at",
  shippedAt: ["Ascend", "VanHack", "Medimap", "Hotmart", "Prova Fácil", "Siteware", "Estado de Minas"],
} as const;

export const BENTO_PILL = "Open to product design roles";

export const NOW_LIST = [
  { k: "Designing", v: "VanHack's new employer onboarding for subscription growth" },
  { k: "Exploring", v: "AI-assisted prototyping, from prompt to PR" },
  { k: "Learning", v: "AI-driven development to build and ship my own lil apps" },
  { k: "Playing", v: "Drums, badly, on Sunday mornings" },
] as const;

/** kind drives the hover thumbnail: animated (changeit/ticket/raffle/onboarding),
    textured static (invoice/commission). img is the hover-base poster. */
export type WorkKind = "changeit" | "ticket" | "raffle" | "invoice" | "onboarding" | "commission";
export interface WorkTileMeta {
  tag: string;
  title: string;
  slug: string;
  kind: WorkKind;
  /** Poster/base image (also the static image for textured tiles). */
  img: string;
  /** Column span + row span at the 4-col breakpoint. */
  span: 1 | 2;
  rows: 1 | 2;
  /** Aspect ratio at the 4-col breakpoint. */
  aspect: string;
  /** min-height when stacked (below the 4-col breakpoint). */
  minH: string;
}

export const WORK_TILES: WorkTileMeta[] = [
  { tag: "UX & Conversion", title: "Streamlining game-day sign-up", slug: "change-it", kind: "changeit", img: "/assets/work-changeit.webp", span: 2, rows: 2, aspect: "auto", minH: "420px" },
  { tag: "Mobile App", title: "Ticket sales for stadium volunteers", slug: "on-site-ticket-sales-app", kind: "ticket", img: "/assets/work-ticket-app.webp", span: 2, rows: 1, aspect: "66 / 34", minH: "340px" },
  { tag: "Design System", title: "Raffle landing page design system", slug: "raffle-landing-design-system", kind: "raffle", img: "/assets/work-raffle-design-system.webp", span: 1, rows: 1, aspect: "33 / 34", minH: "340px" },
  { tag: "Finance", title: "Invoice management", slug: "invoice", kind: "invoice", img: "/assets/invoice-draft.webp", span: 1, rows: 1, aspect: "33 / 34", minH: "340px" },
  { tag: "User Flow & UI", title: "Onboarding for a new revenue stream", slug: "onboarding-revenue-streamline", kind: "onboarding", img: "/assets/work-onboarding.webp", span: 2, rows: 1, aspect: "33 / 20", minH: "400px" },
  { tag: "UX/UI Design", title: "Replacing the commission spreadsheet", slug: "sales-commission", kind: "commission", img: "/assets/commission.webp", span: 2, rows: 1, aspect: "33 / 20", minH: "400px" },
];

export const EXPERIENCE_ROWS = [
  { co: "Ascend", role: "Senior Product Designer", years: "2023—26", desc: "Design direction across point-of-sale, checkout, design systems and a marketing ops platform." },
  { co: "VanHack", role: "Lead Designer", years: "2019—23", desc: "Both sides of a talent marketplace — 500K+ engineers and the recruiters hiring them." },
  { co: "Hotmart", role: "Senior Product Designer", years: "2019", desc: "The analytics product every team used to monitor its indicators, built with Data Science." },
  { co: "Siteware", role: "Lead Product Designer", years: "2012—19", desc: "First designer. Owned the core product for KPIs, goals and action plans." },
] as const;

export const HOW_I_WORK = [
  { label: "Listen", text: "Gather insights from diverse perspectives and dive deep into problem framing." },
  { label: "Context", text: "Map the business and tech constraints to ensure frictionless, high-velocity development." },
  { label: "Prototype", text: "Make it clickable fast — Figma, code or AI — to kill ambiguity before it becomes a sprint." },
  { label: "Ship", text: "Stay in the PR. Pair with engineers on the details until it's live and measured." },
] as const;

export const PROTOTYPE_IN = [
  { label: "Figma", snippet: "Frame / Checkout v3\n→ 24 variants · auto-layout" },
  { label: "Code", snippet: '<Checkout\n  step="pay" tips={true} />' },
  { label: "AI", snippet: '› "Generate 5 empty states for\n  a commission dashboard"' },
] as const;

export const CLOCKS = {
  here: { label: "Maple Ridge, CA · based", tz: "America/Vancouver" },
  home: { label: "Belo Horizonte, BR • born", tz: "America/Sao_Paulo" },
} as const;

export const OFF_THE_CLOCK = [
  { img: "/assets/otc-01.webp", label: "Family walk" },
  { img: "/assets/otc-02.webp", label: "Motorcycle" },
  { img: "/assets/otc-03.webp", label: "Campfire" },
  { img: "/assets/otc-04.webp", label: "Brothers" },
  { img: "/assets/otc-05.webp", label: "Family" },
  { img: "/assets/otc-06.webp", label: "Slow nights" },
  { img: "/assets/otc-07.webp", label: "Speaking" },
  { img: "/assets/otc-08.webp", label: "Drums" },
  { img: "/assets/otc-09.webp", label: "On stage" },
] as const;

export const OFF_TITLE = "Light the fire of my utopia.";

export const CONTACT_TILE = {
  eyebrow: "Got a gnarly B2B problem?",
  headline: "Let's untangle it together.",
  email: "hey@brenoaraujo.com",
  linkedin: CONTACT.linkedin,
} as const;

export const BENTO_FOOTER = {
  left: "Thanks for dropping by · © 2026 Breno Araujo",
  coords: "49.2194° N, 122.5984° W",
  back: "Back to top ↑",
} as const;
