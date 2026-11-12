import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { Media } from "@/components/case-study/Media";
import { BeforeAfterSlider } from "@/components/case-study/BeforeAfterSlider";

/* ---------------------------------------------------------------------------
   Case-study body blocks. The fixed chrome (intro, hero, credits, next, footer)
   lives in the page; these are the building blocks the MDX narrative composes
   with. Markdown inside <Prose> is mapped by mdxComponents below.
--------------------------------------------------------------------------- */

const PROSE_MEASURE = "var(--measure-prose)"; // 705px

/** A titled section: serif-26 (weight 400) heading, then its content, 24px apart. */
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
        gap: 24,
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
          fontWeight: 400,
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

/** Serif 26/39 pull-quote. Same size as a section heading but set in the
    secondary colour so it reads as an aside, not a title — the default for
    markdown blockquote inside Prose. */
export function PullQuote({ children }: { children?: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-serif)",
        fontWeight: 400,
        fontSize: "var(--type-section-size)",
        lineHeight: "39px",
        color: "var(--text-secondary)",
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

/** A stack of outcome rows, hairlines between, closed top and bottom. */
export function Outcomes({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: PROSE_MEASURE,
        alignSelf: "center",
        borderBottom: "1px solid var(--color-hairline, rgb(212,212,212))",
      }}
    >
      {children}
    </div>
  );
}

/** One outcome: a fixed label column (`period`) | the result (`title`), an
    optional accent tag (`change`, e.g. "50% faster") and an optional note
    (`description`). The fixed column keeps every title on the same left edge;
    label and title share a baseline. Stacks on small screens (.outcome-row). */
export function Outcome({
  period,
  title,
  change,
  description,
}: {
  period?: string;
  title?: string;
  change?: string;
  description?: string;
}) {
  return (
    <div
      className="outcome-row"
      style={{
        display: "grid",
        columnGap: 32,
        rowGap: 8,
        alignItems: "baseline",
        padding: "28px 0",
        borderTop: "1px solid var(--color-hairline, rgb(212,212,212))",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 16,
          lineHeight: "22px",
          color: "var(--text-secondary)",
          textWrap: "pretty",
        }}
      >
        {period}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", columnGap: 16, rowGap: 8 }}>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: 24,
              lineHeight: "30px",
              letterSpacing: "-0.01em",
              color: "var(--text-primary)",
            }}
          >
            {title}
          </span>
          {change ? (
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: "20px", marginLeft: "auto" }}>
              <Stat>{change}</Stat>
            </span>
          ) : null}
        </div>
        {description ? (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              lineHeight: "27px",
              color: "var(--text-secondary)",
              textWrap: "pretty",
              margin: 0,
            }}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
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

/** Serif-26 sub-heading — matches the CaseSection h2 style. */
export function SubHeading({ children }: { children?: ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: "var(--font-serif)",
        fontWeight: 400,
        fontSize: "var(--type-section-size)",
        lineHeight: "39px",
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

/** Numbered approach item: large accent number + title header, body below, hairline separator. */
export function ApproachItem({
  number,
  title,
  children,
  spaceBefore,
}: {
  number: string;
  title: string;
  children?: ReactNode;
  /** Extra room above, on top of the parent gap, e.g. "24px". */
  spaceBefore?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
        maxWidth: PROSE_MEASURE,
        alignSelf: "center",
        paddingBottom: 48,
        borderBottom: "1px solid var(--color-hairline, rgb(212,212,212))",
        marginTop: spaceBefore,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 16, alignItems: "flex-start" }}>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: 48,
            lineHeight: 1,
            color: "var(--accent-brand)",
          }}
        >
          {number}
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
            fontSize: 20,
            lineHeight: "28px",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingLeft: 88 }}>
        {children}
      </div>
    </div>
  );
}

