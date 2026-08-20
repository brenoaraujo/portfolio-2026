import React from "react";

/* figma node 1:7705 "Arrow up-right" — 16×16 box, 6.667px glyph inset 4.667,
   0.8px stroke. Source vector geometry was not extractable from the .fig;
   the stroke weight, box and inset are exact. */
export function ArrowUpRight({ size = 16, color, style, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ display: "block", flexShrink: 0, color: color || "var(--icon-ink)", ...style }} {...rest}>
      <g stroke="currentColor" strokeWidth="0.8" strokeLinecap="square">
        <path d="M4.667 11.333 11.333 4.667" />
        <path d="M5.778 4.667h5.555v5.556" />
      </g>
    </svg>
  );
}
