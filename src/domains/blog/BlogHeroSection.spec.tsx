import { render, screen } from '@testing-library/react'

import { BlogHeroSection } from '@/domains/blog/BlogHeroSection'

describe('BlogHeroSection', () => {
  it('displays the hero section with translated content', () => {
    render(<BlogHeroSection />)

    expect(screen.getByText('blog.hero.title')).toBeVisible()
    expect(screen.getByText('blog.hero.description')).toBeVisible()
  })

  it('displays blog stats with translated labels', () => {
    render(<BlogHeroSection />)

    expect(
      screen.getByText('blog.hero.stats.articlesCount count=6')
    ).toBeVisible()
    expect(screen.getByText('blog.hero.stats.regularlyUpdated')).toBeVisible()
  })
})
