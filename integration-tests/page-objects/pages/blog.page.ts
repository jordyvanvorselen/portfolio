import { Page } from '@playwright/test'

import { BasePage } from '@/integration-tests/page-objects/base.page'

export class BlogPage extends BasePage {
  static async goto(page: Page): Promise<BlogPage> {
    await page.goto('/blog')
    return new BlogPage(page)
  }
}
