import { render, screen } from '@testing-library/react'

import { ExpertiseSection } from '@/domains/home/expertise/ExpertiseSection'

describe('ExpertiseSection', () => {
  it('renders expertise section heading', () => {
    render(<ExpertiseSection />)

    expect(screen.getByText('expertise.section.title')).toBeVisible()
  })

  it('renders expertise section description', () => {
    render(<ExpertiseSection />)

    expect(screen.getByText('expertise.section.description')).toBeVisible()
  })

  it('has correct aria-label', () => {
    render(<ExpertiseSection />)

    expect(
      screen.getByRole('region', { name: 'expertise.section.ariaLabel' })
    ).toBeInTheDocument()
  })

  it('renders test-driven development expertise card', () => {
    render(<ExpertiseSection />)

    expect(
      screen.getByRole('article', { name: /expertise\.tdd\.ariaLabel/i })
    ).toBeInTheDocument()
  })
})
