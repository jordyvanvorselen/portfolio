import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import BlogPage, { generateMetadata } from '@/app/blog/page'
import * as api from '@/lib/api'

vi.mock('@/lib/api', () => ({
  getAllPosts: vi.fn(),
}))

describe('BlogPage', () => {
  beforeEach(() => {
    vi.mocked(api.getAllPosts).mockResolvedValue([
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
    render(await BlogPage({ searchParams: Promise.resolve({}) }))

    expect(
      screen.getByRole('heading', { name: 'blog.hero.title' })
    ).toBeVisible()
    expect(screen.getByText('blog.hero.description')).toBeVisible()
  })

  it('renders the search filters section', async () => {
    render(await BlogPage({ searchParams: Promise.resolve({}) }))

    expect(screen.getByPlaceholderText('blog.search.placeholder')).toBeVisible()
    expect(
      screen.getByRole('button', { name: 'blog.search.filters.all' })
    ).toBeVisible()
    expect(screen.getByRole('button', { name: 'TypeScript' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Architecture' })).toBeVisible()
  })

  it('renders blog cards with translated content', async () => {
    render(await BlogPage({ searchParams: Promise.resolve({}) }))

    const blogCards = screen.getAllByRole('article')
    expect(blogCards).toHaveLength(6)
    expect(
      screen.getByText('blog.posts.advancedTypeScript.title')
    ).toBeVisible()
    expect(screen.getByText('blog.posts.cleanArchitecture.title')).toBeVisible()
  })

  it('renders section headings with translated text', async () => {
    render(await BlogPage({ searchParams: Promise.resolve({}) }))

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
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation()
    vi.mocked(api.getAllPosts).mockRejectedValueOnce(new Error('API Error'))

    render(await BlogPage({ searchParams: Promise.resolve({}) }))

    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to fetch blog posts from Contentful:',
      expect.any(Error)
    )
    expect(
      screen.getByText('blog.search.emptyState.noPostsTitle')
    ).toBeVisible()

    consoleSpy.mockRestore()
  })

  it('shows empty state when no posts are available', async () => {
    vi.mocked(api.getAllPosts).mockResolvedValueOnce([])

    render(await BlogPage({ searchParams: Promise.resolve({}) }))

    expect(
      screen.getByText('blog.search.emptyState.noPostsTitle')
    ).toBeVisible()
    expect(
      screen.getByText('blog.search.emptyState.noPostsSubtitle')
    ).toBeVisible()
    expect(
      screen.queryByRole('heading', { name: 'blog.sections.featuredArticle' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'blog.sections.latestArticles' })
    ).not.toBeInTheDocument()
  })

  it('handles array values in searchParams correctly', async () => {
    render(await BlogPage({ searchParams: Promise.resolve({ tag: ['React', 'JavaScript'], search: ['hooks', 'tutorial'] }) }))

    // Should ignore array values and treat as undefined
    expect(screen.getByRole('button', { name: 'blog.search.filters.all' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('hides featured article when filters are active', async () => {
    render(await BlogPage({ searchParams: Promise.resolve({ tag: 'TypeScript' }) }))

    // Featured section should not be shown when filters are active
    expect(
      screen.queryByRole('heading', { name: 'blog.sections.featuredArticle' })
    ).not.toBeInTheDocument()
    
    // Should show regular posts section
    expect(
      screen.getByRole('heading', { name: 'blog.sections.latestArticles' })
    ).toBeVisible()
  })

  it('shows no results state when filters match no posts', async () => {
    render(await BlogPage({ searchParams: Promise.resolve({ tag: 'NonExistentTag' }) }))

    expect(
      screen.getByText('blog.search.emptyState.noResultsTitle')
    ).toBeVisible()
    expect(
      screen.getByText('blog.search.emptyState.noResultsSubtitle')
    ).toBeVisible()
  })

  it('filters posts by search query', async () => {
    render(await BlogPage({ searchParams: Promise.resolve({ search: 'typescript' }) }))

    // Should not show featured article when search is active
    expect(
      screen.queryByRole('heading', { name: 'blog.sections.featuredArticle' })
    ).not.toBeInTheDocument()
    
    // Should show filtered results
    expect(
      screen.getByRole('heading', { name: 'blog.sections.latestArticles' })
    ).toBeVisible()
  })
})
