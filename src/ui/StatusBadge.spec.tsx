import { render, screen } from '@testing-library/react'
import { StatusBadge } from '@/ui/StatusBadge'

describe('StatusBadge', () => {
  describe('Basic functionality', () => {
    it('renders children correctly', () => {
      render(<StatusBadge>Test Badge</StatusBadge>)

      expect(screen.getByText('Test Badge')).toBeVisible()
    })

    it('accepts custom className', () => {
      render(<StatusBadge className="custom-class">Test</StatusBadge>)

      expect(screen.getByText('Test')).toBeVisible()
    })
  })

  describe.each(['xs', 'sm', 'md', 'lg'] as const)('Size variants', size => {
    it(`accepts ${size} size without errors`, () => {
      render(<StatusBadge size={size}>Test</StatusBadge>)
      expect(screen.getByText('Test')).toBeVisible()
    })
  })

  describe.each([
    { variant: 'solid' as const, color: 'success' as const },
    { variant: 'solid' as const, color: 'danger' as const },
    { variant: 'soft' as const, color: 'default' as const },
    { variant: 'soft' as const, color: 'success' as const },
    { variant: 'soft' as const, color: 'info' as const },
    { variant: 'soft' as const, color: 'primary' as const },
    { variant: 'outline' as const, color: 'success' as const },
    { variant: 'outline' as const, color: 'warning' as const },
  ])('Variant styles', ({ variant, color }) => {
    it(`accepts ${variant} variant with ${color} color`, () => {
      render(
        <StatusBadge variant={variant} color={color}>
          Test
        </StatusBadge>
      )
      expect(screen.getByText('Test')).toBeVisible()
    })
  })

  describe.each([
    'default',
    'primary',
    'success',
    'warning',
    'danger',
    'info',
    'accent',
  ] as const)('Color variants', color => {
    it(`accepts ${color} color without errors`, () => {
      render(<StatusBadge color={color}>Test</StatusBadge>)
      expect(screen.getByText('Test')).toBeVisible()
    })
  })

  describe('Default values', () => {
    it('renders with default props when none are provided', () => {
      render(<StatusBadge>Test</StatusBadge>)

      expect(screen.getByText('Test')).toBeVisible()
    })
  })

  describe('Props combinations', () => {
    it('accepts all props combined without errors', () => {
      render(
        <StatusBadge
          variant="soft"
          color="primary"
          size="lg"
          className="test-class"
        >
          Combined Props Test
        </StatusBadge>
      )

      expect(screen.getByText('Combined Props Test')).toBeVisible()
    })
  })
})
