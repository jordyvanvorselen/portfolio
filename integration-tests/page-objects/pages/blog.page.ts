import { Page, Locator } from '@playwright/test'

import { BasePage } from '@/integration-tests/page-objects/base.page'
import { BlogHero } from '@/integration-tests/page-objects/sections/blog-hero.section'
import { BlogSearchFilters } from '@/integration-tests/page-objects/sections/blog-search-filters.section'
import { FeaturedBlogSection } from '@/integration-tests/page-objects/sections/featured-blog.section'
import { BlogGrid } from '@/integration-tests/page-objects/sections/blog-grid.section'

export class BlogPage extends BasePage {
  readonly hero: BlogHero = new BlogHero(this.page)
  readonly searchFilters: BlogSearchFilters = new BlogSearchFilters(this.page)
  readonly featuredSection: FeaturedBlogSection = new FeaturedBlogSection(
    this.page
  )
  readonly blogGrid: BlogGrid = new BlogGrid(this.page)

  static async goto(page: Page): Promise<BlogPage> {
    await page.goto('/blog')
    return new BlogPage(page)
  }
}
