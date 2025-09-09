import { render, screen } from '@testing-library/react'

import { FaqSection } from '@/domains/home/faq/FaqSection'

describe('FaqSection', () => {
  it('renders the FAQ section with correct id and aria-label', () => {
    render(<FaqSection />)

    const section = screen.getByLabelText('FAQ')
    expect(section).toBeVisible()
    expect(section).toHaveAttribute('id', 'faq-section')
  })

  it('renders FaqHeader component', () => {
    render(<FaqSection />)

    // FaqHeader renders the main title
    expect(
      screen.getByRole('heading', { name: 'Frequently Asked Questions' })
    ).toBeVisible()
    expect(screen.getByText(/Find answers to common questions/)).toBeVisible()
  })

  it('renders FaqList component with FAQ items', () => {
    render(<FaqSection />)

    // FaqList should render multiple FAQ items - check for a few key questions
    expect(
      screen.getByText('Are you available for new projects?')
    ).toBeVisible()
    expect(screen.getByText('What is your hourly rate?')).toBeVisible()
    expect(screen.getByText('Do you work remotely?')).toBeVisible()
  })

  it('has proper semantic structure', () => {
    render(<FaqSection />)

    const section = screen.getByRole('region', { name: 'FAQ' })
    expect(section).toBeVisible()

    // Should contain a heading
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeVisible()
  })
})
