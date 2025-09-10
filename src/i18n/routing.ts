import { defineRouting } from 'next-intl/routing'
import { LOCALE_FALLBACK, LOCALES } from '@/i18n/config'

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: LOCALE_FALLBACK,
  localePrefix: 'never',
})