/** Inline decision label + text, used inside ApproachItem. */
export function Decision({ children, label = "Decision" }: { children?: ReactNode; label?: string }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: 16,
        lineHeight: "27px",
        color: "var(--text-secondary)",
        margin: 0,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginRight: 10,
        }}
      >
        {label}
      </span>
      {children}
    </p>
  );
}

/** Two-column testimonial card grid, with an optional eyebrow label. Sits
    32px further from what comes before so quotes read as their own tier. */
export function Testimonials({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        maxWidth: PROSE_MEASURE,
        alignSelf: "center",
        marginTop: 32,
      }}
    >
      {label ? (
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {label}
        </span>
      ) : null}
      <div className="testimonials-grid">{children}</div>
    </div>
  );
}

/** Headline result: a big accent figure beside a short statement, on the
    same light plate as the results strip. Stacks on small screens (.highlight). */
export function Highlight({
  value,
  headline,
  children,
}: {
  value: string;
  headline: string;
  children?: ReactNode;
}) {
  return (
    <div
      className="highlight"
      style={{
        display: "grid",
        columnGap: 32,
        rowGap: 12,
        alignItems: "center",
        width: "100%",
        maxWidth: PROSE_MEASURE,
        alignSelf: "center",
        marginTop: 24,
        padding: 32,
        borderRadius: 12,
        background: "var(--color-overlay-05)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: 56,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: "var(--accent-brand)",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: 18,
            lineHeight: "26px",
            color: "var(--text-primary)",
            textWrap: "pretty",
          }}
        >
          {headline}
        </span>
        {children ? (
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              lineHeight: "27px",
              color: "var(--text-secondary)",
            }}
          >
            {children}
          </span>
        ) : null}
      </div>
    </div>
  );
}

/** Single testimonial card with quote body + small-caps attribution. */
export function Testimonial({
  name,
  role,
  children,
}: {
  name: string;
  role: string;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 24,
        padding: 24,
        border: "1px solid rgb(212,212,212)",
        borderRadius: 12,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 16,
          lineHeight: "27px",
          color: "var(--text-primary)",
          margin: 0,
        }}
      >
        {children}
      </p>
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        {name} · {role}
      </span>
    </div>
  );
}

/** Inline highlighted stat — accent background + accent text colour. */
export function Stat({ children }: { children?: ReactNode }) {
  return (
    <span
      style={{
        display: "inline",
        background: "color-mix(in srgb, var(--accent-brand) 14%, var(--color-paper, #f5f0eb))",
        color: "var(--accent-brand)",
        fontWeight: 700,
        padding: "1px 5px",
        borderRadius: 3,
      }}
    >
      {children}
    </span>
  );
}

/** Left-border callout: bold headline + supporting body text. */
/** `spaceAfter` adds room below on top of the parent gap, e.g. "24px". A string
    so it authors in MDX, which blocks JS expressions like style={{ }}. */
export function Callout({
  headline,
  children,
  spaceAfter,
}: {
  headline: string;
  children?: ReactNode;
  spaceAfter?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        paddingLeft: 20,
        borderLeft: "2px solid var(--accent-brand)",
        width: "100%",
        maxWidth: PROSE_MEASURE,
        alignSelf: "center",
        marginBottom: spaceAfter,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: 16,
          lineHeight: "27px",
          color: "var(--text-primary)",
        }}
      >
        {headline}
      </span>
      {children && (
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 16,
            lineHeight: "27px",
            color: "var(--text-secondary)",
          }}
        >
          {children}
        </span>
      )}
    </div>
  );
}

/** Findings, one per row: label + title on the left, body on the right,
    hairlines between (same columns as the outcome rows). */
export function Findings({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderBottom: "1px solid var(--color-hairline, rgb(212,212,212))",
        width: "100%",
        maxWidth: PROSE_MEASURE,
        alignSelf: "center",
        // 24px on top of the section gap, so the grid reads apart from the prose.
        marginBlock: 24,
      }}
    >
      {children}
    </div>
  );
}

