import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class BlogHero extends BaseSection {
  override readonly section: Locator =
    this.page.getByTestId('blog-hero-section')
  readonly title: Locator = this.section.getByRole('heading', {
    name: /more than bits/i,
  })
  readonly subtitle: Locator = this.section.getByText(
    /thoughts, tutorials, and deep dives/i
  )
  readonly articleCount: Locator = this.section.getByText('9 Articles')
  readonly updateStatus: Locator = this.section.getByText('Regularly Updated')
}
