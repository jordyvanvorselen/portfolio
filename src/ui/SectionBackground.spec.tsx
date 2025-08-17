import { render, screen } from '@testing-library/react'
import { SectionBackground } from '@/ui/SectionBackground'

describe('SectionBackground', () => {
  it('renders children correctly', () => {
    render(
      <SectionBackground>
        <div data-testid="child-content">Test content</div>
      </SectionBackground>
    )

    expect(screen.getByTestId('child-content')).toBeVisible()
    expect(screen.getByText('Test content')).toBeVisible()
  })

  it('applies gradient background by default', () => {
    const { container } = render(
      <SectionBackground>
        <div>Content</div>
      </SectionBackground>
    )

    const gradientElement = container.querySelector(
      '.bg-gradient-to-br.from-gray-900.via-gray-950.to-black'
    )
    expect(gradientElement).toBeInTheDocument()
  })

  it('applies animated background variant', () => {
    const { container } = render(
      <SectionBackground variant="animated">
        <div>Content</div>
      </SectionBackground>
    )

    const animatedElements = container.querySelectorAll('.animate-pulse')
    expect(animatedElements).toHaveLength(2)
  })

  it('applies plain background variant', () => {
    const { container } = render(
      <SectionBackground variant="plain">
        <div>Content</div>
      </SectionBackground>
    )

    const gradientElement = container.querySelector(
      '.bg-gradient-to-br.from-gray-900.via-gray-950.to-black'
    )
    expect(gradientElement).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <SectionBackground className="custom-class">
        <div>Content</div>
      </SectionBackground>
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('custom-class')
  })

  it('applies relative positioning to wrapper', () => {
    const { container } = render(
      <SectionBackground>
        <div>Content</div>
      </SectionBackground>
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('relative')
  })
})
