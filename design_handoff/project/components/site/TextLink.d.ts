/* Intentional addition — no Figma symbol; promoted from the repeated underlined-link + arrow pattern. */
export interface TextLinkProps {
  children?: React.ReactNode;
  href?: string;
  /** Trailing 16px up-right arrow. @default true */
  arrow?: boolean;
  style?: React.CSSProperties;
}

/** Underlined inline link with a trailing outbound arrow — the site's only call to action. */
export function TextLink(props: TextLinkProps): JSX.Element;
