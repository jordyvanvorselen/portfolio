import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import { useLanguageSwitch } from '@/hooks/useLanguageSwitch'

// Mock next-intl
const mockUseLocale = vi.fn()
vi.mock('next-intl', () => ({
  useLocale: () => mockUseLocale(),
}))

// Mock cookies-next
const mockSetCookie = vi.fn()
vi.mock('cookies-next', () => ({
  setCookie: (...args: unknown[]) => mockSetCookie(...args),
}))

// Mock next/navigation
const mockRefresh = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}))

describe('useLanguageSwitch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns current locale and target locale for English', () => {
    mockUseLocale.mockReturnValue('en')

    const { result } = renderHook(() => useLanguageSwitch())

    expect(result.current.currentLocale).toBe('en')
    expect(result.current.targetLocale).toBe('nl')
    expect(result.current.availableLocales).toEqual(['en', 'nl'])
  })

  it('returns current locale and target locale for Dutch', () => {
    mockUseLocale.mockReturnValue('nl')

    const { result } = renderHook(() => useLanguageSwitch())

    expect(result.current.currentLocale).toBe('nl')
    expect(result.current.targetLocale).toBe('en')
    expect(result.current.availableLocales).toEqual(['en', 'nl'])
  })

  it('switches language from English to Dutch', () => {
    mockUseLocale.mockReturnValue('en')

    const { result } = renderHook(() => useLanguageSwitch())

    act(() => {
      result.current.switchLanguage()
    })

    expect(mockSetCookie).toHaveBeenCalledWith('NEXT_LOCALE', 'nl', {
      maxAge: 31536000, // 1 year in seconds
      path: '/',
    })
    expect(mockRefresh).toHaveBeenCalledTimes(1)
  })

  it('switches language from Dutch to English', () => {
    mockUseLocale.mockReturnValue('nl')

    const { result } = renderHook(() => useLanguageSwitch())

    act(() => {
      result.current.switchLanguage()
    })

    expect(mockSetCookie).toHaveBeenCalledWith('NEXT_LOCALE', 'en', {
      maxAge: 31536000, // 1 year in seconds
      path: '/',
    })
    expect(mockRefresh).toHaveBeenCalledTimes(1)
  })
})
