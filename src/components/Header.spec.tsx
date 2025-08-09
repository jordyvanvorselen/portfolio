import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe(Header, () => {
  it('renders branding link with correct text', () => {
    render(<Header />)

    const brandingLink = screen.getByRole('link', {
      name: 'Jordy van Vorselen',
    })
    expect(brandingLink).toBeVisible()
  })

  it('renders about navigation link', () => {
    render(<Header />)

    const aboutLinks = screen.getAllByRole('link', { name: 'About' })
    expect(aboutLinks.length).toBeGreaterThan(0)
    aboutLinks.forEach(link => expect(link).toBeVisible())
  })

  it('renders expertise navigation link', () => {
    render(<Header />)

    const expertiseLinks = screen.getAllByRole('link', { name: 'Expertise' })
    expect(expertiseLinks.length).toBeGreaterThan(0)
    expertiseLinks.forEach(link => expect(link).toBeVisible())
  })

  it('renders projects navigation link', () => {
    render(<Header />)

    const projectsLinks = screen.getAllByRole('link', { name: 'Projects' })
    expect(projectsLinks.length).toBeGreaterThan(0)
    projectsLinks.forEach(link => expect(link).toBeVisible())
  })

  it('renders experience navigation link', () => {
    render(<Header />)

    const experienceLinks = screen.getAllByRole('link', { name: 'Experience' })
    expect(experienceLinks.length).toBeGreaterThan(0)
    experienceLinks.forEach(link => expect(link).toBeVisible())
  })

  it('renders contact navigation link', () => {
    render(<Header />)

    const contactLinks = screen.getAllByRole('link', { name: 'Contact' })
    expect(contactLinks.length).toBeGreaterThan(0)
    contactLinks.forEach(link => expect(link).toBeVisible())
  })

  it('renders hire me button', () => {
    render(<Header />)

    const hireMeButton = screen.getByRole('button', { name: /hire/i })
    expect(hireMeButton).toBeVisible()
  })

  it('renders github social link', () => {
    render(<Header />)

    const githubLink = screen.getByRole('link', { name: 'GitHub' })
    expect(githubLink).toBeVisible()
  })

  it('renders linkedin social link', () => {
    render(<Header />)

    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' })
    expect(linkedinLink).toBeVisible()
  })

  it('branding link has correct href', () => {
    render(<Header />)

    const brandingLink = screen.getByRole('link', {
      name: 'Jordy van Vorselen',
    })
    expect(brandingLink).toHaveAttribute('href', '/')
  })

  it('navigation links have correct href attributes', () => {
    render(<Header />)

    const aboutLinks = screen.getAllByRole('link', { name: 'About' })
    const expertiseLinks = screen.getAllByRole('link', { name: 'Expertise' })
    const projectsLinks = screen.getAllByRole('link', { name: 'Projects' })
    const experienceLinks = screen.getAllByRole('link', { name: 'Experience' })
    const contactLinks = screen.getAllByRole('link', { name: 'Contact' })

    aboutLinks.forEach(link => expect(link).toHaveAttribute('href', '/about'))
    expertiseLinks.forEach(link =>
      expect(link).toHaveAttribute('href', '/expertise')
    )
    projectsLinks.forEach(link =>
      expect(link).toHaveAttribute('href', '/projects')
    )
    experienceLinks.forEach(link =>
      expect(link).toHaveAttribute('href', '/experience')
    )
    contactLinks.forEach(link =>
      expect(link).toHaveAttribute('href', '/contact')
    )
  })

  it('social links have correct href attributes', () => {
    render(<Header />)

    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/jordyvanvorselen'
    )
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/jordy-van-vorselen'
    )
  })

  it('external links have security attributes', () => {
    render(<Header />)

    const githubLink = screen.getByRole('link', { name: 'GitHub' })
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')

    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' })
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
