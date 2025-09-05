import { render, screen } from '@testing-library/react'

import { HeroDescription } from '@/domains/home/hero/HeroDescription'

describe('HeroDescription', () => {
  it('displays description text', () => {
    render(<HeroDescription />)

    expect(
      screen.getByText(/I help deliver better software, faster/)
    ).toBeVisible()
  })
})
