import { render, screen } from '@testing-library/react'
import { StatusBadge } from '@/ui/StatusBadge'

describe('StatusBadge', () => {
  it('renders children correctly', () => {
    render(<StatusBadge>Active</StatusBadge>)

    expect(screen.getByText('Active')).toBeVisible()
  })

  it('applies default active variant classes', () => {
    const { container } = render(<StatusBadge>Active</StatusBadge>)

    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveClass(
      'bg-green-500/20',
      'text-green-400',
      'border-green-500/30'
    )
  })

  it('applies maintained variant classes', () => {
    const { container } = render(
      <StatusBadge variant="maintained">Maintained</StatusBadge>
    )

    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveClass(
      'bg-blue-500/20',
      'text-blue-400',
      'border-blue-500/30'
    )
  })

  it('applies featured variant classes', () => {
    const { container } = render(
      <StatusBadge variant="featured">Featured</StatusBadge>
    )

    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveClass(
      'bg-teal-500/20',
      'text-teal-400',
      'border-teal-500/30'
    )
  })

  it('applies archived variant classes', () => {
    const { container } = render(
      <StatusBadge variant="archived">Archived</StatusBadge>
    )

    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveClass(
      'bg-gray-500/20',
      'text-gray-400',
      'border-gray-500/30'
    )
  })

  it('applies base classes to all variants', () => {
    const { container } = render(<StatusBadge>Test</StatusBadge>)

    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveClass(
      'backdrop-blur-sm',
      'px-3',
      'py-1',
      'rounded-full',
      'text-xs',
      'font-medium',
      'border'
    )
  })

  it('applies custom className', () => {
    const { container } = render(
      <StatusBadge className="custom-class">Test</StatusBadge>
    )

    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveClass('custom-class')
  })
})
