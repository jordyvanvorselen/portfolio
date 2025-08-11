import { render, screen } from '@testing-library/react'

import { FeaturedBlogCard } from '@/domains/blog/FeaturedBlogCard'

const mockBlogPost = {
  title: 'Featured Test Article',
  description: 'This is a test description for the featured blog post.',
  date: 'December 15, 2024',
  readTime: '8 min read',
  image: '/test-image.jpg',
  tags: ['TypeScript', 'React', 'Testing'],
}

describe('FeaturedBlogCard', () => {
  it('renders featured blog card with title', () => {
    render(<FeaturedBlogCard {...mockBlogPost} />)

    expect(screen.getByRole('heading')).toHaveTextContent(
      'Featured Test Article'
    )
  })

  it('renders with featured data attribute', () => {
    render(<FeaturedBlogCard {...mockBlogPost} />)

    expect(screen.getByRole('article')).toHaveAttribute('data-featured', 'true')
  })

  it('displays featured badge', () => {
    render(<FeaturedBlogCard {...mockBlogPost} />)

    expect(screen.getByText('Featured')).toBeVisible()
  })

  it('displays date and read time', () => {
    render(<FeaturedBlogCard {...mockBlogPost} />)

    expect(screen.getByText('December 15, 2024')).toBeVisible()
    expect(screen.getByText('8 min read')).toBeVisible()
  })

  it('displays description', () => {
    render(<FeaturedBlogCard {...mockBlogPost} />)

    expect(
      screen.getByText('This is a test description for the featured blog post.')
    ).toBeVisible()
  })

  it('displays up to 4 tags', () => {
    const postWithManyTags = {
      ...mockBlogPost,
      tags: ['TypeScript', 'React', 'Testing', 'Node.js', 'GraphQL', 'Jest'],
    }
    render(<FeaturedBlogCard {...postWithManyTags} />)

    expect(screen.getByText('TypeScript')).toBeVisible()
    expect(screen.getByText('React')).toBeVisible()
    expect(screen.getByText('Testing')).toBeVisible()
    expect(screen.getByText('Node.js')).toBeVisible()
    expect(screen.getByText('+2 more')).toBeVisible()
  })

  it('renders image with correct alt text', () => {
    render(<FeaturedBlogCard {...mockBlogPost} />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', '/test-image.jpg')
    expect(image).toHaveAttribute('alt', 'Featured Test Article')
  })
})
