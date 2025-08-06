import { Locator, Page } from '@playwright/test'

export class HeroPage {
  readonly locator: Locator = this.page.locator('section').first()
  readonly availabilityBadge: Locator = this.page.getByText('Available for new opportunities')
  readonly name: Locator = this.page.getByRole('heading', { name: 'Jordy van Vorselen', level: 1 })
  readonly title: Locator = this.page.getByText('Senior Software Engineer')
  readonly description: Locator = this.page.getByText(/I craft robust, scalable software/)
  readonly getInTouchButton: Locator = this.page.getByRole('button', { name: 'Get in Touch' })
  readonly downloadResumeButton: Locator = this.page.getByRole('button', { name: 'Download Resume' })

  constructor(public readonly page: Page) {}
}