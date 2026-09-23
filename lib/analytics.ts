export { EVENTS } from "@/lib/analytics-events";
export type { EventName } from "@/lib/analytics-events";

type Gtag = (command: string, ...args: unknown[]) => void;

/**
 * localStorage flag that suppresses ALL analytics (Google Analytics)
 * for this browser. Set it by loading the site with `?analytics=off` and clear
 * it with `?analytics=on` — this is how the site owner keeps their own traffic
 * out of the data without touching the GA dashboard.
 */
export const ANALYTICS_OPTOUT_KEY = "ba-analytics-optout";

/** True unless this browser has opted out. Client-only; false on the server. */
export function analyticsEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(ANALYTICS_OPTOUT_KEY) !== "1";
  } catch {
    return true;
  }
}

/**
 * Sends a custom event to Google Analytics (gtag). Analytics must never break
 * the page, so failures (gtag not yet loaded, blocked by an ad blocker, SSR)
 * are swallowed, and nothing is sent when this browser has opted out. The
 * human-readable event names in `@/lib/analytics-events` are normalised to
 * GA4's snake_case (e.g. "Clicked Nav Link" → "clicked_nav_link"). Client-only;
 * server components should declare event names as `data-track` attributes.
 */
export function track(event: string, props?: Record<string, unknown>) {
  if (!analyticsEnabled() || typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (!gtag) return;
  const name = event
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  try {
    gtag("event", name, props ?? {});
  } catch {
    // no-op: never let instrumentation throw in the UI path
  }
}
