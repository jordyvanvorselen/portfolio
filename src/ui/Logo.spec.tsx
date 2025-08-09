import { render, screen } from '@testing-library/react'

import { Logo } from '@/ui/Logo'

describe('Logo', () => {
  it('renders logo as home link', () => {
    render(<Logo />)

    const logoLink = screen.getByRole('link', { name: 'Jordy van Vorselen' })
    expect(logoLink).toBeVisible()
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renders logo text', () => {
    render(<Logo />)

    expect(screen.getByText('Jordy van Vorselen')).toBeVisible()
  })

  it('accepts custom className', () => {
    render(<Logo className="custom-class" />)

    const logoLink = screen.getByRole('link', { name: 'Jordy van Vorselen' })
    expect(logoLink).toHaveClass('custom-class')
  })
})
