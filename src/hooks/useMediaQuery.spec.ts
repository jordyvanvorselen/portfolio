import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import { useMediaQuery } from '@/hooks/useMediaQuery'

// Mock matchMedia
const mockMatchMedia = (matches: boolean) => {
  const mockMediaQueryList = {
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn(() => mockMediaQueryList),
  })

  return mockMediaQueryList
}

describe('useMediaQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns initial matches value when media query matches', () => {
    const mockMediaQueryList = mockMatchMedia(true)

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))

    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 768px)')
    expect(result.current).toBe(true)
    expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    )
  })

  it('returns initial matches value when media query does not match', () => {
    const mockMediaQueryList = mockMatchMedia(false)

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))

    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 768px)')
    expect(result.current).toBe(false)
    expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    )
  })

  it('updates matches value when media query changes', () => {
    const mockMediaQueryList = mockMatchMedia(false)

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))

    expect(result.current).toBe(false)

    // Simulate media query change
    const changeHandler = mockMediaQueryList.addEventListener.mock.calls[0][1]

    act(() => {
      changeHandler({ matches: true })
    })

    expect(result.current).toBe(true)
  })

  it('removes event listener on unmount', () => {
    const mockMediaQueryList = mockMatchMedia(true)

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'))

    const changeHandler = mockMediaQueryList.addEventListener.mock.calls[0][1]

    unmount()

    expect(mockMediaQueryList.removeEventListener).toHaveBeenCalledWith(
      'change',
      changeHandler
    )
  })

  it('handles different media queries correctly', () => {
    mockMatchMedia(true)

    const { result: result1 } = renderHook(() =>
      useMediaQuery('(max-width: 640px)')
    )
    const { result: result2 } = renderHook(() =>
      useMediaQuery('(min-width: 1024px)')
    )

    expect(window.matchMedia).toHaveBeenCalledWith('(max-width: 640px)')
    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 1024px)')
    expect(result1.current).toBe(true)
    expect(result2.current).toBe(true)
  })

  it('re-registers listener when query changes', () => {
    const mockMediaQueryList1 = mockMatchMedia(true)

    const { rerender } = renderHook(({ query }) => useMediaQuery(query), {
      initialProps: { query: '(min-width: 768px)' },
    })

    expect(mockMediaQueryList1.addEventListener).toHaveBeenCalledTimes(1)

    const mockMediaQueryList2 = mockMatchMedia(false)

    rerender({ query: '(max-width: 640px)' })

    expect(mockMediaQueryList1.removeEventListener).toHaveBeenCalledTimes(1)
    expect(mockMediaQueryList2.addEventListener).toHaveBeenCalledTimes(1)
  })
})
