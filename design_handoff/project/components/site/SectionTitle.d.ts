/* Intentional addition — no Figma symbol; promoted from the repeated serif-26 section heading. */
export interface SectionTitleProps {
  children?: React.ReactNode;
  /** Optional serif-18 aside set beside the title, e.g. "Older stuff, still proud of it". */
  subtitle?: React.ReactNode;
  /** 400 for "Recent work.", 700 for "Experience" / "Writing". @default 700 */
  weight?: 400 | 700;
  style?: React.CSSProperties;
}

/** Serif 26 section heading with an optional muted aside on the same baseline. */
export function SectionTitle(props: SectionTitleProps): JSX.Element;
