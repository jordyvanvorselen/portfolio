import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class RelatedPosts extends BaseSection {
  override readonly section: Locator = this.page.getByTestId(
    'related-posts-section'
  )
  readonly title: Locator = this.section.getByRole('heading', {
    name: /related posts/i,
  })
  readonly postsGrid: Locator = this.section.locator(
    'div[class*="grid"][class*="md:grid-cols-3"]'
  )
  readonly relatedPostCards: Locator = this.postsGrid.locator('article')
  readonly firstRelatedPost: Locator = this.relatedPostCards.first()
  readonly secondRelatedPost: Locator = this.relatedPostCards.nth(1)
  readonly relatedPostTitles: Locator = this.relatedPostCards.locator('h3')
  readonly relatedPostDescriptions: Locator = this.relatedPostCards.locator('p')
  readonly relatedPostImages: Locator = this.relatedPostCards.locator('img')
  readonly relatedPostDates: Locator = this.relatedPostCards.locator(
    'span:has(+ span):first-child'
  )
  readonly relatedPostReadTimes: Locator =
    this.relatedPostCards.locator('span:nth-child(2)')
  readonly relatedPostTags: Locator =
    this.relatedPostCards.locator('[class*="badge"]')
}
