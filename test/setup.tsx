import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import React from 'react'

import { afterAll, afterEach, beforeAll, vitest } from "vitest"

import { server } from "./msw/register.server"
import { assertableTranslationKeys } from "../src/test/utils/translations"

// Setup MSW server
beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" })
  // Set timezone to UTC for consistent test results across environments
  process.env.TZ = "UTC"
})

afterAll(() => server.close())

afterEach(() => {
  vitest.resetAllMocks()
  server.resetHandlers()
  cleanup()
})

// Mock window.matchMedia (used by useMediaQuery hook)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vitest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vitest.fn(), // deprecated
    removeListener: vitest.fn(), // deprecated
    addEventListener: vitest.fn(),
    removeEventListener: vitest.fn(),
    dispatchEvent: vitest.fn(),
  })),
})

// Mock next-intl for client-side components
vitest.mock('next-intl', () => {
  const createMockTranslations = (namespace?: string) => {
    const baseFunction: any = assertableTranslationKeys(namespace ?? '')

    // Add the rich method to the translation function
    baseFunction.rich = vitest.fn(
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
vitest.mock('next-intl/server', () => ({
  getTranslations: vitest.fn((namespace?: string) => {
    return Promise.resolve(assertableTranslationKeys(namespace ?? ''))
  }),
  getLocale: vitest.fn(() => Promise.resolve('en')),
  getMessages: vitest.fn(() => Promise.resolve({})),
  getNow: vitest.fn(() => Promise.resolve(new Date())),
  getTimeZone: vitest.fn(() => Promise.resolve('UTC')),
}))

// Mock next/navigation globally since useLanguageSwitch depends on it
vitest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: vitest.fn(),
    push: vitest.fn(),
    replace: vitest.fn(),
    prefetch: vitest.fn(),
    back: vitest.fn(),
    forward: vitest.fn(),
  }),
  useParams: () => ({}),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock cookies-next/client globally since useLanguageSwitch depends on it
vitest.mock('cookies-next/client', () => ({
  setCookie: vitest.fn(),
  getCookie: vitest.fn(),
  deleteCookie: vitest.fn(),
  hasCookie: vitest.fn(),
}))

// Mock i18n routing globally to avoid Vitest ESM issues
vitest.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['en', 'nl'],
    defaultLocale: 'en',
  },
}))

// Mock @/i18n/navigation globally to avoid Vitest ESM issues
vitest.mock('@/i18n/navigation', () => ({
  usePathname: () => '/current-path',
  useRouter: () => ({
    replace: vitest.fn(),
    refresh: vitest.fn(),
    push: vitest.fn(),
    prefetch: vitest.fn(),
    back: vitest.fn(),
    forward: vitest.fn(),
  }),
  Link: ({ children }: { children: React.ReactNode }) => children,
  getPathname: vitest.fn(),
  redirect: vitest.fn(),
}))

vitest.mock("server-only", () => ({}))