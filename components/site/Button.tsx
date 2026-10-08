import type { CSSProperties } from "react";
import { LinkedIn } from "@/components/icons/LinkedIn";

export interface ButtonProps {
  href: string;
  /** Visible label. */
  label: string;
  /** Full accessible name (the label can be partial, e.g. "Let's talk on" + icon). */
  ariaLabel?: string;
  external?: boolean;
  style?: CSSProperties;
  /** Passthrough for `data-track*` instrumentation attributes. */
  [key: `data-${string}`]: string | undefined;
}

/**
 * Primary CTA — the Figma pill SVGs (default + hover, each with its own shade,
 * shape, grain and shadow) sit as the background; the label and red arrow are
 * live text on top, so the CTA stays selectable and accessible. Hover crossfades
 * the two pills.
 */
export function Button({ href, label, ariaLabel, external, style, ...rest }: ButtonProps) {
  return (
    <a
      href={href}
      className="cta-button"
      aria-label={ariaLabel ?? label}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      style={style}
      {...rest}
    >
      <img
        className="cta-button__bg cta-button__bg--default"
        src="/assets/button-default.svg"
        alt=""
        aria-hidden="true"
        width={146}
        height={53}
      />
      <img
        className="cta-button__bg cta-button__bg--hover"
        src="/assets/button-hover.svg"
        alt=""
        aria-hidden="true"
        width={148}
        height={56}
      />
      <span className="cta-button__face">
        <span className="cta-button__label">{label}</span>
        <LinkedIn size={15} color="var(--text-primary)" />
      </span>
    </a>
  );
}
