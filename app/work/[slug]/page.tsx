import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { BentoHeader } from "@/components/bento/BentoHeader";
import { BentoFooter } from "@/components/bento/BentoFooter";
import { TextLink } from "@/components/site/TextLink";
import { Credits } from "@/components/case-study/Credits";
import { HeroMedia } from "@/components/case-study/Media";
import { mdxComponents, Callout, Metrics, Metric } from "@/components/case-study/blocks";
import { TrackCaseStudyView } from "@/components/analytics/TrackCaseStudyView";
import { TrackCaseStudyRead } from "@/components/analytics/TrackCaseStudyRead";
import { EVENTS } from "@/lib/analytics-events";
import {
  hasCaseStudy,
  getPublishedSlugs,
  getCaseStudyMeta,
  getCaseStudyBody,
  getNextCaseStudy,
} from "@/lib/work";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!hasCaseStudy(slug)) return {};
  const meta = getCaseStudyMeta(slug);
  return {
    // The root layout's title template appends " — Breno Araujo".
    title: meta.title,
    description: meta.lead,
    // Per-page canonical; resolves against metadataBase to the full URL.
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.lead,
      url: `/work/${slug}`,
      images: meta.heroImage ? [{ url: meta.heroImage }] : undefined,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!hasCaseStudy(slug)) notFound();
  const meta = getCaseStudyMeta(slug);
  if (!meta.published) notFound();

  const body = getCaseStudyBody(slug);
  // Credits sit in the header unless the MDX places them itself with <Credits />
  // (bound here to this study's frontmatter, since MDX blocks JS expressions).
  const creditsInBody = /<Credits\b/.test(body);
  const { content } = await compileMDX({
    source: body,
    components: { ...mdxComponents, Credits: () => <Credits {...meta.credits} variant="grid" /> },
  });

  const next = getNextCaseStudy(slug);

  return (
    <>
      <main id="main" className="bento">
        <TrackCaseStudyView slug={slug} title={meta.title} />
        <BentoHeader backLink />
        <div className="page-column case-study-body">

      {/* Intro */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
          alignItems: "flex-start",
          width: "100%",
          maxWidth: "var(--measure-prose)",
          alignSelf: "center",
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
          {[meta.eyebrow, meta.years].filter(Boolean).join(" · ")}
        </span>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 400,
            fontSize: "34px",
            lineHeight: "var(--type-lead-lh)",
            color: "var(--text-primary)",
            textWrap: "pretty",
          }}
        >
          {meta.title}
        </h1>
        {meta.lead ? (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              lineHeight: "27px",
              color: "var(--text-secondary)",
              textWrap: "pretty",
            }}
          >
            {meta.lead}
          </p>
        ) : null}
        {meta.sublead ? <Callout headline={meta.sublead} /> : null}
        {meta.liveLink ? (
          <TextLink
            href={meta.liveLink}
            external
            data-track={EVENTS.CTA_CLICK}
            data-track-label={meta.liveLabel}
            data-track-location="case-study"
            data-track-slug={slug}
          >
            {meta.liveLabel}
          </TextLink>
        ) : null}
      </section>

      {/* Header credits: pulled 32px toward both neighbours (48px gaps instead
          of the page's 80px) so they read as part of the intro. */}
      {creditsInBody ? null : (
        <div style={{ alignSelf: "stretch", marginBlock: -32 }}>
          <Credits {...meta.credits} />
        </div>
      )}

      {/* Hero — video (autoplay, no controls) if set, otherwise the image */}
      <HeroMedia video={meta.heroVideo} image={meta.heroImage} alt={meta.heroAlt} />

      {/* Results strip: pulled 32px up so it sits close under the hero. */}
      {meta.results?.length ? (
        <div style={{ alignSelf: "stretch", marginTop: -32 }}>
          <Metrics>
            {meta.results.map((r, i) => (
              <Metric key={i} before={r.before} after={r.after} unit={r.unit}>
                {r.label.map((line, j) => (
                  <span key={j}>
                    {j > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </Metric>
            ))}
          </Metrics>
        </div>
      ) : null}

      {/* Narrative body (MDX). The read marker is pinned to its bottom edge. */}
      <div style={{ display: "flex", flexDirection: "column", gap: 80, alignSelf: "stretch", position: "relative" }}>
        {content}
        <TrackCaseStudyRead slug={slug} title={meta.title} />
      </div>

      {/* Next project */}
      {next ? (
        <div style={{ display: "flex", justifyContent: "flex-end", alignSelf: "stretch" }}>
          <TextLink
            href={`/work/${next.slug}`}
            arrow
            data-track={EVENTS.NEXT_PROJECT_CLICK}
            data-track-slug={next.slug}
            data-track-title={next.title}
          >
            {`Next — ${next.title}`}
          </TextLink>
        </div>
      ) : null}

        </div>
        <BentoFooter />
      </main>
    </>
  );
}
