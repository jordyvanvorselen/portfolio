import { Locator, Page } from '@playwright/test'

export class ExpertiseSectionPage {
  readonly section: Locator
  readonly label: Locator
  readonly title: Locator

  constructor(private readonly page: Page) {
    this.section = this.page.getByRole('region', { name: 'Core Expertise' })
    this.label = this.section.getByText('Core Expertise')
    this.title = this.section.getByRole('heading', { name: 'What I Excel At' })
  }
}
