import { render, screen } from '@testing-library/react'

import { Skeleton } from '@/ui/Skeleton'

describe('Skeleton', () => {
  it('is hidden from screen readers because it only shows that content is on its way', () => {
    render(<Skeleton />)

    expect(screen.getByTestId('skeleton')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
  })

  it('pulses to show that content is loading', () => {
    render(<Skeleton />)

    expect(screen.getByTestId('skeleton')).toHaveClass('animate-pulse')
  })

  it('takes its size from the className', () => {
    render(<Skeleton className="h-4 w-32" />)

    expect(screen.getByTestId('skeleton')).toHaveClass('h-4', 'w-32')
  })

  it('has slightly rounded corners by default', () => {
    render(<Skeleton />)

    expect(screen.getByTestId('skeleton')).toHaveClass('rounded-md')
  })

  describe.each([
    ['none', 'rounded-none'],
    ['lg', 'rounded-lg'],
    ['xl', 'rounded-xl'],
    ['2xl', 'rounded-2xl'],
    ['full', 'rounded-full'],
  ] as const)('rounded prop: %s', (rounded, roundedClass) => {
    it(`uses ${roundedClass} without the default rounding`, () => {
      render(<Skeleton rounded={rounded} />)

      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass(roundedClass)
      expect(skeleton).not.toHaveClass('rounded-md')
    })
  })
})
