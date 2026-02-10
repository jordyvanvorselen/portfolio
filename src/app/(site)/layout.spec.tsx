import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import React from 'react'

// Mock NextIntlClientProvider and useTranslations
vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useTranslations: vi.fn(() => (key: string) => key),
  useLocale: vi.fn(() => 'en'),
}))

// Mock MSW wrapper component
vi.mock('@/test/msw/MockServiceWorkerWrapper.component', () => ({
  MockServiceWorkerWrapper: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}))

// Mock MSW exclude
vi.mock('@/test/msw/exclude', () => ({
  isExcluded: vi.fn(() => false),
}))

// Only mock the server-side next-intl functions that can't run in Jest
vi.mock('next-intl/server', () => ({
  getLocale: vi.fn(() => Promise.resolve('en')),
  getMessages: vi.fn(() => Promise.resolve({ test: 'message' })),
  getTranslations: vi.fn(namespace => {
    const mockT = vi.fn(key => `${namespace ? `${namespace}.` : ''}${key}`)
    return Promise.resolve(mockT)
  }),
}))

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useParams: vi.fn(() => ({})),
  usePathname: vi.fn(() => '/'),
  useRouter: () => ({
    refresh: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
}))

// Mock useMediaQuery hook
vi.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: vi.fn(() => false),
}))

// Mock CSS import (unavoidable in Jest)
vi.mock('./globals.css', () => ({}))

import RootLayout, { generateMetadata } from '@/app/(site)/layout'

describe('RootLayout', () => {
  it('renders body content with correct structure', async () => {
    const TestChild = () => <main data-testid="test-content">Page Content</main>

    const result = await RootLayout({ children: <TestChild /> })
    // Extract the body content from the html structure to avoid nesting warnings
    const htmlProps = (
      result as React.ReactElement<{ children: React.ReactElement }>
    ).props
    const bodyProps = (
      htmlProps.children as React.ReactElement<{ children: React.ReactNode }>
    ).props
    const bodyContent = bodyProps.children

    const { container } = render(bodyContent)

    // Verify the main content is rendered
    expect(screen.getByTestId('test-content')).toBeInTheDocument()

    // Verify Header and Footer are rendered
    expect(container.querySelector('header')).toBeInTheDocument()
    expect(container.querySelector('footer')).toBeInTheDocument()
  })

  it('includes Header, Footer, and children in correct order', async () => {
    const TestChild = () => <div data-testid="test-child">Test</div>

    const result = await RootLayout({ children: <TestChild /> })
    // Extract the body content from the html structure to avoid nesting warnings
    const htmlProps = (
      result as React.ReactElement<{ children: React.ReactElement }>
    ).props
    const bodyProps = (
      htmlProps.children as React.ReactElement<{ children: React.ReactNode }>
    ).props
    const bodyContent = bodyProps.children

    const { container } = render(bodyContent)

    // Check that all components are present in the DOM
    const header = container.querySelector('header')
    const main = container.querySelector('[data-testid="test-child"]')
    const footer = container.querySelector('footer')

    expect(header).toBeInTheDocument()
    expect(main).toBeInTheDocument()
    expect(footer).toBeInTheDocument()

    // Verify ordering (header before main before footer)
    const allElements = Array.from(
      container.querySelectorAll('header, [data-testid="test-child"], footer')
    )
    expect(allElements[0]?.tagName.toLowerCase()).toBe('header')
    expect(allElements[2]?.tagName.toLowerCase()).toBe('footer')
  })
})

describe('generateMetadata', () => {
  it('returns metadata with title and description from translations', async () => {
    const metadata = await generateMetadata()

    expect(metadata).toEqual({
      title: 'layout.title',
      description: 'layout.description',
    })
  })

  it('calls getTranslations with layout namespace', async () => {
    const { getTranslations } = await import('next-intl/server')

    await generateMetadata()

    expect(getTranslations).toHaveBeenCalledWith('layout')
  })
})
