import { render, screen } from '@testing-library/react'

import { HeroActions } from '@/domains/home/hero/HeroActions'

describe('HeroActions', () => {
  it('renders Get In Touch link', () => {
    render(<HeroActions />)

    expect(screen.getByRole('link', { name: 'Get In Touch' })).toBeVisible()
  })

  it('renders Download Resume button', () => {
    render(<HeroActions />)

    expect(
      screen.getByRole('button', { name: 'Download Resume' })
    ).toBeVisible()
  })
})
