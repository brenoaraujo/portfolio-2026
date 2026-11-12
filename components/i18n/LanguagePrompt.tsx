"use client";

import { useEffect, useState } from "react";
import {
  COUNTRY_COOKIE,
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  type Locale,
} from "@/lib/i18n/config";
import { readCookie, rememberLocale } from "@/lib/i18n/client";
import { track } from "@/lib/analytics";
import { EVENTS } from "@/lib/analytics-events";

/** Waits for the home hero intro to finish before sliding in. */
const SHOW_DELAY_MS = 2400;

export interface LanguagePromptCopy {
  title: string;
  body: string;
  accept: string;
  decline: string;
  close: string;
}

/**
 * One-time invitation, on English pages, to read the site in another language.
 * Shown only to visitors with no saved choice whose browser speaks that
 * language or who are browsing from one of its countries. Either answer is
 * remembered, so it never comes back: "accept" opens the translated page,
 * "decline" or × keeps English.
 */
export function LanguagePrompt({
  target,
  href,
  lang,
  signals,
  t,
}: {
  target: Locale;
  /** This page in the target language. */
  href: string;
  /** lang attribute for the copy (it's written in the target language). */
  lang: string;
  signals: { languages: string[]; countries: string[] };
  t: LanguagePromptCopy;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (readCookie(LOCALE_COOKIE)) return;
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
    const byLanguage = langs.some((l) => signals.languages.some((p) => l?.toLowerCase().startsWith(p)));
    const country = (readCookie(COUNTRY_COOKIE) ?? "").toUpperCase();
    const byCountry = !!country && signals.countries.includes(country);
    if (!byLanguage && !byCountry) return;

    const id = window.setTimeout(() => {
      setOpen(true);
      track(EVENTS.LANGUAGE_PROMPT_VIEW, {
        language: target,
        reason: byLanguage ? "browser language" : "country",
      });
    }, SHOW_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [signals, target]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      rememberLocale(DEFAULT_LOCALE);
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function dismiss() {
    rememberLocale(DEFAULT_LOCALE);
    setOpen(false);
  }

  function accept() {
    rememberLocale(target);
    window.location.assign(href + window.location.search + window.location.hash);
  }

  if (!open) return null;

  return (
    <aside
      className="lang-prompt"
      lang={lang}
      role="dialog"
      aria-modal="false"
      aria-labelledby="lang-prompt-title"
      aria-describedby="lang-prompt-body"
    >
      <button
        className="lang-prompt__close"
        onClick={dismiss}
        aria-label={t.close}
        data-track={EVENTS.LANGUAGE_SWITCH}
        data-track-language={DEFAULT_LOCALE}
        data-track-from={DEFAULT_LOCALE}
        data-track-location="prompt close"
      >
        <span aria-hidden="true">×</span>
      </button>
      <p id="lang-prompt-title" className="lang-prompt__title">
        {t.title}
      </p>
      <p id="lang-prompt-body" className="lang-prompt__body">
        {t.body}
      </p>
      <div className="lang-prompt__actions">
        <button
          className="btn-primary lang-prompt__accept"
          onClick={accept}
          data-track={EVENTS.LANGUAGE_SWITCH}
          data-track-language={target}
          data-track-from={DEFAULT_LOCALE}
          data-track-location="prompt"
        >
          {t.accept}
        </button>
        <button
          className="lang-prompt__decline"
          onClick={dismiss}
          data-track={EVENTS.LANGUAGE_SWITCH}
          data-track-language={DEFAULT_LOCALE}
          data-track-from={DEFAULT_LOCALE}
          data-track-location="prompt"
        >
          {t.decline}
        </button>
      </div>
    </aside>
  );
}
