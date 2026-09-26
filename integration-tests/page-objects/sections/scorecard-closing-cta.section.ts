import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class ScorecardClosingCta extends BaseSection {
  override readonly section: Locator = this.page.getByRole('region', {
    name: 'Which rail leaks the most speed on your team?',
  })

  readonly startButton: Locator = this.section.getByRole('button', {
    name: 'Start the scorecard',
  })
  readonly sampleReportButton: Locator = this.section.getByRole('button', {
    name: 'See a sample report',
  })
}
