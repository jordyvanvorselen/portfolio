import { render, screen } from '@testing-library/react'

import { NavigationLink } from '@/ui/NavigationLink'

describe('NavigationLink', () => {
  it('renders navigation link with proper attributes', () => {
    render(<NavigationLink href="/about">About</NavigationLink>)

    const link = screen.getByRole('link', { name: 'About' })
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', '/about')
  })

  it('renders link content', () => {
    render(<NavigationLink href="/projects">Projects</NavigationLink>)

    expect(screen.getByText('Projects')).toBeVisible()
  })

  it('accepts desktop variant', () => {
    render(
      <NavigationLink href="/experience" variant="desktop">
        Experience
      </NavigationLink>
    )

    expect(screen.getByRole('link', { name: 'Experience' })).toBeVisible()
  })

  it('accepts mobile variant', () => {
    render(
      <NavigationLink href="/contact" variant="mobile">
        Contact
      </NavigationLink>
    )

    expect(screen.getByRole('link', { name: 'Contact' })).toBeVisible()
  })

  it('accepts custom className', () => {
    render(
      <NavigationLink href="/test" className="custom-class">
        Test
      </NavigationLink>
    )

    const link = screen.getByRole('link', { name: 'Test' })
    expect(link).toHaveClass('custom-class')
  })

  it('accepts footer variant', () => {
    render(
      <NavigationLink href="/footer-link" variant="footer">
        Footer Link
      </NavigationLink>
    )

    expect(screen.getByRole('link', { name: 'Footer Link' })).toBeVisible()
  })
})
