import { render, screen } from '@testing-library/react'

import { ExpertiseSection } from '@/domains/home/expertise/ExpertiseSection'

describe('ExpertiseSection', () => {
  it('renders core expertise label', () => {
    render(<ExpertiseSection />)

    expect(screen.getByText('Core Expertise')).toBeVisible()
  })

  it('renders test-driven development expertise card', () => {
    render(<ExpertiseSection />)

    expect(
      screen.getByRole('article', { name: /test-driven development/i })
    ).toBeInTheDocument()
  })
})
