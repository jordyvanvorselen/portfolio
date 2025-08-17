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

  describe.each(['elevated', 'outlined', 'filled', 'glass'] as const)(
    'variant prop: %s',
    variant => {
      it(`renders with ${variant} variant`, () => {
        render(
          <Card variant={variant}>
            <div>Content</div>
          </Card>
        )
        expect(screen.getByText('Content')).toBeVisible()
      })
    }
  )

  describe.each(['none', 'sm', 'md', 'lg', 'xl'] as const)(
    'padding prop: %s',
    padding => {
      it(`renders with ${padding} padding`, () => {
        render(
          <Card padding={padding}>
            <div>Content</div>
          </Card>
        )
        expect(screen.getByText('Content')).toBeVisible()
      })
    }
  )

  describe.each(['static', 'hover', 'clickable'] as const)(
    'interactive prop: %s',
    interactive => {
      it(`renders with ${interactive} interactive`, () => {
        render(
          <Card interactive={interactive}>
            <div>Content</div>
          </Card>
        )
        expect(screen.getByText('Content')).toBeVisible()
      })
    }
  )

  describe.each(['none', 'sm', 'md', 'lg', 'xl'] as const)(
    'borderRadius prop: %s',
    borderRadius => {
      it(`renders with ${borderRadius} borderRadius`, () => {
        render(
          <Card borderRadius={borderRadius}>
            <div>Content</div>
          </Card>
        )
        expect(screen.getByText('Content')).toBeVisible()
      })
    }
  )

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
