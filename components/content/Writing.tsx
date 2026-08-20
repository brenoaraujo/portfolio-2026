import type { CSSProperties } from "react";

export interface WritingProps {
  /** Publication year, serif 16. */
  year?: string;
  /** Article title, serif bold 18. */
  title?: string;
  /** Links the title out to the article. */
  href?: string;
  style?: CSSProperties;
}

/**
 * An article row in the Writing list: year | title, hairline underneath.
 * Stack with a 24px gap. figma 1:7520 (source layer name "writting").
 */
export function Writing({
  year = "2020",
  title = "Using the Lightning Decision Jam to surface problems and prioritize a quarter",
  href,
  style,
  ...rest
}: WritingProps) {
  const Title = href ? "a" : "span";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 30,
        alignItems: "flex-start",
        width: "100%",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 24, width: "100%" }}>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: 1,
            whiteSpace: "nowrap",
            color: "var(--text-secondary)",
          }}
        >
          {year}
        </span>
        <Title
          href={href}
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            fontSize: "var(--type-title-size)",
            lineHeight: "23px",
            color: "var(--text-primary)",
            textDecoration: "none",
            textWrap: "pretty",
          }}
        >
          {title}
        </Title>
      </div>
      <div className="hairline" />
    </div>
  );
}
