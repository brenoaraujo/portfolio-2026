"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fires the load-time "Viewed Home Page" event when the home route mounts.
 * Routed through track() so it honours the analytics opt-out. */
export function TrackHomeView() {
  useEffect(() => {
    track("Viewed Home Page");
  }, []);

  return null;
}
