'use client'

import { FC, PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'

import { Resource, createInstance } from 'i18next'

import { initializeTranslations } from '@/i18n/common'
import { Locale } from '@/i18n/config'

export const TranslationsProvider: FC<
  PropsWithChildren<{ locale: Locale; resources: Resource }>
> = ({ children, locale, resources }) => {
  const i18n = createInstance()

  initializeTranslations(locale, resources, i18n)

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
