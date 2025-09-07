export const LOCALES = ['en', 'nl'] as const
export type Locale = (typeof LOCALES)[number]

export const LOCALE_FALLBACK: Locale = 'en'

export const HOSTNAME_LOCALE_MAP: Record<string, Locale> = {
  'portfolio.nl': 'nl',
  'portfolio.com': 'en',
  'localhost:3000': 'en',
}
