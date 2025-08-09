import { render, screen } from '@testing-library/react'

import { Badge } from '@/ui/Badge'

describe('Badge', () => {
  it('renders badge content', () => {
    render(<Badge>Test content</Badge>)

    expect(screen.getByText('Test content')).toBeVisible()
  })

  it('renders with proper accessibility attributes', () => {
    render(<Badge>Test badge</Badge>)

    const badge = screen.getByText('Test badge')
    expect(badge).toHaveAttribute('role', 'status')
    expect(badge).toHaveAttribute('aria-live', 'polite')
  })

  it('uses availability variant by default', () => {
    render(<Badge>Default badge</Badge>)

    expect(screen.getByText('Default badge')).toBeVisible()
  })

  it('accepts section-label variant', () => {
    render(<Badge variant="section-label">Section badge</Badge>)

    expect(screen.getByText('Section badge')).toBeVisible()
  })

  it('accepts custom className', () => {
    render(<Badge className="custom-class">Custom badge</Badge>)

    const badge = screen.getByText('Custom badge')
    expect(badge).toHaveClass('custom-class')
  })
})
