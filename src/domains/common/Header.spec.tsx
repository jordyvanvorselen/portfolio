import { render, screen, fireEvent, within } from '@testing-library/react'
import { Header } from '@/domains/common/Header'

describe(Header, () => {
  it('renders branding link with correct text', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    const brandingLink = within(header).getByRole('link', {
      name: 'layout.brandName',
    })
    expect(brandingLink).toBeVisible()
  })

  it('renders home navigation link', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    const homeLink = within(header).getByRole('link', {
      name: 'navigation.home',
    })
    expect(homeLink).toBeVisible()
  })

  it('renders blog navigation link', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    const blogLink = within(header).getByRole('link', {
      name: 'navigation.blog',
    })
    expect(blogLink).toBeVisible()
  })

  it('renders projects navigation link', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    const projectsLink = within(header).getByRole('link', {
      name: 'navigation.projects',
    })
    expect(projectsLink).toBeVisible()
  })

  it('renders experience navigation link', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    const experienceLink = within(header).getByRole('link', {
      name: 'navigation.experience',
    })
    expect(experienceLink).toBeVisible()
  })

  it('renders availability status', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    expect(within(header).getByText('navigation.available')).toBeVisible()
  })

  it('renders availability icon', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    // Check for the CircleCheckBig icon by looking within the availability text context
    const availabilityText = within(header).getByText('navigation.available')
    expect(availabilityText).toBeVisible()

    // The icon should be present within the same address container
    const addressSection = availabilityText.closest('address')
    expect(addressSection).toBeInTheDocument()
  })

  it('renders github social link', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    const githubLink = within(header).getByRole('link', {
      name: 'social.github',
    })
    expect(githubLink).toBeInTheDocument()
  })

  it('renders linkedin social link', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    const linkedinLink = within(header).getByRole('link', {
      name: 'social.linkedin',
    })
    expect(linkedinLink).toBeInTheDocument()
  })

  it('branding link has correct href', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    const brandingLink = within(header).getByRole('link', {
      name: 'layout.brandName',
    })
    expect(brandingLink).toHaveAttribute('href', '/')
  })

  it('navigation links have correct href attributes', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    const homeLink = within(header).getByRole('link', {
      name: 'navigation.home',
    })
    const blogLink = within(header).getByRole('link', {
      name: 'navigation.blog',
    })
    const projectsLink = within(header).getByRole('link', {
      name: 'navigation.projects',
    })
    const experienceLink = within(header).getByRole('link', {
      name: 'navigation.experience',
    })
    expect(homeLink).toHaveAttribute('href', '/')
    expect(blogLink).toHaveAttribute('href', '/blog')
    expect(projectsLink).toHaveAttribute('href', '/projects')
    expect(experienceLink).toHaveAttribute('href', '/experience')
  })

  it('social links have correct href attributes', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    const githubLink = within(header).getByRole('link', {
      name: 'social.github',
    })
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/jordyvanvorselen'
    )

    const linkedinLink = within(header).getByRole('link', {
      name: 'social.linkedin',
    })
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://linkedin.com/in/jordy-van-vorselen'
    )
  })

  it('external links have security attributes', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    const githubLink = within(header).getByRole('link', {
      name: 'social.github',
    })
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')

    const linkedinLink = within(header).getByRole('link', {
      name: 'social.linkedin',
    })
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders mobile menu button', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    const mobileMenuButton = within(header).getByRole('button', {
      name: 'Open navigation menu',
    })
    expect(mobileMenuButton).toBeVisible()
  })

  it('opens mobile menu when button is clicked', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    const mobileMenuButton = within(header).getByRole('button', {
      name: 'Open navigation menu',
    })
    fireEvent.click(mobileMenuButton)

    expect(screen.getByTestId('mobile-menu')).toBeVisible()
  })

  it('closes mobile menu when close handler is called', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    // Open the menu first
    const mobileMenuButton = within(header).getByRole('button', {
      name: 'Open navigation menu',
    })
    fireEvent.click(mobileMenuButton)
    expect(screen.getByTestId('mobile-menu')).toBeVisible()

    // Close the menu
    const closeButton = screen.getByRole('button', {
      name: 'Close navigation menu',
    })
    fireEvent.click(closeButton)

    const mobileMenu = screen.getByTestId('mobile-menu')
    expect(mobileMenu).toHaveClass(
      'translate-x-full',
      'opacity-0',
      'pointer-events-none'
    )
  })
})
