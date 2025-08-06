import { render, screen } from '@testing-library/react'

import { HeroSection } from './HeroSection'

describe('HeroSection', () => {
  it('renders hero section content', () => {
    render(<HeroSection />)
    
    expect(screen.getByText('Hero Section Placeholder')).toBeInTheDocument()
  })
})