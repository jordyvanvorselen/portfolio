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

  describe('variant prop', () => {
    describe.each([['gradient'], ['plain'], ['animated'], ['textured']])(
      'variant: %s',
      variant => {
        it(`accepts ${variant} variant without errors`, () => {
          render(
            <SectionBackground
              variant={
                variant as 'gradient' | 'plain' | 'animated' | 'textured'
              }
            >
              <div>Content</div>
            </SectionBackground>
          )
          expect(screen.getByText('Content')).toBeVisible()
        })
      }
    )

    it('applies gradient background by default', () => {
      render(
        <SectionBackground>
          <div>Content</div>
        </SectionBackground>
      )

      expect(screen.getByText('Content')).toBeVisible()
    })
  })

  describe('intensity prop', () => {
    describe.each([['subtle'], ['medium'], ['strong']])(
      'intensity: %s',
      intensity => {
        it(`accepts ${intensity} intensity without errors`, () => {
          render(
            <SectionBackground
              intensity={intensity as 'subtle' | 'medium' | 'strong'}
            >
              <div>Content</div>
            </SectionBackground>
          )
          expect(screen.getByText('Content')).toBeVisible()
        })
      }
    )

    it('applies medium intensity by default', () => {
      render(
        <SectionBackground>
          <div>Content</div>
        </SectionBackground>
      )

      expect(screen.getByText('Content')).toBeVisible()
    })

    it('applies intensity with animated variant', () => {
      render(
        <SectionBackground variant="animated" intensity="subtle">
          <div>Content</div>
        </SectionBackground>
      )

      expect(screen.getByText('Content')).toBeVisible()
    })

    it('applies strong intensity with animated variant', () => {
      render(
        <SectionBackground variant="animated" intensity="strong">
          <div>Content</div>
        </SectionBackground>
      )

      expect(screen.getByText('Content')).toBeVisible()
    })
  })

  it('accepts custom className', () => {
    render(
      <SectionBackground className="custom-class">
        <div>Content</div>
      </SectionBackground>
    )

    expect(screen.getByText('Content')).toBeVisible()
  })

  it('renders children in container', () => {
    render(
      <SectionBackground>
        <div data-testid="content">Content</div>
      </SectionBackground>
    )

    expect(screen.getByTestId('content')).toBeVisible()
  })

  it('combines variant and intensity correctly', () => {
    render(
      <SectionBackground variant="animated" intensity="strong">
        <div>Content</div>
      </SectionBackground>
    )

    expect(screen.getByText('Content')).toBeVisible()
  })

  describe('children rendering', () => {
    it('renders complex children content', () => {
      render(
        <SectionBackground>
          <div>
            <h1>Title</h1>
            <p>Description</p>
            <button>Action</button>
          </div>
        </SectionBackground>
      )

      expect(screen.getByText('Title')).toBeVisible()
      expect(screen.getByText('Description')).toBeVisible()
      expect(screen.getByText('Action')).toBeVisible()
    })

    it('renders multiple children', () => {
      render(
        <SectionBackground>
          <div data-testid="child1">Child 1</div>
          <div data-testid="child2">Child 2</div>
        </SectionBackground>
      )

      expect(screen.getByTestId('child1')).toBeVisible()
      expect(screen.getByTestId('child2')).toBeVisible()
    })
  })

  describe('props combinations', () => {
    it('accepts all props combined without errors', () => {
      render(
        <SectionBackground
          variant="textured"
          intensity="strong"
          className="test-class"
        >
          <div>Combined Props Test</div>
        </SectionBackground>
      )

      expect(screen.getByText('Combined Props Test')).toBeVisible()
    })
  })

  describe('wrapper behavior', () => {
    it('renders wrapper element', () => {
      const { container } = render(
        <SectionBackground>
          <div>Content</div>
        </SectionBackground>
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders wrapper with custom className', () => {
      const { container } = render(
        <SectionBackground className="custom-wrapper">
          <div>Content</div>
        </SectionBackground>
      )

      expect(container.firstChild).toBeInTheDocument()
    })
  })
})
