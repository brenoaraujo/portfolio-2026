/**
 * Site content — single source of truth for the home page lists and contact
 * links. Copy is transcribed verbatim from the design handoff (Sections.jsx /
 * SiteFooter.jsx). Case-study bodies move to MDX in Milestone 3; the WORK list
 * here drives the "Recent work" grid and links to /work/[slug].
 */

import type { Dictionary } from "@/lib/i18n/dictionaries/en";

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
   Data only (slugs, images, links, layout). The copy for these sections lives
   in the dictionaries: lib/i18n/dictionaries/en.ts and pt-br.ts. The old
   HOME / WORK / ROLES above still feed the legacy HomeView until it's removed. */

/** Header nav anchors; labels come from dictionary.header.nav. */
export const BENTO_NAV = [
  { id: "work", href: "#work" },
  { id: "experience", href: "#experience" },
  { id: "writing", href: "#writing" },
  { id: "off", href: "#off" },
] as const satisfies readonly { id: keyof Dictionary["header"]["nav"]; href: string }[];

export const NOW_LIST = [
  { k: "Designing", v: "VanHack's new employer onboarding for subscription growth" },
  { k: "Exploring", v: "AI-assisted prototyping, from prompt to PR" },
  { k: "Learning", v: "AI-driven development to build and ship my own lil apps" },
  { k: "Playing", v: "Drums, badly, on Sunday mornings" },
] as const;

/** kind drives the hover thumbnail: animated (changeit/ticket/raffle/onboarding),
    textured static (invoice/commission). img is the hover-base poster. */
export type WorkKind = "changeit" | "ticket" | "raffle" | "invoice" | "onboarding" | "commission";
/** Case studies that have a home tile; their tag + title live in dictionary.work. */
export type WorkTileSlug = keyof Dictionary["work"];
export interface WorkTileLayout {
  slug: WorkTileSlug;
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
/** A tile ready to render: layout + the translated tag and title. */
export interface WorkTileMeta extends WorkTileLayout {
  tag: string;
  title: string;
}

export const WORK_TILES: WorkTileLayout[] = [
  { slug: "change-it", kind: "changeit", img: "/assets/work-changeit.webp", span: 2, rows: 2, aspect: "auto", minH: "420px" },
  { slug: "on-site-ticket-sales-app", kind: "ticket", img: "/assets/work-ticket-app.webp", span: 2, rows: 1, aspect: "66 / 34", minH: "340px" },
  { slug: "raffle-landing-design-system", kind: "raffle", img: "/assets/work-raffle-design-system.webp", span: 1, rows: 1, aspect: "33 / 34", minH: "340px" },
  { slug: "invoice", kind: "invoice", img: "/assets/invoice-draft.webp", span: 1, rows: 1, aspect: "33 / 34", minH: "340px" },
  { slug: "onboarding-revenue-streamline", kind: "onboarding", img: "/assets/work-onboarding.webp", span: 2, rows: 1, aspect: "33 / 20", minH: "400px" },
  { slug: "sales-commission", kind: "commission", img: "/assets/commission.webp", span: 2, rows: 1, aspect: "33 / 20", minH: "400px" },
];

/** Time zones for the "Local time" tile; labels come from dictionary.localTime. */
export const CLOCKS = {
  here: { tz: "America/Vancouver" },
  home: { tz: "America/Sao_Paulo" },
} as const;

/** "Off the clock" photos; captions come from dictionary.offTheClock.photos. */
export const OFF_THE_CLOCK: { id: keyof Dictionary["offTheClock"]["photos"]; img: string }[] = [
  { id: "walk", img: "/assets/otc-01.webp" },
  { id: "motorcycle", img: "/assets/otc-02.webp" },
  { id: "campfire", img: "/assets/otc-03.webp" },
  { id: "brothers", img: "/assets/otc-04.webp" },
  { id: "family", img: "/assets/otc-05.webp" },
  { id: "nights", img: "/assets/otc-06.webp" },
  { id: "speaking", img: "/assets/otc-07.webp" },
  { id: "drums", img: "/assets/otc-08.webp" },
  { id: "stage", img: "/assets/otc-09.webp" },
];

export const CONTACT_TILE = {
  email: "hey@brenoaraujo.com",
  linkedin: CONTACT.linkedin,
} as const;

export const BENTO_FOOTER = {
  coords: "49.2194° N, 122.5984° W",
} as const;
