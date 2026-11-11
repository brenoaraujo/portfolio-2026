"use client";

import { useEffect, useRef } from "react";
import { track, EVENTS } from "@/lib/analytics";

/**
 * Fires "Read Case Study" once, when the end of the case study's narrative
 * scrolls into view: the "they actually read it" step of the reader funnel.
 * Renders an invisible 1px marker pinned to the bottom of its parent (which
 * must be position: relative), so it adds no gap to the flex layout.
 */
export function TrackCaseStudyRead({ slug, title }: { slug: string; title: string }) {
  const markerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = markerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const start = performance.now();
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      observer.disconnect();
      track(EVENTS.CASE_STUDY_READ, {
        slug,
        title,
        seconds_on_page: Math.round((performance.now() - start) / 1000),
      });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [slug, title]);

  return (
    <div
      ref={markerRef}
      aria-hidden="true"
      style={{ position: "absolute", bottom: 0, left: 0, width: 1, height: 1, pointerEvents: "none" }}
    />
  );
}
