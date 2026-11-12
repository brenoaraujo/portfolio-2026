import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { getPublishedSlugs, hasTranslation } from "@/lib/work";
import { LOCALES, HTML_LANG, localePath, languageAlternates } from "@/lib/i18n/config";

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/** Absolute hreflang map, limited to the locales in `available`. */
function alternates(path: string, available: readonly string[]) {
  const languages: Record<string, string> = {};
  for (const [lang, href] of Object.entries(languageAlternates(path))) {
    if (lang === "x-default" || available.some((l) => HTML_LANG[l as keyof typeof HTML_LANG] === lang)) {
      languages[lang] = abs(href);
    }
  }
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Home exists in every language.
  const home = LOCALES.map((locale) => ({
    url: abs(localePath(locale, "/")),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: alternates("/", LOCALES),
  }));

  // Case studies: only the languages they're actually written in (an
  // untranslated /pt-br page shows English and is noindex).
  const work = getPublishedSlugs().flatMap((slug) => {
    const path = `/work/${slug}`;
    const available = LOCALES.filter((locale) => hasTranslation(slug, locale));
    return available.map((locale) => ({
      url: abs(localePath(locale, path)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: alternates(path, available),
    }));
  });

  return [...home, ...work];
}
