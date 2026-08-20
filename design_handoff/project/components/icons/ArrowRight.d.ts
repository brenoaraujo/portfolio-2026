export interface ArrowRightProps {
  /** Square box in px. Source uses 16. @default 16 */
  size?: number;
  /** Stroke color. Defaults to var(--icon-ink). */
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

/** 16×16 forward arrow for in-page navigation. */
export function ArrowRight(props: ArrowRightProps): JSX.Element;
