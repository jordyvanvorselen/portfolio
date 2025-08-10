import { render, screen, fireEvent } from '@testing-library/react'

import { BackToTopButton } from '@/ui/BackToTopButton'

describe('BackToTopButton', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    global.window.scrollTo = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders back to top button', () => {
    render(<BackToTopButton />)

    expect(screen.getByRole('button', { name: /Back to top/ })).toBeVisible()
  })

  it('scrolls to top when clicked', () => {
    render(<BackToTopButton />)

    const button = screen.getByRole('button', { name: /Back to top/ })
    fireEvent.click(button)

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })

  it('calls custom onClick when provided', () => {
    const mockOnClick = jest.fn()
    render(<BackToTopButton onClick={mockOnClick} />)

    const button = screen.getByRole('button', { name: /Back to top/ })
    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(window.scrollTo).not.toHaveBeenCalled()
  })
})
