import { render, screen } from '@testing-library/react'

import { BlogCard } from '@/domains/blog/BlogCard'

describe('BlogCard', () => {
  const mockBlogPost = {
    title: 'Advanced TypeScript Patterns for Enterprise Applications',
    description:
      'Explore advanced TypeScript patterns and techniques that will help you build more maintainable and type-safe enterprise applications.',
    date: 'January 8, 2024',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    tags: ['TypeScript', 'JavaScript', 'Enterprise'],
  }

  it('renders blog card with all required elements', () => {
    render(<BlogCard {...mockBlogPost} />)

    expect(screen.getByRole('article')).toBeVisible()
    expect(screen.getByRole('heading')).toHaveTextContent(mockBlogPost.title)
    expect(screen.getByRole('img')).toHaveAttribute('alt', mockBlogPost.title)
    expect(screen.getByText(mockBlogPost.date)).toBeVisible()
    expect(screen.getByText(mockBlogPost.readTime)).toBeVisible()
    expect(screen.getByText(mockBlogPost.description)).toBeVisible()
    expect(screen.getByText('TypeScript')).toBeVisible()
    expect(screen.getByText('JavaScript')).toBeVisible()
    expect(screen.getByText('Enterprise')).toBeVisible()
  })

  it('renders blog card as article element', () => {
    render(<BlogCard {...mockBlogPost} />)

    expect(screen.getByRole('article')).toBeInTheDocument()
  })
})
