import type { PostHogInterface } from "posthog-js";
import { EVENTS } from "@/lib/analytics-events";

/**
 * Per-application link tracking. Every portfolio link Breno sends carries a
 * short tag, e.g. brenoaraujo.com/?ref=clio-payments, so a visit can be traced
 * back to one application. /for/<company> pages count as tagged too.
 *
 * The tag is saved on the visitor (PostHog super property), so every later
 * event, and any return visit, carries it. The tag stays in the URL on
 * purpose: if a recruiter forwards the link, a second visitor shows up with
 * the same ref.
 */

/** A ref is a short lowercase slug: "clio-payments", "resume-asana". */
const REF_PATTERN = /^[a-z0-9][a-z0-9-]{0,62}$/;

/** Remembers the PostHog session that already sent "Opened Tagged Link". */
const TAGGED_SESSION_KEY = "ba-tagged-session";

function cleanRef(value: string | null | undefined): string | null {
  const v = value?.trim().toLowerCase();
  return v && REF_PATTERN.test(v) ? v : null;
}

/** The ref this page load arrived with: ?ref=..., or the /for/<company> slug. */
export function refFromLocation(
  loc: Pick<Location, "search" | "pathname"> = window.location,
): { ref: string; company?: string } | null {
  const company = cleanRef(loc.pathname.match(/^\/for\/([^/]+)/)?.[1]);
  const ref = cleanRef(new URLSearchParams(loc.search).get("ref")) ?? company;
  if (!ref) return null;
  return company ? { ref, company } : { ref };
}

function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // storage blocked (private mode): the worst case is a repeat event
  }
}

/**
 * PostHog `loaded` callback. Saves the ref on the visitor, then sends
 * "Opened Tagged Link" once per PostHog session while a ref is known, both on
 * the first visit through the link and on later return visits. The real-time
 * alert in PostHog keys off that event.
 */
export function applyAttribution(ph: PostHogInterface) {
  try {
    const arrived = refFromLocation();
    if (arrived) {
      ph.register(arrived);
      ph.register_once({ first_ref: arrived.ref });
      ph.setPersonProperties({ ref: arrived.ref }, { first_ref: arrived.ref });
    }

    const ref = ph.get_property("ref");
    if (typeof ref !== "string" || !ref) return;

    const marker = `${ph.get_session_id()}:${ref}`;
    if (readStorage(TAGGED_SESSION_KEY) === marker) return;
    writeStorage(TAGGED_SESSION_KEY, marker);

    ph.capture(EVENTS.TAGGED_LINK_OPEN, {
      ref,
      landing_path: window.location.pathname,
      via: arrived ? "link" : "return visit",
    });
  } catch {
    // attribution must never break the page
  }
}
