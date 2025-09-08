import { render, screen, fireEvent } from '@testing-library/react'

// Import the client component directly for testing
import { BlogSearchFiltersClient } from '@/domains/blog/BlogSearchFilters'

describe('BlogSearchFilters', () => {
  const defaultProps = {
    searchPlaceholder: 'blog.search.placeholder',
    allFilterLabel: 'blog.search.filters.all',
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

  it('changes active filter when clicked', () => {
    render(<BlogSearchFiltersClient {...defaultProps} />)

    const allFilter = screen.getByText('blog.search.filters.all')
    const apiFilter = screen.getByText('API')

    // Initially All should be active
    expect(allFilter).toHaveAttribute('aria-pressed', 'true')
    expect(apiFilter).toHaveAttribute('aria-pressed', 'false')

    // Click API filter
    fireEvent.click(apiFilter)

    // API should now be active, All should be inactive
    expect(apiFilter).toHaveAttribute('aria-pressed', 'true')
    expect(allFilter).toHaveAttribute('aria-pressed', 'false')
  })

  it('can switch back to All filter', () => {
    render(<BlogSearchFiltersClient {...defaultProps} />)

    const allFilter = screen.getByText('blog.search.filters.all')
    const apiFilter = screen.getByText('API')

    // Click API filter first
    fireEvent.click(apiFilter)
    expect(apiFilter).toHaveAttribute('aria-pressed', 'true')

    // Click All filter to switch back
    fireEvent.click(allFilter)

    // All should be active again
    expect(allFilter).toHaveAttribute('aria-pressed', 'true')
    expect(apiFilter).toHaveAttribute('aria-pressed', 'false')
  })
})
