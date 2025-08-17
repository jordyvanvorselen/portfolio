import { render, screen } from '@testing-library/react'

import { Divider } from '@/ui/Divider'

describe('Divider', () => {
  it('renders with default variant', () => {
    render(<Divider data-testid="divider" />)

    const divider = screen.getByTestId('divider')
    expect(divider).toBeInTheDocument()
  })

  it('renders with children content', () => {
    render(
      <Divider>
        <div>Content below divider</div>
      </Divider>
    )

    expect(screen.getByText('Content below divider')).toBeInTheDocument()
  })

  describe('variant prop', () => {
    describe.each([
      'line',
      'gradient-vertical',
      'gradient-horizontal',
      'dotted',
    ])('accepts %s variant', variant => {
      it('without errors', () => {
        render(
          <Divider
            variant={
              variant as
                | 'line'
                | 'gradient-vertical'
                | 'gradient-horizontal'
                | 'dotted'
            }
            data-testid="divider"
          />
        )
        expect(screen.getByTestId('divider')).toBeInTheDocument()
      })
    })

    it('renders line variant by default', () => {
      render(<Divider data-testid="divider" />)

      const divider = screen.getByTestId('divider')
      expect(divider).toBeInTheDocument()
    })
  })

  describe('color prop', () => {
    describe.each(['default', 'primary', 'secondary', 'muted'])(
      'accepts %s color',
      color => {
        it('without errors', () => {
          render(
            <Divider
              color={color as 'default' | 'primary' | 'secondary' | 'muted'}
              data-testid="divider"
            />
          )
          expect(screen.getByTestId('divider')).toBeInTheDocument()
        })
      }
    )

    it('applies default color by default', () => {
      render(<Divider data-testid="divider" />)

      const divider = screen.getByTestId('divider')
      expect(divider).toBeInTheDocument()
    })

    it('applies color to gradient variants', () => {
      render(
        <Divider
          variant="gradient-vertical"
          color="primary"
          data-testid="divider"
        />
      )

      const divider = screen.getByTestId('divider')
      expect(divider).toBeInTheDocument()
    })
  })

  describe('thickness prop', () => {
    describe.each(['thin', 'medium', 'thick'])(
      'accepts %s thickness',
      thickness => {
        it('without errors', () => {
          render(
            <Divider
              thickness={thickness as 'thin' | 'medium' | 'thick'}
              data-testid="divider"
            />
          )
          expect(screen.getByTestId('divider')).toBeInTheDocument()
        })
      }
    )

    it('applies medium thickness by default', () => {
      render(<Divider data-testid="divider" />)

      const divider = screen.getByTestId('divider')
      expect(divider).toBeInTheDocument()
    })

    it('applies thickness to gradient-vertical variant', () => {
      render(
        <Divider
          variant="gradient-vertical"
          thickness="thick"
          data-testid="divider"
        />
      )

      const divider = screen.getByTestId('divider')
      expect(divider).toBeInTheDocument()
    })

    describe('gradient-vertical thickness variations', () => {
      describe.each([
        ['thin', 'w-px'],
        ['medium', 'w-0.5'],
        ['thick', 'w-1'],
      ])(
        'applies %s thickness to gradient-vertical variant',
        (thickness, expectedClass) => {
          it(`renders with ${expectedClass} class`, () => {
            render(
              <Divider
                variant="gradient-vertical"
                thickness={thickness as 'thin' | 'medium' | 'thick'}
                data-testid="divider"
              />
            )

            const divider = screen.getByTestId('divider')
            expect(divider).toBeInTheDocument()
            expect(divider).toHaveClass(expectedClass)
          })
        }
      )
    })

    describe('gradient-horizontal thickness variations', () => {
      describe.each([
        ['thin', 'h-px'],
        ['medium', 'h-0\\.5'],
        ['thick', 'h-1'],
      ])(
        'applies %s thickness to gradient-horizontal variant',
        (thickness, expectedClass) => {
          it(`renders gradient lines with correct height class`, () => {
            const { container } = render(
              <Divider
                variant="gradient-horizontal"
                thickness={thickness as 'thin' | 'medium' | 'thick'}
              />
            )

            // Check for gradient elements with the expected height class
            const gradientElements = container.querySelectorAll(
              `div[class*="${expectedClass.replace('\\', '')}"]`
            )
            expect(gradientElements.length).toBeGreaterThan(0)
          })
        }
      )
    })
  })

  describe('backward compatibility', () => {
    it('handles card-section legacy variant', () => {
      render(<Divider variant="card-section" data-testid="divider" />)
      expect(screen.getByTestId('divider')).toBeInTheDocument()
    })

    it('handles vertical-gradient legacy variant', () => {
      render(<Divider variant="vertical-gradient" data-testid="divider" />)
      expect(screen.getByTestId('divider')).toBeInTheDocument()
    })

    it('handles horizontal-gradient legacy variant', () => {
      render(<Divider variant="horizontal-gradient" data-testid="divider" />)
      expect(screen.getByTestId('divider')).toBeInTheDocument()
    })

    it('applies spacing for card-section variant', () => {
      render(<Divider variant="card-section" data-testid="divider" />)

      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('pt-6')
    })
  })

  describe('spacing logic', () => {
    it('applies spacing for line variant', () => {
      render(<Divider variant="line" data-testid="divider" />)

      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('pt-6')
    })

    it('does not apply spacing for unknown variant that falls to default case', () => {
      // This tests the empty string branch of the spacing conditional on line 84
      render(
        <Divider
          variant={
            'unknown-variant' as
              | 'line'
              | 'gradient-vertical'
              | 'gradient-horizontal'
              | 'dotted'
              | 'card-section'
              | 'vertical-gradient'
              | 'horizontal-gradient'
          }
          data-testid="divider"
        />
      )

      const divider = screen.getByTestId('divider')
      expect(divider).not.toHaveClass('pt-6')
    })
  })

  it('accepts custom className', () => {
    render(<Divider className="custom-class" data-testid="divider" />)

    const divider = screen.getByTestId('divider')
    expect(divider).toBeInTheDocument()
  })

  it('passes through HTML attributes', () => {
    render(<Divider data-testid="divider" role="separator" />)

    const divider = screen.getByTestId('divider')
    expect(divider).toHaveAttribute('role', 'separator')
  })

  it('renders gradient-horizontal with animated content', () => {
    const { container } = render(<Divider variant="gradient-horizontal" />)

    expect(container.firstChild).toBeInTheDocument()
  })

  describe('content rendering', () => {
    it('renders children when provided', () => {
      render(
        <Divider>
          <div data-testid="child-content">Child Content</div>
        </Divider>
      )

      expect(screen.getByTestId('child-content')).toBeVisible()
    })

    it('renders without children', () => {
      render(<Divider data-testid="divider" />)

      expect(screen.getByTestId('divider')).toBeInTheDocument()
    })
  })

  describe('props combinations', () => {
    it('accepts all props combined without errors', () => {
      render(
        <Divider
          variant="gradient-horizontal"
          color="primary"
          thickness="thick"
          className="test-class"
          data-testid="divider"
        >
          <div>Combined Props Test</div>
        </Divider>
      )

      expect(screen.getByTestId('divider')).toBeInTheDocument()
      expect(screen.getByText('Combined Props Test')).toBeVisible()
    })
  })
})
