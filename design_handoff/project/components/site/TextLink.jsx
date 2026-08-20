import React from "react";
import { ArrowUpRight } from "../icons/ArrowUpRight.jsx";

/* The "Let's talk ↗" / "See full details on Linkedin ↗" pattern:
   DM Sans 18, underlined, rgb(100,99,96), 9px gap to a 16px arrow. */
export function TextLink({ children = "Let's talk", href = "#", arrow = true, style, ...rest }) {
  return (
    <a href={href} style={{ display: "inline-flex", flexDirection: "row", gap: 9, alignItems: "center", textDecoration: "none", transition: "color var(--duration-fast) var(--ease-standard)", ...style }} {...rest}>
      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "var(--type-body-size)", lineHeight: 1, whiteSpace: "nowrap", color: "var(--text-link)", textDecoration: "underline", textUnderlineOffset: 2 }}>{children}</span>
      {arrow ? <ArrowUpRight color="var(--text-link)" /> : null}
    </a>
  );
}
