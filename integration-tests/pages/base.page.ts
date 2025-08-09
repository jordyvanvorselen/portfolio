import { Page } from '@playwright/test'

import { HeaderPage } from '@/integration-tests/pages/header.page'

export class BasePage {
  readonly header: HeaderPage = new HeaderPage(this.page)

  constructor(public readonly page: Page) {}
}
