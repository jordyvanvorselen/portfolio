import { render } from '@testing-library/react'
import { TimelineDot } from '@/ui/TimelineDot'

describe('TimelineDot', () => {
  it('renders with default teal color', () => {
    const { container } = render(<TimelineDot />)
    const dot = container.firstChild as HTMLElement

    expect(dot).toHaveClass(
      'bg-teal-500',
      'ring-gray-950',
      'shadow-teal-500/50'
    )
  })

  it('renders with purple color', () => {
    const { container } = render(<TimelineDot color="purple" />)
    const dot = container.firstChild as HTMLElement

    expect(dot).toHaveClass(
      'bg-purple-500',
      'ring-gray-950',
      'shadow-purple-500/50'
    )
  })

  it('renders with amber color', () => {
    const { container } = render(<TimelineDot color="amber" />)
    const dot = container.firstChild as HTMLElement

    expect(dot).toHaveClass(
      'bg-amber-500',
      'ring-gray-950',
      'shadow-amber-500/50'
    )
  })

  it('renders with pink color', () => {
    const { container } = render(<TimelineDot color="pink" />)
    const dot = container.firstChild as HTMLElement

    expect(dot).toHaveClass(
      'bg-pink-500',
      'ring-gray-950',
      'shadow-pink-500/50'
    )
  })

  it('applies custom className', () => {
    const { container } = render(<TimelineDot className="custom-class" />)
    const dot = container.firstChild as HTMLElement

    expect(dot).toHaveClass('custom-class')
  })

  it('applies base styles', () => {
    const { container } = render(<TimelineDot />)
    const dot = container.firstChild as HTMLElement

    expect(dot).toHaveClass('w-3', 'h-3', 'rounded-full', 'ring-4', 'shadow-lg')
  })
})
