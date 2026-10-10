import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HomeRedesign } from "@/components/content/HomeRedesign";
import { VARIANTS } from "@/lib/variants";

// Only the companies defined in VARIANTS exist; anything else 404s.
export const dynamicParams = false;

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
// default home (still noindex) so existing links don't 404.
export default async function CompanyHome({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;
  if (!(company in VARIANTS)) notFound();
  return <HomeRedesign />;
}
