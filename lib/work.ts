import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { WORK, type WorkEntry } from "@/lib/site";

const WORK_DIR = path.join(process.cwd(), "content", "work");

export interface CaseStudyMeta {
  slug: string;
  title: string;
  /** Discipline label, e.g. "User Flow and UI". */
  eyebrow: string;
  /** Timeframe, e.g. "2024-2025". */
  years: string;
  /** Intro paragraph beneath the title. */
  lead: string;
  /** Optional live-flow link shown as a TextLink under the intro. */
  liveLink?: string;
  liveLabel?: string;
  heroImage: string;
  /** Optional hero video (autoplay, muted, loop, no controls). Takes priority. */
  heroVideo?: string;
  heroAlt?: string;
  credits: {
    role?: string;
    team?: string;
    madeWith?: string;
    shipped?: string;
  };
  /** When false, the study is a stub and excluded from static generation. */
  published: boolean;
}

function rawPath(slug: string) {
  return path.join(WORK_DIR, `${slug}.mdx`);
}

export function hasCaseStudy(slug: string): boolean {
  return fs.existsSync(rawPath(slug));
}

/** Slugs that have an MDX file, ordered to match the home "Recent work" grid. */
export function getWorkSlugs(): string[] {
  if (!fs.existsSync(WORK_DIR)) return [];
  const onDisk = new Set(
    fs
      .readdirSync(WORK_DIR)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, "")),
  );
  // Preserve WORK order; append any extra files not in WORK.
  const ordered = WORK.map((w) => w.slug).filter((s) => onDisk.has(s));
  for (const s of onDisk) if (!ordered.includes(s)) ordered.push(s);
  return ordered;
}

export function getCaseStudyMeta(slug: string): CaseStudyMeta {
  const file = fs.readFileSync(rawPath(slug), "utf8");
  const { data } = matter(file);
  const fallback: WorkEntry | undefined = WORK.find((w) => w.slug === slug);
  return {
    slug,
    title: data.title ?? fallback?.title ?? slug,
    eyebrow: data.eyebrow ?? fallback?.eyebrow ?? "",
    years: data.years ?? "",
    lead: data.lead ?? "",
    liveLink: data.liveLink,
    liveLabel: data.liveLabel ?? "See the live flow",
    heroImage: data.heroImage ?? fallback?.image ?? "",
    heroVideo: data.heroVideo,
    heroAlt: data.heroAlt ?? data.title ?? fallback?.title,
    credits: data.credits ?? {},
    published: data.published ?? true,
  };
}

export function getCaseStudyBody(slug: string): string {
  const file = fs.readFileSync(rawPath(slug), "utf8");
  return matter(file).content;
}

/** Slugs of published case studies only — used for static params. */
export function getPublishedSlugs(): string[] {
  return getWorkSlugs().filter((slug) => getCaseStudyMeta(slug).published);
}

/** The next study in the grid order (wraps around), for the "Next —" link. */
export function getNextCaseStudy(slug: string): { slug: string; title: string } | null {
  const published = getPublishedSlugs();
  if (published.length < 2) return null;
  const i = published.indexOf(slug);
  if (i === -1) return null;
  const nextSlug = published[(i + 1) % published.length];
  return { slug: nextSlug, title: getCaseStudyMeta(nextSlug).title };
}
