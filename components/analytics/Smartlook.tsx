"use client";

import { useEffect } from "react";
import smartlook from "smartlook-client";

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
    if (inited || smartlook.initialized()) return;
    inited = true;
    smartlook.init("75361479432312a449390dee3f6899b5013fdefe", { region: "eu" });
  }, []);

  return null;
}
