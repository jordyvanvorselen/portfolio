import { render, screen } from '@testing-library/react'

import { FeaturedBlogCard } from '@/domains/blog/FeaturedBlogCard'

describe('FeaturedBlogCard', () => {
  const mockImage = '/test-image.jpg'

  it('renders featured blog card with translation keys', () => {
    render(
      <FeaturedBlogCard translationKey="advancedTypeScript" image={mockImage} />
    )

    expect(screen.getByRole('article')).toBeVisible()
    expect(screen.getByRole('heading')).toHaveTextContent(
      'blog.posts.advancedTypeScript.title'
    )
    expect(screen.getByRole('img')).toHaveAttribute(
      'alt',
      'blog.posts.advancedTypeScript.title'
    )
    expect(screen.getByText('blog.posts.advancedTypeScript.date')).toBeVisible()
    expect(
      screen.getByText('blog.posts.advancedTypeScript.readTime')
    ).toBeVisible()
    expect(
      screen.getByText('blog.posts.advancedTypeScript.description')
    ).toBeVisible()
  })

  it('renders with featured data attribute', () => {
    render(
      <FeaturedBlogCard translationKey="advancedTypeScript" image={mockImage} />
    )

    expect(screen.getByRole('article')).toHaveAttribute('data-featured', 'true')
  })

  it('displays featured badge', () => {
    render(
      <FeaturedBlogCard translationKey="advancedTypeScript" image={mockImage} />
    )

    expect(screen.getByText('blog.card.featured')).toBeVisible()
  })

  it('renders tags from translations', () => {
    render(
      <FeaturedBlogCard translationKey="advancedTypeScript" image={mockImage} />
    )

    // Our mock now returns an actual array for tags, so we can test tag rendering
    expect(screen.getByText('TypeScript')).toBeVisible()
    expect(screen.getByText('React')).toBeVisible()
    expect(screen.getByText('Testing')).toBeVisible()
    expect(screen.getByText('Node.js')).toBeVisible()
  })

  it('shows more count when there are more than 4 tags', () => {
    render(
      <FeaturedBlogCard translationKey="advancedTypeScript" image={mockImage} />
    )

    // Should show first 4 tags + more count (since mock returns 5 tags)
    expect(screen.getByText('TypeScript')).toBeVisible()
    expect(screen.getByText('React')).toBeVisible()
    expect(screen.getByText('Testing')).toBeVisible()
    expect(screen.getByText('Node.js')).toBeVisible()
    expect(screen.getByText('blog.card.moreCount count=1')).toBeVisible()
  })

  it('handles non-array tags gracefully', () => {
    // Use a different translation key that won't return an array from our mock
    render(<FeaturedBlogCard translationKey="otherPost" image={mockImage} />)

    // Component should render without tags since our mock only returns arrays for 'advancedTypeScript'
    // For 'otherPost', the tags will be a string: 'blog.posts.otherPost.tags'
    expect(screen.getByRole('article')).toBeVisible()
    // Should not render any tag elements since tags is not an array
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument()
    expect(screen.queryByText('React')).not.toBeInTheDocument()
  })
})
