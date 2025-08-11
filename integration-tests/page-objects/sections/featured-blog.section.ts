import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class FeaturedBlogSection extends BaseSection {
  override readonly section: Locator = this.page.getByTestId(
    'featured-blog-section'
  )
  readonly title: Locator = this.section.getByRole('heading', {
    name: 'Featured article',
  })
  readonly featuredCard: Locator = this.section.locator(
    '[data-featured="true"]'
  )
}
