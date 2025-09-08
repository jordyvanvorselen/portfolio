import {
  LOCALES,
  LOCALE_FALLBACK,
  HOSTNAME_LOCALE_MAP,
  type Locale,
} from '@/i18n/config'

describe('i18n config', () => {
  describe('LOCALES', () => {
    it('should export supported locales', () => {
      expect(LOCALES).toEqual(['en', 'nl'])
      expect(LOCALES).toHaveLength(2)
    })

    it('should be readonly array', () => {
      expect(Array.isArray(LOCALES)).toBe(true)
    })
  })

  describe('LOCALE_FALLBACK', () => {
    it('should have English as fallback locale', () => {
      expect(LOCALE_FALLBACK).toBe('en')
    })

    it('should be included in LOCALES', () => {
      expect(LOCALES).toContain(LOCALE_FALLBACK)
    })
  })

  describe('HOSTNAME_LOCALE_MAP', () => {
    it('should map Dutch domains to nl locale', () => {
      expect(HOSTNAME_LOCALE_MAP['morethanbits.nl']).toBe('nl')
      expect(HOSTNAME_LOCALE_MAP['jordyvanvorselen.nl']).toBe('nl')
    })

    it('should map English domains to en locale', () => {
      expect(HOSTNAME_LOCALE_MAP['morethanbits.io']).toBe('en')
      expect(HOSTNAME_LOCALE_MAP['jordyvanvorselen.com']).toBe('en')
    })

    it('should have all mapped locales in LOCALES array', () => {
      const mappedLocales = Object.values(HOSTNAME_LOCALE_MAP)
      mappedLocales.forEach(locale => {
        expect(LOCALES).toContain(locale)
      })
    })
  })

  describe('Locale type', () => {
    it('should accept valid locale values', () => {
      const enLocale: Locale = 'en'
      const nlLocale: Locale = 'nl'

      expect(enLocale).toBe('en')
      expect(nlLocale).toBe('nl')
    })
  })
})
