import { render, screen } from '@testing-library/react'

import { AvailabilityBadge } from '@/domains/home/hero/AvailabilityBadge'

describe('AvailabilityBadge', () => {
  it('displays availability text', () => {
    render(<AvailabilityBadge />)

    expect(
      screen.getByText('Available for new remote opportunities')
    ).toBeVisible()
  })
})
