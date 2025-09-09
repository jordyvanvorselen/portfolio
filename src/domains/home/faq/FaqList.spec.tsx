import { render, screen, fireEvent } from '@testing-library/react'

import { FaqList } from '@/domains/home/faq/FaqList'

describe('FaqList', () => {
  it('renders all FAQ items from the data', () => {
    render(<FaqList />)

    // Check that all FAQ questions are rendered
    expect(screen.getByText('faq.items.availability.question')).toBeVisible()
    expect(screen.getByText('faq.items.rate.question')).toBeVisible()
    expect(screen.getByText('faq.items.technology.question')).toBeVisible()
    expect(screen.getByText('faq.items.remote.question')).toBeVisible()
    expect(screen.getByText('faq.items.advice.question')).toBeVisible()
    expect(screen.getByText('faq.items.startup.question')).toBeVisible()
  })

  it('initially shows no expanded FAQ answers', () => {
    render(<FaqList />)

    // None of the answers should be visible initially
    expect(
      screen.queryByText('faq.items.availability.answer')
    ).not.toBeInTheDocument()
    expect(screen.queryByText('faq.items.rate.answer')).not.toBeInTheDocument()
    expect(
      screen.queryByText('faq.items.technology.answer')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('faq.items.remote.answer')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('faq.items.advice.answer')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('faq.items.startup.answer')
    ).not.toBeInTheDocument()
  })

  it('expands FAQ item when clicked', () => {
    render(<FaqList />)

    const firstFaq = screen.getByLabelText(
      'FAQ: faq.items.availability.question'
    )
    fireEvent.click(firstFaq)

    // Answer should now be visible
    expect(screen.getByText('faq.items.availability.answer')).toBeVisible()
  })

  it('collapses FAQ item when clicked again', () => {
    render(<FaqList />)

    const firstFaq = screen.getByLabelText(
      'FAQ: faq.items.availability.question'
    )

    // Expand
    fireEvent.click(firstFaq)
    expect(screen.getByText('faq.items.availability.answer')).toBeVisible()

    // Collapse
    fireEvent.click(firstFaq)
    expect(
      screen.queryByText('faq.items.availability.answer')
    ).not.toBeInTheDocument()
  })

  it('only allows one FAQ to be open at a time', () => {
    render(<FaqList />)

    const firstFaq = screen.getByLabelText(
      'FAQ: faq.items.availability.question'
    )
    const secondFaq = screen.getByLabelText('FAQ: faq.items.rate.question')

    // Open first FAQ
    fireEvent.click(firstFaq)
    expect(screen.getByText('faq.items.availability.answer')).toBeVisible()

    // Open second FAQ - first should close
    fireEvent.click(secondFaq)
    expect(
      screen.queryByText('faq.items.availability.answer')
    ).not.toBeInTheDocument()
    expect(screen.getByText('faq.items.rate.answer')).toBeVisible()
  })

  it('handles keyboard interaction', () => {
    render(<FaqList />)

    const firstFaq = screen.getByLabelText(
      'FAQ: faq.items.availability.question'
    )

    // Press Enter
    fireEvent.keyDown(firstFaq, { key: 'Enter' })

    expect(screen.getByText('faq.items.availability.answer')).toBeVisible()
  })

  it('handles Space key interaction', () => {
    render(<FaqList />)

    const firstFaq = screen.getByLabelText(
      'FAQ: faq.items.availability.question'
    )

    // Press Space
    fireEvent.keyDown(firstFaq, { key: ' ' })

    expect(screen.getByText('faq.items.availability.answer')).toBeVisible()
  })

  it('maintains proper ARIA expanded state', () => {
    render(<FaqList />)

    // Find the button element that has aria-expanded attribute
    const firstFaqButton = screen.getAllByRole('button')[0]!

    // Initially collapsed
    expect(firstFaqButton).toHaveAttribute('aria-expanded', 'false')

    // Expand
    fireEvent.click(firstFaqButton)
    expect(firstFaqButton).toHaveAttribute('aria-expanded', 'true')

    // Collapse
    fireEvent.click(firstFaqButton)
    expect(firstFaqButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders correct number of FAQ items', () => {
    render(<FaqList />)

    const faqButtons = screen.getAllByRole('button')
    expect(faqButtons).toHaveLength(6) // Based on the faqData having 6 items
  })
})
