import React from "react";

/* figma node 9:168 "Nav Item" — DM Sans 14/23, -0.05em, black.
   Three of these sit in a 32px-gap row in the header. */
export function NavItem({ children = "Work", href = "#", active = false, style, ...rest }) {
  return (
    <a href={href} style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "var(--type-label-size)", lineHeight: "23px", letterSpacing: "var(--type-label-ls)", whiteSpace: "nowrap", color: "var(--text-primary)", textDecoration: active ? "underline" : "none", textUnderlineOffset: 3, opacity: 1, transition: "opacity var(--duration-fast) var(--ease-standard)", ...style }} onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.6)} onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)} {...rest}>{children}</a>
  );
}
