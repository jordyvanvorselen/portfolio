import { Locator, Page } from '@playwright/test'

import { BasePage } from '@/integration-tests/pages/base.page'

export class HomePage extends BasePage {
  readonly pageTitle: Locator = this.page.getByRole('heading', {
    name: 'Jordy van Vorselen',
  })

  static async goto(page: Page): Promise<HomePage> {
    await page.goto('/')
    return new HomePage(page)
  }
}
