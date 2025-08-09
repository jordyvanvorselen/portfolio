import { render, screen } from '@testing-library/react'

import { ExpertiseLabel } from './ExpertiseLabel'

describe('ExpertiseLabel', () => {
  it('displays "Core Expertise" text', () => {
    render(<ExpertiseLabel />)

    expect(screen.getByText('Core Expertise')).toBeVisible()
  })

  it('renders as a styled badge with proper attributes', () => {
    render(<ExpertiseLabel />)

    const label = screen.getByText('Core Expertise')
    expect(label).toHaveAttribute('role', 'status')
    expect(label).toHaveAttribute('aria-live', 'polite')
  })
})
