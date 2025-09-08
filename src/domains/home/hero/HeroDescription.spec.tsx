import { render, screen } from '@testing-library/react'

import { HeroDescription } from '@/domains/home/hero/HeroDescription'

describe('HeroDescription', () => {
  it('displays description text', () => {
    render(<HeroDescription />)

    expect(screen.getByText('hero.description.main')).toBeVisible()
    expect(screen.getByText('hero.description.cta')).toBeVisible()
  })
})
