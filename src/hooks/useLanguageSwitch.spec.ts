import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import { useLanguageSwitch } from '@/hooks/useLanguageSwitch'

// Mock next-intl
const mockUseLocale = vi.fn()
vi.mock('next-intl', () => ({
  useLocale: () => mockUseLocale(),
}))

// Mock next/navigation for useParams
const mockUseParams = vi.fn()
vi.mock('next/navigation', () => ({
  ...vi.importActual('next/navigation'),
  useParams: () => mockUseParams(),
}))

// Create mocks for specific functions we want to spy on
const mockReplace = vi.fn()
const mockRefresh = vi.fn()

// Override the global mocks for this specific test
vi.mock('@/i18n/navigation', () => ({
  usePathname: () => '/current-path',
  useRouter: () => ({
    replace: mockReplace,
    refresh: mockRefresh,
  }),
  Link: ({ children }: { children: React.ReactNode }) => children,
  getPathname: vi.fn(),
  redirect: vi.fn(),
}))

describe('useLanguageSwitch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseParams.mockReturnValue({})
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

    expect(mockReplace).toHaveBeenCalledWith(
      { pathname: '/current-path', params: {} },
      { locale: 'nl' }
    )
    expect(mockRefresh).toHaveBeenCalledTimes(1)
  })

  it('switches language from Dutch to English', () => {
    mockUseLocale.mockReturnValue('nl')

    const { result } = renderHook(() => useLanguageSwitch())

    act(() => {
      result.current.switchLanguage()
    })

    expect(mockReplace).toHaveBeenCalledWith(
      { pathname: '/current-path', params: {} },
      { locale: 'en' }
    )
    expect(mockRefresh).toHaveBeenCalledTimes(1)
  })

  it('switches language with params', () => {
    mockUseLocale.mockReturnValue('en')
    mockUseParams.mockReturnValue({ slug: 'test-post' })

    const { result } = renderHook(() => useLanguageSwitch())

    act(() => {
      result.current.switchLanguage()
    })

    expect(mockReplace).toHaveBeenCalledWith(
      { pathname: '/current-path', params: { slug: 'test-post' } },
      { locale: 'nl' }
    )
    expect(mockRefresh).toHaveBeenCalledTimes(1)
  })
})
