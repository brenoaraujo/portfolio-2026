import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HomeRedesign } from "@/components/content/HomeRedesign";
import { VARIANTS } from "@/lib/variants";
import { DEFAULT_LOCALE } from "@/lib/i18n";

// Only the companies defined in VARIANTS exist; anything else 404s.
export const dynamicParams = false;

// Tailored application pages are English only. Every language gets the params
// (Next skips the whole route if one parent locale returns none), and the page
// itself 404s outside English, so /pt-br/for/<company> doesn't exist.
export function generateStaticParams() {
  return Object.keys(VARIANTS).map((company) => ({ company }));
}

// These are tailored, near-duplicate versions of the home page. Keep them out
// of search entirely and point authority at the canonical "/", so they never
// compete with or dilute the real home page (and companies can't find each
// other's versions via Google).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

// Per-company variants are paused during the redesign; these routes render the
// default home (still noindex) so existing links don't 404. No language
// switcher or Portuguese prompt here: the page was sent to a specific company.
export default async function CompanyHome({ params }: PageProps<"/[lang]/for/[company]">) {
  const { lang, company } = await params;
  if (lang !== DEFAULT_LOCALE || !(company in VARIANTS)) notFound();
  return <HomeRedesign locale={DEFAULT_LOCALE} languageUi={false} />;
}
