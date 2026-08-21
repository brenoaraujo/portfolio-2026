"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/unified";

// Amplitude ingestion key, read from the environment so it isn't hardcoded in
// source. It's a public client-side key (it still ships in the browser bundle,
// which it must to send events) — set NEXT_PUBLIC_AMPLITUDE_API_KEY in
// .env.local and in the Vercel project.
const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

// Module-level guard so init runs once for the app's lifetime, even across
// client re-renders or Fast Refresh.
let initialized = false;

/** Client-only Amplitude bootstrap. Mounted once in the root layout. */
export function Amplitude() {
  useEffect(() => {
    if (initialized || !AMPLITUDE_API_KEY) return;
    initialized = true;
    amplitude.initAll(AMPLITUDE_API_KEY, {
      analytics: { autocapture: true },
      sessionReplay: { sampleRate: 1 },
    });
  }, []);

  return null;
}
