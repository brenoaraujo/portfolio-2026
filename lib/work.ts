import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { WORK, type WorkEntry } from "@/lib/site";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

/** English case studies live in content/work/<slug>.mdx; translations in
    content/work/<locale>/<slug>.mdx, with the same slug and frontmatter keys.
    A study without a translation falls back to English. */
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
  /** Optional second paragraph beneath the lead. */
  sublead?: string;
  /** Optional results strip shown in the header, above the hero. Each label
      is a list of lines (one <br /> between each). */
  results?: { before?: string; after: string; unit?: string; label: string[] }[];
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
  /** The language the content is actually in (English when no translation). */
  contentLocale: Locale;
  /** False when a translation was requested but doesn't exist yet. */
  translated: boolean;
}

function rawPath(slug: string, locale: Locale = DEFAULT_LOCALE) {
  return locale === DEFAULT_LOCALE
    ? path.join(WORK_DIR, `${slug}.mdx`)
    : path.join(WORK_DIR, locale, `${slug}.mdx`);
}

/** True when `slug` has its own file for `locale` (always true for English). */
export function hasTranslation(slug: string, locale: Locale): boolean {
  return fs.existsSync(rawPath(slug, locale));
}

/** The file to read for `slug` in `locale`: the translation, else English. */
function sourceFor(slug: string, locale: Locale): { file: string; contentLocale: Locale } {
  if (locale !== DEFAULT_LOCALE && hasTranslation(slug, locale)) {
    return { file: rawPath(slug, locale), contentLocale: locale };
  }
  return { file: rawPath(slug), contentLocale: DEFAULT_LOCALE };
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

export function getCaseStudyMeta(slug: string, locale: Locale = DEFAULT_LOCALE): CaseStudyMeta {
  const source = sourceFor(slug, locale);
  const file = fs.readFileSync(source.file, "utf8");
  const { data } = matter(file);
  const fallback: WorkEntry | undefined = WORK.find((w) => w.slug === slug);
  return {
    slug,
    title: data.title ?? fallback?.title ?? slug,
    eyebrow: data.eyebrow ?? fallback?.eyebrow ?? "",
    years: data.years ?? "",
    lead: data.lead ?? "",
    sublead: data.sublead,
    results: Array.isArray(data.results) ? data.results : undefined,
    liveLink: data.liveLink,
    // Falls back to the dictionary's caseStudy.liveLabel on the page.
    liveLabel: data.liveLabel,
    heroImage: data.heroImage ?? fallback?.image ?? "",
    heroVideo: data.heroVideo,
    heroAlt: data.heroAlt ?? data.title ?? fallback?.title,
    credits: data.credits ?? {},
    published: data.published ?? true,
    contentLocale: source.contentLocale,
    translated: source.contentLocale === locale,
  };
}

export function getCaseStudyBody(slug: string, locale: Locale = DEFAULT_LOCALE): string {
  const file = fs.readFileSync(sourceFor(slug, locale).file, "utf8");
  return matter(file).content;
}

/** Slugs of published case studies only — used for static params. */
export function getPublishedSlugs(): string[] {
  return getWorkSlugs().filter((slug) => getCaseStudyMeta(slug).published);
}

/** The next study in the grid order (wraps around), for the "Next —" link. */
export function getNextCaseStudy(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): { slug: string; title: string } | null {
  const published = getPublishedSlugs();
  if (published.length < 2) return null;
  const i = published.indexOf(slug);
  if (i === -1) return null;
  const nextSlug = published[(i + 1) % published.length];
  return { slug: nextSlug, title: getCaseStudyMeta(nextSlug, locale).title };
}
