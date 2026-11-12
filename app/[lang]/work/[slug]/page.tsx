import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { BentoHeader } from "@/components/bento/BentoHeader";
import { BentoFooter } from "@/components/bento/BentoFooter";
import { TextLink } from "@/components/site/TextLink";
import { Credits } from "@/components/case-study/Credits";
import { HeroMedia } from "@/components/case-study/Media";
import { localizedMdxComponents, Callout, Metrics, Metric } from "@/components/case-study/blocks";
import { LanguageExtras } from "@/components/i18n/LanguageExtras";
import { TrackCaseStudyView } from "@/components/analytics/TrackCaseStudyView";
import { TrackCaseStudyRead } from "@/components/analytics/TrackCaseStudyRead";
import { EVENTS } from "@/lib/analytics-events";
import {
  HTML_LANG,
  LOCALES,
  OG_LOCALE,
  isLocale,
  localePath,
  getDictionary,
} from "@/lib/i18n";
import {
  hasCaseStudy,
  hasTranslation,
  getPublishedSlugs,
  getCaseStudyMeta,
  getCaseStudyBody,
  getNextCaseStudy,
} from "@/lib/work";

export const dynamicParams = false;

// Every published study exists in every language. Without a translation the
// page shows the English text with a note (and stays out of search).
export function generateStaticParams() {
  return getPublishedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !hasCaseStudy(slug)) return {};
  const meta = getCaseStudyMeta(slug, lang);
  const path = `/work/${slug}`;

  // hreflang only lists the languages this study is really written in.
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    if (hasTranslation(slug, locale)) languages[HTML_LANG[locale]] = localePath(locale, path);
  }
  languages["x-default"] = path;

  return {
    // The root layout's title template appends " — Breno Araujo".
    title: meta.title,
    description: meta.lead,
    // Per-page canonical; resolves against metadataBase to the full URL. An
    // untranslated page points at the English original instead.
    alternates: { canonical: localePath(meta.contentLocale, path), languages },
    robots: meta.translated ? undefined : { index: false, follow: true },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.lead,
      url: localePath(lang, path),
      locale: OG_LOCALE[lang],
      images: meta.heroImage ? [{ url: meta.heroImage }] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !hasCaseStudy(slug)) notFound();
  const meta = getCaseStudyMeta(slug, lang);
  if (!meta.published) notFound();

  // `t` is the page's language (header, footer, links). `c` is the language the
  // study is actually written in, for the labels that sit inside its content.
  const t = getDictionary(lang);
  const c = getDictionary(meta.contentLocale);
  const contentLang = meta.translated ? undefined : HTML_LANG[meta.contentLocale];
  const liveLabel = meta.liveLabel ?? c.caseStudy.liveLabel;

  const body = getCaseStudyBody(slug, lang);
  // Credits sit in the header unless the MDX places them itself with <Credits />
  // (bound here to this study's frontmatter, since MDX blocks JS expressions).
  const creditsInBody = /<Credits\b/.test(body);
  const { content } = await compileMDX({
    source: body,
    components: {
      ...localizedMdxComponents(c.caseStudy),
      Credits: () => <Credits {...meta.credits} labels={c.caseStudy.credits} variant="grid" />,
    },
  });

  const next = getNextCaseStudy(slug, lang);
  // An untranslated next study still gets a translated title, from its home tile.
  const tileTitles: Record<string, { title: string } | undefined> = t.work;
  const nextTitle =
    next && !hasTranslation(next.slug, lang) ? (tileTitles[next.slug]?.title ?? next.title) : next?.title;
  const path = `/work/${slug}`;

  return (
    <>
      <main id="main" className="bento">
        <TrackCaseStudyView slug={slug} title={meta.title} />
        <BentoHeader backLink locale={lang} />
        <div className="page-column case-study-body">

      {/* Not translated yet: say so, in the page's language. */}
      {meta.translated ? null : (
        <p className="untranslated-note" role="note">
          {t.caseStudy.notTranslated}
        </p>
      )}

      {/* Intro */}
      <section
        lang={contentLang}
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
            data-track-label={liveLabel}
            data-track-location="case-study"
            data-track-slug={slug}
          >
            {liveLabel}
          </TextLink>
        ) : null}
      </section>

      {/* Header credits: pulled 32px toward both neighbours (48px gaps instead
          of the page's 80px) so they read as part of the intro. */}
      {creditsInBody ? null : (
        <div lang={contentLang} style={{ alignSelf: "stretch", marginBlock: -32 }}>
          <Credits {...meta.credits} labels={c.caseStudy.credits} />
        </div>
      )}

      {/* Hero — video (autoplay, no controls) if set, otherwise the image */}
      <HeroMedia video={meta.heroVideo} image={meta.heroImage} alt={meta.heroAlt} />

      {/* Results strip: pulled 32px up so it sits close under the hero. */}
      {meta.results?.length ? (
        <div lang={contentLang} style={{ alignSelf: "stretch", marginTop: -32 }}>
          <Metrics label={c.caseStudy.results}>
            {meta.results.map((r, i) => (
              <Metric key={i} before={r.before} after={r.after} unit={r.unit} toLabel={c.caseStudy.to}>
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
      <div
        lang={contentLang}
        style={{ display: "flex", flexDirection: "column", gap: 80, alignSelf: "stretch", position: "relative" }}
      >
        {content}
        <TrackCaseStudyRead slug={slug} title={meta.title} />
      </div>

      {/* Next project */}
      {next ? (
        <div style={{ display: "flex", justifyContent: "flex-end", alignSelf: "stretch" }}>
          <TextLink
            href={localePath(lang, `/work/${next.slug}`)}
            arrow
            data-track={EVENTS.NEXT_PROJECT_CLICK}
            data-track-slug={next.slug}
            data-track-title={next.title}
          >
            {`${t.caseStudy.nextPrefix}${nextTitle}`}
          </TextLink>
        </div>
      ) : null}

        </div>
        <BentoFooter locale={lang} path={path} />
        <LanguageExtras locale={lang} path={path} />
      </main>
    </>
  );
}
