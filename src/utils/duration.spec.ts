import { calculateDuration } from '@/utils/duration'

describe('calculateDuration', () => {
  it('calculates years and months for English locale', () => {
    const result = calculateDuration('2024-01-01', 'en', new Date('2025-09-01'))

    expect(result).toBe('1 year 8 months')
  })

  it('calculates years and months for Dutch locale', () => {
    const result = calculateDuration('2024-01-01', 'nl', new Date('2025-09-01'))

    expect(result).toBe('1 jaar 8 maanden')
  })

  it('handles plural years', () => {
    const result = calculateDuration('2022-01-01', 'en', new Date('2025-04-01'))

    expect(result).toBe('3 years 3 months')
  })

  it('handles singular month', () => {
    const result = calculateDuration('2025-01-01', 'en', new Date('2025-02-01'))

    expect(result).toBe('1 month')
  })

  it('handles only years with no remaining months', () => {
    const result = calculateDuration('2023-01-01', 'en', new Date('2025-01-01'))

    expect(result).toBe('2 years')
  })

  it('handles singular year with no remaining months', () => {
    const result = calculateDuration('2024-01-01', 'en', new Date('2025-01-01'))

    expect(result).toBe('1 year')
  })

  it('handles Dutch singular month', () => {
    const result = calculateDuration('2025-01-01', 'nl', new Date('2025-02-01'))

    expect(result).toBe('1 maand')
  })

  it('handles Dutch plural years with no months', () => {
    const result = calculateDuration('2022-06-01', 'nl', new Date('2025-06-01'))

    expect(result).toBe('3 jaar')
  })

  it('handles month wraparound when current month is before start month', () => {
    const result = calculateDuration('2024-06-01', 'en', new Date('2025-02-01'))

    expect(result).toBe('8 months')
  })

  it('falls back to English for unsupported locales', () => {
    const result = calculateDuration('2024-01-01', 'fr', new Date('2025-09-01'))

    expect(result).toBe('1 year 8 months')
  })
})
