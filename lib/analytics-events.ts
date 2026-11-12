/**
 * Semantic event names, the analytics contract. Kept in a pure module (no SDK
 * import) so both server and client components can reference the constants.
 * PostHog receives these names as written; `track()` turns them into GA4's
 * snake_case for Google Analytics. Change them deliberately: the PostHog
 * dashboard, funnel and tagged-link alert key off them. The full tracking plan
 * lives in docs/amplitude-instrumentation.csv.
 */
export const EVENTS = {
  TAGGED_LINK_OPEN: "Opened Tagged Link",
  NAV_CLICK: "Clicked Nav Link",
  CTA_CLICK: "Clicked CTA",
  WORK_CARD_CLICK: "Clicked Work Card",
  WRITING_CLICK: "Clicked Writing Link",
  CONTACT_CLICK: "Clicked Contact Link",
  NEXT_PROJECT_CLICK: "Clicked Next Project",
  CASE_STUDY_VIEW: "Viewed Case Study",
  CASE_STUDY_READ: "Read Case Study",
  SLIDER_USE: "Used Before After Slider",
  LANGUAGE_PROMPT_VIEW: "Viewed Language Prompt",
  LANGUAGE_SWITCH: "Switched Language",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];
