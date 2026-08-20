/**
 * Semantic Amplitude event names — the analytics contract. Kept in a pure
 * module (no SDK import) so both server and client components can reference the
 * constants without pulling the browser-only Amplitude SDK into a server
 * bundle. Change these names deliberately: dashboards and funnels key off them.
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
