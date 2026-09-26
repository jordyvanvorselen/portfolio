import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class ScorecardAnalyzing extends BaseSection {
  override readonly section: Locator = this.page.getByRole('region', {
    name: 'AI Delivery Scorecard',
  })

  readonly heading: Locator = this.section.getByRole('heading', {
    name: 'Running your delivery checks',
  })
  readonly status: Locator = this.section.getByRole('status')
  readonly seeReportButton: Locator = this.section.getByRole('button', {
    name: /See your report/,
  })
  readonly countdown: Locator = this.seeReportButton.getByText(/^\ds$/)

  logLine(text: string | RegExp): Locator {
    return this.section.getByText(text)
  }
}
