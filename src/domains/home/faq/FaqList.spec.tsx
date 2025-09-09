import { render, screen, fireEvent } from '@testing-library/react'

import { FaqList } from '@/domains/home/faq/FaqList'

describe('FaqList', () => {
  it('renders all FAQ items from the data', () => {
    render(<FaqList />)

    // Check that all FAQ questions are rendered
    expect(
      screen.getByText('Are you available for new projects?')
    ).toBeVisible()
    expect(screen.getByText('What is your hourly rate?')).toBeVisible()
    expect(
      screen.getByText('Are you experienced with <Some Other Technology>?')
    ).toBeVisible()
    expect(screen.getByText('Do you work remotely?')).toBeVisible()
    expect(
      screen.getByText('I just want a bit of advice, can you help?')
    ).toBeVisible()
    expect(
      screen.getByText(
        "I'm a startup and I don't have a big budget. Can you still help?"
      )
    ).toBeVisible()
  })

  it('initially shows no expanded FAQ answers', () => {
    render(<FaqList />)

    // None of the answers should be visible initially
    expect(
      screen.queryByText(/Yes, I am currently open to new opportunities/)
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(/My hourly rate is €95,00 per hour/)
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(/quickly mastering new technologies/)
    ).not.toBeInTheDocument()
  })

  it('expands FAQ item when clicked', () => {
    render(<FaqList />)

    const firstFaq = screen.getByRole('button', {
      name: /Are you available for new projects?/,
    })
    fireEvent.click(firstFaq)

    // Answer should now be visible
    expect(
      screen.getByText(
        /Yes, I am currently open to new opportunities and projects/
      )
    ).toBeVisible()
  })

  it('collapses FAQ item when clicked again', () => {
    render(<FaqList />)

    const firstFaq = screen.getByRole('button', {
      name: /Are you available for new projects?/,
    })

    // Expand
    fireEvent.click(firstFaq)
    expect(
      screen.getByText(
        /Yes, I am currently open to new opportunities and projects/
      )
    ).toBeVisible()

    // Collapse
    fireEvent.click(firstFaq)
    expect(
      screen.queryByText(
        /Yes, I am currently open to new opportunities and projects/
      )
    ).not.toBeInTheDocument()
  })

  it('only allows one FAQ to be open at a time', () => {
    render(<FaqList />)

    const firstFaq = screen.getByRole('button', {
      name: /Are you available for new projects?/,
    })
    const secondFaq = screen.getByRole('button', {
      name: /What is your hourly rate?/,
    })

    // Open first FAQ
    fireEvent.click(firstFaq)
    expect(
      screen.getByText(
        /Yes, I am currently open to new opportunities and projects/
      )
    ).toBeVisible()

    // Open second FAQ - first should close
    fireEvent.click(secondFaq)
    expect(
      screen.queryByText(
        /Yes, I am currently open to new opportunities and projects/
      )
    ).not.toBeInTheDocument()
    expect(screen.getByText(/My hourly rate is €95,00 per hour/)).toBeVisible()
  })

  it('handles keyboard interaction', () => {
    render(<FaqList />)

    const firstFaq = screen.getByRole('button', {
      name: /Are you available for new projects?/,
    })

    // Press Enter
    fireEvent.keyDown(firstFaq, { key: 'Enter' })

    expect(
      screen.getByText(
        /Yes, I am currently open to new opportunities and projects/
      )
    ).toBeVisible()
  })

  it('handles Space key interaction', () => {
    render(<FaqList />)

    const firstFaq = screen.getByRole('button', {
      name: /Are you available for new projects?/,
    })

    // Press Space
    fireEvent.keyDown(firstFaq, { key: ' ' })

    expect(
      screen.getByText(
        /Yes, I am currently open to new opportunities and projects/
      )
    ).toBeVisible()
  })

  it('maintains proper ARIA expanded state', () => {
    render(<FaqList />)

    const firstFaq = screen.getByRole('button', {
      name: /Are you available for new projects?/,
    })

    // Initially collapsed
    expect(firstFaq).toHaveAttribute('aria-expanded', 'false')

    // Expand
    fireEvent.click(firstFaq)
    expect(firstFaq).toHaveAttribute('aria-expanded', 'true')

    // Collapse
    fireEvent.click(firstFaq)
    expect(firstFaq).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders correct number of FAQ items', () => {
    render(<FaqList />)

    const faqButtons = screen.getAllByRole('button')
    expect(faqButtons).toHaveLength(6) // Based on the faqData having 6 items
  })
})
