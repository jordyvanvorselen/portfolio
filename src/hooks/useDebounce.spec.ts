import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500))
    expect(result.current).toBe('initial')
  })

  it('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    )

    expect(result.current).toBe('initial')

    // Update the value
    rerender({ value: 'updated', delay: 500 })

    // Should still be the initial value immediately
    expect(result.current).toBe('initial')

    // After the delay, should have the new value
    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(result.current).toBe('updated')
  })

  it('cancels previous timeout when value changes quickly', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    )

    // First update
    rerender({ value: 'first', delay: 500 })
    
    // Advance time partially
    act(() => {
      vi.advanceTimersByTime(250)
    })

    // Second update before first timeout completes
    rerender({ value: 'second', delay: 500 })

    // Value should still be initial
    expect(result.current).toBe('initial')

    // Complete the second timeout
    act(() => {
      vi.advanceTimersByTime(500)
    })

    // Should have the second value, not the first
    expect(result.current).toBe('second')
  })

  it('handles delay of 0', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 0 } }
    )

    rerender({ value: 'immediate', delay: 0 })

    // With delay 0, should update immediately on next tick
    act(() => {
      vi.advanceTimersByTime(0)
    })

    expect(result.current).toBe('immediate')
  })

  it('works with different data types', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 123, delay: 300 } }
    )

    expect(result.current).toBe(123)

    rerender({ value: 456, delay: 300 })

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current).toBe(456)
  })

  it('cleans up timeout on unmount', () => {
    const { result, rerender, unmount } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    )

    rerender({ value: 'updated', delay: 500 })

    // Unmount before timeout completes
    unmount()

    // Advance time - this should not cause any issues
    act(() => {
      vi.advanceTimersByTime(500)
    })

    // No expectation here, just ensuring no errors occur
  })

  it('handles rapid successive updates', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    )

    // Rapid updates
    rerender({ value: 'update1', delay: 300 })
    rerender({ value: 'update2', delay: 300 })
    rerender({ value: 'update3', delay: 300 })
    rerender({ value: 'final', delay: 300 })

    // Should still be initial value
    expect(result.current).toBe('initial')

    // After delay, should have the final value
    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current).toBe('final')
  })
})