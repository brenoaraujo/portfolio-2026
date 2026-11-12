import { LOCALE_COOKIE, type Locale } from "./config";

/** Browser-only cookie read. Returns null when missing or unreadable. */
export function readCookie(name: string): string | null {
  try {
    const hit = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
    return hit ? decodeURIComponent(hit.slice(name.length + 1)) : null;
  } catch {
    return null;
  }
}

/** Remembers the visitor's language for a year. proxy.ts reads it to send a
    returning visitor straight to their language. */
export function rememberLocale(locale: Locale) {
  try {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
  } catch {
    // Cookies blocked: the switch still navigates, it just won't be remembered.
  }
}
