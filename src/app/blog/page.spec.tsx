import { render, screen } from '@testing-library/react'

import BlogPage, { metadata } from '@/app/blog/page'

describe('BlogPage', () => {
  it('renders the blog hero section', () => {
    render(<BlogPage />)

    expect(
      screen.getByRole('heading', { name: 'More Than Bits' })
    ).toBeVisible()
    expect(
      screen.getByText(/thoughts, tutorials, and deep dives/i)
    ).toBeVisible()
  })

  it('renders the search filters section', () => {
    render(<BlogPage />)

    expect(screen.getByPlaceholderText('Search articles...')).toBeVisible()
    expect(screen.getByRole('button', { name: 'All' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'API' })).toBeVisible()
  })

  it('renders blog cards', () => {
    render(<BlogPage />)

    const blogCards = screen.getAllByRole('article')
    expect(blogCards).toHaveLength(6)
    expect(
      screen.getByText(
        'Advanced TypeScript Patterns for Enterprise Applications'
      )
    ).toBeVisible()
    expect(
      screen.getByText('Implementing Clean Architecture in React Applications')
    ).toBeVisible()
  })

  it('exports correct metadata', () => {
    expect(metadata).toEqual({
      title: 'Blog - Jordy van Vorselen',
      description: 'Blog posts by Jordy van Vorselen',
    })
  })
})
