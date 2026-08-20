import type { CSSProperties } from "react";

export interface ArrowRightProps {
  /** Square box in px. Source uses 16. @default 16 */
  size?: number;
  /** Stroke colour. Defaults to var(--icon-ink). */
  color?: string;
  style?: CSSProperties;
  className?: string;
}

/**
 * 16×16 forward arrow for in-page navigation. figma node 1:1674.
 * 0.8px stroke, matching the 0.5px hairlines.
 */
export function ArrowRight({ size = 16, color, style, ...rest }: ArrowRightProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0, color: color ?? "var(--icon-ink)", ...style }}
      {...rest}
    >
      <g stroke="currentColor" strokeWidth="0.8" strokeLinecap="square">
        <path d="M3.333 8h9.334" />
        <path d="M8 3.333 12.667 8 8 12.667" />
      </g>
    </svg>
  );
}
