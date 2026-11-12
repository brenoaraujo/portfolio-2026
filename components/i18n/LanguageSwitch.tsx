"use client";

import type { Locale } from "@/lib/i18n/config";
import { rememberLocale } from "@/lib/i18n/client";
import { EVENTS } from "@/lib/analytics-events";

export interface LanguageOption {
  locale: Locale;
  /** "EN", "PT" */
  short: string;
  /** "English", "Português (Brasil)" */
  name: string;
  /** hreflang / lang value, e.g. "pt-BR" */
  lang: string;
  /** The current page in that language. */
  href: string;
}

/**
 * EN / PT switch in the footer. Plain links (a full page load, so <html lang>
 * and the hero intro reset), and a click remembers the choice in a cookie so
 * the next visit opens in that language (see proxy.ts).
 */
export function LanguageSwitch({
  current,
  options,
  label,
}: {
  current: Locale;
  options: LanguageOption[];
  /** aria-label for the group, in the page's language. */
  label: string;
}) {
  return (
    <nav className="lang-switch" aria-label={label}>
      {options.map((o) =>
        o.locale === current ? (
          <span key={o.locale} className="lang-switch__item is-active" aria-current="page" title={o.name}>
            <span aria-hidden="true">{o.short}</span>
            <span className="sr-only" lang={o.lang}>{o.name}</span>
          </span>
        ) : (
          <a
            key={o.locale}
            className="lang-switch__item"
            href={o.href}
            hrefLang={o.lang}
            title={o.name}
            onClick={() => rememberLocale(o.locale)}
            data-track={EVENTS.LANGUAGE_SWITCH}
            data-track-language={o.locale}
            data-track-from={current}
            data-track-location="footer"
          >
            <span aria-hidden="true">{o.short}</span>
            <span className="sr-only" lang={o.lang}>{o.name}</span>
          </a>
        ),
      )}
    </nav>
  );
}
