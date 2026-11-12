/**
 * English copy — the source text for the whole site (except case-study bodies,
 * which live in content/work/*.mdx). Every other dictionary must match this
 * shape: the build fails if a key is missing in a translation.
 *
 * Non-copy data (slugs, images, links, time zones, grid layout) stays in
 * lib/site.ts.
 */
const en = {
  meta: {
    title: "Breno Araujo — Product designer",
    description:
      "Product designer and design engineer based in Vancouver. I listen first, gather context, then prototype quickly — in Figma, code, or AI — to reduce ambiguity.",
  },

  common: {
    skipToContent: "Skip to content",
  },

  /** The site switcher in the header, and the invitation shown to visitors who
      probably prefer this language (written in this language). */
  language: {
    switchLabel: "Language",
    /** Short code shown in the switcher. */
    short: "EN",
    /** Full name, used for the link title and screen readers. */
    name: "English",
    prompt: {
      title: "Prefer to read in English?",
      body: "This site is also available in English.",
      accept: "Read in English",
      decline: "Keep this language",
      close: "Close",
    },
    /** Shown on pages in this language when its text was machine translated. */
    machineTranslated: false,
    toast: {
      title: "Automatic translation",
      body: "",
      close: "Close notice",
    },
  },

  header: {
    nav: {
      work: "Work",
      experience: "Experience",
      writing: "Writing",
      off: "Off the clock",
    },
    pill: "Open to product design roles",
    backToWork: "← Back to work",
  },

  hero: {
    eyebrow: "Product designer & design engineer",
    headline: "From idea to clarity, by design.",
    subcopy:
      "For 16 years I've helped teams decide what to build and designed how it works. Always balancing user needs with business goals.",
    cta: "Let's talk on LinkedIn →",
  },

  /** Home grid tiles, by case-study slug. */
  work: {
    "change-it": { tag: "UX & Conversion", title: "Streamlining game-day sign-up" },
    "on-site-ticket-sales-app": { tag: "Mobile App", title: "Ticket sales for stadium volunteers" },
    "raffle-landing-design-system": { tag: "Design System", title: "Raffle landing page design system" },
    invoice: { tag: "Finance", title: "Invoice management" },
    "onboarding-revenue-streamline": { tag: "User Flow & UI", title: "Onboarding for a new revenue stream" },
    "sales-commission": { tag: "UX/UI Design", title: "Replacing the commission spreadsheet" },
  },

  experience: {
    title: "Experience",
    linkedin: "LinkedIn ↗",
    rows: [
      { co: "Ascend", role: "Senior Product Designer", years: "2023—26", desc: "Design direction across point-of-sale, checkout, design systems and a marketing ops platform." },
      { co: "VanHack", role: "Lead Designer", years: "2019—23", desc: "Both sides of a talent marketplace — 500K+ engineers and the recruiters hiring them." },
      { co: "Hotmart", role: "Senior Product Designer", years: "2019", desc: "The analytics product every team used to monitor its indicators, built with Data Science." },
      { co: "Siteware", role: "Lead Product Designer", years: "2012—19", desc: "First designer. Owned the core product for KPIs, goals and action plans." },
    ],
  },

  writing: {
    title: "Writing",
    substack: "Substack ↗",
  },

  localTime: {
    title: "Local time",
    here: "Maple Ridge, CA · based",
    home: "Belo Horizonte, BR • born",
    globeHint: "Based in Maple Ridge — hover to see where I'm from",
  },

  howIWork: {
    title: "How I work",
    steps: [
      { label: "Listen", text: "Gather insights from diverse perspectives and dive deep into problem framing." },
      { label: "Context", text: "Map the business and tech constraints to ensure frictionless, high-velocity development." },
      { label: "Prototype", text: "Make it clickable fast — Figma, code or AI — to kill ambiguity before it becomes a sprint." },
      { label: "Ship", text: "Stay in the PR. Pair with engineers on the details until it's live and measured." },
    ],
  },

  prototype: {
    title: "Prototype in",
    tools: [
      { label: "Figma", snippet: "Frame / Checkout v3\n→ 24 variants · auto-layout" },
      { label: "Code", snippet: '<Checkout\n  step="pay" tips={true} />' },
      { label: "AI", snippet: '› "Generate 5 empty states for\n  a commission dashboard"' },
    ],
  },

  offTheClock: {
    title: "Light the fire of my utopia.",
    previous: "Previous",
    next: "Next",
    /** Photo captions, by photo id (images in lib/site.ts). */
    photos: {
      walk: "Family walk",
      motorcycle: "Motorcycle",
      campfire: "Campfire",
      brothers: "Brothers",
      family: "Family",
      nights: "Slow nights",
      speaking: "Speaking",
      drums: "Drums",
      stage: "On stage",
    },
  },

  contact: {
    eyebrow: "Got a gnarly B2B problem?",
    headline: "Let's untangle it together.",
    copy: "Copy",
    copied: "Copied ✓",
    /** {email} is replaced with the address. */
    copyAria: "Copy email {email} to clipboard",
  },

  footer: {
    left: "Thanks for dropping by · © 2026 Breno Araujo",
    back: "Back to top ↑",
  },

  caseStudy: {
    /** "Next — <title>" */
    nextPrefix: "Next — ",
    liveLabel: "See the live flow",
    credits: { role: "Role", team: "Team", madeWith: "Made with", shipped: "Shipped" },
    decision: "Decision",
    results: "Results",
    /** Screen-reader word between before → after numbers. */
    to: "to",
    before: "Before",
    after: "After",
    /** Shown when a case study has no translation yet and falls back to English. */
    notTranslated: "",
  },
};

export default en;
export type Dictionary = typeof en;
