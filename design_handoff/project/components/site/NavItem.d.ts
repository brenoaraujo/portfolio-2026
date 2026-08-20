/* Intentional addition — no Figma symbol; promoted from the repeated nav text layer (node 9:168). */
export interface NavItemProps {
  children?: React.ReactNode;
  href?: string;
  /** Underlines the current section. @default false */
  active?: boolean;
  style?: React.CSSProperties;
}

/** Header navigation link — DM Sans 14, tight tracking, fades to 60% on hover. */
export function NavItem(props: NavItemProps): JSX.Element;
