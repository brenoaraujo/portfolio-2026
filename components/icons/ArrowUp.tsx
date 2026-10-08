import type { CSSProperties } from "react";

export interface ArrowUpProps {
  /** Square box in px. @default 16 */
  size?: number;
  /** Stroke colour. Defaults to var(--icon-ink). */
  color?: string;
  style?: CSSProperties;
  className?: string;
}

/**
 * 16×16 straight-up arrow — pairs with the footer "Back to top" link. Matches
 * ArrowUpRight's stroke weight and box.
 */
export function ArrowUp({ size = 16, color, style, ...rest }: ArrowUpProps) {
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
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="square">
        <path d="M8 12V4" />
        <path d="M4.667 7.333 8 4l3.333 3.333" />
      </g>
    </svg>
  );
}
