import React from "react";

/* figma symbol 1:7526 "work-item" — 585×460.7, column gap 24.
   Thumbnail: 389.7 tall, radius 12, inset 1px hairline. */
export function WorkItem({ image, eyebrow = "AI Product Design", title = "Onboarding for a new revenue streamline", href, imageHeight, style, ...rest }) {
  const Root = href ? "a" : "div";
  return (
    <Root href={href} style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start", width: "100%", textDecoration: "none", color: "inherit", ...style }} {...rest}>
      <div style={{ height: imageHeight, aspectRatio: imageHeight ? undefined : "585 / 389.7", width: "100%", flexShrink: 0, borderRadius: 12, boxShadow: "inset 0 0 0 1px rgb(212,212,212)", background: image ? `url(${image}) center / cover no-repeat` : "var(--color-gray-100)" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start", width: "100%" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "var(--type-label-size)", lineHeight: 1, letterSpacing: "var(--type-label-ls)", color: "var(--text-muted)" }}>{eyebrow}</span>
        <span style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "var(--type-title-size)", lineHeight: 1, color: "var(--text-primary)" }}>{title}</span>
      </div>
    </Root>
  );
}
