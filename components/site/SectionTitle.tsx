import type { CSSProperties, ReactNode } from "react";

export interface SectionTitleProps {
  children?: ReactNode;
  /** Optional serif-18 aside beside the title, e.g. "Older stuff, still proud of it". */
  subtitle?: ReactNode;
  /** 400 for "Recent work.", 700 for "Experience" / "Writing". @default 700 */
  weight?: 400 | 700;
  id?: string;
  style?: CSSProperties;
}

/** Serif 26 section heading with an optional muted aside on the same baseline. */
export function SectionTitle({
  children = "Recent work.",
  subtitle,
  weight = 700,
  style,
  ...rest
}: SectionTitleProps) {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", ...style }}
      {...rest}
    >
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: weight,
          fontSize: "var(--type-section-size)",
          lineHeight: "39px",
          color: "var(--text-primary)",
        }}
      >
        {children}
      </span>
      {subtitle ? (
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 400,
            fontSize: "var(--type-serif-md-size)",
            lineHeight: "23px",
            letterSpacing: "var(--type-serif-md-ls)",
            whiteSpace: "nowrap",
            color: "var(--text-secondary)",
          }}
        >
          {subtitle}
        </span>
      ) : null}
    </div>
  );
}
