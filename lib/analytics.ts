import * as amplitude from "@amplitude/unified";

export { EVENTS } from "@/lib/analytics-events";
export type { EventName } from "@/lib/analytics-events";

/**
 * localStorage flag that suppresses ALL analytics (Amplitude, Smartlook, GA)
 * for this browser. Set it by loading the site with `?analytics=off` and clear
 * it with `?analytics=on` — this is how the site owner keeps their own traffic
 * out of the data without touching each vendor's dashboard.
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
 * Thin wrapper around `amplitude.track`. Analytics must never break the page,
 * so failures (SDK not yet initialised, blocked by an ad blocker, SSR) are
 * swallowed, and nothing is sent when this browser has opted out. Import this
 * only from client components — it pulls in the browser-only Amplitude SDK.
 * Server components should import event *names* from `@/lib/analytics-events`
 * and declare them as `data-track` attributes.
 */
export function track(event: string, props?: Record<string, unknown>) {
  if (!analyticsEnabled()) return;
  try {
    amplitude.track(event, props);
  } catch {
    // no-op: never let instrumentation throw in the UI path
  }
}
