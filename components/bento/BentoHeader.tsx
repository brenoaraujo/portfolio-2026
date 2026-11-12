import Link from "next/link";
import { BENTO_NAV } from "@/lib/site";
import { EVENTS } from "@/lib/analytics-events";
import { localePath, getDictionary, type Locale } from "@/lib/i18n";

/**
 * Home header: logo dot + wordmark · nav · "open to roles" pill.
 * Case-study pages (`backLink`) get a "← Back to work" link instead.
 * The EN / PT switch lives in the footer (BentoFooter).
 */
export function BentoHeader({ backLink = false, locale }: { backLink?: boolean; locale: Locale }) {
  const t = getDictionary(locale);

  if (backLink) {
    return (
      <header className="bento-header">
        <Link
          href={localePath(locale, "/#work")}
          className="bento-back"
          data-track={EVENTS.NAV_CLICK}
          data-track-label="Back to work"
          data-track-location="case-study"
        >
          {t.header.backToWork}
        </Link>
      </header>
    );
  }
  return (
    <header className="bento-header">
      <a href="#main" className="bento-logo">

        Breno Araujo
      </a>
      <nav className="bento-nav">
        {BENTO_NAV.map((n) => (
          <a
            key={n.id}
            href={n.href}
            data-track={EVENTS.NAV_CLICK}
            data-track-label={getDictionary("en").header.nav[n.id]}
            data-track-location="header"
          >
            {t.header.nav[n.id]}
          </a>
        ))}
        <span className="bento-pill">
          <span className="bento-pill__dot" aria-hidden="true" />
          {t.header.pill}
        </span>
      </nav>
    </header>
  );
}
