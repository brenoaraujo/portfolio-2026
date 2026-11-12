import type { Locale } from "./config";
import en, { type Dictionary } from "./dictionaries/en";
import ptBr from "./dictionaries/pt-br";

export * from "./config";
export type { Dictionary };

const DICTIONARIES: Record<Locale, Dictionary> = {
  en,
  "pt-br": ptBr,
};

/**
 * The copy for a locale. Server components pass only the slices a client
 * component needs, so the full dictionary never ships to the browser.
 */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
