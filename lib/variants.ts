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
