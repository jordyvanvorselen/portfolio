import { render, screen } from '@testing-library/react'

import { BlogPageSkeleton } from '@/domains/blog/BlogPageSkeleton'

describe('BlogPageSkeleton', () => {
  it('tells screen reader users that the blog is loading', () => {
    render(<BlogPageSkeleton />)

    expect(screen.getByRole('status')).toHaveTextContent('blog.loading')
  })

  it('shows placeholders for the featured post and a row of posts', () => {
    render(<BlogPageSkeleton />)

    expect(screen.getByTestId('featured-blog-card-skeleton')).toBeVisible()
    expect(screen.getAllByTestId('blog-card-skeleton')).toHaveLength(3)
  })
})
