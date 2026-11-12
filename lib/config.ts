import en from "@/lib/i18n/dictionaries/en";

/** Canonical site URL — the custom domain. Used for metadata, sitemap, robots.
    Uses the www host because Vercel serves www as primary (apex 308-redirects
    to www); keeping canonical/sitemap/OG on www avoids a redirect hop. */
export const SITE_URL = "https://www.brenoaraujo.com";

export const SITE_NAME = "Breno Araujo";
/** English title and description. Per-language versions live in the
    dictionaries (dictionary.meta); these feed the English-only outputs
    (share image, manifest, llms.txt). */
export const SITE_TITLE = en.meta.title;
export const SITE_DESCRIPTION = en.meta.description;
