import React from "react";

/* figma symbol 1:7520 "writting" — 1200×80, 1fr 2fr 1fr grid, 24px gap,
   30px gap to the closing hairline divider. */
export function Writting({ year = "2020", title = "Using the Lightning Decision Jam to surface problems and prioritize a quarter", href, style, ...rest }) {
  const Title = href ? "a" : "span";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 30, alignItems: "flex-start", width: "100%", ...style }} {...rest}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 24, width: "100%" }}>
        <span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--type-meta-serif-size)", lineHeight: 1, whiteSpace: "nowrap", color: "var(--text-secondary)" }}>{year}</span>
        <Title href={href} style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "var(--type-title-size)", lineHeight: "23px", color: "var(--text-primary)", textDecoration: "none", textWrap: "pretty" }}>{title}</Title>
      </div>
      <div style={{ height: 0, width: "100%", boxShadow: "inset 0 0 0 0.5px rgb(212,212,212), 0 0 0 0.5px rgb(212,212,212)" }} />
    </div>
  );
}
