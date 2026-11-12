import { NextResponse, type NextRequest } from "next/server";
import {
  COUNTRY_COOKIE,
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  isLocale,
  isLocalizedPath,
  localePath,
} from "@/lib/i18n/config";

/**
 * Language routing. Every page lives in app/[lang]/, but English keeps its
 * clean URLs:
 *
 *   /pt-br/...  → served as is.
 *   /en/...     → 308 to the unprefixed URL, so English has one address.
 *   /...        → served from /en/... behind the scenes (a rewrite, not a
 *                 redirect: the address bar and every existing link stay the
 *                 same). If the visitor picked another language before (the
 *                 ba-lang cookie), home and case studies redirect there.
 *
 * It also stores Vercel's country header in a cookie so the page can decide
 * whether to offer the Portuguese version (see components/i18n/LanguagePrompt).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (isLocale(first)) return NextResponse.next();

  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(chosen) && chosen !== DEFAULT_LOCALE && isLocalizedPath(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = localePath(chosen, pathname);
    // 307: depends on the cookie, so browsers and CDNs must not cache it.
    return NextResponse.redirect(url, 307);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.rewrite(url);

  // Only needed until the visitor makes a choice.
  const country = request.headers.get("x-vercel-ip-country");
  if (country && !chosen && request.cookies.get(COUNTRY_COOKIE)?.value !== country) {
    response.cookies.set(COUNTRY_COOKIE, country, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }
  return response;
}

export const config = {
  // Pages only: skip Next internals, the PostHog relay, public assets, and any
  // path with a file extension (robots.txt, sitemap.xml, llms.txt, images…).
  matcher: ["/((?!_next|__nextjs|relay|assets|api|opengraph-image|twitter-image|.*\\..*).*)"],
};
