import { render, screen } from '@testing-library/react'

import { ExpertiseSection } from '@/domains/expertise-section/ExpertiseSection'

describe('ExpertiseSection', () => {
  it('renders test-driven development expertise card', () => {
    render(<ExpertiseSection />)

    expect(
      screen.getByRole('article', { name: /test-driven development/i })
    ).toBeInTheDocument()
  })
})
