import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import { AccordionItem } from '@/ui/AccordionItem'
import { AccordionContext } from '@/ui/Accordion'

describe('AccordionItem', () => {
  const mockSetOpenIndex = vi.fn()

  beforeEach(() => {
    mockSetOpenIndex.mockClear()
  })

  const renderAccordionItem = (
    index = 0,
    openIndex: number | null = null,
    ariaLabel?: string,
    className?: string
  ) => {
    const contextValue = {
      openIndex,
      setOpenIndex: mockSetOpenIndex,
      allowMultiple: false,
    }

    return render(
      <AccordionContext.Provider value={contextValue}>
        <AccordionItem
          index={index}
          trigger={<span>Test trigger</span>}
          {...(ariaLabel && { ariaLabel })}
          {...(className && { className })}
        >
          <div>Test content</div>
        </AccordionItem>
      </AccordionContext.Provider>
    )
  }

  it('renders trigger content', () => {
    renderAccordionItem()

    expect(screen.getByText('Test trigger')).toBeVisible()
  })

  it('shows content when item is open', () => {
    renderAccordionItem(0, 0) // index 0, openIndex 0 (open)

    expect(screen.getByText('Test content')).toBeVisible()
  })

  it('hides content when item is closed', () => {
    renderAccordionItem(0, null) // index 0, openIndex null (closed)

    expect(screen.queryByText('Test content')).not.toBeInTheDocument()
  })

  it('hides content when another item is open', () => {
    renderAccordionItem(0, 1) // index 0, openIndex 1 (different item open)

    expect(screen.queryByText('Test content')).not.toBeInTheDocument()
  })

  it('calls setOpenIndex when clicked to expand', () => {
    renderAccordionItem(2, null) // Currently closed

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockSetOpenIndex).toHaveBeenCalledWith(2)
  })

  it('calls setOpenIndex with null when clicked to collapse', () => {
    renderAccordionItem(2, 2) // Currently open

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockSetOpenIndex).toHaveBeenCalledWith(null)
  })

  it('handles Enter key press', () => {
    renderAccordionItem(3, null)

    const button = screen.getByRole('button')
    fireEvent.keyDown(button, { key: 'Enter' })

    expect(mockSetOpenIndex).toHaveBeenCalledWith(3)
  })

  it('handles Space key press', () => {
    renderAccordionItem(4, null)

    const button = screen.getByRole('button')
    fireEvent.keyDown(button, { key: ' ' })

    expect(mockSetOpenIndex).toHaveBeenCalledWith(4)
  })

  it('prevents default behavior on Enter key', () => {
    const preventDefaultSpy = vi.fn()

    renderAccordionItem(0, null)
    const button = screen.getByRole('button')

    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    event.preventDefault = preventDefaultSpy

    fireEvent(button, event)

    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('prevents default behavior on Space key', () => {
    const preventDefaultSpy = vi.fn()

    renderAccordionItem(0, null)
    const button = screen.getByRole('button')

    const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true })
    event.preventDefault = preventDefaultSpy

    fireEvent(button, event)

    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('ignores other key presses', () => {
    renderAccordionItem(5, null)

    const button = screen.getByRole('button')
    fireEvent.keyDown(button, { key: 'Escape' })

    expect(mockSetOpenIndex).not.toHaveBeenCalled()
  })

  it('has correct aria-expanded when closed', () => {
    renderAccordionItem(0, null)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('has correct aria-expanded when open', () => {
    renderAccordionItem(0, 0)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('applies aria-label when provided', () => {
    renderAccordionItem(0, null, 'Test accordion item')

    const card = screen.getByLabelText('Test accordion item')
    expect(card).toBeVisible()
  })

  it('applies custom className when provided', () => {
    const { container } = renderAccordionItem(
      0,
      null,
      undefined,
      'custom-class'
    )

    expect(container.querySelector('.custom-class')).toBeVisible()
  })

  it('has cursor pointer styling', () => {
    renderAccordionItem()

    const button = screen.getByRole('button')
    expect(button).toHaveClass('cursor-pointer')
  })

  it('shows chevron icon in correct state when closed', () => {
    renderAccordionItem(0, null)

    const svg = screen.getByRole('button').querySelector('svg')
    expect(svg).toBeVisible()
    expect(svg).not.toHaveClass('rotate-180')
  })

  it('shows chevron icon in rotated state when open', () => {
    renderAccordionItem(0, 0)

    const svg = screen.getByRole('button').querySelector('svg')
    expect(svg).toBeVisible()
    expect(svg).toHaveClass('rotate-180')
  })

  it('renders content in border-separated section when open', () => {
    const { container } = renderAccordionItem(0, 0)

    const contentDiv = container.querySelector('.border-t.border-gray-700\\/50')
    expect(contentDiv).toBeVisible()
    expect(contentDiv).toHaveTextContent('Test content')
  })
})
