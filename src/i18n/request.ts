import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'
import { routing, type Locale } from '@/i18n/routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  // If no locale from domain routing, check for cookie preference
  if (!locale || !routing.locales.includes(locale as Locale)) {
    const cookieStore = await cookies()
    const cookieLocale = cookieStore.get('locale')?.value

    if (cookieLocale && routing.locales.includes(cookieLocale as Locale)) {
      locale = cookieLocale
    } else {
      locale = routing.defaultLocale
    }
  }

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  }
})
