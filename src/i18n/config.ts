export const LOCALES = ['en', 'nl'] as const
export type Locale = (typeof LOCALES)[number]

export const LOCALE_FALLBACK: Locale = 'en'
