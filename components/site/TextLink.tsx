import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight } from "@/components/icons/ArrowUpRight";

export interface TextLinkProps {
  children?: ReactNode;
  href?: string;
  /** Trailing 16px up-right arrow. @default true */
  arrow?: boolean;
  /** Opens in a new tab (external links). */
  external?: boolean;
  style?: CSSProperties;
}

/**
 * Underlined inline link with a trailing outbound arrow — the site's only call
 * to action. DM Sans 18, rgb(100,99,96), 9px gap to a 16px arrow.
 */
export function TextLink({
  children = "Let's talk",
  href = "#",
  arrow = true,
  external = false,
  style,
  ...rest
}: TextLinkProps) {
  return (
    <a
      href={href}
      className="text-link"
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      style={{
        display: "inline-flex",
        flexDirection: "row",
        gap: 9,
        alignItems: "center",
        textDecoration: "none",
        ...style,
      }}
      {...rest}
    >
      <span
        className="text-link__label"
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: 1,
          whiteSpace: "nowrap",
          color: "var(--text-link)",
          textDecoration: "underline",
          textUnderlineOffset: 2,
        }}
      >
        {children}
      </span>
      {arrow ? <ArrowUpRight color="var(--text-link)" /> : null}
    </a>
  );
}
