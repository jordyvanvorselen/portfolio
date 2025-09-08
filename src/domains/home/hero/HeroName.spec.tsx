import { render, screen } from '@testing-library/react'

import { HeroName } from '@/domains/home/hero/HeroName'

describe('HeroName', () => {
  it('displays name as heading', () => {
    render(<HeroName />)

    expect(screen.getByText('hero.name')).toBeVisible()
  })
})
