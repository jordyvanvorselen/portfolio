import { render, screen } from '@testing-library/react'

import { HeroSection } from './HeroSection'

describe('HeroSection', () => {
  it('renders availability badge', () => {
    render(<HeroSection />)
    
    expect(screen.getByText('Available for new opportunities')).toBeVisible()
  })
})