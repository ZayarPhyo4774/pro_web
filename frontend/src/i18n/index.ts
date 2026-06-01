import type { Locale } from './locales';
import en from './messages/en';
import mm from './messages/mm';
import type { Messages } from './messages/en';

export type { Messages, Locale };
export { en, mm };

const catalogs: Record<Locale, Messages> = { en, mm };

export function getMessages(locale: Locale): Messages {
  return catalogs[locale] ?? catalogs.en;
}

export type TranslationKey = {
  [K in keyof Messages & string]: Messages[K] extends string
    ? K
    : `${K}.${keyof Messages[K] & string}`;
}[keyof Messages & string];

export function translate(locale: Locale, key: TranslationKey): string {
  const messages = getMessages(locale);
  const parts = key.split('.');
  let value: unknown = messages;
  for (const part of parts) {
    if (value && typeof value === 'object' && part in value) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  return typeof value === 'string' ? value : key;
}
