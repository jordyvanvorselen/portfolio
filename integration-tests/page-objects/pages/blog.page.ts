import { Page, Locator } from '@playwright/test'

import { BasePage } from '@/integration-tests/page-objects/base.page'
import { BlogHero } from '@/integration-tests/page-objects/sections/blog-hero.section'

export class BlogPage extends BasePage {
  readonly hero: BlogHero = new BlogHero(this.page)
  readonly searchBar: Locator = this.page.getByPlaceholder('Search articles...')
  readonly allFilter: Locator = this.page.getByRole('button', { name: 'All' })
  readonly blogCards: Locator = this.page.getByRole('article')
  readonly firstBlogCard: Locator = this.blogCards.first()
  readonly blogCardTitle: Locator = this.firstBlogCard.getByRole('heading')
  readonly blogCardImage: Locator = this.firstBlogCard.getByRole('img')
  readonly blogCardDate: Locator = this.firstBlogCard.getByText(
    /January|December|February|March|April|May|June|July|August|September|October|November/
  )
  readonly blogCardReadTime: Locator =
    this.firstBlogCard.getByText(/\d+ min read/)
  readonly blogCardDescription: Locator = this.firstBlogCard.locator('p').last()
  readonly blogCardTags: Locator = this.firstBlogCard
    .locator('span')
    .filter({ hasText: /TypeScript|React|Database|Testing|GraphQL/ })

  static async goto(page: Page): Promise<BlogPage> {
    await page.goto('/blog')
    return new BlogPage(page)
  }
}
