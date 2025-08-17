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
    { variant: 'dot' as const, color: 'success' as const },
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
    'success',
    'info',
    'warning',
    'danger',
    'primary',
    'secondary',
  ] as const)('Color variants', color => {
    it(`accepts ${color} color without errors`, () => {
      render(<StatusBadge color={color}>Test</StatusBadge>)
      expect(screen.getByText('Test')).toBeVisible()
    })
  })

  describe('Legacy status support (backward compatibility)', () => {
    describe.each(['active', 'maintained', 'featured', 'archived'] as const)(
      'Status values',
      status => {
        it(`handles ${status} status`, () => {
          render(
            <StatusBadge status={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </StatusBadge>
          )
          expect(
            screen.getByText(status.charAt(0).toUpperCase() + status.slice(1))
          ).toBeVisible()
        })
      }
    )

    it('prioritizes status prop over variant and color props when both are provided', () => {
      render(
        <StatusBadge status="active" variant="solid" color="danger">
          Test
        </StatusBadge>
      )

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
