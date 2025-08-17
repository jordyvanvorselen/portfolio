import { render, screen, fireEvent } from '@testing-library/react'

import { BlogSearchFilters } from '@/domains/blog/BlogSearchFilters'

describe('BlogSearchFilters', () => {
  it('displays search input with placeholder', () => {
    render(<BlogSearchFilters />)

    const searchInput = screen.getByPlaceholderText('Search articles...')
    expect(searchInput).toBeVisible()
  })

  it('displays search icon', () => {
    render(<BlogSearchFilters />)

    const searchIcon = screen.getByLabelText('search')
    expect(searchIcon).toBeVisible()
  })

  it('displays All filter as active by default', () => {
    render(<BlogSearchFilters />)

    const allFilter = screen.getByText('All')
    expect(allFilter).toBeVisible()
    expect(allFilter).toHaveAttribute('aria-pressed', 'true')
  })

  it('displays category filter buttons', () => {
    render(<BlogSearchFilters />)

    expect(screen.getByText('API')).toBeVisible()
    expect(screen.getByText('Architecture')).toBeVisible()
    expect(screen.getByText('Backend')).toBeVisible()
  })

  it('changes active filter when clicked', () => {
    render(<BlogSearchFilters />)

    const allFilter = screen.getByText('All')
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
})
