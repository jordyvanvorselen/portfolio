import { Locator, Page } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class ProjectsGrid extends BaseSection {
  override readonly section: Locator = this.page.getByRole('region', {
    name: 'projects grid',
  })

  readonly firstProjectCard: Locator = this.section.getByRole('article').nth(0)
  readonly firstProjectTitle: Locator = this.firstProjectCard.getByRole(
    'heading',
    {
      name: 'Go + Templ + HTMX @ Vercel',
    }
  )
  readonly firstProjectDescription: Locator = this.firstProjectCard.getByText(
    /A Vercel template for Go projects using Templ and HTMX/
  )

  constructor(page: Page) {
    super(page)
  }
}
