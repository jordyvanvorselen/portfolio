import { render, screen } from '@testing-library/react'

import BlogPage, { generateMetadata } from '@/app/blog/page'
import * as api from '@/lib/api'

jest.mock('@/lib/api', () => ({
  getAllPosts: jest.fn(),
}))

describe('BlogPage', () => {
  beforeEach(() => {
    jest.mocked(api.getAllPosts).mockResolvedValue([
      {
        slug: 'advanced-typescript',
        title: 'blog.posts.advancedTypeScript.title',
        description: 'Advanced TypeScript description',
        date: '2024-01-15',
        readTime: '5 min read',
        image: '/test-image.jpg',
        tags: ['TypeScript', 'Development'],
      },
      {
        slug: 'clean-architecture',
        title: 'blog.posts.cleanArchitecture.title',
        description: 'Clean Architecture description',
        date: '2024-01-10',
        readTime: '8 min read',
        image: '/test-image2.jpg',
        tags: ['Architecture', 'Design'],
      },
      {
        slug: 'test-post-1',
        title: 'Test Post 1',
        description: 'Test description 1',
        date: '2024-01-05',
        readTime: '3 min read',
        image: '/test1.jpg',
        tags: ['Test'],
      },
      {
        slug: 'test-post-2',
        title: 'Test Post 2',
        description: 'Test description 2',
        date: '2024-01-01',
        readTime: '4 min read',
        image: '/test2.jpg',
        tags: ['Test'],
      },
      {
        slug: 'test-post-3',
        title: 'Test Post 3',
        description: 'Test description 3',
        date: '2023-12-28',
        readTime: '6 min read',
        image: '/test3.jpg',
        tags: ['Test'],
      },
      {
        slug: 'test-post-4',
        title: 'Test Post 4',
        description: 'Test description 4',
        date: '2023-12-25',
        readTime: '7 min read',
        image: '/test4.jpg',
        tags: ['Test'],
      },
    ])
  })

  it('renders the blog hero section', async () => {
    render(await BlogPage())

    expect(
      screen.getByRole('heading', { name: 'blog.hero.title' })
    ).toBeVisible()
    expect(screen.getByText('blog.hero.description')).toBeVisible()
  })

  it('renders the search filters section', async () => {
    render(await BlogPage())

    expect(screen.getByPlaceholderText('blog.search.placeholder')).toBeVisible()
    expect(
      screen.getByRole('button', { name: 'blog.search.filters.all' })
    ).toBeVisible()
    expect(screen.getByRole('button', { name: 'API' })).toBeVisible()
  })

  it('renders blog cards with translated content', async () => {
    render(await BlogPage())

    const blogCards = screen.getAllByRole('article')
    expect(blogCards).toHaveLength(6)
    expect(
      screen.getByText('blog.posts.advancedTypeScript.title')
    ).toBeVisible()
    expect(screen.getByText('blog.posts.cleanArchitecture.title')).toBeVisible()
  })

  it('renders section headings with translated text', async () => {
    render(await BlogPage())

    expect(
      screen.getByRole('heading', { name: 'blog.sections.featuredArticle' })
    ).toBeVisible()
    expect(
      screen.getByRole('heading', { name: 'blog.sections.latestArticles' })
    ).toBeVisible()
  })

  it('generates metadata with correct title and description', async () => {
    const result = await generateMetadata()

    expect(result).toEqual({
      title: 'Blog - Jordy van Vorselen',
      description: 'Blog posts by Jordy van Vorselen',
    })
  })

  it('handles API errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    jest.mocked(api.getAllPosts).mockRejectedValueOnce(new Error('API Error'))

    render(await BlogPage())

    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to fetch blog posts from Contentful:',
      expect.any(Error)
    )
    expect(
      screen.getByText('No blog posts available at the moment.')
    ).toBeVisible()

    consoleSpy.mockRestore()
  })

  it('shows empty state when no posts are available', async () => {
    jest.mocked(api.getAllPosts).mockResolvedValueOnce([])

    render(await BlogPage())

    expect(
      screen.getByText('No blog posts available at the moment.')
    ).toBeVisible()
    expect(
      screen.getByText('Please check back later for new content.')
    ).toBeVisible()
    expect(
      screen.queryByRole('heading', { name: 'blog.sections.featuredArticle' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'blog.sections.latestArticles' })
    ).not.toBeInTheDocument()
  })
})
