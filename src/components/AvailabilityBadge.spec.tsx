import { render, screen } from '@testing-library/react'

import { AvailabilityBadge } from './AvailabilityBadge'

describe('AvailabilityBadge', () => {
  it('displays availability text', () => {
    render(<AvailabilityBadge />)
    
    expect(screen.getByText('Available for new opportunities')).toBeVisible()
  })
})