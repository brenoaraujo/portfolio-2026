import { WORK, type WorkEntry } from "@/lib/site";

/**
 * Per-application personalization. Each key is a company slug reachable at
 * /for/<slug> — e.g. VARIANTS.acme → /for/acme. A variant overrides the home
 * hero copy and/or leads the "Recent work" grid with the most relevant cases.
 *
 * These pages are noindex + canonical → "/", so they never compete with the
 * real home page in search (see app/for/[company]/page.tsx). Add an entry, push,
 * and send the company its link.
 */
export interface Variant {
  /** Overrides the big serif hero line. Falls back to HOME.title. */
  title?: string;
  /** Overrides the hero body paragraphs. Falls back to HOME.paragraphs. */
  description?: string[];
  /** Case-study slugs to lead with, in this order. The rest follow in the
   *  default WORK order — nothing is hidden. Unknown slugs are ignored. */
  order?: string[];
}

export const VARIANTS: Record<string, Variant> = {
  // Example — copy this block per application, then edit and push.
  // acme: {
  //   title: "I design finance and billing products end to end — from research to shipped UI.",
  //   description: [
  //     "First paragraph tailored to what Acme cares about.",
  //     "Second paragraph.",
  //   ],
  //   order: ["invoice", "sales-commission", "onboarding-revenue-streamline"],
  // },

  instrumentl: {
    title:
      "I turn financial and compliance complexity into interfaces non-finance teams can actually trust.",
    description: [
      "I've spent the last few years designing the financial and operational backbone of a platform that moves $8M+ a year through 500+ nonprofits, sports teams, and charities — including productizing the billing rules behind a multi-account invoicing system for finance teams, and replacing a spreadsheet-based commission process spanning five roles with a single automated source of truth.",
      "My default move on data-dense, multi-stakeholder problems is to find the states and rules underneath the complexity, then prototype fast (Figma, code, or AI) so the team can see it and decide with less guesswork.",
    ],
    order: [
      "invoice",
      "sales-commission",
      "raffle-landing-design-system",
      "change-it",
      "on-site-ticket-sales-app",
      "onboarding-revenue-streamline",
    ],
  },

  durable: {
    title:
      "I design AI-native product experiences and prototype them directly in code, not just in Figma.",
    description: [
      "Most recently I designed and built, in Cursor, an AI-guided landing-page builder for Ascend Fundraising: a step-by-step, prompt-driven flow that turns a client's answers into a real, shippable page. I built it on my own initiative before AI tooling was part of the company's process, and it validated the concept well enough that engineering rebuilt it for production. On a separate project with VanHack, I designed an AI agent, Vanna, that fills gaps in a job description one question at a time instead of demanding a form up front, as part of a broader product-led onboarding redesign that's now in build.",
      "Alongside that, I've built and documented full design systems — tokens, components, and code-level handoff for engineering — so the patterns I create keep scaling past the feature they started in. My default move on any ambiguous AI or UX problem is the same: prototype fast, in Figma, code, or directly with the model, so the team can see it and decide with less guesswork.",
    ],
    order: [
      "raffle-landing-design-system",
      "onboarding-revenue-streamline",
      "on-site-ticket-sales-app",
      "invoice",
      "change-it",
      "sales-commission",
    ],
  },

  evismart: {
    title:
      "I get in front of users before I open Figma, then build the AI-assisted workflow that turns what I learn into shipped design.",
    description: [
      "At Ascend Fundraising, I redesigned a point-of-sale app used by two very different groups in the same product: professional sales staff and volunteers who rotate in game to game with almost no training, selling fast in a loud stadium. There was no research practice in place, so I built one myself, borrowing a POS terminal to run think-aloud usability sessions with the people who actually sell. I turned what I learned into a redesigned failure path, clearer system feedback, and a lighter data-entry step, then took every screen to dev-ready specs and shipped it alongside a third-party development studio.",
      "I also design inside AI-assisted workflows, not just around them. When Ascend needed a way for non-profit clients to configure their own fundraising pages, I judged a requested PDF to be the wrong interaction and instead designed and built a guided, AI-powered page builder myself in Cursor, before AI tooling was common at the company. The prototype validated the concept well enough that engineering rebuilt it for production, and it's now in active client use.",
    ],
    order: [
      "on-site-ticket-sales-app",
      "raffle-landing-design-system",
      "onboarding-revenue-streamline",
      "invoice",
      "change-it",
      "sales-commission",
    ],
  },

  wenco: {
    title:
      "I own end-to-end UX for complex, workflow-heavy products — research, systems, and the judgment calls in between.",
    description: [
      "At Ascend Fundraising I redesigned a point-of-sale ticket-sales app used by two very different user groups in the same interface: trained sales staff and volunteers who rotate in game to game with almost no training, selling fast in a loud stadium. The company had no research practice in place, so I built one myself: I borrowed a POS terminal and ran think-aloud usability sessions with the people who actually sell, then used what I learned to redesign the failure states, system feedback, and information hierarchy each group needed differently, without splitting the product in two.",
      "I also own systems, not just screens. I mapped, built, and documented a full design system for Ascend's landing-page product that the team kept as the foundation after I changed teams. On a separate, more recent project with VanHack, I owned an employer-onboarding redesign end-to-end, from problem framing through a clickable prototype and a structured engineering handoff, pressure-testing the strategy directly with the CEO and CTO rather than a design manager — the kind of ambiguous, independently-owned work this role calls for.",
    ],
    order: [
      "on-site-ticket-sales-app",
      "raffle-landing-design-system",
      "onboarding-revenue-streamline",
      "invoice",
      "change-it",
      "sales-commission",
    ],
  },

  yocale: {
    title:
      "I design the flows businesses actually adopt — booking, payments, and the systems that hold them together.",
    description: [
      "For nearly two decades I've owned product design end-to-end — research, wireframes, high-fidelity UI, prototyping, and the design system underneath it all. Most recently that's meant designing across a platform running $8M+ a year in transactions for 500+ businesses, partnering directly with engineering (Figma, shadcn/ui, Tailwind) to keep every design implementation-ready.",
      "My default move is to listen first, gather as much context and data as I can, then prototype quickly (Figma, code, or AI) to reduce ambiguity and help teams decide with less guesswork and more clarity.",
    ],
    order: [
      "raffle-landing-design-system",
      "onboarding-revenue-streamline",
      "change-it",
      "invoice",
      "on-site-ticket-sales-app",
      "sales-commission",
    ],
  },
};

/** Look up a variant by company slug (case-insensitive). */
export function getVariant(company: string): Variant | undefined {
  return VARIANTS[company.toLowerCase()];
}

/**
 * Reorder the work grid so `order` slugs lead (in that order); every other
 * case follows in the default WORK order. Nothing is hidden. Unknown slugs in
 * `order` are dropped. Omitting `order` returns the default WORK order.
 */
export function orderedWork(order?: string[]): WorkEntry[] {
  if (!order || order.length === 0) return WORK;
  const bySlug = new Map(WORK.map((w) => [w.slug, w]));
  const lead = order
    .map((slug) => bySlug.get(slug))
    .filter((w): w is WorkEntry => Boolean(w));
  const leadSlugs = new Set(lead.map((w) => w.slug));
  const rest = WORK.filter((w) => !leadSlugs.has(w.slug));
  return [...lead, ...rest];
}
