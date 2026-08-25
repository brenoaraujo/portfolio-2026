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
    title: "Ticket sales for stadium volunteers",
  },
  {
    slug: "change-it",
    image: "/assets/work-changeit.png",
    eyebrow: "UX & Conversion",
    title: "Streamlining game-day sign-up",
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
      "/assets/experience_1_a.png",
      "/assets/experience_1_b.png",
      "/assets/experience_1_c.png",
    ],
  },
  {
    period: "2023-2026",
    title: "Lead Designer, VanHack",
    description:
      "Designing both sides of a talent marketplace — 500K+ engineers, and the recruiters hiring them.",
    images: [
      "/assets/experience_2_a.png",
      "/assets/experience_2_b.png",
      "/assets/experience_2_c.png",
    ],
  },
  {
    period: "2023-2026",
    title: "Senior Product Designer, Hotmart",
    description:
      "Designing the analytics product every team used to monitor its indicators, built with Data Science.",
    images: [
      "/assets/experience_3_a.png",
      "/assets/experience_3_b.png",
      "/assets/experience_3_c.png",
    ],
  },
  {
    period: "2023-2026",
    title: "Lead Product Designer, Siteware",
    description:
      "Owning the core product for KPIs, goals, and action plans, as the company's first designer.",
    images: [
      "/assets/experience_4_a.png",
      "/assets/experience_4_b.png",
      "/assets/experience_4_c.png",
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
