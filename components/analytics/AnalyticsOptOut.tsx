"use client";

import { useEffect } from "react";
import { ANALYTICS_OPTOUT_KEY } from "@/lib/analytics";

/**
 * Reads `?analytics=off|on` from the URL and persists an opt-out flag in
 * localStorage, then strips the param from the address bar. Mounted first in
 * the layout so the flag is written before Amplitude/Smartlook decide whether
 * to initialise. This is how the site owner excludes their own traffic: load
 * the site once per browser/device with `?analytics=off` (undo with `=on`).
 */
export function AnalyticsOptOut() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const value = params.get("analytics");
      if (value !== "off" && value !== "on") return;

      if (value === "off") window.localStorage.setItem(ANALYTICS_OPTOUT_KEY, "1");
      else window.localStorage.removeItem(ANALYTICS_OPTOUT_KEY);

      // Drop the param so it doesn't linger, get bookmarked, or get shared.
      params.delete("analytics");
      const qs = params.toString();
      window.history.replaceState(
        null,
        "",
        window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash,
      );
    } catch {
      // localStorage can throw (private mode / blocked) — ignore.
    }
  }, []);

  return null;
}
