import { render, screen } from '@testing-library/react'

import { FaqSection } from '@/domains/home/faq/FaqSection'

describe('FaqSection', () => {
  it('renders the FAQ section with correct id and aria-label', () => {
    render(<FaqSection />)

    const section = screen.getByLabelText('faq.section.ariaLabel')
    expect(section).toBeVisible()
    expect(section).toHaveAttribute('id', 'faq-section')
  })

  it('renders FaqHeader component', () => {
    render(<FaqSection />)

    // FaqHeader renders the main title
    expect(
      screen.getByRole('heading', { name: 'faq.section.title' })
    ).toBeVisible()
    expect(screen.getByText('faq.section.description')).toBeVisible()
  })

  it('renders FaqList component with FAQ items', () => {
    render(<FaqSection />)

    // FaqList should render multiple FAQ items - check for a few key questions
    expect(screen.getByText('faq.items.availability.question')).toBeVisible()
    expect(screen.getByText('faq.items.rate.question')).toBeVisible()
    expect(screen.getByText('faq.items.remote.question')).toBeVisible()
  })

  it('has proper semantic structure', () => {
    render(<FaqSection />)

    const section = screen.getByRole('region', {
      name: 'faq.section.ariaLabel',
    })
    expect(section).toBeVisible()

    // Should contain a heading
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeVisible()
  })
})
