"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";
import posthog from "posthog-js";
import { analyticsEnabled } from "@/lib/analytics";

const PLATE: CSSProperties = {
  display: "block",
  width: "100%",
  height: "auto",
};

/**
 * Interactive before/after comparison. The "after" image sits on top, clipped
 * to a draggable handle; sliding the handle reveals more or less of it over the
 * "before" image underneath. Works with pointer (mouse/touch) and keyboard.
 *
 * Both images should share the same dimensions so the reveal lines up. The
 * plate takes its aspect ratio from the "before" image (rendered normally);
 * the "after" image is absolutely positioned to match.
 */
export function BeforeAfterSlider({
  beforeSrc,
  beforeAlt = "Before",
  afterSrc,
  afterAlt = "After",
  beforeLabel = "Before",
  afterLabel = "After",
  caption,
  initial = 50,
}: {
  beforeSrc: string;
  beforeAlt?: string;
  afterSrc: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  /** Starting handle position, 0–100 (% from the left). */
  initial?: number;
}) {
  const [position, setPosition] = useState(clamp(initial));
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const hasCapturedInteractionRef = useRef(false);

  const captureInteraction = useCallback((interaction_method: "pointer" | "keyboard") => {
    if (hasCapturedInteractionRef.current || !analyticsEnabled()) return;
    hasCapturedInteractionRef.current = true;
    posthog.capture("before_after_comparison_started", { interaction_method });
  }, []);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(clamp(pct));
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      draggingRef.current = true;
      captureInteraction("pointer");
      e.currentTarget.setPointerCapture(e.pointerId);
      setFromClientX(e.clientX);
    },
    [captureInteraction, setFromClientX],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      setFromClientX(e.clientX);
    },
    [setFromClientX],
  );

  const endDrag = useCallback((e: React.PointerEvent) => {
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") {
      captureInteraction("keyboard");
      e.preventDefault();
      setPosition((p) => clamp(p - step));
    } else if (e.key === "ArrowRight") {
      captureInteraction("keyboard");
      e.preventDefault();
      setPosition((p) => clamp(p + step));
    } else if (e.key === "Home") {
      captureInteraction("keyboard");
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      captureInteraction("keyboard");
      e.preventDefault();
      setPosition(100);
    }
  }, [captureInteraction]);

  return (
    <figure style={{ display: "flex", flexDirection: "column", gap: 24, margin: 0, width: "100%", alignSelf: "stretch" }}>
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          borderRadius: 12,
          boxShadow: "inset 0 0 0 1px rgb(212,212,212)",
          userSelect: "none",
          touchAction: "pan-y",
          cursor: "ew-resize",
        }}
      >
        {/* Before — sets the box height */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={beforeSrc} alt={beforeAlt} draggable={false} style={PLATE} />

        {/* After — clipped to the handle position */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `inset(0 0 0 ${position}%)`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={afterSrc}
            alt={afterAlt}
            draggable={false}
            style={{ ...PLATE, position: "absolute", inset: 0, height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Corner labels */}
        <Label style={{ left: 12 }}>{beforeLabel}</Label>
        <Label style={{ right: 12 }}>{afterLabel}</Label>

        {/* Handle */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Reveal the redesigned version"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% revealed`}
          onKeyDown={onKeyDown}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${position}%`,
            width: 2,
            transform: "translateX(-1px)",
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.15)",
            cursor: "ew-resize",
            outline: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              color: "rgb(64,64,64)",
              fontSize: 12,
              lineHeight: 1,
            }}
          >
            <span aria-hidden="true">‹</span>
            <span aria-hidden="true">›</span>
          </div>
        </div>
      </div>

      {caption ? (
        <figcaption
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            lineHeight: 1,
            letterSpacing: "-0.05em",
            color: "var(--text-muted)",
            textAlign: "center",
          }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Label({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 12,
        padding: "4px 10px",
        borderRadius: 999,
        background: "rgba(0,0,0,0.55)",
        color: "white",
        fontFamily: "var(--font-sans)",
        fontSize: 12,
        lineHeight: 1,
        letterSpacing: "-0.02em",
        pointerEvents: "none",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function clamp(n: number) {
  return Math.max(0, Math.min(100, n));
}
