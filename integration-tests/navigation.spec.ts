import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'
import { HomePage } from '@/integration-tests/pages/home.page'

test(`
	As a user
	I want to be able to navigate back to the homepage by clicking the logo
	So that I can easily return to the main page
`, async ({ page }) => {
  var homePage = await HomePage.goto(page)

  await expect(homePage.page).toHaveURL('/')
})
