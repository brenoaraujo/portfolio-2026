/** Canonical site URL — the custom domain. Used for metadata, sitemap, robots.
    Uses the www host because Vercel serves www as primary (apex 308-redirects
    to www); keeping canonical/sitemap/OG on www avoids a redirect hop. */
export const SITE_URL = "https://www.brenoaraujo.com.br";

export const SITE_NAME = "Breno Araujo";
export const SITE_TITLE = "Breno Araujo — Product designer";
export const SITE_DESCRIPTION =
  "Product designer and design engineer based in Vancouver. I listen first, gather context, then prototype quickly — in Figma, code, or AI — to reduce ambiguity.";
