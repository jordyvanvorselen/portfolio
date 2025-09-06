import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class ExpertiseSection extends BaseSection {
  override readonly section: Locator = this.page.getByRole('region', {
    name: 'Core Expertise',
  })

  readonly title: Locator = this.section.getByRole('heading', {
    name: 'Want To Deliver Faster?',
  })
  readonly description: Locator = this.section.getByText(
    'I am specialized in helping teams speed up development. Embracing engineering best practices drives faster delivery of exceptional results.'
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
  readonly continuousDeliveryCard: Locator = this.section.getByRole('article', {
    name: /continuous delivery/i,
  })
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
