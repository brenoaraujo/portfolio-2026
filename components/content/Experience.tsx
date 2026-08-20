import type { CSSProperties } from "react";

export interface ExperienceProps {
  /** Date range, serif 16 in the first column. */
  period?: string;
  /** Role and company, serif bold 18. */
  title?: string;
  /** One-line summary of the work, DM Sans 18/23. */
  description?: string;
  style?: CSSProperties;
}

/**
 * A single résumé row: period | role + summary, on a 1fr 2fr 1fr grid closed by
 * a hairline. Stack these with a 32px gap. figma 1:7511.
 */
export function Experience({
  period = "2023-2026",
  title = "Senior Product Designer, Ascend",
  description = "Using the Lightning Decision Jam to surface problems and prioritize a quarter",
  style,
  ...rest
}: ExperienceProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        width: "100%",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 24, width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingBottom: 21 }}>
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
            {period}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingBottom: 21 }}>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "var(--type-title-size)",
              lineHeight: 1,
              color: "var(--text-primary)",
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "20px",
              color: "var(--text-secondary)",
              textWrap: "pretty",
            }}
          >
            {description}
          </span>
        </div>
      </div>
      <div className="hairline" />
    </div>
  );
}
