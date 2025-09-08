import { render, screen } from '@testing-library/react'
import { MobileMenuOverlay } from '@/ui/MobileMenuOverlay'

describe('MobileMenuOverlay', () => {
  it('renders overlay when visible', () => {
    render(
      <MobileMenuOverlay isVisible={true}>
        <div>Test Content</div>
      </MobileMenuOverlay>
    )

    expect(screen.getByTestId('mobile-menu-overlay')).toBeVisible()
    expect(screen.getByText('Test Content')).toBeVisible()
  })

  it('renders with hidden styles when not visible', () => {
    render(
      <MobileMenuOverlay isVisible={false}>
        <div>Test Content</div>
      </MobileMenuOverlay>
    )

    const overlay = screen.getByTestId('mobile-menu-overlay')
    expect(overlay).toBeInTheDocument()
    expect(overlay).toHaveClass(
      'translate-x-full',
      'opacity-0',
      'pointer-events-none'
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies correct ARIA attributes', () => {
    render(
      <MobileMenuOverlay isVisible={true}>
        <div>Content</div>
      </MobileMenuOverlay>
    )

    const overlay = screen.getByTestId('mobile-menu-overlay')
    expect(overlay).toHaveAttribute('role', 'dialog')
    expect(overlay).toHaveAttribute('aria-modal', 'true')
    expect(overlay).toHaveAttribute('aria-label', 'Navigation menu')
  })

  it('accepts custom test id', () => {
    render(
      <MobileMenuOverlay isVisible={true} data-testid="custom-overlay">
        <div>Content</div>
      </MobileMenuOverlay>
    )

    expect(screen.getByTestId('custom-overlay')).toBeVisible()
    expect(screen.queryByTestId('mobile-menu-overlay')).not.toBeInTheDocument()
  })
})
