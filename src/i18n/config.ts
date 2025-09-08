export const LOCALES = ['en', 'nl'] as const
export type Locale = (typeof LOCALES)[number]

export const LOCALE_FALLBACK: Locale = 'en'

export const HOSTNAME_LOCALE_MAP: Record<string, Locale> = {
  'morethanbits.nl': 'nl',
  'morethanbits.io': 'en',
  'jordyvanvorselen.nl': 'nl',
  'jordyvanvorselen.com': 'en',
}
