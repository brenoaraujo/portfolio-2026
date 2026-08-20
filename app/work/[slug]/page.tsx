import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { SiteHeader } from "@/components/site/SiteHeader";
import { TextLink } from "@/components/site/TextLink";
import { CaseStudyFooter } from "@/components/case-study/CaseStudyFooter";
import { Credits } from "@/components/case-study/Credits";
import { HeroMedia } from "@/components/case-study/Media";
import { mdxComponents } from "@/components/case-study/blocks";
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
    title: `${meta.title} — Breno Araujo`,
    description: meta.lead,
    openGraph: {
      title: meta.title,
      description: meta.lead,
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

  const { content } = await compileMDX({
    source: getCaseStudyBody(slug),
    components: mdxComponents,
  });

  const next = getNextCaseStudy(slug);

  return (
    <div className="page-column">
      <SiteHeader />

      {/* Intro */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
          alignItems: "flex-start",
          maxWidth: "var(--measure-prose)",
          alignSelf: "flex-start",
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
            fontSize: "var(--type-lead-size)",
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
              lineHeight: "23px",
              color: "var(--text-secondary)",
              textWrap: "pretty",
            }}
          >
            {meta.lead}
          </p>
        ) : null}
        {meta.liveLink ? (
          <TextLink href={meta.liveLink} external>
            {meta.liveLabel}
          </TextLink>
        ) : null}
      </section>

      {/* Hero — video (autoplay, no controls) if set, otherwise the image */}
      <HeroMedia video={meta.heroVideo} image={meta.heroImage} alt={meta.heroAlt} />

      <Credits {...meta.credits} />

      {/* Narrative body (MDX) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 80, alignSelf: "stretch" }}>
        {content}
      </div>

      {/* Next project */}
      {next ? (
        <div style={{ display: "flex", justifyContent: "flex-end", alignSelf: "stretch" }}>
          <TextLink href={`/work/${next.slug}`} arrow>
            {`Next — ${next.title}`}
          </TextLink>
        </div>
      ) : null}

      <CaseStudyFooter />
    </div>
  );
}
