/**
 * Locale setup — the one place that knows which languages the site speaks.
 *
 * English is the default and lives at the unprefixed URLs (/, /work/<slug>).
 * Every other locale gets a prefix (/pt-br, /pt-br/work/<slug>). Under the hood
 * all pages live in app/[lang]/; proxy.ts quietly serves /en for unprefixed URLs.
 *
 * To add a language: add it to LOCALES and the maps below, add a dictionary in
 * lib/i18n/dictionaries/, and (optionally) translated case studies in
 * content/work/<locale>/.
 *
 * Kept free of server-only imports so proxy.ts and client components can use it.
 */

export const LOCALES = ["en", "pt-br"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Remembers the language a visitor picked ("en" | "pt-br"). Read by proxy.ts. */
export const LOCALE_COOKIE = "ba-lang";
/** Visitor country from Vercel's geo header, set by proxy.ts for the language prompt. */
export const COUNTRY_COOKIE = "ba-country";

/** <html lang> and hreflang values. */
export const HTML_LANG: Record<Locale, string> = { en: "en", "pt-br": "pt-BR" };
/** Open Graph locale. */
export const OG_LOCALE: Record<Locale, string> = { en: "en_CA", "pt-br": "pt_BR" };
/** Intl locale for dates and times. */
export const INTL_LOCALE: Record<Locale, string> = { en: "en-US", "pt-br": "pt-BR" };

/**
 * Who gets offered a language (the one-time prompt on English pages). A visitor
 * qualifies if any browser language starts with one of `languages`, or if
 * Vercel places them in one of `countries` (ISO 3166-1 alpha-2).
 */
export const PROMPT_SIGNALS: Partial<Record<Locale, { languages: string[]; countries: string[] }>> = {
  "pt-br": { languages: ["pt"], countries: ["BR"] },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/**
 * The URL of `path` in `locale`. English stays unprefixed.
 *   localePath("pt-br", "/")             → "/pt-br"
 *   localePath("pt-br", "/work/invoice") → "/pt-br/work/invoice"
 *   localePath("pt-br", "/#work")        → "/pt-br#work"
 *   localePath("en", "/work/invoice")    → "/work/invoice"
 */
export function localePath(locale: Locale, path = "/"): string {
  if (locale === DEFAULT_LOCALE) return path;
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/#") || path.startsWith("/?")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

/** Pages that exist in every locale. /for/<company> stays English only. */
export function isLocalizedPath(path: string): boolean {
  return path === "/" || path.startsWith("/work/");
}

/** hreflang map for `metadata.alternates.languages` (and the sitemap). */
export function languageAlternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const locale of LOCALES) map[HTML_LANG[locale]] = localePath(locale, path);
  map["x-default"] = localePath(DEFAULT_LOCALE, path);
  return map;
}
