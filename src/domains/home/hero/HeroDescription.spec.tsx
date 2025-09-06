import { render, screen } from '@testing-library/react'

import { HeroDescription } from '@/domains/home/hero/HeroDescription'

describe('HeroDescription', () => {
  it('displays description text', () => {
    render(<HeroDescription />)

    expect(
      screen.getByText((_content, element) => {
        return (
          element?.textContent ===
          "I help teams deliver software of exceptional quality — and help them deliver it to the customers a lot faster, while we're at it."
        )
      })
    ).toBeVisible()
  })
})
