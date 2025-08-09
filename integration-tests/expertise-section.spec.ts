import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'

test.describe('Expertise Section', () => {
  test('displays expertise section', async ({ homePage }) => {
    await expect(homePage.expertiseSection.section).toBeVisible()

    // Check for the "Core Expertise" label
    await expect(homePage.expertiseSection.label).toBeVisible()

    await expect(homePage.expertiseSection.title).toBeVisible()
  })
})
