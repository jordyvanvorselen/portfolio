import { getRequestConfig } from 'next-intl/server'
import { headers, cookies } from 'next/headers'

import {
  HOSTNAME_LOCALE_MAP,
  LOCALE_FALLBACK,
  LOCALES,
  type Locale,
} from '@/i18n/config'

export default getRequestConfig(async () => {
  // Get the current hostname and cookies
  const requestHeaders = await headers()
  const cookieStore = await cookies()
  const hostname = requestHeaders.get('host') ?? ''

  // Check for locale cookie first
  const cookieLocale = cookieStore.get('locale')?.value as Locale | undefined

  // Validate cookie locale
  const validCookieLocale =
    cookieLocale && LOCALES.includes(cookieLocale) ? cookieLocale : null

  // Determine locale priority: cookie > hostname > fallback
  const hostnameLocale = HOSTNAME_LOCALE_MAP[hostname] ?? LOCALE_FALLBACK
  const locale: Locale = validCookieLocale ?? hostnameLocale

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  }
})
