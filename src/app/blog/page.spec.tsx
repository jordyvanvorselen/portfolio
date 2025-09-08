import { render, screen } from '@testing-library/react'

import BlogPage, { generateMetadata } from '@/app/blog/page'

describe('BlogPage', () => {
  it('renders the blog hero section', () => {
    render(<BlogPage />)

    expect(
      screen.getByRole('heading', { name: 'blog.hero.title' })
    ).toBeVisible()
    expect(screen.getByText('blog.hero.description')).toBeVisible()
  })

  it('renders the search filters section', () => {
    render(<BlogPage />)

    expect(screen.getByPlaceholderText('blog.search.placeholder')).toBeVisible()
    expect(
      screen.getByRole('button', { name: 'blog.search.filters.all' })
    ).toBeVisible()
    expect(screen.getByRole('button', { name: 'API' })).toBeVisible()
  })

  it('renders blog cards with translated content', () => {
    render(<BlogPage />)

    const blogCards = screen.getAllByRole('article')
    expect(blogCards).toHaveLength(6)
    expect(
      screen.getByText('blog.posts.advancedTypeScript.title')
    ).toBeVisible()
    expect(screen.getByText('blog.posts.cleanArchitecture.title')).toBeVisible()
  })

  it('renders section headings with translated text', () => {
    render(<BlogPage />)

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
})
