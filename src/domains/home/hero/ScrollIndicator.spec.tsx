import { render, screen, fireEvent } from '@testing-library/react'

import { ScrollIndicator } from '@/domains/home/hero/ScrollIndicator'

describe('ScrollIndicator', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn()
    // Mock getElementById
    global.document.getElementById = jest.fn()
  })

  it('renders Discover My Core Expertise title', () => {
    render(<ScrollIndicator />)

    expect(screen.getByText('Discover My Core Expertise')).toBeVisible()
  })

  it('renders Explore the skills I master subtitle', () => {
    render(<ScrollIndicator />)

    expect(screen.getByText('Explore the skills I master')).toBeVisible()
  })

  it('renders chevron down icon', () => {
    render(<ScrollIndicator />)

    const chevronIcon = screen.getByTestId('chevron-down-icon')
    expect(chevronIcon).toBeVisible()
  })

  it('scrolls to expertise section when clicked', () => {
    const mockElement = { scrollIntoView: jest.fn() }
    ;(global.document.getElementById as jest.Mock).mockReturnValue(mockElement)

    render(<ScrollIndicator />)

    const scrollIndicator = screen.getByTestId('scroll-indicator')
    fireEvent.click(scrollIndicator)

    expect(global.document.getElementById).toHaveBeenCalledWith(
      'expertise-section'
    )
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })
  })

  it('does nothing when expertise section is not found', () => {
    ;(global.document.getElementById as jest.Mock).mockReturnValue(null)

    render(<ScrollIndicator />)

    const scrollIndicator = screen.getByTestId('scroll-indicator')
    fireEvent.click(scrollIndicator)

    expect(global.document.getElementById).toHaveBeenCalledWith(
      'expertise-section'
    )
    // Should not throw error when element is not found
  })
})
