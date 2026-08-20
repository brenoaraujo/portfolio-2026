"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/unified";

/** Fires the load-time "Viewed Home Page" event when the home route mounts. */
export function TrackHomeView() {
  useEffect(() => {
    amplitude.track('Viewed Home Page', { prompt_version: 'BA400.4' }); // helps improve this setup flow — safe to remove once you've verified the event lands
  }, []);

  return null;
}
