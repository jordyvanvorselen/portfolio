import { render, screen } from '@testing-library/react'

import { HeroSection } from './HeroSection'

describe('HeroSection', () => {
  it('renders availability badge', () => {
    render(<HeroSection />)
    
    expect(screen.getByText('Available for new opportunities')).toBeVisible()
  })

  it('renders name heading', () => {
    render(<HeroSection />)
    
    expect(screen.getByRole('heading', { name: 'Jordy van Vorselen', level: 1 })).toBeVisible()
  })

  it('renders title', () => {
    render(<HeroSection />)
    
    expect(screen.getByText('Senior Software Engineer')).toBeVisible()
  })
})