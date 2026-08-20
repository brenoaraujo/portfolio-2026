export interface WrittingProps {
  /** Publication year, serif 16. @default "2020" */
  year?: string;
  /** Article title, serif bold 18. */
  title?: string;
  /** Links the title out to the article. */
  href?: string;
  style?: React.CSSProperties;
}

/**
 * An article row in the Writing list: year | title, hairline underneath.
 * Stack with a 24px gap.
 */
export function Writting(props: WrittingProps): JSX.Element;
