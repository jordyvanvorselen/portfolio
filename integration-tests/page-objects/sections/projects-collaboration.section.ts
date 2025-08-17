import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class ProjectsCollaboration extends BaseSection {
  override readonly section: Locator = this.page.getByRole('region', {
    name: 'collaboration',
  })

  readonly title: Locator = this.section.getByRole('heading', {
    name: /Let's Build Something Amazing Together/i,
  })

  readonly description: Locator = this.section.getByText(
    /Interested in collaborating on open source projects/i
  )

  readonly githubButton: Locator = this.section.getByRole('link', {
    name: /Follow on GitHub/i,
  })

  readonly contactButton: Locator = this.section.getByRole('link', {
    name: /Get in Touch/i,
  })
}
