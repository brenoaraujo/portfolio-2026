import { BENTO_FOOTER } from "@/lib/site";
import { LanguageSwitch } from "@/components/i18n/LanguageSwitch";
import { LOCALES, HTML_LANG, localePath, getDictionary, type Locale } from "@/lib/i18n";

/**
 * Minimal mono footer row: thanks · coordinates · EN / PT + back to top.
 * `path` is the current page without a language prefix (for the switch).
 */
export function BentoFooter({
  locale,
  path,
  languageSwitch = true,
}: {
  locale: Locale;
  path: string;
  /** Off for the English-only /for/<company> pages. */
  languageSwitch?: boolean;
}) {
  const t = getDictionary(locale);
  return (
    <footer className="bento-footer">
      <span>{t.footer.left}</span>
      <span>{BENTO_FOOTER.coords}</span>
      <span className="bento-footer__end">
        {languageSwitch ? (
          <LanguageSwitch
            current={locale}
            label={t.language.switchLabel}
            options={LOCALES.map((l) => {
              const d = getDictionary(l).language;
              return { locale: l, short: d.short, name: d.name, lang: HTML_LANG[l], href: localePath(l, path) };
            })}
          />
        ) : null}
        <a href="#main">{t.footer.back}</a>
      </span>
    </footer>
  );
}
