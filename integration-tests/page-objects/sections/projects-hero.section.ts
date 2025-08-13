import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class ProjectsHero extends BaseSection {
  override readonly section: Locator = this.page.getByRole('region', {
    name: 'hero',
  })

  readonly title: Locator = this.section.getByRole('heading', { level: 1 })
  readonly description: Locator = this.section.getByText(
    /crafting innovative solutions/i
  )
  readonly projectsCount: Locator = this.section.getByText('15')
  readonly starsCount: Locator = this.section.getByText('2,500')
  readonly forksCount: Locator = this.section.getByText('425')
}
