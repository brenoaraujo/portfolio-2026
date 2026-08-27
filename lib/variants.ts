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
