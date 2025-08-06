import { Locator, Page } from '@playwright/test'

import { BasePage } from '@/integration-tests/pages/base.page'
import { HeroPage } from '@/integration-tests/pages/hero.page'

export class HomePage extends BasePage {
  readonly pageTitle: Locator = this.page.getByRole('heading', {
    name: 'Jordy van Vorselen',
  })
  readonly hero: HeroPage = new HeroPage(this.page)

  static async goto(page: Page): Promise<HomePage> {
    await page.goto('/')
    return new HomePage(page)
  }
}
