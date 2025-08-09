import { render, screen } from '@testing-library/react'

import { ScrollIndicator } from '@/domains/hero-section/ScrollIndicator'

describe('ScrollIndicator', () => {
  it('renders SCROLL text', () => {
    render(<ScrollIndicator />)

    expect(screen.getByText('SCROLL')).toBeVisible()
  })
})
