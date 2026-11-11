import posthog from "posthog-js";

export { EVENTS } from "@/lib/analytics-events";
export type { EventName } from "@/lib/analytics-events";

type Gtag = (command: string, ...args: unknown[]) => void;

/**
 * localStorage flag that suppresses ALL analytics (PostHog and Google
 * Analytics) for this browser. Set it by loading the site with
 * `?analytics=off` and clear it with `?analytics=on`. This is how the site
 * owner keeps their own traffic out of the data.
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

function gtag(): Gtag | undefined {
  return (window as unknown as { gtag?: Gtag }).gtag;
}

/** GA4 wants snake_case event names: "Clicked Nav Link" → "clicked_nav_link". */
function gaEventName(event: string): string {
  return event
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/**
 * Sends a named event to PostHog (started in instrumentation-client.ts) and to
 * Google Analytics. Analytics must never break
 * the page, so failures (SDK not loaded, blocked, SSR) are swallowed, and
 * nothing is sent when this browser has opted out. Client-only; server
 * components should declare event names as `data-track` attributes instead.
 */
export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined" || !analyticsEnabled()) return;
  try {
    if (posthog.__loaded) posthog.capture(event, props);
  } catch {
    // no-op: never let instrumentation throw in the UI path
  }
  try {
    gtag()?.("event", gaEventName(event), props ?? {});
  } catch {
    // no-op
  }
}

/** Reports an error caught by an error boundary (PostHog error tracking + GA). */
export function captureException(error: Error & { digest?: string }) {
  if (typeof window === "undefined" || !analyticsEnabled()) return;
  try {
    if (posthog.__loaded) posthog.captureException(error, { digest: error.digest });
  } catch {
    // no-op
  }
  try {
    gtag()?.("event", "exception", { description: error.message, fatal: true, digest: error.digest });
  } catch {
    // no-op
  }
}
