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
      screen.getByRole('heading', { name: 'footer.author.name' })
    ).toBeVisible()
    expect(screen.getByText('footer.author.description')).toBeVisible()
    expect(screen.getByText('footer.author.location')).toBeVisible()
    expect(screen.getByText('footer.author.email')).toBeVisible()
  })

  it('displays quick links section', () => {
    render(<Footer />)

    expect(
      screen.getByRole('heading', { name: 'footer.quickLinks' })
    ).toBeVisible()
    expect(screen.getByRole('link', { name: 'navigation.home' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'navigation.blog' })).toBeVisible()
    expect(
      screen.getByRole('link', { name: 'navigation.projects' })
    ).toBeVisible()
    expect(
      screen.getByRole('link', { name: 'navigation.experience' })
    ).toBeVisible()
    expect(
      screen.getByRole('link', { name: 'navigation.contact' })
    ).toBeVisible()
  })

  it('displays connect section with social links', () => {
    render(<Footer />)

    expect(
      screen.getByRole('heading', { name: 'footer.connect' })
    ).toBeVisible()

    // Check that social links exist (both mobile and desktop versions)
    const githubLinks = screen.getAllByRole('link', { name: 'social.github' })
    const linkedinLinks = screen.getAllByRole('link', {
      name: 'social.linkedin',
    })
    const emailLinks = screen.getAllByRole('link', { name: 'social.email' })

    expect(githubLinks.length).toBeGreaterThan(0)
    expect(linkedinLinks.length).toBeGreaterThan(0)
    expect(emailLinks.length).toBeGreaterThan(0)

    expect(
      screen.getByRole('link', { name: 'footer.getInTouch' })
    ).toBeVisible()
  })

  it('displays footer bottom section', () => {
    render(<Footer />)

    expect(screen.getByText('footer.copyright')).toBeVisible()
    expect(screen.getByText('footer.coffeeText')).toBeVisible()
    expect(screen.getByText('footer.availability')).toBeVisible()
    expect(screen.getByRole('button', { name: 'ui.backToTop' })).toBeVisible()
  })
})
