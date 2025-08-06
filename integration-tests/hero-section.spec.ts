import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'

test.describe('Hero Section', () => {
  test('displays hero section with all required elements', async ({ homePage }) => {
    await expect(homePage.hero.locator).toBeVisible()
    await expect(homePage.hero.availabilityBadge).toBeVisible()
    await expect(homePage.hero.name).toBeVisible()
    await expect(homePage.hero.title).toBeVisible()
    await expect(homePage.hero.description).toBeVisible()
    await expect(homePage.hero.getInTouchButton).toBeVisible()
    await expect(homePage.hero.downloadResumeButton).toBeVisible()
    await expect(homePage.hero.githubLink).toBeVisible()
    await expect(homePage.hero.linkedinLink).toBeVisible()
    await expect(homePage.hero.emailLink).toBeVisible()
    await expect(homePage.hero.scrollIndicator).toBeVisible()
  })

  test('hero section visual regression', async ({ homePage }) => {
    await expect(homePage.hero.locator).toHaveScreenshot('hero-section.png')
  })
})