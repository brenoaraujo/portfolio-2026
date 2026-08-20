import type { CSSProperties } from "react";

export interface WorkItemProps {
  /** Thumbnail image URL (project screenshot). Falls back to a flat gray plate. */
  image?: string;
  /** Discipline label above the title. */
  eyebrow?: string;
  /** Project title, serif bold 18. */
  title?: string;
  /** Renders the card as a link when provided. */
  href?: string;
  /** Marks the study as not-yet-published: dims the plate and shows a chip so
   * the card reads as non-clickable. */
  inProgress?: boolean;
  /** Overrides the thumbnail height; omit to keep the source 585 : 389.7 ratio. */
  imageHeight?: number | string;
  style?: CSSProperties;
  /** Passthrough for `data-track*` instrumentation attributes. */
  [key: `data-${string}`]: string | undefined;
}

/**
 * Case-study card: 12px-radius screenshot with a 1px hairline, then eyebrow +
 * serif title. Laid out two-up in a 32px grid on the portfolio. figma 1:7526.
 */
export function WorkItem({
  image,
  eyebrow = "AI Product Design",
  title = "Onboarding for a new revenue streamline",
  href,
  inProgress = false,
  imageHeight,
  style,
  ...rest
}: WorkItemProps) {
  const Root = href ? "a" : "div";
  return (
    <Root
      href={href}
      className={href ? "work-item" : undefined}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        alignItems: "flex-start",
        width: "100%",
        textDecoration: "none",
        color: "inherit",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          height: imageHeight,
          aspectRatio: imageHeight ? undefined : "585 / 389.7",
          width: "100%",
          flexShrink: 0,
          borderRadius: 12,
          boxShadow: "inset 0 0 0 1px rgb(212,212,212)",
          background: image
            ? `url(${image}) center / cover no-repeat`
            : "var(--color-gray-100)",
        }}
      >
        {inProgress ? (
          <>
            {/* Mute the screenshot so the card reads as not-yet-live. */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "color-mix(in srgb, var(--background-primary) 55%, transparent)",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                padding: "5px 10px",
                borderRadius: 6,
                background: "var(--background-primary)",
                boxShadow: "inset 0 0 0 0.5px rgb(212,212,212)",
                fontFamily: "var(--font-sans)",
                fontSize: 12,
                lineHeight: 1,
                letterSpacing: "var(--type-label-ls)",
                color: "var(--text-muted)",
              }}
            >
              In progress
            </span>
          </>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
            fontSize: "var(--type-label-size)",
            lineHeight: 1,
            letterSpacing: "var(--type-label-ls)",
            color: "var(--text-muted)",
          }}
        >
          {eyebrow}
        </span>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            fontSize: "var(--type-title-size)",
            lineHeight: 1,
            color: "var(--text-primary)",
          }}
        >
          {title}
        </span>
      </div>
    </Root>
  );
}
