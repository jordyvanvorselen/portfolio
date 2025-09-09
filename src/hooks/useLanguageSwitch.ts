'use client'

import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next/client'
import { routing, type Locale } from '@/i18n/routing'

export const useLanguageSwitch = () => {
  const currentLocale = useLocale() as Locale
  const router = useRouter()

  const targetLocale: Locale = currentLocale === 'en' ? 'nl' : 'en'

  const switchLanguage = () => {
    // With domain routing, we still need to set a cookie for locale preference
    // The middleware will use this to determine which locale to serve on the current domain
    setCookie('locale', targetLocale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })

    // Refresh to apply the new locale (domain routing with cookie preference)
    router.refresh()
  }

  return {
    currentLocale,
    targetLocale,
    switchLanguage,
    availableLocales: routing.locales,
  }
}
