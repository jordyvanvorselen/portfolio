import { render, screen } from '@testing-library/react'

import { HeroSection } from '@/domains/home/hero/HeroSection'

describe('HeroSection', () => {
  it('renders availability badge', () => {
    render(<HeroSection />)

    expect(
      screen.getByText('Available for new remote opportunities')
    ).toBeVisible()
  })

  it('renders name heading', () => {
    render(<HeroSection />)

    expect(
      screen.getByRole('heading', { name: 'Jordy van Vorselen', level: 1 })
    ).toBeVisible()
  })

  it('renders title', () => {
    render(<HeroSection />)

    expect(screen.getByText('Senior Software Engineer')).toBeVisible()
  })

  it('renders description', () => {
    render(<HeroSection />)

    expect(
      screen.getByText(
        /I help engineering teams deliver better software faster/
      )
    ).toBeVisible()
  })
})
