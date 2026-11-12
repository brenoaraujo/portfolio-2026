import { LanguagePrompt } from "@/components/i18n/LanguagePrompt";
import { TranslationToast } from "@/components/i18n/TranslationToast";
import {
  DEFAULT_LOCALE,
  HTML_LANG,
  PROMPT_SIGNALS,
  LOCALES,
  localePath,
  getDictionary,
  type Locale,
} from "@/lib/i18n";

/**
 * The floating language UI for a page:
 * - English pages: the one-time "read in Portuguese?" prompt (for visitors
 *   whose browser or country suggests it).
 * - Machine-translated pages: the automatic-translation reminder.
 * Only the strings each piece needs are sent to the browser.
 */
export function LanguageExtras({ locale, path }: { locale: Locale; path: string }) {
  if (locale === DEFAULT_LOCALE) {
    return (
      <>
        {LOCALES.filter((l) => l !== DEFAULT_LOCALE).map((target) => {
          const signals = PROMPT_SIGNALS[target];
          if (!signals) return null;
          return (
            <LanguagePrompt
              key={target}
              target={target}
              href={localePath(target, path)}
              lang={HTML_LANG[target]}
              signals={signals}
              t={getDictionary(target).language.prompt}
            />
          );
        })}
      </>
    );
  }

  const t = getDictionary(locale).language;
  return t.machineTranslated ? <TranslationToast t={t.toast} /> : null;
}
