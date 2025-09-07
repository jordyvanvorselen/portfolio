import { initReactI18next } from 'react-i18next/initReactI18next'

import { KeyPrefix, Resource, createInstance } from 'i18next'

import {
  HOSTNAME_LOCALE_MAP,
  LOCALES,
  LOCALE_FALLBACK,
  type Locale,
} from '@/i18n/config'

export async function getLocaleFromHostname(hostname: string): Promise<Locale> {
  return HOSTNAME_LOCALE_MAP[hostname] ?? LOCALE_FALLBACK
}

export async function initializeTranslations(
  locale: Locale,
  resources: Resource,
  i18nextInstance = createInstance(),
  keyPrefix?: KeyPrefix<'translation'>
) {
  i18nextInstance.use(initReactI18next)

  await i18nextInstance.init({
    lng: locale,
    resources: resources,
    fallbackLng: LOCALE_FALLBACK,
    supportedLngs: LOCALES,
  })

  return {
    i18n: i18nextInstance,
    resources: i18nextInstance.services.resourceStore.data,
    t: i18nextInstance.getFixedT(null, null, keyPrefix ?? undefined),
  }
}
