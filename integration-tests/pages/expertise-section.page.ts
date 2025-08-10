import { Locator, Page } from '@playwright/test'

export class ExpertiseSectionPage {
  readonly section: Locator
  readonly label: Locator
  readonly title: Locator
  readonly description: Locator
  readonly tddCard: Locator
  readonly softwareArchitectureCard: Locator
  readonly aiAcceleratedDevelopmentCard: Locator

  constructor(private readonly page: Page) {
    this.section = this.page.getByRole('region', { name: 'Core Expertise' })
    this.label = this.section.getByText('Core Expertise')
    this.title = this.section.getByRole('heading', { name: 'What I Excel At' })
    this.description = this.section.getByText(
      'Three fundamental pillars that drive my approach to software engineering and ensure delivery of exceptional results.'
    )
    this.tddCard = this.section.getByRole('article', {
      name: /test-driven development/i,
    })
    this.softwareArchitectureCard = this.section.getByRole('article', {
      name: /software architecture/i,
    })
    this.aiAcceleratedDevelopmentCard = this.section.getByRole('article', {
      name: /ai-accelerated development/i,
    })
  }
}
