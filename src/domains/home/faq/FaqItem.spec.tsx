import { render, screen, fireEvent } from '@testing-library/react'

import { FaqItem } from '@/domains/home/faq/FaqItem'
import { AccordionContext } from '@/ui/Accordion'

describe('FaqItem', () => {
  const mockFaq = {
    questionKey: 'faq.items.test.question',
    answerKey: 'faq.items.test.answer',
  }

  const mockSetOpenIndex = jest.fn()

  const renderFaqItem = (
    index = 0,
    faq = mockFaq,
    openIndex: number | null = null
  ) => {
    const contextValue = {
      openIndex,
      setOpenIndex: mockSetOpenIndex,
      allowMultiple: false,
    }

    return render(
      <AccordionContext.Provider value={contextValue}>
        <FaqItem index={index} faq={faq} />
      </AccordionContext.Provider>
    )
  }

  it('displays the FAQ question', () => {
    renderFaqItem()

    expect(screen.getByText('faq.items.test.question')).toBeVisible()
  })

  it('displays the FAQ answer when expanded', () => {
    // Render as expanded (openIndex matches this item's index)
    renderFaqItem(0, mockFaq, 0)

    expect(screen.getByText('faq.items.test.answer')).toBeVisible()
  })

  it('hides the FAQ answer when collapsed', () => {
    // Render as collapsed (openIndex is null)
    renderFaqItem(0, mockFaq, null)

    expect(screen.queryByText('faq.items.test.answer')).not.toBeInTheDocument()
  })

  it('hides the FAQ answer when another item is open', () => {
    // Render with openIndex pointing to different item
    renderFaqItem(0, mockFaq, 1)

    expect(screen.queryByText('faq.items.test.answer')).not.toBeInTheDocument()
  })

  it('calls setOpenIndex when clicked to expand', () => {
    renderFaqItem(0, mockFaq, null)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockSetOpenIndex).toHaveBeenCalledWith(0)
  })

  it('calls setOpenIndex when clicked to collapse', () => {
    renderFaqItem(0, mockFaq, 0) // Currently open

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockSetOpenIndex).toHaveBeenCalledWith(null)
  })

  it('handles different FAQ data correctly', () => {
    const differentFaq = {
      questionKey: 'faq.items.testing.question',
      answerKey: 'faq.items.testing.answer',
    }

    renderFaqItem(1, differentFaq)

    expect(screen.getByText('faq.items.testing.question')).toBeVisible()
    expect(
      screen.queryByText('faq.items.testing.answer')
    ).not.toBeInTheDocument()
  })

  it('shows answer for different FAQ when expanded', () => {
    const differentFaq = {
      questionKey: 'faq.items.testing.question',
      answerKey: 'faq.items.testing.answer',
    }

    renderFaqItem(1, differentFaq, 1) // This item is expanded

    expect(screen.getByText('faq.items.testing.answer')).toBeVisible()
  })

  it('handles keyboard interaction', () => {
    renderFaqItem(0, mockFaq, null)

    const button = screen.getByRole('button')
    fireEvent.keyDown(button, { key: 'Enter' })

    expect(mockSetOpenIndex).toHaveBeenCalledWith(0)
  })

  it('handles space key interaction', () => {
    renderFaqItem(0, mockFaq, null)

    const button = screen.getByRole('button')
    fireEvent.keyDown(button, { key: ' ' })

    expect(mockSetOpenIndex).toHaveBeenCalledWith(0)
  })

  it('has correct aria-expanded when closed', () => {
    renderFaqItem(0, mockFaq, null)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('has correct aria-expanded when open', () => {
    renderFaqItem(0, mockFaq, 0)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('has proper aria-label for accessibility', () => {
    renderFaqItem(0, mockFaq)

    const card = screen.getByLabelText('FAQ: faq.items.test.question')
    expect(card).toBeVisible()
  })

  it('works with different index values', () => {
    renderFaqItem(5, mockFaq, null)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockSetOpenIndex).toHaveBeenCalledWith(5)
  })
})
