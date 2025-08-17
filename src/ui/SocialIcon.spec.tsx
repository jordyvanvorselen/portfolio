import { render, screen } from '@testing-library/react'
import { Github, Linkedin, Twitter } from 'lucide-react'

import { SocialIcon, type SocialIconProps } from '@/ui/SocialIcon'

describe('SocialIcon', () => {
  const defaultProps: SocialIconProps = {
    href: 'https://github.com/test',
    label: 'GitHub',
    icon: Github,
  }

  describe('Basic Functionality', () => {
    it('renders social icon link with proper attributes', () => {
      render(<SocialIcon {...defaultProps} />)

      const link = screen.getByRole('link', { name: 'GitHub' })
      expect(link).toBeVisible()
      expect(link).toHaveAttribute('href', 'https://github.com/test')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      expect(link).toHaveAttribute('aria-label', 'GitHub')
    })

    it('renders icon component', () => {
      render(<SocialIcon {...defaultProps} />)

      const link = screen.getByRole('link', { name: 'GitHub' })
      expect(link.querySelector('svg')).toBeInTheDocument()
    })

    it('accepts custom className prop without errors', () => {
      render(<SocialIcon {...defaultProps} className="custom-class" />)

      const link = screen.getByRole('link', { name: 'GitHub' })
      expect(link).toBeVisible()
    })
  })

  describe('Design System Variants', () => {
    it('renders icon variant by default', () => {
      render(<SocialIcon {...defaultProps} />)

      const link = screen.getByRole('link', { name: 'GitHub' })
      expect(link).toBeVisible()
      expect(screen.queryByText('GitHub')).not.toBeInTheDocument()
    })

    describe.each([
      { variant: 'icon' as const, expectsText: false },
      { variant: 'button' as const, expectsText: false },
      { variant: 'text' as const, expectsText: true },
    ])('variant prop: $variant', ({ variant, expectsText }) => {
      it(`renders ${variant} variant correctly`, () => {
        render(<SocialIcon {...defaultProps} variant={variant} />)

        const link = screen.getByRole('link', { name: 'GitHub' })
        expect(link).toBeVisible()

        if (expectsText) {
          expect(screen.getByText('GitHub')).toBeVisible()
        } else {
          expect(screen.queryByText('GitHub')).not.toBeInTheDocument()
        }
      })
    })
  })

  describe('Design System Sizes', () => {
    describe.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
      'size prop: %s',
      size => {
        it(`renders with ${size} size`, () => {
          render(<SocialIcon {...defaultProps} size={size} />)
          expect(screen.getByRole('link', { name: 'GitHub' })).toBeVisible()
        })
      }
    )
  })

  describe('Design System Colors', () => {
    describe.each(['primary', 'secondary', 'muted', 'accent'] as const)(
      'color prop: %s',
      color => {
        it(`renders with ${color} color`, () => {
          render(<SocialIcon {...defaultProps} color={color} />)
          expect(screen.getByRole('link', { name: 'GitHub' })).toBeVisible()
        })
      }
    )
  })

  describe('Design System Interactive States', () => {
    describe.each(['static', 'hover'] as const)(
      'interactive prop: %s',
      interactive => {
        it(`renders with ${interactive} interactive state`, () => {
          render(<SocialIcon {...defaultProps} interactive={interactive} />)

          const link = screen.getByRole('link', { name: 'GitHub' })
          expect(link).toBeVisible()
        })
      }
    )
  })

  describe('Multiple Icon Types', () => {
    it('works with different Lucide icons', () => {
      const { rerender } = render(
        <SocialIcon {...defaultProps} icon={Github} />
      )
      expect(screen.getByRole('link', { name: 'GitHub' })).toBeVisible()

      rerender(
        <SocialIcon {...defaultProps} icon={Linkedin} label="LinkedIn" />
      )
      expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeVisible()

      rerender(<SocialIcon {...defaultProps} icon={Twitter} label="Twitter" />)
      expect(screen.getByRole('link', { name: 'Twitter' })).toBeVisible()
    })
  })
})
