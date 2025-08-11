import { test as base } from '@playwright/test'

import { HomePage } from '@/integration-tests/page-objects/pages/home.page'
import { BlogPage } from '@/integration-tests/page-objects/pages/blog.page'

type Fixture = {
  homePage: HomePage
  blogPage: BlogPage
}

export const test = base.extend<Fixture>({
  page: async ({ page }, pwUse) => {
    await page.addInitScript(() => (window.isUnderTest = true))

    await pwUse(page)
  },

  homePage: async ({ page }, pwUse) => {
    await pwUse(await HomePage.goto(page))
  },

  blogPage: async ({ page }, pwUse) => {
    await pwUse(await BlogPage.goto(page))
  },
})
