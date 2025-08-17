import { render, screen } from '@testing-library/react'
import { Star } from 'lucide-react'
import { IconContainer } from '@/ui/IconContainer'

describe('IconContainer', () => {
  it('renders children correctly', () => {
    render(
      <IconContainer color="#10b981">
        <Star data-testid="star-icon" />
      </IconContainer>
    )

    expect(screen.getByTestId('star-icon')).toBeVisible()
  })

  it('applies correct default classes', () => {
    const { container } = render(
      <IconContainer color="#10b981">
        <Star />
      </IconContainer>
    )

    const iconContainer = container.firstChild as HTMLElement
    expect(iconContainer).toHaveClass('w-12', 'h-12', 'rounded-xl')
  })

  it('applies size variant classes correctly', () => {
    const { container } = render(
      <IconContainer color="#10b981" size="lg">
        <Star />
      </IconContainer>
    )

    const iconContainer = container.firstChild as HTMLElement
    expect(iconContainer).toHaveClass('w-16', 'h-16')
  })

  it('applies variant classes correctly', () => {
    const { container } = render(
      <IconContainer color="#10b981" variant="feature">
        <Star />
      </IconContainer>
    )

    const iconContainer = container.firstChild as HTMLElement
    expect(iconContainer).toHaveClass('rounded-full')
  })

  it('applies custom className', () => {
    const { container } = render(
      <IconContainer color="#10b981" className="custom-class">
        <Star />
      </IconContainer>
    )

    const iconContainer = container.firstChild as HTMLElement
    expect(iconContainer).toHaveClass('custom-class')
  })

  it('applies inline styles for color and effects', () => {
    const { container } = render(
      <IconContainer color="#10b981">
        <Star />
      </IconContainer>
    )

    const iconContainer = container.firstChild as HTMLElement
    expect(iconContainer).toHaveStyle({
      backgroundColor: '#10b98120',
      color: '#10b981',
      filter: 'drop-shadow(0 0 8px #10b98140)',
    })
  })
})
