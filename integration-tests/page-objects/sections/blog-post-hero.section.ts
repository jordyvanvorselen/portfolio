import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class BlogPostHero extends BaseSection {
  override readonly section: Locator = this.page.getByTestId(
    'blog-post-hero-section'
  )
  readonly backToBlogLink: Locator = this.section.getByRole('link', {
    name: /back to blog/i,
  })
  readonly title: Locator = this.section.getByRole('heading', { level: 1 })
  readonly description: Locator = this.section.locator('p').first()
  readonly publishDate: Locator = this.section.getByTestId('publish-date')
  readonly readTime: Locator = this.section.getByTestId('read-time')
  readonly author: Locator = this.section.getByTestId('author')
  readonly tags: Locator = this.section.getByTestId('tags-container')
  readonly tagBadges: Locator = this.tags.getByRole('status')
}
