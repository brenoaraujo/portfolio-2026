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
 * Autoplaying, muted, looping video with no controls and no poster — a moving
 * screenshot, not a player. Prefers a .webm source, falls back to the original.
 */
export function CaseVideo({
  src,
  hero = false,
  style,
}: {
  src: string;
  hero?: boolean;
  style?: CSSProperties;
}) {
  // MDX references the .webm; serve it first and fall back to a same-named .mp4
  // (H.264) for Safari, which doesn't reliably play VP9/WebM.
  const webm = src.replace(/\.(mp4|mov)(\?|$)/i, ".webm$2");
  const mp4 = src.replace(/\.(webm|mov)(\?|$)/i, ".mp4$2");
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      // "metadata" so the element gets its dimensions and can autoplay; the
      // clips are small (~1-2MB) after WebM/MP4 compression.
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      style={{
        ...PLATE,
        ...(hero
          ? { aspectRatio: "1200 / 700", objectFit: "cover" }
          : { height: "auto" }),
        ...style,
      }}
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}

/** Inline case-study media: a video or an image, with an optional caption. */
export function Media({
  src,
  alt = "",
  caption,
}: {
  src: string;
  alt?: string;
  caption?: string;
}) {
  return (
    <figure style={{ display: "flex", flexDirection: "column", gap: 24, margin: 0, width: "100%", alignSelf: "stretch" }}>
      {isVideo(src) ? (
        <CaseVideo src={src} />
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
