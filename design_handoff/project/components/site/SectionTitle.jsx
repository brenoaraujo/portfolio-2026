import React from "react";

/* "Recent work." / "Experience" / "Writing  Older stuff, still proud of it"
   Serif 26/39; regular or bold; optional serif-18 subtitle beside it. */
export function SectionTitle({ children = "Recent work.", subtitle, weight = 700, style, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", ...style }} {...rest}>
      <span style={{ fontFamily: "var(--font-serif)", fontWeight: weight, fontSize: "var(--type-section-size)", lineHeight: "39px", color: "var(--text-primary)" }}>{children}</span>
      {subtitle ? <span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--type-serif-md-size)", lineHeight: "23px", letterSpacing: "var(--type-serif-md-ls)", whiteSpace: "nowrap", color: "var(--text-secondary)" }}>{subtitle}</span> : null}
    </div>
  );
}
