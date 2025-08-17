import { render, screen } from '@testing-library/react'

import { Card } from '@/ui/Card'

describe('Card', () => {
  it('renders with correct accessibility role', () => {
    render(
      <Card>
        <div>Content</div>
      </Card>
    )

    expect(screen.getByRole('article')).toBeVisible()
  })

  it('renders children content', () => {
    render(
      <Card>
        <div>Test Content</div>
      </Card>
    )

    expect(screen.getByText('Test Content')).toBeVisible()
  })

  it('applies aria-label when provided', () => {
    render(
      <Card aria-label="Test card">
        <div>Content</div>
      </Card>
    )

    expect(screen.getByRole('article')).toHaveAccessibleName('Test card')
  })

  it('applies glass variant styling by default', () => {
    render(
      <Card>
        <div>Content</div>
      </Card>
    )

    const article = screen.getByRole('article')
    expect(article).toHaveClass('bg-gray-900/50')
    expect(article).toHaveClass('backdrop-blur-sm')
    expect(article).toHaveClass('border-gray-800')
    expect(screen.getByText('Content')).toBeVisible()
  })

  it('applies default padding and styling', () => {
    render(
      <Card>
        <div>Content</div>
      </Card>
    )

    const article = screen.getByRole('article')
    expect(article).toHaveClass('rounded-xl')
    expect(article).toHaveClass('group')
    expect(article).toHaveClass('relative')
    expect(article).toHaveClass('overflow-hidden')
    expect(screen.getByText('Content')).toBeVisible()
  })

  it('applies hover effects', () => {
    render(
      <Card>
        <div>Content</div>
      </Card>
    )

    const article = screen.getByRole('article')
    expect(article).toHaveClass('hover:border-gray-700')
    expect(article).toHaveClass('hover:transform')
    expect(article).toHaveClass('hover:scale-[1.02]')
    expect(screen.getByText('Content')).toBeVisible()
  })

  it('accepts custom className prop', () => {
    render(
      <Card className="custom-class">
        <div>Content</div>
      </Card>
    )

    expect(screen.getByText('Content')).toBeVisible()
  })

  it('renders complex children content', () => {
    render(
      <Card>
        <div>
          <h2>Title</h2>
          <p>Description</p>
          <button>Action</button>
        </div>
      </Card>
    )

    expect(screen.getByText('Title')).toBeVisible()
    expect(screen.getByText('Description')).toBeVisible()
    expect(screen.getByText('Action')).toBeVisible()
  })
})
