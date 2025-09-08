import { Locator } from '@playwright/test'
import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class ExperienceHero extends BaseSection {
  override readonly section: Locator = this.page.getByRole('region', {
    name: 'Experience Hero',
  })

  readonly title: Locator = this.section.getByRole('heading', {
    name: 'Work Experience',
  })
  readonly description: Locator = this.section.getByText(
    'A journey through innovative companies'
  )
  readonly experienceStat: Locator = this.section.getByText(
    '8+ Years Experience'
  )
  readonly positionsStat: Locator = this.section.getByText(
    /\d+ Positions at \d+ Companies/
  )
  readonly trendingUpIcon: Locator = this.section.locator(
    '[data-testid="trending-up-icon"]'
  )
  readonly animatedDot: Locator = this.section.locator(
    '[data-testid="animated-dot"]'
  )
}
