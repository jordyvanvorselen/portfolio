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
    
    const aboutLink = screen.getByRole('link', { name: 'About' })
    expect(aboutLink).toBeVisible()
  })

  it('renders expertise navigation link', () => {
    render(<Header />)
    
    const expertiseLink = screen.getByRole('link', { name: 'Expertise' })
    expect(expertiseLink).toBeVisible()
  })

  it('renders projects navigation link', () => {
    render(<Header />)
    
    const projectsLink = screen.getByRole('link', { name: 'Projects' })
    expect(projectsLink).toBeVisible()
  })

  it('renders experience navigation link', () => {
    render(<Header />)
    
    const experienceLink = screen.getByRole('link', { name: 'Experience' })
    expect(experienceLink).toBeVisible()
  })

  it('renders contact navigation link', () => {
    render(<Header />)
    
    const contactLink = screen.getByRole('link', { name: 'Contact' })
    expect(contactLink).toBeVisible()
  })

  it('renders hire me button', () => {
    render(<Header />)
    
    const hireMeButton = screen.getByRole('button', { name: 'Hire Me' })
    expect(hireMeButton).toBeVisible()
  })
})
