import { render, screen } from '@testing-library/react'

import { Text } from '@/ui/Text'

describe('Text', () => {
  it('renders text content', () => {
    render(<Text>Sample text content</Text>)

    expect(screen.getByText('Sample text content')).toBeVisible()
  })

  it('renders as paragraph by default', () => {
    render(<Text>Sample text</Text>)

    const textElement = screen.getByText('Sample text')
    expect(textElement.tagName).toBe('P')
  })

  describe('Design Token Props', () => {
    describe.each(['xs', 'sm', 'base', 'lg', 'xl', '2xl'] as const)(
      'size prop: %s',
      size => {
        it(`renders with ${size} size`, () => {
          render(<Text size={size}>Test text</Text>)
          expect(screen.getByText('Test text')).toBeVisible()
        })
      }
    )

    describe.each(['normal', 'medium', 'semibold', 'bold'] as const)(
      'weight prop: %s',
      weight => {
        it(`renders with ${weight} weight`, () => {
          render(<Text weight={weight}>Test text</Text>)
          expect(screen.getByText('Test text')).toBeVisible()
        })
      }
    )

    describe.each(['primary', 'secondary', 'muted', 'accent'] as const)(
      'color prop: %s',
      color => {
        it(`renders with ${color} color`, () => {
          render(<Text color={color}>Test text</Text>)
          expect(screen.getByText('Test text')).toBeVisible()
        })
      }
    )

    describe.each(['tight', 'normal', 'relaxed'] as const)(
      'lineHeight prop: %s',
      lineHeight => {
        it(`renders with ${lineHeight} line height`, () => {
          render(<Text lineHeight={lineHeight}>Test text</Text>)
          expect(screen.getByText('Test text')).toBeVisible()
        })
      }
    )

    describe.each(['left', 'center', 'right'] as const)(
      'alignment prop: %s',
      alignment => {
        it(`renders with ${alignment} alignment`, () => {
          render(<Text alignment={alignment}>Test text</Text>)
          expect(screen.getByText('Test text')).toBeVisible()
        })
      }
    )

    it('accepts multiple design token props simultaneously', () => {
      render(
        <Text
          size="xl"
          weight="medium"
          color="secondary"
          lineHeight="relaxed"
          alignment="center"
        >
          Combined props text
        </Text>
      )

      expect(screen.getByText('Combined props text')).toBeVisible()
    })

    it('renders with default values when no props provided', () => {
      render(<Text>Default text</Text>)

      expect(screen.getByText('Default text')).toBeVisible()
    })

    it('accepts design token props without variant', () => {
      render(
        <Text size="2xl" weight="bold" color="primary">
          Override defaults
        </Text>
      )

      expect(screen.getByText('Override defaults')).toBeVisible()
    })

    describe.each([
      { lineClamp: 1, label: 'Single Line Text' },
      { lineClamp: 2, label: 'Two Lines Text' },
      { lineClamp: 3, label: 'Three Lines Text' },
      { lineClamp: 4, label: 'Four Lines Text' },
      { lineClamp: 5, label: 'Five Lines Text' },
      { lineClamp: 6, label: 'Six Lines Text' },
      { lineClamp: 'none', label: 'No Clamp Text' },
    ] as const)('lineClamp prop: $lineClamp', ({ lineClamp, label }) => {
      it(`renders with ${lineClamp} line clamp prop`, () => {
        render(<Text lineClamp={lineClamp}>{label}</Text>)

        expect(screen.getByText(label)).toBeVisible()
      })
    })
  })

  it('accepts custom className prop', () => {
    render(<Text className="custom-class">Text</Text>)

    expect(screen.getByText('Text')).toBeVisible()
  })

  it('accepts custom style prop', () => {
    render(<Text style={{ fontSize: '16px' }}>Styled text</Text>)

    expect(screen.getByText('Styled text')).toBeVisible()
  })
})
