import type { CSSProperties, ReactNode } from "react";

export interface SectionTitleProps {
  /** Two-digit index shown as a small red superscript, e.g. "01". */
  number?: string;
  children?: ReactNode;
  /** Optional Noto Serif aside shown under the hairline, left-aligned. */
  subtitle?: ReactNode;
  id?: string;
  style?: CSSProperties;
}

/**
 * Numbered section header (home page): a small brand-red index, a large
 * uppercase DM Sans title, a full-width hairline, then an optional serif
 * subtitle beneath. Spans the section width. figma 324:1499.
 */
export function SectionTitle({
  number,
  children,
  subtitle,
  style,
  ...rest
}: SectionTitleProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        alignSelf: "stretch",
        width: "100%",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 6,
          alignItems: "flex-start",
          alignSelf: "stretch",
          borderBottom: "1px solid var(--border-default)",
        }}
      >
        {number ? (
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "var(--type-section-num-size)",
              lineHeight: 1,
              letterSpacing: "var(--type-section-num-ls)",
              color: "var(--accent-brand)",
            }}
          >
            {number}
          </span>
        ) : null}
        <span className="section-heading-clip">
          <span className="section-heading">{children}</span>
        </span>
      </div>
      {subtitle ? (
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 400,
            fontSize: "var(--type-serif-md-size)",
            lineHeight: "23px",
            letterSpacing: "var(--type-serif-md-ls)",
            color: "var(--text-secondary)",
          }}
        >
          {subtitle}
        </span>
      ) : null}
    </div>
  );
}
