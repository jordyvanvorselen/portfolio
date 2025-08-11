import { render, screen } from '@testing-library/react'

import BlogPage from '@/app/blog/page'

describe('BlogPage', () => {
  it('renders the blog hero section', () => {
    render(<BlogPage />)

    expect(
      screen.getByRole('heading', { name: 'Engineering Insights' })
    ).toBeVisible()
    expect(
      screen.getByText(/thoughts, tutorials, and deep dives/i)
    ).toBeVisible()
  })

  it('renders the search filters section', () => {
    render(<BlogPage />)

    expect(screen.getByPlaceholderText('Search articles...')).toBeVisible()
    expect(screen.getByText('All')).toBeVisible()
    expect(screen.getByText('API')).toBeVisible()
  })
})
