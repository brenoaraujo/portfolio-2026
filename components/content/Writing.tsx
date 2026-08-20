import type { CSSProperties } from "react";
import { EVENTS } from "@/lib/analytics-events";

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
  const titleStyle: CSSProperties = {
    fontFamily: "var(--font-serif)",
    fontWeight: 700,
    fontSize: "var(--type-title-size)",
    lineHeight: "23px",
    color: "var(--text-primary)",
    textDecoration: "none",
    textWrap: "pretty",
  };
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
      <div className="list-row-grid">
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
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            style={titleStyle}
            data-track={EVENTS.WRITING_CLICK}
            data-track-title={title}
          >
            {title}
          </a>
        ) : (
          <span style={titleStyle}>{title}</span>
        )}
      </div>
      <div className="hairline" />
    </div>
  );
}
