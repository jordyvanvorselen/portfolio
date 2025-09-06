import { render, screen } from '@testing-library/react'

import { ExpertiseSection } from '@/domains/home/expertise/ExpertiseSection'

describe('ExpertiseSection', () => {
  it('renders expertise section heading', () => {
    render(<ExpertiseSection />)

    expect(screen.getByText('Want To Deliver Faster?')).toBeVisible()
  })

  it('renders test-driven development expertise card', () => {
    render(<ExpertiseSection />)

    expect(
      screen.getByRole('article', { name: /test-driven development/i })
    ).toBeInTheDocument()
  })
})
