import { Page } from '@playwright/test'

import { HeaderPage } from '@/integration-tests/pages/header.page'
import { FooterPage } from '@/integration-tests/pages/footer.page'

export class BasePage {
  readonly header: HeaderPage = new HeaderPage(this.page)
  readonly footer: FooterPage = new FooterPage(this.page)

  constructor(public readonly page: Page) {}
}
