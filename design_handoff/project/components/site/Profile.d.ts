/* Intentional addition — no Figma symbol; promoted from the header avatar + name lockup in node 9:159. */
export interface ProfileProps {
  /** Name set in serif 18 — this is the wordmark; the source file has no logo. */
  name?: string;
  /** 52×52 avatar image URL. */
  image?: string;
  href?: string;
  style?: React.CSSProperties;
}

/** Avatar + name lockup that opens the header. */
export function Profile(props: ProfileProps): JSX.Element;
