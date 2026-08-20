"use client";

import { useEffect, useState, type CSSProperties } from "react";

export interface ExperienceProps {
  /** Date range, serif 16 in the first column. */
  period?: string;
  /** Role and company, serif bold 18. */
  title?: string;
  /** One-line summary of the work, DM Sans 18/23. */
  description?: string;
  /** Optional hover fan thumbnails, filling the empty right-hand column. */
  images?: string[];
  style?: CSSProperties;
}

const EASE = "var(--ease-standard)";

// Plate treatment shared by frames and preview (spec §"Plate treatment").
const PLATE: CSSProperties = {
  objectFit: "cover",
  objectPosition: "top left",
  borderRadius: 12,
  border: "1px solid rgb(212,212,212)",
  boxSizing: "border-box",
  background: "rgb(255,255,255)",
};

/**
 * A single résumé row: period | role + summary, on a 1fr 2fr 1fr grid closed by
 * a hairline. When `images` are given, the empty third column becomes a hover
 * "fan": frames deal out on row-hover and a large preview opens upward on
 * frame-hover (spec: experience-fan-animation). Without images it renders
 * exactly as before (used for case-study outcomes).
 */
export function Experience({
  period = "2023-2026",
  title = "Senior Product Designer, Ascend",
  description = "Using the Lightning Decision Jam to surface problems and prioritize a quarter",
  images,
  style,
  ...rest
}: ExperienceProps) {
  const hasFan = Array.isArray(images) && images.length > 0;
  const [hoveredRow, setHoveredRow] = useState(false);
  const [activeFrame, setActiveFrame] = useState<number | null>(null);
  const [lastFrame, setLastFrame] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (!hasFan) return;
    setReduced(
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
    );
  }, [hasFan]);

  const rowStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    width: "100%",
    ...(hasFan ? { position: "relative", zIndex: hoveredRow ? 40 : 1 } : null),
    ...style,
  };

  const rowHandlers = hasFan
    ? {
        onMouseEnter: () => setHoveredRow(true),
        onMouseLeave: () => {
          setHoveredRow(false);
          setActiveFrame(null);
        },
      }
    : {};

  const count = images?.length ?? 0;

  return (
    <div style={rowStyle} {...rowHandlers} {...rest}>
      <div className="list-row-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingBottom: 21 }}>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1,
              whiteSpace: "nowrap",
              color: "var(--text-secondary)",
            }}
          >
            {period}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingBottom: 21 }}>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "var(--type-title-size)",
              lineHeight: 1,
              color: "var(--text-primary)",
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "20px",
              color: "var(--text-secondary)",
              textWrap: "pretty",
            }}
          >
            {description}
          </span>
        </div>

        {hasFan ? (
          <div className="exp-fan-cell" style={{ paddingBottom: 21 }}>
            <div style={{ position: "relative", height: 84 }}>
              {images!.map((src, i) => {
                const dealt = hoveredRow || reduced;
                const dimmed = activeFrame !== null && activeFrame !== i;
                const frameStyle: CSSProperties = {
                  ...PLATE,
                  position: "absolute",
                  top: 6,
                  width: 112,
                  height: 74,
                  cursor: "pointer",
                  zIndex: 10 + (count - i),
                  opacity: hoveredRow || reduced ? (dimmed ? 0.42 : 1) : 0,
                  pointerEvents: dealt ? "auto" : "none",
                  left: reduced ? i * 18 : dealt ? i * 18 : 0,
                  transform: reduced
                    ? `rotate(${-6 + i * 4.5}deg)`
                    : dealt
                      ? `rotate(${-6 + i * 4.5}deg) translateY(0)`
                      : "rotate(0deg) translateY(10px)",
                  transition: reduced
                    ? `opacity 220ms ${EASE}`
                    : `opacity 220ms ${EASE}, transform 380ms ${EASE}, left 380ms ${EASE}`,
                  transitionDelay:
                    activeFrame !== null || reduced ? "0ms" : `${i * 55}ms`,
                };
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt={`${title} — thumbnail ${i + 1}`}
                    tabIndex={0}
                    style={frameStyle}
                    onMouseEnter={() => {
                      setActiveFrame(i);
                      setLastFrame(i);
                      setHoveredRow(true);
                    }}
                    onMouseLeave={() => setActiveFrame(null)}
                    onFocus={() => {
                      setActiveFrame(i);
                      setLastFrame(i);
                      setHoveredRow(true);
                    }}
                    onBlur={() => setActiveFrame(null)}
                  />
                );
              })}

              {/* Preview — opens upward; kept on the last hovered image so it
                  fades out in place instead of snapping. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images![lastFrame]}
                alt=""
                aria-hidden="true"
                style={{
                  ...PLATE,
                  position: "absolute",
                  width: 325,
                  height: 215,
                  zIndex: 70,
                  pointerEvents: "none",
                  bottom: 26,
                  // Open up-and-left: the preview's right edge tucks against the
                  // fan's left frames (with a small overlap) so it stays well
                  // inside the column and can't be clipped at the page's right.
                  left: -(325 - 20),
                  opacity: activeFrame !== null ? 1 : 0,
                  transform: activeFrame !== null ? "translateY(0)" : "translateY(6px)",
                  transition: `opacity 180ms ${EASE}, transform 220ms ${EASE}`,
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="hairline" />
    </div>
  );
}
