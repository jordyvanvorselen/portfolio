import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class ProjectsHero extends BaseSection {
  override readonly section: Locator = this.page.getByRole('region', {
    name: 'hero',
  })

  readonly title: Locator = this.section.getByRole('heading', { level: 1 })
  readonly description: Locator = this.section.getByText(
    /A collection of innovative software solutions/i
  )
  readonly projectsCount: Locator = this.section.getByText('6')
  readonly starsCount: Locator = this.section.getByText('12,037')
  readonly forksCount: Locator = this.section.getByText('1,543')
}
