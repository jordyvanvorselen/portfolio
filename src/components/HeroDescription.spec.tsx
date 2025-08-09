import { render, screen } from '@testing-library/react'

import { HeroDescription } from './HeroDescription'

describe('HeroDescription', () => {
  it('displays description text', () => {
    render(<HeroDescription />)

    expect(
      screen.getByText(
        /I help engineering teams deliver better software faster/
      )
    ).toBeVisible()
  })
})
