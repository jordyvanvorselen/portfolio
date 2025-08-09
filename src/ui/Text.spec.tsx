import { render, screen } from '@testing-library/react'

import { Text } from './Text'

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

  it('accepts custom className', () => {
    render(<Text className="custom-class">Text</Text>)

    const textElement = screen.getByText('Text')
    expect(textElement).toHaveClass('custom-class')
  })
})
