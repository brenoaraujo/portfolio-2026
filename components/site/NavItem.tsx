import type { CSSProperties, ReactNode } from "react";

export interface NavItemProps {
  children?: ReactNode;
  href?: string;
  /** Underlines the current section. @default false */
  active?: boolean;
  style?: CSSProperties;
}

/** Header navigation link — DM Sans 14, tight tracking, fades to 60% on hover. */
export function NavItem({
  children = "Work",
  href = "#",
  active = false,
  style,
  ...rest
}: NavItemProps) {
  return (
    <a
      href={href}
      className="nav-item"
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 400,
        fontSize: "var(--type-label-size)",
        lineHeight: "23px",
        letterSpacing: "var(--type-label-ls)",
        whiteSpace: "nowrap",
        color: "var(--text-primary)",
        textDecoration: active ? "underline" : "none",
        textUnderlineOffset: 3,
        ...style,
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
