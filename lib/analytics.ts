import * as amplitude from "@amplitude/unified";

export { EVENTS } from "@/lib/analytics-events";
export type { EventName } from "@/lib/analytics-events";

/**
 * Thin wrapper around `amplitude.track`. Analytics must never break the page,
 * so failures (SDK not yet initialised, blocked by an ad blocker, SSR) are
 * swallowed. Import this only from client components — it pulls in the
 * browser-only Amplitude SDK. Server components should import event *names*
 * from `@/lib/analytics-events` and declare them as `data-track` attributes.
 */
export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    amplitude.track(event, props);
  } catch {
    // no-op: never let instrumentation throw in the UI path
  }
}
