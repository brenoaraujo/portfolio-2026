import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight } from "@/components/icons/ArrowUpRight";
import { HoverIcon } from "@/components/site/HoverIcon";

export interface TextLinkProps {
  children?: ReactNode;
  href?: string;
  /** Trailing 16px up-right arrow. @default true */
  arrow?: boolean;
  /** Opens in a new tab (external links). */
  external?: boolean;
  /** Path to the svg that peeks into the top-right corner on hover. */
  icon?: string;
  /**
   * Swap mode (needs `icon`): the arrow and the icon share one slot and rotate
   * past each other on hover — the arrow drops away with a tilt while the icon
   * turns upright into its place. Used by the hero "Let's talk".
   */
  swap?: boolean;
  style?: CSSProperties;
  /** Passthrough for `data-track*` instrumentation attributes. */
  [key: `data-${string}`]: string | undefined;
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
  icon,
  swap = false,
  style,
  ...rest
}: TextLinkProps) {
  const swapMode = swap && !!icon && arrow;
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
      {swapMode ? (
        <span className="text-link__swap" aria-hidden="true">
          <ArrowUpRight color="#DC0606" className="text-link__swap-arrow" />
          <span
            className="text-link__swap-icon"
            style={{ "--hover-icon": `url(${icon})` } as CSSProperties}
          />
        </span>
      ) : (
        <>
          {arrow ? <ArrowUpRight color="#DC0606" /> : null}
          {icon ? <HoverIcon src={icon} /> : null}
        </>
      )}
    </a>
  );
}
