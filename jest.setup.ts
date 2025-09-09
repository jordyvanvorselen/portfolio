import '@testing-library/jest-dom'
import React from 'react'

import { assertableTranslationKeys } from './src/test/utils/translations'

// Mock window.matchMedia (used by useMediaQuery hook)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock next-intl for client-side components
jest.mock('next-intl', () => {
  const createMockTranslations = (namespace?: string) => {
    const baseFunction: any = assertableTranslationKeys(namespace ?? '')

    // Add the rich method to the translation function
    baseFunction.rich = jest.fn(
      (key: string, components?: Record<string, React.ComponentType<any>>) => {
        // For rich text, return the key with basic JSX handling
        if (components?.['b']) {
          // Mock the rich text by wrapping content in bold tags
          return React.createElement('b', {}, baseFunction(key))
        }
        return baseFunction(key)
      }
    )

    return baseFunction
  }

  return {
    useTranslations: createMockTranslations,
    useLocale: () => 'en',
    useMessages: () => ({
      blog: {
        posts: {
          advancedTypeScript: {
            tags: ['TypeScript', 'React', 'Testing', 'Node.js', 'GraphQL'],
          },
        },
      },
    }),
    useNow: () => new Date(),
    useTimeZone: () => 'UTC',
    NextIntlClientProvider: ({ children }: { children: React.ReactNode }) =>
      children,
  }
})

// Mock next-intl server utilities
jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn((namespace?: string) => {
    return Promise.resolve(assertableTranslationKeys(namespace ?? ''))
  }),
  getLocale: jest.fn(() => Promise.resolve('en')),
  getMessages: jest.fn(() => Promise.resolve({})),
  getNow: jest.fn(() => Promise.resolve(new Date())),
  getTimeZone: jest.fn(() => Promise.resolve('UTC')),
}))

// Mock next/navigation globally since useLanguageSwitch depends on it
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
}))

// Mock cookies-next/client globally since useLanguageSwitch depends on it
jest.mock('cookies-next/client', () => ({
  setCookie: jest.fn(),
  getCookie: jest.fn(),
  deleteCookie: jest.fn(),
  hasCookie: jest.fn(),
}))

// Mock i18n routing globally to avoid Jest ESM issues
jest.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['en', 'nl'],
    defaultLocale: 'en',
  },
}))
