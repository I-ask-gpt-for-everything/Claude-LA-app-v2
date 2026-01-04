import { en } from './en';
import { el } from './el';

export type Language = 'en' | 'el';

export type TranslationKey = keyof typeof en;

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en,
  el,
};

export { en, el };
