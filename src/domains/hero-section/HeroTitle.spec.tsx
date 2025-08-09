import { render, screen } from '@testing-library/react'

import { HeroTitle } from '@/domains/hero-section/HeroTitle'

describe('HeroTitle', () => {
  it('displays title text', () => {
    render(<HeroTitle />)

    expect(screen.getByText('Senior Software Engineer')).toBeVisible()
  })
})
