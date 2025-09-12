import { render, screen, fireEvent } from '@testing-library/react'
import { act } from '@testing-library/react'

// Import both components for testing
import { BlogSearchFiltersClient, BlogSearchFilters } from '@/domains/blog/BlogSearchFilters'

// Mock Next.js router hooks
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => new URLSearchParams(),
}))

beforeEach(() => {
  mockPush.mockClear()
})

describe('BlogSearchFilters', () => {
  const defaultProps = {
    searchPlaceholder: 'blog.search.placeholder',
    allFilterLabel: 'blog.search.filters.all',
    tags: ['API', 'Architecture', 'Backend'],
  }

  it('displays search input with placeholder', () => {
    render(<BlogSearchFiltersClient {...defaultProps} />)

    const searchInput = screen.getByPlaceholderText('blog.search.placeholder')
    expect(searchInput).toBeVisible()
  })

  it('displays search icon', () => {
    render(<BlogSearchFiltersClient {...defaultProps} />)

    const searchIcon = screen.getByLabelText('search')
    expect(searchIcon).toBeVisible()
  })

  it('displays All filter as active by default', () => {
    render(<BlogSearchFiltersClient {...defaultProps} />)

    const allFilter = screen.getByText('blog.search.filters.all')
    expect(allFilter).toBeVisible()
    expect(allFilter).toHaveAttribute('aria-pressed', 'true')
  })

  it('displays category filter buttons', () => {
    render(<BlogSearchFiltersClient {...defaultProps} />)

    expect(screen.getByText('API')).toBeVisible()
    expect(screen.getByText('Architecture')).toBeVisible()
    expect(screen.getByText('Backend')).toBeVisible()
  })

  it('navigates to filtered URL when filter is clicked', () => {
    render(<BlogSearchFiltersClient {...defaultProps} />)

    const apiFilter = screen.getByText('API')

    // Click API filter
    fireEvent.click(apiFilter)

    // Should navigate to URL with tag parameter
    expect(mockPush).toHaveBeenCalledWith('/blog?tag=API', { scroll: false })
  })

  it('navigates to base URL when All filter is clicked', () => {
    render(<BlogSearchFiltersClient {...defaultProps} />)

    const allFilter = screen.getByText('blog.search.filters.all')

    // Click All filter 
    fireEvent.click(allFilter)

    // Should navigate to base blog URL
    expect(mockPush).toHaveBeenCalledWith('/blog', { scroll: false })
  })

  it('updates search input on user input', () => {
    render(<BlogSearchFiltersClient {...defaultProps} />)

    const searchInput = screen.getByPlaceholderText('blog.search.placeholder')
    
    // Type in search input
    fireEvent.change(searchInput, { target: { value: 'typescript' } })

    expect(searchInput).toHaveValue('typescript')
  })

  it('navigates with debounced search after typing', async () => {
    // Mock timers to control debouncing
    jest.useFakeTimers()
    
    render(<BlogSearchFiltersClient {...defaultProps} />)

    const searchInput = screen.getByPlaceholderText('blog.search.placeholder')
    
    // Type in search input
    fireEvent.change(searchInput, { target: { value: 'typescript' } })

    // Fast-forward time to trigger debounced search
    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(mockPush).toHaveBeenCalledWith('/blog?search=typescript', { scroll: false })
    
    jest.useRealTimers()
  })

  it('clears search parameter when input is empty', async () => {
    jest.useFakeTimers()
    
    render(<BlogSearchFiltersClient {...defaultProps} searchQuery="existing" />)

    const searchInput = screen.getByPlaceholderText('blog.search.placeholder')
    
    // Clear search input
    fireEvent.change(searchInput, { target: { value: '' } })

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(mockPush).toHaveBeenCalledWith('/blog', { scroll: false })
    
    jest.useRealTimers()
  })

  it('renders server component with translations', () => {
    const props = {
      tags: ['API', 'Architecture'],
      selectedTag: 'API',
      searchQuery: 'test'
    }
    
    render(<BlogSearchFilters {...props} />)

    expect(screen.getByPlaceholderText('blog.search.placeholder')).toBeVisible()
    expect(screen.getByText('blog.search.filters.all')).toBeVisible()
    expect(screen.getByText('API')).toBeVisible()
  })
})
