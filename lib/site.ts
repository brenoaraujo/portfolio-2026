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

export const WORK: WorkEntry[] = [
  {
    slug: "onboarding-revenue-streamline",
    image: "/assets/work-onboarding.png",
    eyebrow: "User Flow and UI",
    title: "Onboarding for a new revenue streamline",
  },
  {
    slug: "raffle-landing-design-system",
    image: "/assets/work-raffle-design-system.png",
    eyebrow: "Design System",
    title: "Raffle Landing Page Design System",
  },
  {
    slug: "on-site-ticket-sales-app",
    image: "/assets/work-ticket-app.png",
    eyebrow: "Mobile App",
    title: "On-Site Ticket Sales App",
  },
  {
    slug: "website-redesign",
    image: "/assets/work-website-redesign.png",
    eyebrow: "Web Design",
    title: "Website Redesign",
  },
];

export interface Role {
  period: string;
  title: string;
  description: string;
}

export const ROLES: Role[] = [
  {
    period: "2023-2026",
    title: "Senior Product Designer, Ascend",
    description:
      "Setting design direction across point-of-sale, checkout, design systems, and a marketing operations platform.",
  },
  {
    period: "2023-2026",
    title: "Lead Designer, VanHack",
    description:
      "Designing both sides of a talent marketplace — 500K+ engineers, and the recruiters hiring them.",
  },
  {
    period: "2023-2026",
    title: "Senior Product Designer, Hotmart",
    description:
      "Designing the analytics product every team used to monitor its indicators, built with Data Science.",
  },
  {
    period: "2023-2026",
    title: "Lead Product Designer, Siteware",
    description:
      "Owning the core product for KPIs, goals, and action plans, as the company's first designer.",
  },
];

export interface Article {
  year: string;
  title: string;
  /** Article URL. Omit to render the title as plain text (no link) for now. */
  href?: string;
}

// Titles render as plain text until real article URLs are supplied.
export const ARTICLES: Article[] = [
  {
    year: "2020",
    title:
      "Using the Lightning Decision Jam to surface problems and prioritize a quarter",
  },
  {
    year: "2017",
    title:
      "The Chinese Room and why chatbots will never hold a real conversation",
  },
  {
    year: "2017",
    title: "Why User Experience Makes or Breaks Your Product",
  },
];

/** Contact links, in the footer's source order: Email · Linkedin · Instagram · X. */
export const CONTACT = {
  linkedin: "https://www.linkedin.com/in/brenoaraujobh",
  links: [
    { label: "Email", href: "mailto:brenoaraujobh@gmail.com", external: false },
    { label: "Linkedin", href: "https://www.linkedin.com/in/brenoaraujobh", external: true },
    { label: "Instagram", href: "https://www.instagram.com/brenoaraujobh/", external: true },
    { label: "X", href: "https://x.com/brenoaraujo", external: true },
  ],
} as const;

export const NAV = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Let's talk", href: "/#lets-talk" },
] as const;
