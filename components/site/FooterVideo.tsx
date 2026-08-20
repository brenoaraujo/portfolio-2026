"use client";

import { useEffect, useRef } from "react";

/**
 * Footer background video that plays once each time it scrolls into view, and
 * restarts when the section leaves and returns. No loop — it's a one-shot per
 * visit. Muted + playsInline so programmatic playback is allowed. Honours
 * prefers-reduced-motion by holding on the first frame.
 */
export function FooterVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return; // hold on the first frame; no motion
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.currentTime = 0;
            void el.play().catch(() => {});
          } else {
            el.pause();
          }
        }
      },
      { threshold: 0.25 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden="true"
      tabIndex={-1}
      muted
      playsInline
      preload="metadata"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 0,
      }}
    >
      <source src={src} type="video/webm" />
    </video>
  );
}
