"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/unified";

// Amplitude ingestion key — public by design; move to an env var when you set up environments.
const AMPLITUDE_API_KEY = "5588672af2766cf7e7aa29a929204042";

// Module-level guard so init runs once for the app's lifetime, even across
// client re-renders or Fast Refresh.
let initialized = false;

/** Client-only Amplitude bootstrap. Mounted once in the root layout. */
export function Amplitude() {
  useEffect(() => {
    if (initialized) return;
    initialized = true;
    amplitude.initAll(AMPLITUDE_API_KEY, {
      analytics: { autocapture: true },
      sessionReplay: { sampleRate: 1 },
    });
  }, []);

  return null;
}
