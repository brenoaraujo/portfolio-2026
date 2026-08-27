import posthog from "posthog-js";
import { analyticsEnabled } from "@/lib/analytics";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

function reportMissing(variable: string) {
  if (process.env.NODE_ENV === "development") {
    throw new Error(
      `${variable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${variable} is configured`
    );
  }
}

// Respect the site-wide opt-out (?analytics=off) the same way Amplitude,
// Smartlook and GA do — don't initialise PostHog for opted-out browsers so the
// owner's own traffic stays out of every vendor, not just some of them.
if (!analyticsEnabled()) {
  // no-op: this browser opted out
} else if (!posthogKey) {
  reportMissing("NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN");
} else if (!posthogHost) {
  reportMissing("NEXT_PUBLIC_POSTHOG_HOST");
} else {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    defaults: "2026-01-30",
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
}
