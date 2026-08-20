import React from "react";

/* figma node 1:1674 "Arrow right" — 16×16 box, 9.333px glyph inset 3.333,
   0.8px stroke. Used for in-page / forward navigation. */
export function ArrowRight({ size = 16, color, style, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ display: "block", flexShrink: 0, color: color || "var(--icon-ink)", ...style }} {...rest}>
      <g stroke="currentColor" strokeWidth="0.8" strokeLinecap="square">
        <path d="M3.333 8h9.334" />
        <path d="M8 3.333 12.667 8 8 12.667" />
      </g>
    </svg>
  );
}
