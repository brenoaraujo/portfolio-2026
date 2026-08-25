import type { CSSProperties, ReactNode } from "react";
import { Experience } from "@/components/content/Experience";
import { Media } from "@/components/case-study/Media";

/* ---------------------------------------------------------------------------
   Case-study body blocks. The fixed chrome (intro, hero, credits, next, footer)
   lives in the page; these are the building blocks the MDX narrative composes
   with. Markdown inside <Prose> is mapped by mdxComponents below.
--------------------------------------------------------------------------- */

const PROSE_MEASURE = "var(--measure-prose)"; // 705px

/** A titled section: serif-26 heading, then its content, 48px apart. */
export function CaseSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 48,
        alignItems: "flex-start",
        // Text column keeps the 705px measure but sits centred in the page;
        // media blocks (hero, Media, BeforeAfter) stay full-width.
        width: "100%",
        maxWidth: "var(--measure-prose)",
        alignSelf: "center",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 700,
          fontSize: "var(--type-section-size)",
          lineHeight: "39px",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Narrative column capped at the 705px measure; paragraphs 32px apart.
    Centres itself so a stand-alone Prose (an opening paragraph, not inside a
    CaseSection) lines up with the centred section text. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        width: "100%",
        maxWidth: PROSE_MEASURE,
        alignSelf: "center",
      }}
    >
      {children}
    </div>
  );
}

/** DM Sans 16/27 body paragraph — the default for markdown `p` inside Prose. */
export function BodyText({ children }: { children?: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: 16,
        lineHeight: "27px",
        color: "var(--text-secondary)",
        textWrap: "pretty",
      }}
    >
      {children}
    </p>
  );
}

/** Serif 26/39 pull-quote — the default for markdown blockquote inside Prose. */
export function PullQuote({ children }: { children?: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: "var(--type-section-size)",
        lineHeight: "39px",
        color: "var(--text-primary)",
        textWrap: "pretty",
      }}
    >
      {children}
    </p>
  );
}

/** An inline text link inside prose. */
export function ProseLink({ href, children }: { href?: string; children?: ReactNode }) {
  const external = !!href && /^https?:/.test(href);
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      style={{ color: "var(--text-link)", textDecoration: "underline", textUnderlineOffset: 2 }}
    >
      {children}
    </a>
  );
}

/** A screenshot plate with an optional caption. */
export function Figure({
  src,
  alt = "",
  caption,
  aspectRatio = "585 / 389.7",
  style,
}: {
  src: string;
  alt?: string;
  caption?: string;
  aspectRatio?: string;
  style?: CSSProperties;
}) {
  return (
    <figure style={{ display: "flex", flexDirection: "column", gap: 24, margin: 0, width: "100%", ...style }}>
      <div
        role="img"
        aria-label={alt}
        style={{
          width: "100%",
          aspectRatio,
          borderRadius: 12,
          boxShadow: "inset 0 0 0 1px rgb(212,212,212)",
          background: `url(${src}) center / cover no-repeat`,
        }}
      />
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

/** Two plates side by side (collapses to one column on small screens). Uses
    flat string props so it authors cleanly in MDX. */
export function BeforeAfter({
  beforeSrc,
  beforeAlt = "",
  beforeCaption,
  afterSrc,
  afterAlt = "",
  afterCaption,
}: {
  beforeSrc: string;
  beforeAlt?: string;
  beforeCaption?: string;
  afterSrc: string;
  afterAlt?: string;
  afterCaption?: string;
}) {
  return (
    <div className="before-after" style={{ alignSelf: "stretch" }}>
      <Figure src={beforeSrc} alt={beforeAlt} caption={beforeCaption} />
      <Figure src={afterSrc} alt={afterAlt} caption={afterCaption} />
    </div>
  );
}

/** A stack of outcome rows (reuses the Experience row: metric | title + note). */
export function Outcomes({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, alignSelf: "stretch" }}>
      {children}
    </div>
  );
}

export function Outcome(props: { period?: string; title?: string; description?: string }) {
  return <Experience {...props} />;
}

/** A light-gray summary plate that sits right under the credits: an eyebrow
    label, then a short recap. Keeps the prose measure so it lines up with the
    centred body. Content is authored as markdown inside <TLDR>. */
export function TLDR({ label = "TL;DR", children }: { label?: string; children?: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        maxWidth: PROSE_MEASURE,
        alignSelf: "center",
        padding: 32,
        borderRadius: 12,
        background: "var(--color-gray-100)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 14,
          lineHeight: 1,
          letterSpacing: "-0.05em",
          color: "var(--text-muted)",
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

/** Serif-18 bold sub-heading — the default for markdown `h3` inside a section. */
export function SubHeading({ children }: { children?: ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: "var(--font-serif)",
        fontWeight: 700,
        fontSize: "var(--type-title-size)",
        lineHeight: "23px",
        color: "var(--text-primary)",
      }}
    >
      {children}
    </h3>
  );
}

/** Bulleted list styled to the system — the default for markdown `ul`. */
export function BodyList({ children }: { children?: ReactNode }) {
  return (
    <ul
      style={{
        margin: 0,
        paddingLeft: 24,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        fontFamily: "var(--font-sans)",
        fontSize: 16,
        lineHeight: "27px",
        color: "var(--text-secondary)",
      }}
    >
      {children}
    </ul>
  );
}

/** Components exposed to MDX: markdown elements + explicit blocks. */
export const mdxComponents = {
  p: BodyText,
  a: ProseLink,
  h3: SubHeading,
  ul: BodyList,
  li: ({ children }: { children?: ReactNode }) => <li style={{ textWrap: "pretty" }}>{children}</li>,
  strong: ({ children }: { children?: ReactNode }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
  em: ({ children }: { children?: ReactNode }) => <em>{children}</em>,
  CaseSection,
  Prose,
  TLDR,
  PullQuote,
  SubHeading,
  Figure,
  BeforeAfter,
  Media,
  Outcomes,
  Outcome,
};
