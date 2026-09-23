/**
 * Semantic event names — the analytics contract. Kept in a pure module (no SDK
 * import) so both server and client components can reference the constants.
 * `track()` normalises these to GA4's snake_case before sending. Change them
 * deliberately: GA dashboards and funnels key off the derived event names.
 */
export const EVENTS = {
  NAV_CLICK: "Clicked Nav Link",
  CTA_CLICK: "Clicked CTA",
  WORK_CARD_CLICK: "Clicked Work Card",
  WRITING_CLICK: "Clicked Writing Link",
  CONTACT_CLICK: "Clicked Contact Link",
  NEXT_PROJECT_CLICK: "Clicked Next Project",
  CASE_STUDY_VIEW: "Viewed Case Study",
  EXPERIENCE_ROW_HOVER: "Hovered Experience Row",
  EXPERIENCE_THUMBNAIL_HOVER: "Hovered Experience Thumbnail",
  EXPERIENCE_THUMBNAIL_CLICK: "Clicked Experience Thumbnail",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];
