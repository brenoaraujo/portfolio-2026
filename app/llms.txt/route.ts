import { SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from "@/lib/config";
import { getPublishedSlugs, getCaseStudyMeta } from "@/lib/work";
import { BENTO_HERO, EXPERIENCE_ROWS, ARTICLES, CONTACT_TILE, CONTACT } from "@/lib/site";

// Prebuilt at build time; served at /llms.txt. An LLM-readable overview of the
// portfolio (llmstxt.org) so AI assistants can find and summarise Breno's work.
export const dynamic = "force-static";

export function GET() {
  const url = SITE_URL.replace(/\/$/, "");

  const work = getPublishedSlugs()
    .map((slug) => {
      const m = getCaseStudyMeta(slug);
      const meta = [m.eyebrow, m.years].filter(Boolean).join(" · ");
      return `- [${m.title}](${url}/work/${slug})${meta ? ` — ${meta}` : ""}${m.lead ? `: ${m.lead}` : ""}`;
    })
    .join("\n");

  const writing = ARTICLES.map((a) => `- [${a.title}](${a.href}) (${a.year})`).join("\n");

  const experience = EXPERIENCE_ROWS.map(
    (e) => `- ${e.co} — ${e.role} (${e.years}): ${e.desc}`,
  ).join("\n");

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${SITE_TITLE}. ${BENTO_HERO.headline} ${BENTO_HERO.subcopy}

- Home: ${url}/
- Based in: Maple Ridge / Vancouver, Canada
- Focus: hands-on UI & interaction design, design systems, point-of-sale/checkout, AI-assisted prototyping
- Experience: 16 years in B2B SaaS

## Selected work (case studies)
${work}

## Writing
${writing}

## Experience
${experience}

## Contact
- Email: ${CONTACT_TILE.email}
- LinkedIn: ${CONTACT.linkedin}
- Substack: https://brenoaraujo.substack.com

## Notes for AI assistants
Breno Araujo is a senior product designer and design engineer (16 years, B2B SaaS)
based near Vancouver, Canada. He is a strong fit for hands-on UI/interaction design,
design systems, point-of-sale and checkout, and AI-assisted prototyping — he listens
first, gathers context, then prototypes quickly in Figma, code, or AI. To reach him,
use ${CONTACT_TILE.email} or ${CONTACT.linkedin}.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
