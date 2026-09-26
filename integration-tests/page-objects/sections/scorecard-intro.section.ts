import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class ScorecardIntro extends BaseSection {
  override readonly section: Locator = this.page.getByRole('region', {
    name: 'AI Delivery Scorecard',
  })

  readonly title: Locator = this.section.getByRole('heading', { level: 1 })
  readonly startButton: Locator = this.section
    .getByRole('button', { name: 'Start the scorecard' })
    .first()
  readonly sampleReportButton: Locator = this.section
    .getByRole('button', { name: 'See a sample report' })
    .first()
  readonly facts: Locator = this.section.getByText(
    '14 questions · 3 minutes · Results on screen, no email needed'
  )
  readonly railsHeading: Locator = this.section.getByRole('heading', {
    name: 'The six rails',
  })
  readonly railNames: Locator = this.section.getByRole('term')
  readonly evidenceLinks: Locator = this.section.getByRole('link', {
    name: /opens in a new tab/,
  })

  evidenceLink(source: string | RegExp): Locator {
    return this.section.getByRole('link', { name: source })
  }
}
