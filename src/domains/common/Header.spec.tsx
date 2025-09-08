import { render, screen } from '@testing-library/react'
import { Header } from '@/domains/common/Header'

describe(Header, () => {
  it('renders branding link with correct text', () => {
    render(<Header />)

    const brandingLink = screen.getByRole('link', {
      name: 'layout.brandName',
    })
    expect(brandingLink).toBeVisible()
  })

  it('renders home navigation link', () => {
    render(<Header />)

    const homeLinks = screen.getAllByRole('link', { name: 'navigation.home' })
    expect(homeLinks.length).toBeGreaterThan(0)
    homeLinks.forEach(link => expect(link).toBeVisible())
  })

  it('renders blog navigation link', () => {
    render(<Header />)

    const blogLinks = screen.getAllByRole('link', { name: 'navigation.blog' })
    expect(blogLinks.length).toBeGreaterThan(0)
    blogLinks.forEach(link => expect(link).toBeVisible())
  })

  it('renders projects navigation link', () => {
    render(<Header />)

    const projectsLinks = screen.getAllByRole('link', {
      name: 'navigation.projects',
    })
    expect(projectsLinks.length).toBeGreaterThan(0)
    projectsLinks.forEach(link => expect(link).toBeVisible())
  })

  it('renders experience navigation link', () => {
    render(<Header />)

    const experienceLinks = screen.getAllByRole('link', {
      name: 'navigation.experience',
    })
    expect(experienceLinks.length).toBeGreaterThan(0)
    experienceLinks.forEach(link => expect(link).toBeVisible())
  })

  it('renders contact navigation link', () => {
    render(<Header />)

    const contactLinks = screen.getAllByRole('link', {
      name: 'navigation.contact',
    })
    expect(contactLinks.length).toBeGreaterThan(0)
    contactLinks.forEach(link => expect(link).toBeVisible())
  })

  it('renders availability status', () => {
    render(<Header />)

    expect(screen.getByText('navigation.available')).toBeVisible()
  })

  it('renders availability icon', () => {
    render(<Header />)

    // Check for the CircleCheckBig icon by looking within the availability text context
    const availabilityText = screen.getByText('navigation.available')
    expect(availabilityText).toBeVisible()

    // The icon should be present within the same address container
    const addressSection = availabilityText.closest('address')
    expect(addressSection).toBeInTheDocument()
  })

  it('renders github social link', () => {
    render(<Header />)

    const githubLink = screen.getByRole('link', { name: 'social.github' })
    expect(githubLink).toBeVisible()
  })

  it('renders linkedin social link', () => {
    render(<Header />)

    const linkedinLink = screen.getByRole('link', { name: 'social.linkedin' })
    expect(linkedinLink).toBeVisible()
  })

  it('branding link has correct href', () => {
    render(<Header />)

    const brandingLink = screen.getByRole('link', {
      name: 'layout.brandName',
    })
    expect(brandingLink).toHaveAttribute('href', '/')
  })

  it('navigation links have correct href attributes', () => {
    render(<Header />)

    const homeLinks = screen.getAllByRole('link', { name: 'navigation.home' })
    const blogLinks = screen.getAllByRole('link', { name: 'navigation.blog' })
    const projectsLinks = screen.getAllByRole('link', {
      name: 'navigation.projects',
    })
    const experienceLinks = screen.getAllByRole('link', {
      name: 'navigation.experience',
    })
    const contactLinks = screen.getAllByRole('link', {
      name: 'navigation.contact',
    })

    homeLinks.forEach(link => expect(link).toHaveAttribute('href', '/'))
    blogLinks.forEach(link => expect(link).toHaveAttribute('href', '/blog'))
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

    expect(screen.getByRole('link', { name: 'social.github' })).toHaveAttribute(
      'href',
      'https://github.com/jordyvanvorselen'
    )
    expect(
      screen.getByRole('link', { name: 'social.linkedin' })
    ).toHaveAttribute('href', 'https://linkedin.com/in/jordy-van-vorselen')
  })

  it('external links have security attributes', () => {
    render(<Header />)

    const githubLink = screen.getByRole('link', { name: 'social.github' })
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')

    const linkedinLink = screen.getByRole('link', { name: 'social.linkedin' })
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
