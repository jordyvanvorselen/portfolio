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
  readonly incidentFinding: Locator = this.section.getByText(
    /more incidents once it ships/
  )
  readonly findingsSource: Locator = this.section.getByText(
    'Faros AI · 2026 · 22,000 developers',
    { exact: true }
  )
  readonly scrollCue: Locator = this.section.getByRole('button', {
    name: 'Why AI speed gets lost',
  })
  readonly bottlenecksHeading: Locator = this.section.getByRole('heading', {
    name: 'The six bottlenecks',
  })
  readonly quote: Locator = this.section.getByRole('blockquote')
  readonly bottleneckNames: Locator = this.section.getByRole('term')
  readonly evidenceLinks: Locator = this.section.getByRole('link', {
    name: /opens in a new tab/,
  })

  evidenceLink(source: string | RegExp): Locator {
    return this.section.getByRole('link', { name: source })
  }
}
