import { Page } from '@playwright/test'

import { Header } from '@/integration-tests/page-objects/sections/header.section'
import { Footer } from '@/integration-tests/page-objects/sections/footer.section'

export abstract class BasePage {
  readonly header: Header = new Header(this.page)
  readonly footer: Footer = new Footer(this.page)

  constructor(public readonly page: Page) {}
}
