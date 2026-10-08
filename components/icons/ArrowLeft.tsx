import type { CSSProperties } from "react";

export interface ArrowLeftProps {
  /** Square box in px. @default 24 */
  size?: number;
  /** Fill colour. Defaults to var(--icon-ink); links pass the link colour. */
  color?: string;
  style?: CSSProperties;
  className?: string;
}

/**
 * Filled left-pointing arrow (provided asset, 24×24). Used by the case-study
 * "All projects" back link in the header. Fills with currentColor so it tracks
 * the link's text colour and hover dim.
 */
export function ArrowLeft({ size = 24, color, style, ...rest }: ArrowLeftProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0, color: color ?? "var(--icon-ink)", ...style }}
      {...rest}
    >
      <path
        d="M8.99883 13.4112L11.6868 16.4112C11.9988 16.7712 11.9748 17.3472 11.5908 17.6832C11.2308 17.9952 10.6548 17.9712 10.3428 17.5872L6.33483 13.0992C6.02283 12.7392 6.02283 12.2352 6.33483 11.8992L10.3428 7.4112C10.6548 7.0272 11.2308 7.0032 11.5908 7.3392C11.9748 7.6512 11.9988 8.2272 11.6868 8.5872L8.99883 11.6112H17.0148C17.4948 11.6112 17.9028 11.9952 17.9028 12.4992C17.9028 13.0032 17.4948 13.4112 17.0148 13.4112H8.99883Z"
        fill="currentColor"
      />
    </svg>
  );
}
