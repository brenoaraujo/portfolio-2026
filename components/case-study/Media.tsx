import type { CSSProperties, ReactNode } from "react";

const PLATE: CSSProperties = {
  width: "100%",
  borderRadius: 12,
  boxShadow: "inset 0 0 0 1px rgb(212,212,212)",
  display: "block",
};

function isVideo(src: string) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(src);
}

/**
 * Autoplaying, muted, looping video with no controls.
 * - Pass `poster` for a first-frame placeholder (no layout shift).
 * - Pass `fallback` to show a static image for prefers-reduced-motion users.
 *   The swap is done with a CSS media-query so it works without JS.
 * - Pass `alt` to give the element a semantic label; otherwise it stays
 *   decorative (aria-hidden).
 */
export function CaseVideo({
  src,
  poster,
  fallback,
  alt,
  hero = false,
  style,
}: {
  src: string;
  poster?: string;
  fallback?: string;
  alt?: string;
  hero?: boolean;
  style?: CSSProperties;
}) {
  const webm = src.replace(/\.(mp4|mov)(\?|$)/i, ".webm$2");
  const mp4 = src.replace(/\.(webm|mov)(\?|$)/i, ".mp4$2");

  const hasLabel = Boolean(alt);
  const sharedStyle: CSSProperties = {
    ...PLATE,
    ...(hero
      ? { aspectRatio: "1200 / 700", objectFit: "cover" }
      : { height: "auto" }),
    ...style,
  };

  return (
    <>
      <video
        data-case-motion="video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        // width/height let the browser reserve space before metadata loads
        width={2400}
        height={1400}
        {...(hasLabel
          ? { role: "img" as const, "aria-label": alt }
          : { "aria-hidden": "true" as const, tabIndex: -1 })}
        style={sharedStyle}
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
        {/* Last-resort fallback for browsers that can't play either source */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fallback ?? poster} alt={alt ?? ""} />
      </video>
      {fallback ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          data-case-motion="fallback"
          src={fallback}
          alt={alt ?? ""}
          // Omit `display` so the CSS [data-case-motion] rules control visibility
          style={{ ...sharedStyle, display: undefined }}
        />
      ) : null}
    </>
  );
}

/** Inline case-study media: a video or an image, with an optional caption. */
export function Media({
  src,
  alt = "",
  caption,
  poster,
  fallback,
}: {
  src: string;
  alt?: string;
  caption?: string;
  poster?: string;
  fallback?: string;
}) {
  return (
    <figure style={{ display: "flex", flexDirection: "column", gap: 24, margin: 0, width: "100%", alignSelf: "stretch" }}>
      {isVideo(src) ? (
        <CaseVideo src={src} alt={alt || undefined} poster={poster} fallback={fallback} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} style={{ ...PLATE, height: "auto" }} />
      )}
      {caption ? (
        <figcaption
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            lineHeight: 1,
            letterSpacing: "-0.05em",
            color: "var(--text-muted)",
            textAlign: "center",
          }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** The hero plate at the top of a case study — a video if one is set, else an image. */
export function HeroMedia({
  video,
  image,
  alt,
}: {
  video?: string;
  image?: string;
  alt?: string;
}): ReactNode {
  if (video) {
    return <CaseVideo src={video} hero style={{ alignSelf: "stretch" }} />;
  }
  if (image) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{
          alignSelf: "stretch",
          aspectRatio: "1200 / 700",
          borderRadius: 12,
          boxShadow: "inset 0 0 0 1px rgb(212,212,212)",
          background: `url(${image}) center / cover no-repeat`,
        }}
      />
    );
  }
  return null;
}
