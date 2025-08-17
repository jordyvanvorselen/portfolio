import { render, screen } from '@testing-library/react'

import { Badge } from '@/ui/Badge'

describe('Badge', () => {
  it('renders badge content', () => {
    render(<Badge>Test content</Badge>)

    expect(screen.getByText('Test content')).toBeVisible()
  })

  it('renders with proper accessibility attributes', () => {
    render(<Badge>Test badge</Badge>)

    const badge = screen.getByText('Test badge')
    expect(badge).toHaveAttribute('role', 'status')
    expect(badge).toHaveAttribute('aria-live', 'polite')
  })

  it('renders with default props when none provided', () => {
    render(<Badge>Default badge</Badge>)

    const badge = screen.getByText('Default badge')
    expect(badge).toBeVisible()
  })

  describe.each(['solid', 'outline', 'soft'] as const)(
    'variant prop: %s',
    variant => {
      it(`renders with ${variant} variant`, () => {
        render(<Badge variant={variant}>Test badge</Badge>)
        expect(screen.getByText('Test badge')).toBeVisible()
      })
    }
  )

  describe.each([
    'default',
    'primary',
    'success',
    'warning',
    'danger',
    'info',
    'accent',
  ] as const)('color prop: %s', color => {
    it(`renders with ${color} color`, () => {
      render(<Badge color={color}>Test badge</Badge>)
      expect(screen.getByText('Test badge')).toBeVisible()
    })
  })

  describe.each(['sm', 'md', 'lg'] as const)('size prop: %s', size => {
    it(`renders with ${size} size`, () => {
      render(<Badge size={size}>Test badge</Badge>)
      expect(screen.getByText('Test badge')).toBeVisible()
    })
  })

  describe('rounded prop', () => {
    it('renders with rounded corners by default', () => {
      render(<Badge>Default rounded</Badge>)

      expect(screen.getByText('Default rounded')).toBeVisible()
    })

    it('renders with full rounded corners when rounded=true', () => {
      render(<Badge rounded>Fully rounded</Badge>)

      expect(screen.getByText('Fully rounded')).toBeVisible()
    })
  })

  describe('prop combinations', () => {
    it('renders solid primary large badge', () => {
      render(
        <Badge variant="solid" color="primary" size="lg">
          Solid Primary Large
        </Badge>
      )

      expect(screen.getByText('Solid Primary Large')).toBeVisible()
    })

    it('renders outline danger small rounded badge', () => {
      render(
        <Badge variant="outline" color="danger" size="sm" rounded>
          Outline Danger Small
        </Badge>
      )

      expect(screen.getByText('Outline Danger Small')).toBeVisible()
    })
  })

  it('accepts custom className prop', () => {
    render(<Badge className="custom-class">Custom badge</Badge>)

    expect(screen.getByText('Custom badge')).toBeVisible()
  })

  it('accepts custom style prop', () => {
    const customStyle = { animationDelay: '100ms' }
    render(<Badge style={customStyle}>Styled badge</Badge>)

    expect(screen.getByText('Styled badge')).toBeVisible()
  })

  describe.each([
    { weight: 'medium', label: 'Medium Weight' },
    { weight: 'semibold', label: 'Semibold Weight' },
  ] as const)('weight prop: $weight', ({ weight, label }) => {
    it(`renders with ${weight} weight prop`, () => {
      render(<Badge weight={weight}>{label}</Badge>)

      const badge = screen.getByText(label)
      expect(badge).toBeVisible()
    })
  })
})
