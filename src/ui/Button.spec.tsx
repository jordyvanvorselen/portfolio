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

  it('accepts cta variant', () => {
    render(<Button variant="cta">Get In Touch</Button>)

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

  it('renders as external link for mailto URLs', () => {
    render(
      <Button href="mailto:test@example.com" variant="cta">
        Get In Touch
      </Button>
    )

    const link = screen.getByRole('link', { name: 'Get In Touch' })
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', 'mailto:test@example.com')
  })

  it('renders as external link for https URLs', () => {
    render(
      <Button href="https://example.com" variant="cta">
        External Link
      </Button>
    )

    const link = screen.getByRole('link', { name: 'External Link' })
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', 'https://example.com')
  })

  it('renders as Next.js Link for internal routes', () => {
    render(
      <Button href="/contact" variant="cta">
        Contact Page
      </Button>
    )

    const link = screen.getByRole('link', { name: 'Contact Page' })
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('renders as Next.js Link for anchor links', () => {
    render(
      <Button href="#section" variant="cta">
        Jump to Section
      </Button>
    )

    const link = screen.getByRole('link', { name: 'Jump to Section' })
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', '#section')
  })

  it('accepts project-primary variant', () => {
    render(<Button variant="project-primary">View Source</Button>)

    expect(screen.getByRole('button', { name: 'View Source' })).toBeVisible()
  })

  it('accepts project-secondary variant', () => {
    render(<Button variant="project-secondary">Live Demo</Button>)

    expect(screen.getByRole('button', { name: 'Live Demo' })).toBeVisible()
  })

  it('filters undefined optional properties for internal links', () => {
    render(
      <Button
        href="/contact"
        variant="cta"
        onMouseEnter={undefined}
        onClick={undefined}
      >
        Contact Page
      </Button>
    )

    const link = screen.getByRole('link', { name: 'Contact Page' })
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', '/contact')
  })
})
