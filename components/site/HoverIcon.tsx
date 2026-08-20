import type { CSSProperties } from "react";

/**
 * Decorative link icon that peeks in from above and settles into the top-right
 * corner of its link on hover — appear-from-top, fade-in, slight right tilt.
 * The svg is drawn as a CSS mask so it inherits the text colour (theme-aware,
 * dark-mode ready) instead of the source's baked-in black.
 *
 * Purely presentational (aria-hidden) and fully CSS-driven off the parent
 * link's :hover, so the link components stay server components. The parent link
 * must be positioned (see `.nav-item`/`.text-link`/`.foot-link` in globals.css).
 */
export function HoverIcon({ src }: { src: string }) {
  return (
    <span
      aria-hidden="true"
      className="hover-icon"
      style={{ "--hover-icon": `url(${src})` } as CSSProperties}
    />
  );
}
