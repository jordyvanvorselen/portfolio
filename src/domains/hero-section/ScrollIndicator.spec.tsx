import { render, screen } from '@testing-library/react'

import { ScrollIndicator } from '@/domains/hero-section/ScrollIndicator'

describe('ScrollIndicator', () => {
  it('renders Discover My Core Expertise title', () => {
    render(<ScrollIndicator />)

    expect(screen.getByText('Discover My Core Expertise')).toBeVisible()
  })

  it('renders Explore the skills I master subtitle', () => {
    render(<ScrollIndicator />)

    expect(screen.getByText('Explore the skills I master')).toBeVisible()
  })
})
