import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class BlogGrid extends BaseSection {
  override readonly section: Locator = this.page.getByTestId('blog-grid')
  readonly title: Locator = this.section.getByRole('heading', {
    name: 'Latest articles',
  })
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
}
