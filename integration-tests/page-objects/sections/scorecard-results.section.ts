import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class ScorecardResults extends BaseSection {
  override readonly section: Locator = this.page.getByRole('region', {
    name: 'AI Delivery Scorecard',
  })

  readonly tier: Locator = this.section.getByRole('heading', { level: 1 })
  readonly scoreLine: Locator = this.section.getByText(/Your delivery scores/)
  readonly railsHeading: Locator = this.section.getByRole('heading', {
    name: 'Your six rails',
  })
  readonly radar: Locator = this.section.getByRole('img', {
    name: 'Score per delivery rail',
  })
  readonly biggestLeakBadges: Locator = this.section.getByText('Biggest leak', {
    exact: true,
  })
  readonly biggestLeakEyebrow: Locator =
    this.section.getByText('Your biggest leak')
  readonly firstFixHeading: Locator = this.section.getByRole('heading', {
    name: 'First fix',
  })
  readonly noLeaksEyebrow: Locator = this.section.getByText('No leaks found')
  readonly costHeading: Locator = this.section.getByRole('heading', {
    name: /on the table/,
  })
  readonly hoursLost: Locator = this.section.getByText(/^~\d+h$/)
  readonly auditCallButton: Locator = this.section.getByRole('link', {
    name: 'Book a 30-minute call',
  })
  readonly substackLink: Locator = this.section.getByRole('link', {
    name: 'Subscribe on Substack',
  })
  readonly retakeButton: Locator = this.section.getByRole('button', {
    name: 'Retake the scorecard',
  })
  readonly shareButton: Locator = this.section.getByRole('button', {
    name: /Share the scorecard|Link copied/,
  })

  heading(name: string): Locator {
    return this.section.getByRole('heading', { name, exact: true })
  }
}
