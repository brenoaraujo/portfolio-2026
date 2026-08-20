export interface ExperienceProps {
  /** Date range, serif 16 in the first column. @default "2023-2026" */
  period?: string;
  /** Role and company, serif bold 18. */
  title?: string;
  /** One-line summary of the work, DM Sans 18/23. */
  description?: string;
  style?: React.CSSProperties;
}

/**
 * A single résumé row: period | role + summary, on a 1fr 2fr 1fr grid closed by a hairline.
 * Stack these with a 32px gap.
 */
export function Experience(props: ExperienceProps): JSX.Element;
