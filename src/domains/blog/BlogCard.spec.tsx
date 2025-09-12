import { render, screen } from '@testing-library/react'

import { BlogCard } from '@/domains/blog/BlogCard'

describe('BlogCard', () => {
  const mockBlogPost = {
    slug: 'advanced-typescript-patterns',
    title: 'Advanced TypeScript Patterns for Enterprise Applications',
    description: 'Explore advanced TypeScript patterns and techniques that will help you build more maintainable and type-safe enterprise applications.',
    date: 'January 8, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    tags: ['TypeScript', 'JavaScript', 'Enterprise']
  }

  it('renders blog card with provided content', () => {
    render(<BlogCard {...mockBlogPost} />)

    expect(screen.getByRole('article')).toBeVisible()
    expect(screen.getByRole('heading')).toHaveTextContent(mockBlogPost.title)
    expect(screen.getByRole('img')).toHaveAttribute('alt', mockBlogPost.title)
    expect(screen.getByText(mockBlogPost.date)).toBeVisible()
    expect(screen.getByText(mockBlogPost.readTime)).toBeVisible()
    expect(screen.getByText(mockBlogPost.description)).toBeVisible()
  })

  it('renders blog card as article element', () => {
    render(<BlogCard {...mockBlogPost} />)

    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  it('renders tags correctly', () => {
    render(<BlogCard {...mockBlogPost} />)

    expect(screen.getByText('TypeScript')).toBeVisible()
    expect(screen.getByText('JavaScript')).toBeVisible()
    expect(screen.getByText('Enterprise')).toBeVisible()
  })

  it('shows more count when there are more than 3 tags', () => {
    const postWithManyTags = {
      ...mockBlogPost,
      tags: ['TypeScript', 'JavaScript', 'Enterprise', 'React', 'Node.js']
    }
    render(<BlogCard {...postWithManyTags} />)

    // Should show first 3 tags + more count
    expect(screen.getByText('TypeScript')).toBeVisible()
    expect(screen.getByText('JavaScript')).toBeVisible()
    expect(screen.getByText('Enterprise')).toBeVisible()
    expect(screen.getByText('blog.card.moreCount count=2')).toBeVisible()
  })

  it('handles empty tags array gracefully', () => {
    const postWithoutTags = {
      ...mockBlogPost,
      tags: []
    }
    render(<BlogCard {...postWithoutTags} />)

    expect(screen.getByRole('article')).toBeVisible()
    expect(screen.getByText(mockBlogPost.title)).toBeVisible()
    // Should not render any tag elements
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument()
  })

  it('creates correct link to blog post', () => {
    render(<BlogCard {...mockBlogPost} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', `/blog/${mockBlogPost.slug}`)
  })
})
