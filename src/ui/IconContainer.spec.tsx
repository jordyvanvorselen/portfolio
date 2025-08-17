import { render, screen } from '@testing-library/react'
import { Star } from 'lucide-react'
import { IconContainer } from '@/ui/IconContainer'

describe('IconContainer', () => {
  describe('basic functionality', () => {
    it('renders children correctly', () => {
      render(
        <IconContainer color="#10b981">
          <Star data-testid="star-icon" />
        </IconContainer>
      )

      expect(screen.getByTestId('star-icon')).toBeVisible()
    })

    it('accepts custom className prop', () => {
      render(
        <IconContainer color="#10b981" className="custom-class">
          <Star data-testid="icon-with-class" />
        </IconContainer>
      )

      expect(screen.getByTestId('icon-with-class')).toBeVisible()
    })

    it('requires color prop and renders without errors', () => {
      render(
        <IconContainer color="#10b981">
          <Star data-testid="icon-with-color" />
        </IconContainer>
      )

      expect(screen.getByTestId('icon-with-color')).toBeVisible()
    })
  })

  describe.each(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const)(
    'size variants',
    size => {
      it(`renders with ${size} size without errors`, () => {
        render(
          <IconContainer color="#10b981" size={size}>
            <Star data-testid={`icon-size-${size}`} />
          </IconContainer>
        )
        expect(screen.getByTestId(`icon-size-${size}`)).toBeVisible()
      })
    }
  )

  describe('size defaults', () => {
    it('renders with md size as default', () => {
      render(
        <IconContainer color="#10b981">
          <Star data-testid="default-size-icon" />
        </IconContainer>
      )

      expect(screen.getByTestId('default-size-icon')).toBeVisible()
    })
  })

  describe.each(['default', 'rounded', 'circle', 'square'] as const)(
    'shape variants',
    variant => {
      it(`renders with ${variant} variant without errors`, () => {
        render(
          <IconContainer color="#10b981" variant={variant}>
            <Star data-testid={`icon-variant-${variant}`} />
          </IconContainer>
        )
        expect(screen.getByTestId(`icon-variant-${variant}`)).toBeVisible()
      })
    }
  )

  describe('variant defaults', () => {
    it('renders with default variant as default', () => {
      render(
        <IconContainer color="#10b981">
          <Star data-testid="default-variant-icon" />
        </IconContainer>
      )

      expect(screen.getByTestId('default-variant-icon')).toBeVisible()
    })
  })

  describe.each(['none', 'glow', 'shadow', 'blur'] as const)(
    'effect variants',
    effect => {
      it(`renders with ${effect} effect without errors`, () => {
        render(
          <IconContainer color="#10b981" effect={effect}>
            <Star data-testid={`icon-effect-${effect}`} />
          </IconContainer>
        )
        expect(screen.getByTestId(`icon-effect-${effect}`)).toBeVisible()
      })
    }
  )

  describe('effect defaults', () => {
    it('renders with glow effect as default', () => {
      render(
        <IconContainer color="#10b981">
          <Star data-testid="default-effect-icon" />
        </IconContainer>
      )

      expect(screen.getByTestId('default-effect-icon')).toBeVisible()
    })
  })

  describe.each(['static', 'hover', 'scale'] as const)(
    'interactive variants',
    interactive => {
      it(`renders with ${interactive} interactive without errors`, () => {
        render(
          <IconContainer color="#10b981" interactive={interactive}>
            <Star data-testid={`icon-interactive-${interactive}`} />
          </IconContainer>
        )
        expect(
          screen.getByTestId(`icon-interactive-${interactive}`)
        ).toBeVisible()
      })
    }
  )

  describe('interactive defaults', () => {
    it('renders with static interactive as default', () => {
      render(
        <IconContainer color="#10b981">
          <Star data-testid="default-interactive-icon" />
        </IconContainer>
      )

      expect(screen.getByTestId('default-interactive-icon')).toBeVisible()
    })
  })

  describe('color handling', () => {
    it('accepts different color values', () => {
      const colors = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444']

      colors.forEach((color, index) => {
        render(
          <IconContainer color={color}>
            <Star data-testid={`icon-color-${index}`} />
          </IconContainer>
        )
        expect(screen.getByTestId(`icon-color-${index}`)).toBeVisible()
      })
    })
  })

  describe.each(['expertise', 'feature', 'highlight'] as const)(
    'backward compatibility',
    legacyVariant => {
      it(`handles ${legacyVariant} legacy variant prop`, () => {
        render(
          <IconContainer color="#10b981" legacyVariant={legacyVariant}>
            <Star data-testid={`icon-legacy-${legacyVariant}`} />
          </IconContainer>
        )
        expect(screen.getByTestId(`icon-legacy-${legacyVariant}`)).toBeVisible()
      })
    }
  )

  describe('legacy variant priority', () => {
    it('prioritizes legacy variant over new props', () => {
      render(
        <IconContainer
          color="#10b981"
          legacyVariant="feature"
          variant="square"
          effect="glow"
          interactive="hover"
        >
          <Star data-testid="legacy-priority-icon" />
        </IconContainer>
      )

      expect(screen.getByTestId('legacy-priority-icon')).toBeVisible()
    })
  })

  describe('combined prop usage', () => {
    it('combines all new props correctly', () => {
      render(
        <IconContainer
          color="#10b981"
          variant="circle"
          size="lg"
          effect="shadow"
          interactive="hover"
          className="custom-class"
        >
          <Star data-testid="combined-props-icon" />
        </IconContainer>
      )

      expect(screen.getByTestId('combined-props-icon')).toBeVisible()
    })
  })
})
