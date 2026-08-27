import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HomeView } from "@/components/content/HomeView";
import { VARIANTS, getVariant } from "@/lib/variants";

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

export default async function CompanyHome({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;
  const variant = getVariant(company);
  if (!variant) notFound();
  return <HomeView variant={variant} />;
}
