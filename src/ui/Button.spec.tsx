import { render, screen, fireEvent } from '@testing-library/react'

import { Button } from '@/ui/Button'

describe('Button', () => {
  describe('Basic Rendering', () => {
    it('renders button with text', () => {
      render(<Button>Click me</Button>)

      expect(screen.getByRole('button', { name: 'Click me' })).toBeVisible()
    })

    it('forwards ref correctly', () => {
      const ref = { current: null }
      render(<Button ref={ref}>Button with ref</Button>)

      expect(ref.current).toBeTruthy()
    })
  })

  describe('New Design System API', () => {
    describe.each(['solid', 'outline', 'ghost', 'link'] as const)(
      'variant prop: %s',
      variant => {
        it(`renders with ${variant} variant`, () => {
          render(<Button variant={variant}>Test Button</Button>)

          expect(screen.getByRole('button')).toBeVisible()
        })
      }
    )

    describe.each([
      'primary',
      'secondary',
      'muted',
      'neutral',
      'accent',
    ] as const)('color prop: %s', color => {
      it(`renders with ${color} color`, () => {
        render(<Button color={color}>Test Button</Button>)

        expect(screen.getByRole('button')).toBeVisible()
      })
    })

    describe.each([
      { size: 'xs', description: 'xs size' },
      { size: 'sm', description: 'sm size' },
      { size: 'md', description: 'md size (default)' },
      { size: 'lg', description: 'lg size' },
      { size: 'xl', description: 'xl size' },
    ] as const)('size prop: $size', ({ size, description }) => {
      it(`renders ${description}`, () => {
        render(<Button size={size}>Test Button</Button>)

        expect(screen.getByRole('button')).toBeVisible()
      })
    })

    describe('Disabled State', () => {
      it('renders disabled solid button', () => {
        render(<Button disabled>Disabled Button</Button>)

        const button = screen.getByRole('button', { name: 'Disabled Button' })
        expect(button).toBeDisabled()
      })

      it('renders disabled outline button', () => {
        render(
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
        )

        const button = screen.getByRole('button', { name: 'Disabled Outline' })
        expect(button).toBeDisabled()
      })

      it('does not trigger click handlers when disabled', () => {
        const handleClick = jest.fn()

        render(
          <Button disabled onClick={handleClick}>
            Disabled Button
          </Button>
        )

        const button = screen.getByRole('button', { name: 'Disabled Button' })
        fireEvent.click(button)

        expect(handleClick).not.toHaveBeenCalled()
      })
    })

    describe('Variant + Color Combinations', () => {
      it('renders outline + accent combination', () => {
        render(
          <Button variant="outline" color="accent">
            Outline Accent
          </Button>
        )

        const button = screen.getByRole('button', { name: 'Outline Accent' })
        expect(button).toBeVisible()
      })

      it('renders ghost + neutral combination', () => {
        render(
          <Button variant="ghost" color="neutral">
            Ghost Neutral
          </Button>
        )

        const button = screen.getByRole('button', { name: 'Ghost Neutral' })
        expect(button).toBeVisible()
      })
    })
  })

  describe('Link Behavior', () => {
    it('renders as external link for mailto URLs', () => {
      render(
        <Button
          href="mailto:test@example.com"
          variant="solid"
          color="primary"
          size="md"
        >
          Get In Touch
        </Button>
      )

      const link = screen.getByRole('link', { name: 'Get In Touch' })
      expect(link).toBeVisible()
      expect(link).toHaveAttribute('href', 'mailto:test@example.com')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('renders as external link for https URLs', () => {
      render(
        <Button
          href="https://example.com"
          variant="solid"
          color="primary"
          size="md"
        >
          External Link
        </Button>
      )

      const link = screen.getByRole('link', { name: 'External Link' })
      expect(link).toBeVisible()
      expect(link).toHaveAttribute('href', 'https://example.com')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('renders as Next.js Link for internal routes', () => {
      render(
        <Button href="/contact" variant="solid" color="primary" size="md">
          Contact Page
        </Button>
      )

      const link = screen.getByRole('link', { name: 'Contact Page' })
      expect(link).toBeVisible()
      expect(link).toHaveAttribute('href', '/contact')
      expect(link).not.toHaveAttribute('target')
      expect(link).not.toHaveAttribute('rel')
    })

    it('renders as Next.js Link for anchor links', () => {
      render(
        <Button href="#section" variant="solid" color="primary" size="md">
          Jump to Section
        </Button>
      )

      const link = screen.getByRole('link', { name: 'Jump to Section' })
      expect(link).toBeVisible()
      expect(link).toHaveAttribute('href', '#section')
      expect(link).not.toHaveAttribute('target')
      expect(link).not.toHaveAttribute('rel')
    })

    it('filters undefined optional properties for internal links', () => {
      render(
        <Button
          href="/contact"
          variant="solid"
          color="primary"
          size="md"
          onMouseEnter={undefined}
          onClick={undefined}
        >
          Contact Page
        </Button>
      )

      const link = screen.getByRole('link', { name: 'Contact Page' })
      expect(link).toBeVisible()
      expect(link).toHaveAttribute('href', '/contact')
    })

    it('forwards ref correctly for links', () => {
      const ref = { current: null }
      render(
        <Button ref={ref} href="/test">
          Link with ref
        </Button>
      )

      expect(ref.current).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('has proper button role', () => {
      render(<Button>Accessible Button</Button>)

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('has proper link role when href is provided', () => {
      render(<Button href="/test">Accessible Link</Button>)

      expect(screen.getByRole('link')).toBeInTheDocument()
    })

    it('supports aria attributes', () => {
      render(
        <Button aria-label="Custom label" aria-describedby="description">
          Button
        </Button>
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Custom label')
      expect(button).toHaveAttribute('aria-describedby', 'description')
    })
  })

  describe('Event Handling', () => {
    it('handles click events', () => {
      const handleClick = jest.fn()

      render(<Button onClick={handleClick}>Clickable Button</Button>)

      const button = screen.getByRole('button', { name: 'Clickable Button' })
      fireEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles keyboard events', () => {
      const handleKeyDown = jest.fn()

      render(<Button onKeyDown={handleKeyDown}>Button</Button>)

      const button = screen.getByRole('button')
      fireEvent.keyDown(button, { key: ' ', code: 'Space' })

      expect(handleKeyDown).toHaveBeenCalled()
    })
  })

  describe('Click Feedback', () => {
    it('applies click-feedback class to button elements', () => {
      render(<Button>Test Button</Button>)

      const button = screen.getByRole('button', { name: 'Test Button' })
      expect(button).toHaveClass('click-feedback')
    })

    it('applies click-feedback class to link elements', () => {
      render(<Button href="/test">Test Link</Button>)

      const link = screen.getByRole('link', { name: 'Test Link' })
      expect(link).toHaveClass('click-feedback')
    })
  })
})
