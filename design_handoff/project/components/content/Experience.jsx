import React from "react";

/* figma symbol 1:7511 "experience" — 1200×104, 1fr 2fr 1fr grid, 24px gap,
   21px bottom padding on each cell, closing hairline divider. */
export function Experience({ period = "2023-2026", title = "Senior Product Designer, Ascend", description = "Using the Lightning Decision Jam to surface problems and prioritize a quarter", style, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-start", width: "100%", ...style }} {...rest}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 24, width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingBottom: 21 }}>
          <span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--type-meta-serif-size)", lineHeight: 1, whiteSpace: "nowrap", color: "var(--text-secondary)" }}>{period}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingBottom: 21 }}>
          <span style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "var(--type-title-size)", lineHeight: 1, color: "var(--text-primary)" }}>{title}</span>
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "var(--type-body-size)", lineHeight: "23px", color: "var(--text-secondary)", textWrap: "pretty" }}>{description}</span>
        </div>
      </div>
      <div style={{ height: 0, width: "100%", boxShadow: "inset 0 0 0 0.5px rgb(212,212,212), 0 0 0 0.5px rgb(212,212,212)" }} />
    </div>
  );
}
