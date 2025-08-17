import { render, screen } from '@testing-library/react'

import { StatItem } from '@/ui/StatItem'

describe('StatItem', () => {
  it('renders stat with value and label', () => {
    render(<StatItem value={15} label="Projects" />)

    expect(screen.getByText('15')).toBeVisible()
    expect(screen.getByText('Projects')).toBeVisible()
  })

  it('formats large numbers with commas', () => {
    render(<StatItem value={2500} label="Stars" />)

    expect(screen.getByText('2,500')).toBeVisible()
  })

  describe.each([
    ['default', 100, 'Default Color Test'],
    ['primary', 200, 'Primary Color Test'],
    ['secondary', 300, 'Secondary Color Test'],
    ['accent', 400, 'Accent Color Test'],
  ])('color prop: %s', (color, value, label) => {
    it(`accepts ${color} color without errors`, () => {
      render(
        <StatItem
          value={value}
          label={label}
          color={color as 'default' | 'primary' | 'secondary' | 'accent'}
        />
      )
      expect(screen.getByText(value.toString())).toBeVisible()
      expect(screen.getByText(label)).toBeVisible()
    })
  })

  describe.each([
    ['default', 15, 'Projects', true, 'renders default layout by default'],
    ['floating', 2800, 'stars', false, 'renders floating layout'],
  ])(
    'layout prop: %s',
    (layout, value, label, shouldShowLabel, testDescription) => {
      it(testDescription, () => {
        const props =
          layout === 'default'
            ? { value, label }
            : {
                value,
                label,
                layout: layout as 'floating',
              }

        render(<StatItem {...props} />)

        const expectedValueText = value === 2800 ? '2,800' : value.toString()
        expect(screen.getByText(expectedValueText)).toBeVisible()

        if (shouldShowLabel) {
          expect(screen.getByText(label)).toBeVisible()
        } else {
          // Floating layout doesn't display the label, only the value
          expect(screen.queryByText(label)).not.toBeInTheDocument()
        }
      })
    }
  )

  describe.each([
    ['sm', 100, 'Small Size Test'],
    ['md', 200, 'Medium Size Test'],
    ['lg', 300, 'Large Size Test'],
  ])('size prop: %s', (size, value, label) => {
    it(`accepts ${size} size without errors`, () => {
      render(
        <StatItem
          value={value}
          label={label}
          size={size as 'sm' | 'md' | 'lg'}
        />
      )
      expect(screen.getByText(value.toString())).toBeVisible()
      expect(screen.getByText(label)).toBeVisible()
    })
  })

  describe('size prop', () => {
    it('applies medium size by default', () => {
      render(<StatItem value={100} label="Default Size Test" />)

      expect(screen.getByText('100')).toBeVisible()
      expect(screen.getByText('Default Size Test')).toBeVisible()
    })
  })

  it('accepts custom className', () => {
    render(
      <StatItem value={50} label="Custom Class Test" className="custom-class" />
    )

    expect(screen.getByText('50')).toBeVisible()
    expect(screen.getByText('Custom Class Test')).toBeVisible()
  })

  it('renders with icon when provided', () => {
    const TestIcon = () => <div data-testid="test-icon">Icon</div>
    render(<StatItem value={25} label="Icon Test" icon={<TestIcon />} />)

    expect(screen.getByTestId('test-icon')).toBeVisible()
    expect(screen.getByText('25')).toBeVisible()
    expect(screen.getByText('Icon Test')).toBeVisible()
  })

  it('renders without icon when not provided', () => {
    render(<StatItem value={30} label="No Icon Test" />)

    expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument()
    expect(screen.getByText('30')).toBeVisible()
    expect(screen.getByText('No Icon Test')).toBeVisible()
  })

  it('renders icon in default layout', () => {
    const TestIcon = () => <div data-testid="test-icon">Icon</div>
    render(
      <StatItem
        value={25}
        label="Default Icon Test"
        icon={<TestIcon />}
        layout="default"
      />
    )

    expect(screen.getByTestId('test-icon')).toBeVisible()
    expect(screen.getByText('25')).toBeVisible()
    expect(screen.getByText('Default Icon Test')).toBeVisible()
  })

  describe('number formatting', () => {
    it('formats different number sizes correctly', () => {
      const { rerender } = render(<StatItem value={5} label="Small Number" />)
      expect(screen.getByText('5')).toBeVisible()

      rerender(<StatItem value={1000} label="Thousand" />)
      expect(screen.getByText('1,000')).toBeVisible()

      rerender(<StatItem value={1000000} label="Million" />)
      expect(screen.getByText('1,000,000')).toBeVisible()
    })
  })

  describe('props combinations', () => {
    it('accepts all props combined without errors', () => {
      const TestIcon = () => <div data-testid="combined-icon">Icon</div>
      render(
        <StatItem
          value={999}
          label="Combined Props Test"
          color="primary"
          size="lg"
          layout="default"
          icon={<TestIcon />}
          className="test-class"
        />
      )

      expect(screen.getByText('999')).toBeVisible()
      expect(screen.getByText('Combined Props Test')).toBeVisible()
      expect(screen.getByTestId('combined-icon')).toBeVisible()
    })
  })
})
