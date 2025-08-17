import { render, screen } from '@testing-library/react'

import { Logo } from '@/ui/Logo'

describe('Logo', () => {
  describe.each([
    { scenario: 'without className', className: undefined },
    { scenario: 'with custom className', className: 'custom-class' },
  ])('className prop: $scenario', ({ scenario, className }) => {
    it(`renders logo as home link ${scenario}`, () => {
      render(<Logo {...(className ? { className } : {})} />)

      const logoLink = screen.getByRole('link', { name: 'Jordy van Vorselen' })
      expect(logoLink).toBeVisible()
      expect(logoLink).toHaveAttribute('href', '/')
    })

    it(`renders logo text ${scenario}`, () => {
      render(<Logo {...(className ? { className } : {})} />)

      expect(screen.getByText('Jordy van Vorselen')).toBeVisible()
    })

    if (className) {
      it('applies custom className to logo link', () => {
        render(<Logo {...(className ? { className } : {})} />)

        const logoLink = screen.getByRole('link', {
          name: 'Jordy van Vorselen',
        })
        expect(logoLink).toHaveClass(className)
      })
    }
  })
})
