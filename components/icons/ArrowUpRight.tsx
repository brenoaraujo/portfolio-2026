import type { CSSProperties } from "react";

export interface ArrowUpRightProps {
  /** Square box in px. Source uses 16. @default 16 */
  size?: number;
  /** Stroke colour. Defaults to var(--icon-ink); links pass the link colour. */
  color?: string;
  style?: CSSProperties;
  className?: string;
}

/**
 * 16×16 outbound-link arrow — pairs with TextLink on every external link.
 * figma node 1:7705. Source vector geometry was not extractable from the .fig;
 * stroke weight (0.8px), box and inset are exact, the path is reconstructed.
 */
export function ArrowUpRight({ size = 16, color, style, ...rest }: ArrowUpRightProps) {
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
        <path d="M4.667 11.333 11.333 4.667" />
        <path d="M5.778 4.667h5.555v5.556" />
      </g>
    </svg>
  );
}
