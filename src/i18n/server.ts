import { KeyPrefix, ResourceLanguage } from 'i18next'
import { headers } from 'next/headers'
import 'server-only'

import { getLocaleFromHostname, initializeTranslations } from '@/i18n/common'
import { Locale } from '@/i18n/config'
import en from '@/i18n/locales/en.json'
import nl from '@/i18n/locales/nl.json'

export const resources: Record<Locale, ResourceLanguage> = {
  en: { translation: en },
  nl: { translation: nl },
}

export async function getI18n(
  keyPrefix?: KeyPrefix<'translation'>
): Promise<
  { locale: Locale } & Awaited<ReturnType<typeof initializeTranslations>>
> {
  const requestHeaders = await headers()
  const locale = await getLocaleFromHostname(requestHeaders.get('host') ?? '')
  const i18n = await initializeTranslations(
    locale,
    resources,
    undefined,
    keyPrefix
  )

  return {
    ...i18n,
    locale,
  }
}
