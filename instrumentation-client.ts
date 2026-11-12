import posthog from "posthog-js";
import { ANALYTICS_OPTOUT_KEY } from "@/lib/analytics";
import { applyAttribution } from "@/lib/attribution";

/**
 * PostHog bootstrap. Next.js runs this file before React hydrates, so the
 * first pageview is never missed.
 *
 * - Events go through the /relay rewrite in next.config.ts, so the browser
 *   only talks to brenoaraujo.com, never to a third-party analytics domain.
 * - Session replay is off. The first setup recorded 100% of sessions, the
 *   suspected reason some corporate networks blocked the site.
 * - Browsers that opted out with ?analytics=off never start PostHog.
 * - On load, applyAttribution() tags the visitor with the ?ref= of the
 *   application link they used (see lib/attribution.ts).
 */
const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

/** Reads and persists ?analytics=off|on here, because this runs before
 *  AnalyticsOptOut's effect and the first opted-out load must not leak. */
function optedOut(): boolean {
  try {
    const param = new URLSearchParams(window.location.search).get("analytics");
    if (param === "off") window.localStorage.setItem(ANALYTICS_OPTOUT_KEY, "1");
    if (param === "on") window.localStorage.removeItem(ANALYTICS_OPTOUT_KEY);
    return window.localStorage.getItem(ANALYTICS_OPTOUT_KEY) === "1";
  } catch {
    return false;
  }
}

if (!token) {
  if (process.env.NODE_ENV === "development") {
    console.warn("[analytics] NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is not set, so PostHog is off.");
  }
} else if (!optedOut()) {
  posthog.init(token, {
    api_host: "/relay",
    ui_host: "https://us.posthog.com",
    defaults: "2026-08-30",
    // A profile per visitor, so a tagged visitor's whole journey shows in Persons.
    person_profiles: "always",
    disable_session_recording: true,
    capture_exceptions: true,
    // Runs before the initial pageview is sent, so that pageview carries the ref
    // and the page language ("en" or "pt-BR", from <html lang>).
    loaded: (ph) => {
      ph.register({ site_language: document.documentElement.lang || "en" });
      applyAttribution(ph);
    },
  });
}
