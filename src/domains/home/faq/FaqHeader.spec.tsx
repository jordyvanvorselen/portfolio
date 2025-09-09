import { render, screen } from '@testing-library/react'

import { FaqHeader } from '@/domains/home/faq/FaqHeader'

describe('FaqHeader', () => {
  it('renders the main heading with correct text', () => {
    render(<FaqHeader />)

    const heading = screen.getByRole('heading', {
      name: 'faq.section.title',
    })
    expect(heading).toBeVisible()
    expect(heading.tagName).toBe('H2')
  })

  it('renders the subtitle with descriptive text', () => {
    render(<FaqHeader />)

    const subtitle = screen.getByText('faq.section.description')
    expect(subtitle).toBeVisible()
  })

  it('has proper semantic structure with heading hierarchy', () => {
    render(<FaqHeader />)

    // Should have exactly one h2 heading
    const headings = screen.getAllByRole('heading')
    expect(headings).toHaveLength(1)
    expect(headings[0]?.tagName).toBe('H2')
  })

  it('renders text content in correct order', () => {
    render(<FaqHeader />)

    // Title should come before subtitle in DOM order
    const title = screen.getByText('faq.section.title')
    const subtitle = screen.getByText('faq.section.description')

    expect(
      title.compareDocumentPosition(subtitle) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
  })
})
