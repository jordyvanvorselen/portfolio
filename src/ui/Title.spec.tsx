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
        <Title as="h1" size="4xl">
          Custom Element
        </Title>
      )

      const heading = screen.getByRole('heading', {
        level: 1,
        name: 'Custom Element',
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
