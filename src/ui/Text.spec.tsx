import { render, screen } from '@testing-library/react'

import { Text } from '@/ui/Text'

describe('Text', () => {
  it('renders text content', () => {
    render(<Text>Sample text content</Text>)

    expect(screen.getByText('Sample text content')).toBeVisible()
  })

  it('renders as paragraph by default', () => {
    render(<Text>Sample text</Text>)

    const textElement = screen.getByText('Sample text')
    expect(textElement.tagName).toBe('P')
  })

  it('accepts different variants', () => {
    render(<Text variant="description">Description text</Text>)

    expect(screen.getByText('Description text')).toBeVisible()
  })

  it('accepts card-description variant', () => {
    render(<Text variant="card-description">Card description text</Text>)

    expect(screen.getByText('Card description text')).toBeVisible()
  })

  it('accepts custom className', () => {
    render(<Text className="custom-class">Text</Text>)

    const textElement = screen.getByText('Text')
    expect(textElement).toHaveClass('custom-class')
  })

  it('accepts footer-description variant', () => {
    render(<Text variant="footer-description">Footer description text</Text>)

    expect(screen.getByText('Footer description text')).toBeVisible()
  })

  it('accepts footer-info variant', () => {
    render(<Text variant="footer-info">Footer info text</Text>)

    expect(screen.getByText('Footer info text')).toBeVisible()
  })

  it('accepts footer-copyright variant', () => {
    render(<Text variant="footer-copyright">Footer copyright text</Text>)

    expect(screen.getByText('Footer copyright text')).toBeVisible()
  })

  it('accepts footer-availability variant', () => {
    render(
      <Text variant="footer-availability">
        Available for remote opportunities
      </Text>
    )

    expect(screen.getByText('Available for remote opportunities')).toBeVisible()
  })

  it('accepts projects-hero-description variant', () => {
    render(
      <Text variant="projects-hero-description">
        Crafting innovative solutions and contributing to the developer
        community
      </Text>
    )

    expect(
      screen.getByText(
        'Crafting innovative solutions and contributing to the developer community'
      )
    ).toBeVisible()
  })
})
