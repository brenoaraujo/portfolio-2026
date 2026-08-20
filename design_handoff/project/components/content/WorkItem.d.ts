export interface WorkItemProps {
  /** Thumbnail image URL (project screenshot). Falls back to a flat gray plate. */
  image?: string;
  /** Discipline label above the title. @default "AI Product Design" */
  eyebrow?: string;
  /** Project title, serif bold 18. */
  title?: string;
  /** Renders the card as a link when provided. */
  href?: string;
  /** Overrides the thumbnail height; omit to keep the source 585 : 389.7 ratio. */
  imageHeight?: number | string;
  style?: React.CSSProperties;
}

/**
 * Case-study card: 12px-radius screenshot with a 1px hairline, then eyebrow + serif title.
 * Laid out two-up in a 32px grid on the portfolio.
 */
export function WorkItem(props: WorkItemProps): JSX.Element;
