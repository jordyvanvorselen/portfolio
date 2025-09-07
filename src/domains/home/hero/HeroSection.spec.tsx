import { render, screen } from '@testing-library/react'

import { HeroSection } from '@/domains/home/hero/HeroSection'

describe('HeroSection', () => {
  it('renders name heading', () => {
    render(<HeroSection />)

    expect(
      screen.getByRole('heading', { name: 'Jordy van Vorselen', level: 1 })
    ).toBeVisible()
  })

  it('renders title', () => {
    render(<HeroSection />)

    expect(screen.getByText('Freelance Software Engineer')).toBeVisible()
  })

  it('renders description', () => {
    render(<HeroSection />)

    expect(
      screen.getByText((_content, element) => {
        return (
          element?.textContent ===
          'I help teams deliver software of exceptional quality — and help them deliver it to the customers a lot faster at the same time.'
        )
      })
    ).toBeVisible()
  })
})
