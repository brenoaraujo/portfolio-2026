"use client";

import { useEffect } from "react";
import smartlook from "smartlook-client";
import { analyticsEnabled } from "@/lib/analytics";

// Smartlook project key, read from the environment so it isn't hardcoded in
// source. Public client-side key — set NEXT_PUBLIC_SMARTLOOK_KEY in .env.local
// and in the Vercel project.
const SMARTLOOK_KEY = process.env.NEXT_PUBLIC_SMARTLOOK_KEY;

// Module-level guard so init runs once for the app's lifetime (survives
// re-renders and Fast Refresh).
let inited = false;

/**
 * Smartlook session recording via the official npm client (region eu).
 * Client-only, initialized once. Replaces the hand-injected vendor snippet,
 * which threw "smartlook is not a function" under Next's bundling/Fast Refresh.
 */
export function Smartlook() {
  useEffect(() => {
    if (!SMARTLOOK_KEY || !analyticsEnabled() || inited || smartlook.initialized()) return;
    inited = true;
    smartlook.init(SMARTLOOK_KEY, { region: "eu" });
  }, []);

  return null;
}
