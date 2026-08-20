import type { CSSProperties, ReactNode } from "react";
import { HoverIcon } from "@/components/site/HoverIcon";

export interface NavItemProps {
  children?: ReactNode;
  href?: string;
  /** Underlines the current section. @default false */
  active?: boolean;
  /** Path to the svg that peeks into the top-right corner on hover. */
  icon?: string;
  style?: CSSProperties;
}

/** Header navigation link — DM Sans 14, tight tracking, fades to 60% on hover. */
export function NavItem({
  children = "Work",
  href = "#",
  active = false,
  icon,
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
      {icon ? <HoverIcon src={icon} /> : null}
    </a>
  );
}
