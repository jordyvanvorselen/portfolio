import { Locator, Page } from '@playwright/test'

import { BasePage } from '@/integration-tests/pages/base.page'
import { HeroPage } from '@/integration-tests/pages/hero.page'
import { ExpertiseSectionPage } from '@/integration-tests/pages/expertise-section.page'

export class HomePage extends BasePage {
  readonly pageTitle: Locator = this.page.getByRole('heading', {
    name: 'Jordy van Vorselen',
  })
  readonly hero: HeroPage = new HeroPage(this.page)
  readonly expertiseSection: ExpertiseSectionPage = new ExpertiseSectionPage(
    this.page
  )

  static async goto(page: Page): Promise<HomePage> {
    await page.goto('/')
    return new HomePage(page)
  }
}
