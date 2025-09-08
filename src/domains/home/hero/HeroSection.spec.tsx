import { render, screen } from '@testing-library/react'

import { HeroSection } from '@/domains/home/hero/HeroSection'

describe('HeroSection', () => {
  it('renders name heading with translation key', () => {
    render(<HeroSection />)

    expect(
      screen.getByRole('heading', { name: 'hero.name', level: 1 })
    ).toBeVisible()
  })

  it('renders title with translation key', () => {
    render(<HeroSection />)

    expect(screen.getByText('hero.title')).toBeVisible()
  })

  it('renders description with translation keys', () => {
    render(<HeroSection />)

    expect(screen.getByText('hero.description.main')).toBeVisible()
    expect(screen.getByText('hero.description.cta')).toBeVisible()
  })
})
