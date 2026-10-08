import type { CSSProperties } from "react";

export interface WorkItemProps {
  /** Thumbnail image URL (project screenshot). */
  image?: string;
  /** Discipline label, revealed on hover + exposed to assistive tech. */
  eyebrow?: string;
  /** Project title, revealed on hover + exposed to assistive tech. */
  title?: string;
  /** Renders the card as a link when provided. */
  href?: string;
  /** Marks the study as not-yet-published: shows a chip and keeps it non-clickable. */
  inProgress?: boolean;
  /** Eager-load + high fetch priority — set on the first card (the LCP image). */
  priority?: boolean;
  style?: CSSProperties;
  /** Passthrough for `data-track*` instrumentation attributes. */
  [key: `data-${string}`]: string | undefined;
}

/**
 * Work card — an image-only 3:2 plate (figma 324:1472). The eyebrow + title are
 * hidden until hover (a bottom scrim fades them in) but stay in the DOM so the
 * link keeps an accessible name and the titles remain crawlable.
 */
export function WorkItem({
  image,
  eyebrow = "",
  title = "",
  href,
  inProgress = false,
  priority = false,
  style,
  ...rest
}: WorkItemProps) {
  const Root = href ? "a" : "div";
  return (
    <Root
      href={href}
      className={href ? "work-item work-item--link" : "work-item"}
      style={style}
      {...rest}
    >
      {image ? (
        // Decorative — the title/eyebrow below provide the accessible name.
        <img
          className="work-item__img"
          src={image}
          alt=""
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
        />
      ) : (
        <div className="work-item__img work-item__img--empty" aria-hidden="true" />
      )}

      {inProgress ? <span className="work-item__chip">In progress</span> : null}

      <span className="work-item__overlay">
        {eyebrow ? <span className="work-item__eyebrow">{eyebrow}</span> : null}
        {title ? <span className="work-item__title">{title}</span> : null}
      </span>
    </Root>
  );
}
