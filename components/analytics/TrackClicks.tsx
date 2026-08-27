"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { analyticsEnabled, track } from "@/lib/analytics";

const POSTHOG_EVENTS: Record<string, string> = {
  "Clicked Nav Link": "navigation_link_clicked",
  "Clicked CTA": "contact_cta_clicked",
  "Clicked Work Card": "case_study_opened",
  "Clicked Writing Link": "writing_link_clicked",
  "Clicked Contact Link": "contact_link_clicked",
  "Clicked Next Project": "next_case_study_clicked",
};

/**
 * Global click instrumentation. Listens once at the document level and fires an
 * Amplitude event for any clicked element (or ancestor) carrying a `data-track`
 * attribute — its value is the event name — with every other `data-track-*`
 * attribute passed along as an event property (e.g. `data-track-label="Work"`
 * → `{ label: "Work" }`).
 *
 * This lets server-rendered links stay server components: they declare intent
 * in markup instead of each wiring up an onClick handler. Complements
 * Amplitude autocapture with named, funnel-ready events.
 */
export function TrackClicks() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      const event = el?.dataset.track;
      if (!el || !event) return;

      const props: Record<string, string> = {};
      for (const key in el.dataset) {
        if (key === "track" || !key.startsWith("track")) continue;
        const name = key.slice("track".length);
        props[name.charAt(0).toLowerCase() + name.slice(1)] = el.dataset[key] ?? "";
      }
      track(event, props);

      const posthogEvent = POSTHOG_EVENTS[event];
      if (posthogEvent && analyticsEnabled()) {
        posthog.capture(posthogEvent, props);
      }
    }

    // Capture phase so we still log the click even if a handler stops bubbling.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
