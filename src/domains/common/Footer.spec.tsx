import { render, screen } from '@testing-library/react'

import { Footer } from '@/domains/common/Footer'

describe('Footer', () => {
  it('renders footer as contentinfo landmark', () => {
    render(<Footer />)

    expect(screen.getByRole('contentinfo')).toBeVisible()
  })

  it('displays author information', () => {
    render(<Footer />)

    expect(
      screen.getByRole('heading', { name: 'Jordy van Vorselen' })
    ).toBeVisible()
    expect(
      screen.getByText(/Senior Software Engineer passionate about building/)
    ).toBeVisible()
    expect(
      screen.getByText('📍 Noord-Brabant, the Netherlands 🇳🇱')
    ).toBeVisible()
    expect(screen.getByText('✉️ jordyvanvorselen@gmail.com')).toBeVisible()
  })

  it('displays quick links section', () => {
    render(<Footer />)

    expect(screen.getByRole('heading', { name: 'Quick Links' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Home' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Blog' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Projects' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Experience' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeVisible()
  })

  it('displays connect section with social links', () => {
    render(<Footer />)

    expect(screen.getByRole('heading', { name: "Let's Connect" })).toBeVisible()

    // Check that social links exist (both mobile and desktop versions)
    const githubLinks = screen.getAllByRole('link', { name: 'GitHub' })
    const linkedinLinks = screen.getAllByRole('link', { name: 'LinkedIn' })
    const emailLinks = screen.getAllByRole('link', { name: 'Email' })

    expect(githubLinks.length).toBeGreaterThan(0)
    expect(linkedinLinks.length).toBeGreaterThan(0)
    expect(emailLinks.length).toBeGreaterThan(0)

    expect(screen.getByRole('link', { name: /Get In Touch/ })).toBeVisible()
  })

  it('displays footer bottom section', () => {
    render(<Footer />)

    expect(screen.getByText(/© 2025 Jordy van Vorselen/)).toBeVisible()
    expect(screen.getByText('Available for remote opportunities')).toBeVisible()
    expect(screen.getByRole('button', { name: /Back to top/ })).toBeVisible()
  })
})
