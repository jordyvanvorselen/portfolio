'use client'

import { useLocale } from 'next-intl'
import { setCookie } from 'cookies-next/client'
import { useRouter } from 'next/navigation'
import { LOCALES, type Locale } from '@/i18n/config'

export const useLanguageSwitch = () => {
  const currentLocale = useLocale() as Locale
  const router = useRouter()

  const targetLocale: Locale = currentLocale === 'en' ? 'nl' : 'en'

  const switchLanguage = () => {
    // Set cookie using cookies-next for better handling
    setCookie('locale', targetLocale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })

    // Refresh the current page to apply the new locale
    router.refresh()
  }

  return {
    currentLocale,
    targetLocale,
    switchLanguage,
    availableLocales: LOCALES,
  }
}
