import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class ScorecardSymptoms extends BaseSection {
  override readonly section: Locator = this.page.getByRole('region', {
    name: 'Sound familiar?',
  })

  readonly quotes: Locator = this.section.getByRole('blockquote')
  readonly reviewMultiplier: Locator = this.section
    .getByText('5.4×', { exact: true })
    .first()
  readonly incidentMultiplier: Locator = this.section
    .getByText('3.4×', { exact: true })
    .first()
}
