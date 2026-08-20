export interface ArrowUpRightProps {
  /** Square box in px. Source uses 16. @default 16 */
  size?: number;
  /** Stroke color. Defaults to var(--icon-ink); links pass the link color. */
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

/** 16×16 outbound-link arrow. Pairs with TextLink on every external link. */
export function ArrowUpRight(props: ArrowUpRightProps): JSX.Element;
