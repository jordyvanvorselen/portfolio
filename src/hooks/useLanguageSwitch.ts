'use client'

import { useLocale, type Locale } from 'next-intl'
import { useTransition } from 'react'
import { useParams } from 'next/navigation'
import { usePathname, useRouter } from '@/i18n/navigation'
import { LOCALES } from '@/i18n/config'

export const useLanguageSwitch = () => {
  const router = useRouter()
  const [_, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  const currentLocale = useLocale() as Locale
  const targetLocale: Locale = currentLocale === 'en' ? 'nl' : 'en'

  const switchLanguage = () => {
    startTransition(() => {
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      router.replace({ pathname, params }, { locale: targetLocale })
      router.refresh()
    })
  }

  return {
    currentLocale,
    targetLocale,
    switchLanguage,
    availableLocales: LOCALES,
  }
}
