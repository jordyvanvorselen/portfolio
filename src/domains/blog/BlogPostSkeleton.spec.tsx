import { render, screen } from '@testing-library/react'

import { BlogPostSkeleton } from '@/domains/blog/BlogPostSkeleton'

describe('BlogPostSkeleton', () => {
  it('tells screen reader users that the post is loading', () => {
    render(<BlogPostSkeleton />)

    expect(screen.getByRole('status')).toHaveTextContent('blog.post.loading')
  })

  it('shows placeholders for the post header and its content', () => {
    render(<BlogPostSkeleton />)

    expect(screen.getByTestId('blog-post-hero-skeleton')).toBeVisible()
    expect(screen.getByTestId('blog-post-content-skeleton')).toBeVisible()
  })
})
