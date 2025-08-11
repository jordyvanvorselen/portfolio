import { Page, Locator } from '@playwright/test'

import { BasePage } from '@/integration-tests/page-objects/base.page'
import { BlogHero } from '@/integration-tests/page-objects/sections/blog-hero.section'

export class BlogPage extends BasePage {
  readonly hero: BlogHero = new BlogHero(this.page)
  readonly searchBar: Locator = this.page.getByPlaceholder('Search articles...')
  readonly allFilter: Locator = this.page.getByRole('button', { name: 'All' })

  static async goto(page: Page): Promise<BlogPage> {
    await page.goto('/blog')
    return new BlogPage(page)
  }
}
