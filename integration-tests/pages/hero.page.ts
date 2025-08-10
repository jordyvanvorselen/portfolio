import { Locator, Page } from '@playwright/test'

export class HeroPage {
  readonly locator: Locator = this.page.locator('section').first()
  readonly availabilityBadge: Locator = this.page.getByText(
    'Available for new remote opportunities'
  )
  readonly name: Locator = this.page.getByRole('heading', {
    name: 'Jordy van Vorselen',
    level: 1,
  })
  readonly title: Locator = this.page.getByText('Senior Software Engineer')
  readonly description: Locator = this.page.getByText(
    /I help engineering teams deliver better software faster/
  )
  readonly getInTouchButton: Locator = this.page.getByRole('button', {
    name: 'Get in Touch',
  })
  readonly downloadResumeButton: Locator = this.page.getByRole('button', {
    name: 'Download Resume',
  })
  readonly githubLink: Locator = this.locator.getByRole('link', {
    name: 'GitHub',
  })
  readonly linkedinLink: Locator = this.locator.getByRole('link', {
    name: 'LinkedIn',
  })
  readonly emailLink: Locator = this.locator.getByRole('link', {
    name: 'Email',
  })
  readonly scrollIndicator: Locator = this.locator.getByText('SCROLL')

  constructor(public readonly page: Page) {}
}
