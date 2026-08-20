import type { CSSProperties } from "react";

export interface ProfileProps {
  /** Name set in serif 18 — this is the wordmark; the source file has no logo. */
  name?: string;
  /** 52×52 avatar image URL. */
  image?: string;
  href?: string;
  style?: CSSProperties;
}

/**
 * Avatar + name lockup that opens the header. 52×52 avatar at radius 8, 12px
 * gap, serif 18/23 at -0.05em. The source file contains no logo mark.
 */
export function Profile({
  name = "Breno Araujo.",
  image = "/assets/breno-profile.png",
  href,
  style,
  ...rest
}: ProfileProps) {
  const Root = href ? "a" : "div";
  return (
    <Root
      href={href}
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
        textDecoration: "none",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          width: 52,
          height: 52,
          flexShrink: 0,
          borderRadius: 8,
          background: `url(${image}) center / cover no-repeat`,
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 400,
          fontSize: "var(--type-serif-md-size)",
          lineHeight: "23px",
          letterSpacing: "var(--type-serif-md-ls)",
          whiteSpace: "nowrap",
          color: "var(--text-primary)",
        }}
      >
        {name}
      </span>
    </Root>
  );
}
