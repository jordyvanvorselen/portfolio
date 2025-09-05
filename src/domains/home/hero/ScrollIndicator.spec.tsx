import { render, screen, fireEvent } from '@testing-library/react'

import { ScrollIndicator } from '@/domains/home/hero/ScrollIndicator'

describe('ScrollIndicator', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    global.window.scrollTo = jest.fn()
    // Mock getElementById
    global.document.getElementById = jest.fn()
  })

  it('renders Discover My Core Expertise title', () => {
    render(<ScrollIndicator />)

    expect(screen.getByText('Discover My Core Expertise')).toBeVisible()
  })

  it('renders Explore what I can bring to your project subtitle', () => {
    render(<ScrollIndicator />)

    expect(
      screen.getByText('Explore what I can bring to your project')
    ).toBeVisible()
  })

  it('renders chevron down icon', () => {
    render(<ScrollIndicator />)

    const chevronIcon = screen.getByTestId('chevron-down-icon')
    expect(chevronIcon).toBeVisible()
  })

  it('scrolls to expertise section when clicked', () => {
    const mockElement = { offsetTop: 1000 }
    ;(global.document.getElementById as jest.Mock).mockReturnValue(mockElement)

    render(<ScrollIndicator />)

    const scrollIndicator = screen.getByTestId('scroll-indicator')
    fireEvent.click(scrollIndicator)

    expect(global.document.getElementById).toHaveBeenCalledWith(
      'expertise-section'
    )
    expect(global.window.scrollTo).toHaveBeenCalledWith({
      top: 936, // 1000 - 64 (header height)
      behavior: 'smooth',
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
