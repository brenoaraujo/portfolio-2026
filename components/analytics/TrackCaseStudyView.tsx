"use client";

import { useEffect } from "react";
import { track, EVENTS } from "@/lib/analytics";

/** Fires "Viewed Case Study" when a case-study route mounts. */
export function TrackCaseStudyView({ slug, title }: { slug: string; title: string }) {
  useEffect(() => {
    track(EVENTS.CASE_STUDY_VIEW, { slug, title });
  }, [slug, title]);

  return null;
}