export function Finding({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div
      className="finding-row"
      style={{
        display: "grid",
        columnGap: 32,
        rowGap: 8,
        alignItems: "baseline",
        padding: "24px 0",
        borderTop: "1px solid var(--color-hairline, rgb(212,212,212))",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            lineHeight: 1,
            letterSpacing: "0.02em",
            color: "var(--accent-brand)",
          }}
        >
          {number}
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: 16,
            lineHeight: "22px",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </span>
      </div>
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 16,
          lineHeight: "27px",
          color: "var(--text-secondary)",
          textWrap: "pretty",
        }}
      >
        {children}
      </span>
    </div>
  );
}

/** Headline results strip: big before → after numbers with a short label,
    on a plate a touch darker than the page. Four across, 2×2 on small
    screens (.metrics in globals.css). */
export function Metrics({ children, label = "Results" }: { children: ReactNode; label?: string }) {
  return (
    <ul
      className="metrics"
      aria-label={label}
      style={{
        width: "100%",
        alignSelf: "stretch",
        margin: 0,
        padding: 0,
        listStyle: "none",
        borderRadius: 12,
        background: "var(--color-overlay-05)",
        overflow: "hidden",
      }}
    >
      {children}
    </ul>
  );
}

/** One result. `before` is optional: without it, only `after` shows (e.g. $700K).
    The label is the children, so MDX can set the line break with <br /> and
    every label in the strip runs exactly two lines. */
export function Metric({
  before,
  after,
  unit,
  toLabel = "to",
  children,
}: {
  before?: string;
  after: string;
  unit?: string;
  /** Screen-reader word read between the before and after numbers. */
  toLabel?: string;
  children?: ReactNode;
}) {
  return (
    <li className="metric" style={{ display: "flex", flexDirection: "column", gap: 12, padding: "var(--metric-pad)" }}>
      <span
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "0.22em",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: "var(--metric-size)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: "var(--text-primary)",
        }}
      >
        {before ? (
          <>
            <span>{before}</span>
            <span aria-hidden="true" style={{ fontWeight: 400, fontSize: "0.78em" }}>
              →
            </span>
            <span className="sr-only">{toLabel}</span>
          </>
        ) : null}
        <span style={{ color: "var(--accent-brand)" }}>{after}</span>
        {unit ? <span style={{ fontSize: "0.45em", letterSpacing: "-0.02em", marginLeft: "-0.1em" }}>{unit}</span> : null}
      </span>
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 14,
          lineHeight: 1.45,
          color: "var(--text-secondary)",
          textWrap: "pretty",
        }}
      >
        {children}
      </span>
    </li>
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
  BeforeAfterSlider,
  Media,
  Outcomes,
  Outcome,
  Metrics,
  Metric,
  Findings,
  Finding,
  Callout,
  ApproachItem,
  Decision,
  Stat,
  Testimonials,
  Testimonial,
  Highlight,
};

/** UI words the blocks print themselves (not authored in the MDX). */
export interface BlockLabels {
  decision: string;
  results: string;
  to: string;
  before: string;
  after: string;
}

/** mdxComponents with their built-in labels in the case study's language.
    Props set in the MDX still win (they're spread last). */
export function localizedMdxComponents(l: BlockLabels) {
  return {
    ...mdxComponents,
    Decision: (p: ComponentProps<typeof Decision>) => <Decision label={l.decision} {...p} />,
    Metrics: (p: ComponentProps<typeof Metrics>) => <Metrics label={l.results} {...p} />,
    Metric: (p: ComponentProps<typeof Metric>) => <Metric toLabel={l.to} {...p} />,
    BeforeAfterSlider: (p: ComponentProps<typeof BeforeAfterSlider>) => (
      <BeforeAfterSlider beforeLabel={l.before} afterLabel={l.after} beforeAlt={l.before} afterAlt={l.after} {...p} />
    ),
  };
}
