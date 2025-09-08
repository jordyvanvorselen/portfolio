import { renderHook, act } from '@testing-library/react'
import { useLanguageSwitch } from '@/hooks/useLanguageSwitch'

// Mock next-intl locally for this test file
const mockUseLocale = jest.fn()
jest.mock('next-intl', () => ({
  useLocale: () => mockUseLocale(),
}))

// Mock cookies-next/client - the global mock should work but we'll reference it
import { setCookie } from 'cookies-next/client'
const mockSetCookie = setCookie as jest.MockedFunction<typeof setCookie>

// Mock next/navigation with a stable refresh function
const mockRefresh = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: mockRefresh,
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
}))

describe('useLanguageSwitch', () => {
  beforeEach(() => {
    jest.clearAllMocks()
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

    expect(mockSetCookie).toHaveBeenCalledWith('locale', 'nl', {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      secure: false, // NODE_ENV is test, not production
      sameSite: 'lax',
    })
    expect(mockRefresh).toHaveBeenCalledTimes(1)
  })

  it('switches language from Dutch to English', () => {
    mockUseLocale.mockReturnValue('nl')

    const { result } = renderHook(() => useLanguageSwitch())

    act(() => {
      result.current.switchLanguage()
    })

    expect(mockSetCookie).toHaveBeenCalledWith('locale', 'en', {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      secure: false, // NODE_ENV is test, not production
      sameSite: 'lax',
    })
    expect(mockRefresh).toHaveBeenCalledTimes(1)
  })

  it('sets secure cookie in production environment', () => {
    const originalNodeEnv = process.env.NODE_ENV
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'production',
      configurable: true,
    })
    mockUseLocale.mockReturnValue('en')

    const { result } = renderHook(() => useLanguageSwitch())

    act(() => {
      result.current.switchLanguage()
    })

    expect(mockSetCookie).toHaveBeenCalledWith('locale', 'nl', {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      secure: true, // Should be true in production
      sameSite: 'lax',
    })

    // Restore original NODE_ENV
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalNodeEnv,
      configurable: true,
    })
  })
})
