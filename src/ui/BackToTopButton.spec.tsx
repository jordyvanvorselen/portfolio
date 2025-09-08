import { render, screen, fireEvent } from '@testing-library/react'

import { BackToTopButton } from '@/ui/BackToTopButton'

describe('BackToTopButton', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    global.window.scrollTo = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe.each([
    { scenario: 'default behavior', onClick: undefined },
    { scenario: 'custom onClick', onClick: jest.fn() },
  ])('onClick prop: $scenario', ({ onClick }) => {
    it('renders back to top button', () => {
      render(<BackToTopButton {...(onClick ? { onClick } : {})} />)

      expect(screen.getByRole('button', { name: 'ui.backToTop' })).toBeVisible()
    })
  })

  describe.each([
    {
      scenario: 'default behavior',
      onClick: undefined,
      expectedScrollToCalls: 1,
      expectedCustomCalls: 0,
    },
    {
      scenario: 'custom onClick',
      onClick: jest.fn(),
      expectedScrollToCalls: 0,
      expectedCustomCalls: 1,
    },
  ])(
    'click interaction: $scenario',
    ({ scenario, onClick, expectedScrollToCalls, expectedCustomCalls }) => {
      it(`handles ${scenario} correctly`, () => {
        render(<BackToTopButton {...(onClick ? { onClick } : {})} />)

        const button = screen.getByRole('button', { name: 'ui.backToTop' })
        fireEvent.click(button)

        if (expectedScrollToCalls > 0) {
          expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth',
          })
          expect(window.scrollTo).toHaveBeenCalledTimes(expectedScrollToCalls)
        } else {
          expect(window.scrollTo).not.toHaveBeenCalled()
        }

        if (expectedCustomCalls > 0) {
          expect(onClick).toHaveBeenCalledTimes(expectedCustomCalls)
        }
      })
    }
  )

  describe('design system props', () => {
    describe.each([
      { variant: 'ghost', expectedClass: 'text-gray-300' },
      { variant: 'outline', expectedClass: 'border-gray-600' },
      { variant: 'solid', expectedClass: 'bg-slate-700' },
    ] as const)('variant: $variant', ({ variant, expectedClass }) => {
      it(`applies ${variant} variant styles`, () => {
        render(<BackToTopButton variant={variant} />)

        const button = screen.getByRole('button', { name: 'ui.backToTop' })
        expect(button).toHaveClass(expectedClass)
      })
    })

    describe.each([
      { color: 'neutral', expectedClass: 'text-gray-300' },
      { color: 'primary', expectedClass: 'text-teal-500' },
      { color: 'secondary', expectedClass: 'text-gray-500' },
    ] as const)('color: $color', ({ color, expectedClass }) => {
      it(`applies ${color} color styles`, () => {
        render(<BackToTopButton color={color} />)

        const button = screen.getByRole('button', { name: 'ui.backToTop' })
        expect(button).toHaveClass(expectedClass)
      })
    })

    describe.each([
      { size: 'xs', expectedClass: 'h-8' },
      { size: 'sm', expectedClass: 'h-9' },
      { size: 'md', expectedClass: 'py-2' },
    ] as const)('size: $size', ({ size, expectedClass }) => {
      it(`applies ${size} size styles`, () => {
        render(<BackToTopButton size={size} />)

        const button = screen.getByRole('button', { name: 'ui.backToTop' })
        expect(button).toHaveClass(expectedClass)
      })
    })

    it('applies custom className', () => {
      const customClass = 'custom-test-class'
      render(<BackToTopButton className={customClass} />)

      const button = screen.getByRole('button', { name: 'ui.backToTop' })
      expect(button).toHaveClass(customClass)
    })

    it('applies default props when none provided', () => {
      render(<BackToTopButton />)

      const button = screen.getByRole('button', { name: 'ui.backToTop' })
      // Default: variant="ghost", color="neutral", size="xs"
      expect(button).toHaveClass('text-gray-300', 'h-8')
    })
  })
})
