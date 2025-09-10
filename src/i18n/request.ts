import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { cookies } from 'next/headers'

export default getRequestConfig(async () => {
  const store = await cookies()
  const requested = store.get('NEXT_LOCALE')?.value
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  }
})
