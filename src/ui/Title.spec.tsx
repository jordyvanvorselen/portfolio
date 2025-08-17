import { render, screen } from '@testing-library/react'

import { Title } from '@/ui/Title'

describe('Title', () => {
  describe('New prop-based API', () => {
    it('renders with default props', () => {
      render(<Title>Default Title</Title>)

      const heading = screen.getByRole('heading', {
        level: 2,
        name: 'Default Title',
      })
      expect(heading).toBeVisible()
    })

    describe.each([
      { size: 'xs', label: 'Extra Small' },
      { size: 'sm', label: 'Small' },
      { size: 'md', label: 'Medium' },
      { size: 'lg', label: 'Large' },
      { size: 'xl', label: 'Extra Large' },
      { size: '2xl', label: '2X Large' },
      { size: '3xl', label: '3X Large' },
      { size: '4xl', label: '4X Large' },
      { size: '5xl', label: '5X Large' },
    ] as const)('size prop: $size', ({ size, label }) => {
      it(`renders with ${size} size prop`, () => {
        render(<Title size={size}>{label}</Title>)

        const heading = screen.getByRole('heading', { name: label })
        expect(heading).toBeVisible()
      })
    })

    describe.each([
      { weight: 'normal', label: 'Normal Weight' },
      { weight: 'medium', label: 'Medium Weight' },
      { weight: 'semibold', label: 'Semibold Weight' },
      { weight: 'bold', label: 'Bold Weight' },
    ] as const)('weight prop: $weight', ({ weight, label }) => {
      it(`renders with ${weight} weight prop`, () => {
        render(<Title weight={weight}>{label}</Title>)

        const heading = screen.getByRole('heading', { name: label })
        expect(heading).toBeVisible()
      })
    })

    describe.each([
      { color: 'primary', label: 'Primary Color' },
      { color: 'secondary', label: 'Secondary Color' },
      { color: 'muted', label: 'Muted Color' },
      { color: 'accent', label: 'Accent Color' },
      { color: 'gradient', label: 'Gradient Color' },
    ] as const)('color prop: $color', ({ color, label }) => {
      it(`renders with ${color} color prop`, () => {
        render(<Title color={color}>{label}</Title>)

        const heading = screen.getByRole('heading', { name: label })
        expect(heading).toBeVisible()
      })
    })

    describe.each([
      { align: 'left', label: 'Left Aligned' },
      { align: 'center', label: 'Center Aligned' },
      { align: 'right', label: 'Right Aligned' },
    ] as const)('alignment prop: $align', ({ align, label }) => {
      it(`renders with ${align} alignment prop`, () => {
        render(<Title align={align}>{label}</Title>)

        const heading = screen.getByRole('heading', { name: label })
        expect(heading).toBeVisible()
      })
    })

    it('combines multiple props correctly', () => {
      render(
        <Title size="lg" weight="semibold" color="secondary" align="center">
          Combined Props
        </Title>
      )

      const heading = screen.getByRole('heading', { name: 'Combined Props' })
      expect(heading).toBeVisible()
    })

    it('accepts custom className with new API', () => {
      render(<Title className="custom-class">Custom Class</Title>)

      const heading = screen.getByRole('heading', { name: 'Custom Class' })
      expect(heading).toBeVisible()
    })

    it('renders with custom element type using as prop', () => {
      render(
        <Title as="h1" size="5xl">
          Custom Element
        </Title>
      )

      const heading = screen.getByRole('heading', {
        level: 1,
        name: 'Custom Element',
      })
      expect(heading).toBeVisible()
    })

    it('renders with uppercase prop', () => {
      render(<Title uppercase>Uppercase Title</Title>)

      const heading = screen.getByRole('heading', { name: 'Uppercase Title' })
      expect(heading).toBeVisible()
    })

    describe.each([
      { tracking: 'normal', label: 'Normal Tracking' },
      { tracking: 'wide', label: 'Wide Tracking' },
      { tracking: 'wider', label: 'Wider Tracking' },
    ] as const)('tracking prop: $tracking', ({ tracking, label }) => {
      it(`renders with ${tracking} tracking prop`, () => {
        render(<Title tracking={tracking}>{label}</Title>)

        const heading = screen.getByRole('heading', { name: label })
        expect(heading).toBeVisible()
      })
    })

    describe.each([
      { hoverColor: 'teal', label: 'Teal Hover' },
      { hoverColor: 'blue', label: 'Blue Hover' },
      { hoverColor: 'white', label: 'White Hover' },
      { hoverColor: 'none', label: 'No Hover' },
    ] as const)('hoverColor prop: $hoverColor', ({ hoverColor, label }) => {
      it(`renders with ${hoverColor} hover color prop`, () => {
        render(<Title hoverColor={hoverColor}>{label}</Title>)

        const heading = screen.getByRole('heading', { name: label })
        expect(heading).toBeVisible()
      })
    })

    describe.each([
      { lineClamp: 1, label: 'Single Line' },
      { lineClamp: 2, label: 'Two Lines' },
      { lineClamp: 3, label: 'Three Lines' },
      { lineClamp: 4, label: 'Four Lines' },
      { lineClamp: 'none', label: 'No Clamp' },
    ] as const)('lineClamp prop: $lineClamp', ({ lineClamp, label }) => {
      it(`renders with ${lineClamp} line clamp prop`, () => {
        render(<Title lineClamp={lineClamp}>{label}</Title>)

        const heading = screen.getByRole('heading', { name: label })
        expect(heading).toBeVisible()
      })
    })

    it('combines uppercase and tracking props correctly', () => {
      render(
        <Title uppercase tracking="wide">
          Uppercase Wide Tracking
        </Title>
      )

      const heading = screen.getByRole('heading', {
        name: 'Uppercase Wide Tracking',
      })
      expect(heading).toBeVisible()
    })
  })

  describe('TypeScript type exports', () => {
    it('exports TitleSize type', () => {
      // This test ensures the types are properly exported
      const size: import('@/ui/Title').TitleSize = 'md'
      expect(size).toBe('md')
    })

    it('exports TitleWeight type', () => {
      const weight: import('@/ui/Title').TitleWeight = 'bold'
      expect(weight).toBe('bold')
    })

    it('exports TitleColor type', () => {
      const color: import('@/ui/Title').TitleColor = 'primary'
      expect(color).toBe('primary')
    })

    it('exports TitleAlignment type', () => {
      const align: import('@/ui/Title').TitleAlignment = 'center'
      expect(align).toBe('center')
    })
  })
})
