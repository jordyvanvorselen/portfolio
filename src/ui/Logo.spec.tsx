import { render, screen } from '@testing-library/react'

import { Logo } from '@/ui/Logo'

describe('Logo', () => {
  it('uses translation for brand name', () => {
    render(<Logo />)

    expect(screen.getByText('layout.brandName')).toBeVisible()
  })

  describe.each([
    { scenario: 'without className', className: undefined },
    { scenario: 'with custom className', className: 'custom-class' },
  ])('className prop: $scenario', ({ scenario, className }) => {
    it(`renders logo as home link ${scenario}`, () => {
      render(<Logo {...(className ? { className } : {})} />)

      const logoLink = screen.getByRole('link', { name: 'layout.brandName' })
      expect(logoLink).toBeVisible()
      expect(logoLink).toHaveAttribute('href', '/')
    })

    it(`renders logo text ${scenario}`, () => {
      render(<Logo {...(className ? { className } : {})} />)

      expect(screen.getByText('layout.brandName')).toBeVisible()
    })

    if (className) {
      it('applies custom className to logo link', () => {
        render(<Logo {...(className ? { className } : {})} />)

        const logoLink = screen.getByRole('link', {
          name: 'layout.brandName',
        })
        expect(logoLink).toHaveClass(className)
      })
    }
  })
})
