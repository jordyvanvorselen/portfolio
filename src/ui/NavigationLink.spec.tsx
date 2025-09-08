import { render, screen, fireEvent } from '@testing-library/react'

import { NavigationLink } from '@/ui/NavigationLink'

describe('NavigationLink', () => {
  it('renders navigation link with proper attributes', () => {
    render(<NavigationLink href="/about">About</NavigationLink>)

    const link = screen.getByRole('link', { name: 'About' })
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', '/about')
  })

  it('renders link content', () => {
    render(<NavigationLink href="/projects">Projects</NavigationLink>)

    expect(screen.getByText('Projects')).toBeVisible()
  })

  it('accepts custom className prop', () => {
    render(
      <NavigationLink href="/test" className="custom-class">
        Test
      </NavigationLink>
    )

    const link = screen.getByRole('link', { name: 'Test' })
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', '/test')
  })

  describe('Design System Props', () => {
    describe.each(['default', 'active', 'muted', 'ghost'] as const)(
      'variant prop: %s',
      variant => {
        it(`accepts ${variant} variant`, () => {
          render(
            <NavigationLink href="/test" variant={variant}>
              Test
            </NavigationLink>
          )

          const link = screen.getByRole('link', { name: 'Test' })
          expect(link).toBeVisible()
          expect(link).toHaveAttribute('href', '/test')
        })
      }
    )

    describe.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
      'size prop: %s',
      size => {
        it(`accepts ${size} size`, () => {
          render(
            <NavigationLink href="/test" size={size}>
              Test
            </NavigationLink>
          )

          const link = screen.getByRole('link', { name: 'Test' })
          expect(link).toBeVisible()
          expect(link).toHaveAttribute('href', '/test')
        })
      }
    )

    describe.each([
      'primary',
      'secondary',
      'accent',
      'neutral',
      'muted',
    ] as const)('color prop: %s', color => {
      it(`accepts ${color} color`, () => {
        render(
          <NavigationLink href="/test" color={color}>
            Test
          </NavigationLink>
        )

        const link = screen.getByRole('link', { name: 'Test' })
        expect(link).toBeVisible()
        expect(link).toHaveAttribute('href', '/test')
      })
    })

    describe.each(['normal', 'medium', 'semibold', 'bold'] as const)(
      'weight prop: %s',
      weight => {
        it(`accepts ${weight} weight`, () => {
          render(
            <NavigationLink href="/test" weight={weight}>
              Test
            </NavigationLink>
          )

          const link = screen.getByRole('link', { name: 'Test' })
          expect(link).toBeVisible()
          expect(link).toHaveAttribute('href', '/test')
        })
      }
    )

    it('accepts multiple design system props', () => {
      render(
        <NavigationLink
          href="/test"
          variant="active"
          size="lg"
          color="accent"
          weight="bold"
        >
          Test
        </NavigationLink>
      )

      const link = screen.getByRole('link', { name: 'Test' })
      expect(link).toBeVisible()
      expect(link).toHaveAttribute('href', '/test')
    })
  })

  it('calls onClick handler when provided', () => {
    const mockOnClick = jest.fn()
    render(
      <NavigationLink href="/test" onClick={mockOnClick}>
        Test
      </NavigationLink>
    )

    const link = screen.getByRole('link', { name: 'Test' })
    fireEvent.click(link)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  describe('Click Feedback', () => {
    it('applies click-feedback-subtle class for all variants', () => {
      render(<NavigationLink href="/test">Test Link</NavigationLink>)

      const link = screen.getByRole('link', { name: 'Test Link' })
      expect(link).toHaveClass('click-feedback-subtle')
    })

    it('applies click-feedback-subtle class with other design system props', () => {
      render(
        <NavigationLink href="/test" variant="active" color="primary">
          Test Link
        </NavigationLink>
      )

      const link = screen.getByRole('link', { name: 'Test Link' })
      expect(link).toHaveClass('click-feedback-subtle')
    })
  })
})
