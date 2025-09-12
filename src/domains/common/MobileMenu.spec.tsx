import { render, screen, fireEvent, act } from '@testing-library/react'
import { vi } from 'vitest'
import { MobileMenu } from '@/domains/common/MobileMenu'

const mockOnClose = vi.fn()

describe(MobileMenu, () => {
  beforeEach(() => {
    mockOnClose.mockClear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    act(() => {
      vi.runOnlyPendingTimers()
    })
    vi.useRealTimers()
  })

  it('renders mobile menu with correct test id', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />)

    expect(screen.getByTestId('mobile-menu')).toBeVisible()
  })

  it('renders close button', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />)

    expect(
      screen.getByRole('button', { name: 'Close navigation menu' })
    ).toBeVisible()
  })

  it('renders all navigation links', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />)

    expect(screen.getByRole('link', { name: 'navigation.home' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'navigation.blog' })).toBeVisible()
    expect(
      screen.getByRole('link', { name: 'navigation.projects' })
    ).toBeVisible()
    expect(
      screen.getByRole('link', { name: 'navigation.experience' })
    ).toBeVisible()
    expect(
      screen.getByRole('link', { name: 'navigation.contact' })
    ).toBeVisible()
  })

  it('renders social links', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />)

    expect(screen.getByRole('link', { name: 'social.github' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'social.linkedin' })).toBeVisible()
  })

  it('renders language switcher', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />)

    expect(
      screen.getByRole('button', { name: /(dutch|english)/ })
    ).toBeVisible()
  })

  it('calls onClose when close button is clicked', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />)

    fireEvent.click(
      screen.getByRole('button', { name: 'Close navigation menu' })
    )
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('navigation links have correct href attributes', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />)

    expect(
      screen.getByRole('link', { name: 'navigation.home' })
    ).toHaveAttribute('href', '/')
    expect(
      screen.getByRole('link', { name: 'navigation.blog' })
    ).toHaveAttribute('href', '/blog')
    expect(
      screen.getByRole('link', { name: 'navigation.projects' })
    ).toHaveAttribute('href', '/projects')
    expect(
      screen.getByRole('link', { name: 'navigation.experience' })
    ).toHaveAttribute('href', '/experience')
    expect(
      screen.getByRole('link', { name: 'navigation.contact' })
    ).toHaveAttribute('href', '/contact')
  })

  it('social links have correct href attributes', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />)

    expect(screen.getByRole('link', { name: 'social.github' })).toHaveAttribute(
      'href',
      'https://github.com/jordyvanvorselen'
    )
    expect(
      screen.getByRole('link', { name: 'social.linkedin' })
    ).toHaveAttribute('href', 'https://linkedin.com/in/jordy-van-vorselen')
  })

  it('external links have security attributes', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />)

    const githubLink = screen.getByRole('link', { name: 'social.github' })
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')

    const linkedinLink = screen.getByRole('link', { name: 'social.linkedin' })
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders with hidden state when isOpen is false', () => {
    render(<MobileMenu isOpen={false} onClose={mockOnClose} />)

    const menu = screen.getByTestId('mobile-menu')
    expect(menu).toBeInTheDocument()
    expect(menu).toHaveClass(
      'translate-x-full',
      'opacity-0',
      'pointer-events-none'
    )
  })

  it('renders with visible state when isOpen is true', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />)

    const menu = screen.getByTestId('mobile-menu')
    expect(menu).toBeInTheDocument()
    expect(menu).toHaveClass(
      'translate-x-0',
      'opacity-100',
      'pointer-events-auto'
    )
  })

  it('calls onClose when navigation link is clicked after delay', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />)

    fireEvent.click(screen.getByRole('link', { name: 'navigation.blog' }))
    expect(mockOnClose).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when social link is clicked after delay', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />)

    fireEvent.click(screen.getByRole('link', { name: 'social.github' }))
    expect(mockOnClose).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when language switcher is clicked after delay', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />)

    fireEvent.click(screen.getByRole('button', { name: /(dutch|english)/ }))
    expect(mockOnClose).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(mockOnClose).toHaveBeenCalledTimes(1)

    // Language switch should be handled by the hook
  })

  it('calls onClose when home navigation link is clicked after delay', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />)

    fireEvent.click(screen.getByRole('link', { name: 'navigation.home' }))
    expect(mockOnClose).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when projects navigation link is clicked after delay', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />)

    fireEvent.click(screen.getByRole('link', { name: 'navigation.projects' }))
    expect(mockOnClose).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when experience navigation link is clicked after delay', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />)

    fireEvent.click(screen.getByRole('link', { name: 'navigation.experience' }))
    expect(mockOnClose).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when contact navigation link is clicked after delay', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />)

    fireEvent.click(screen.getByRole('link', { name: 'navigation.contact' }))
    expect(mockOnClose).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when linkedin social link is clicked after delay', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />)

    fireEvent.click(screen.getByRole('link', { name: 'social.linkedin' }))
    expect(mockOnClose).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})
