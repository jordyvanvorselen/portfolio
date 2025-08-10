import { type NetworkFixture, createNetworkFixture } from '@msw/playwright'
import { test as base } from '@playwright/test'

import { HomePage } from '@/integration-tests/page-objects/pages/home.page'
import { defaultHandlers } from '@/integration-tests/msw/defaultHandlers'

type Fixture = {
  msw: NetworkFixture
  homePage: HomePage
}

export const test = base.extend<Fixture>({
  msw: createNetworkFixture({ initialHandlers: defaultHandlers }),

  page: async ({ page }, pwUse) => {
    await page.addInitScript(() => (window.isUnderTest = true))

    await pwUse(page)
  },

  homePage: async ({ page }, pwUse) => {
    await pwUse(await HomePage.goto(page))
  },
})
