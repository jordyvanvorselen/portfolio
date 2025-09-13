import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { MobileMenuButton } from '@/ui/MobileMenuButton'

const mockOnClick = vi.fn()

describe('MobileMenuButton', () => {
  beforeEach(() => {
    mockOnClick.mockClear()
  })

  it('renders button with children', () => {
    render(<MobileMenuButton>Test Button</MobileMenuButton>)

    expect(screen.getByText('Test Button')).toBeVisible()
  })

  it('calls onClick when clicked', () => {
    render(<MobileMenuButton onClick={mockOnClick}>Click Me</MobileMenuButton>)

    fireEvent.click(screen.getByText('Click Me'))
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    const { container } = render(
      <MobileMenuButton className="custom-class">Test</MobileMenuButton>
    )

    const button = container.firstChild as HTMLElement
    expect(button).toHaveClass('custom-class')
  })

  it('applies pressed animation state', () => {
    const { container } = render(
      <MobileMenuButton isPressed={true}>Pressed</MobileMenuButton>
    )

    const button = container.firstChild as HTMLElement
    expect(button).toHaveClass('opacity-75')
  })

  it('applies click feedback classes', () => {
    const { container } = render(
      <MobileMenuButton>Test Button</MobileMenuButton>
    )

    const button = container.firstChild as HTMLElement
    expect(button).toHaveClass('click-feedback-bounce')
  })

  describe('Design System Props', () => {
    describe.each(['sm', 'md', 'lg', 'xl'] as const)('size prop: %s', size => {
      it(`accepts ${size} size`, () => {
        render(<MobileMenuButton size={size}>Test</MobileMenuButton>)

        expect(screen.getByText('Test')).toBeVisible()
      })
    })

    describe.each(['primary', 'secondary', 'neutral'] as const)(
      'color prop: %s',
      color => {
        it(`accepts ${color} color`, () => {
          render(<MobileMenuButton color={color}>Test</MobileMenuButton>)

          expect(screen.getByText('Test')).toBeVisible()
        })
      }
    )
  })
})
