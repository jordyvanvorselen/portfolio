import { render, screen } from '@testing-library/react'

import { Button } from '@/ui/Button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByRole('button', { name: 'Click me' })).toBeVisible()
  })

  it('accepts primary variant', () => {
    render(<Button variant="primary">Primary Button</Button>)

    expect(screen.getByRole('button', { name: 'Primary Button' })).toBeVisible()
  })

  it('accepts secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>)

    expect(
      screen.getByRole('button', { name: 'Secondary Button' })
    ).toBeVisible()
  })

  it('accepts footer-cta variant', () => {
    render(<Button variant="footer-cta">Get In Touch</Button>)

    expect(screen.getByRole('button', { name: 'Get In Touch' })).toBeVisible()
  })

  it('accepts footer-action variant', () => {
    render(<Button variant="footer-action">Back to top</Button>)

    expect(screen.getByRole('button', { name: 'Back to top' })).toBeVisible()
  })

  it('accepts different sizes', () => {
    render(<Button size="large">Large Button</Button>)

    expect(screen.getByRole('button', { name: 'Large Button' })).toBeVisible()
  })

  it('accepts custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>)

    const button = screen.getByRole('button', { name: 'Custom Button' })
    expect(button).toHaveClass('custom-class')
  })

  it('renders as link when href is provided', () => {
    render(
      <Button href="mailto:test@example.com" variant="footer-cta">
        Get In Touch
      </Button>
    )

    const link = screen.getByRole('link', { name: 'Get In Touch' })
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', 'mailto:test@example.com')
    expect(link).toHaveClass('bg-[#14b8a6]')
  })
})
