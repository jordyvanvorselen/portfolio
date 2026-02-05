'use client'

import { useLocale, type Locale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'
import { LOCALES } from '@/i18n/config'

export const useLanguageSwitch = () => {
  const router = useRouter()
  const currentLocale = useLocale() as Locale
  const targetLocale: Locale = currentLocale === 'en' ? 'nl' : 'en'

  const switchLanguage = () => {
    // Set the NEXT_LOCALE cookie directly
    setCookie('NEXT_LOCALE', targetLocale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    })
    // Refresh the page to pick up the new locale from the cookie
    router.refresh()
  }

  return {
    currentLocale,
    targetLocale,
    switchLanguage,
    availableLocales: LOCALES,
  }
}
