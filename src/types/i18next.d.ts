import en from '@/i18n/locales/en.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: { translation: typeof en }
  }
}
