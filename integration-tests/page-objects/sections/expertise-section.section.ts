import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class ExpertiseSection extends BaseSection {
  override readonly section: Locator = this.page.getByRole('region', {
    name: 'Core Expertise',
  })

  readonly label: Locator = this.section.getByText('Core Expertise')
  readonly title: Locator = this.section.getByRole('heading', {
    name: 'What I Excel At',
  })
  readonly description: Locator = this.section.getByText(
    'Three fundamental pillars that drive my approach to software engineering and ensure delivery of exceptional results.'
  )
  readonly tddCard: Locator = this.section.getByRole('article', {
    name: /test-driven development/i,
  })
  readonly softwareArchitectureCard: Locator = this.section.getByRole(
    'article',
    {
      name: /software architecture/i,
    }
  )
  readonly aiAcceleratedDevelopmentCard: Locator = this.section.getByRole(
    'article',
    {
      name: /ai-accelerated development/i,
    }
  )
  readonly callToAction: Locator = this.section.locator(
    '[data-testid="call-to-action"]'
  )
  readonly callToActionQuestion: Locator = this.callToAction.getByText(
    'Ready to discuss how these skills can benefit your project?'
  )
  readonly callToActionAvailability: Locator = this.callToAction.getByText(
    'Available for remote consulting and full-time opportunities'
  )
  readonly callToActionCheckIcon: Locator = this.callToAction
    .locator('svg')
    .first()
}
