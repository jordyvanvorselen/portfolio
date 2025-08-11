import { render, screen } from '@testing-library/react'

import { Title } from '@/ui/Title'

describe('Title', () => {
  it('renders title with default variant', () => {
    render(<Title>Test Title</Title>)

    expect(screen.getByText('Test Title')).toBeVisible()
  })

  it('renders logo variant with correct styling', () => {
    render(<Title variant="logo">Jordy van Vorselen</Title>)

    const title = screen.getByText('Jordy van Vorselen')
    expect(title).toBeVisible()
  })

  it('renders hero-name variant as h1', () => {
    render(
      <Title variant="hero-name" as="h1">
        Jordy van Vorselen
      </Title>
    )

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Jordy van Vorselen',
    })
    expect(heading).toBeVisible()
  })

  it('renders hero-title variant as paragraph', () => {
    render(
      <Title variant="hero-title" as="p">
        Senior Software Engineer
      </Title>
    )

    expect(screen.getByText('Senior Software Engineer')).toBeVisible()
  })

  it('renders section-title variant as h2', () => {
    render(
      <Title variant="section-title" as="h2">
        What I Excel At
      </Title>
    )

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'What I Excel At',
    })
    expect(heading).toBeVisible()
  })

  it('renders subsection-label variant as h4', () => {
    render(<Title variant="subsection-label">KEY SKILLS & TOOLS</Title>)

    const heading = screen.getByRole('heading', {
      level: 4,
      name: 'KEY SKILLS & TOOLS',
    })
    expect(heading).toBeVisible()
  })

  it('renders card-title variant as h3', () => {
    render(<Title variant="card-title">Test-Driven Development</Title>)

    const heading = screen.getByRole('heading', {
      level: 3,
      name: 'Test-Driven Development',
    })
    expect(heading).toBeVisible()
  })

  it('accepts custom className', () => {
    render(<Title className="custom-class">Test</Title>)

    const title = screen.getByText('Test')
    expect(title).toHaveClass('custom-class')
  })

  it('renders with custom element type', () => {
    render(<Title as="h3">Custom Heading</Title>)

    const heading = screen.getByRole('heading', {
      level: 3,
      name: 'Custom Heading',
    })
    expect(heading).toBeVisible()
  })

  it('renders footer-author variant as h3', () => {
    render(<Title variant="footer-author">Jordy van Vorselen</Title>)

    const heading = screen.getByRole('heading', {
      level: 3,
      name: 'Jordy van Vorselen',
    })
    expect(heading).toBeVisible()
  })

  it('renders footer-section variant as h4', () => {
    render(<Title variant="footer-section">Quick Links</Title>)

    const heading = screen.getByRole('heading', {
      level: 4,
      name: 'Quick Links',
    })
    expect(heading).toBeVisible()
  })

  it('renders section-label-small variant as h3', () => {
    render(<Title variant="section-label-small">Featured article</Title>)

    const heading = screen.getByRole('heading', {
      level: 3,
      name: 'Featured article',
    })
    expect(heading).toBeVisible()
  })
})
