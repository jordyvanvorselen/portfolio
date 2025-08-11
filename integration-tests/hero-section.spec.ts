import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'

test.describe('Hero Section', () => {
  test('displays hero section with all required elements', async ({
    homePage,
  }) => {
    await expect(homePage.hero.section).toBeVisible()
    await expect(homePage.hero.availabilityBadge).toBeVisible()
    await expect(homePage.hero.name).toBeVisible()
    await expect(homePage.hero.title).toBeVisible()
    await expect(homePage.hero.description).toBeVisible()
    await expect(homePage.hero.getInTouchButton).toBeVisible()
    await expect(homePage.hero.downloadResumeButton).toBeVisible()
    await expect(homePage.hero.githubLink).toBeVisible()
    await expect(homePage.hero.linkedinLink).toBeVisible()
    await expect(homePage.hero.emailLink).toBeVisible()
    await expect(homePage.hero.scrollIndicatorTitle).toBeVisible()
    await expect(homePage.hero.scrollIndicatorSubtitle).toBeVisible()
  })

  test('displays redesigned scroll indicator with new content', async ({
    homePage,
  }) => {
    await expect(homePage.hero.scrollIndicatorTitle).toBeVisible()
    await expect(homePage.hero.scrollIndicatorTitle).toHaveText(
      'Discover My Core Expertise'
    )
    await expect(homePage.hero.scrollIndicatorSubtitle).toBeVisible()
    await expect(homePage.hero.scrollIndicatorSubtitle).toHaveText(
      'Explore the skills I master'
    )
    await expect(homePage.hero.scrollIndicatorIcon).toBeVisible()
  })

  test('hero section visual regression', async ({ homePage }) => {
    await expect(homePage.hero.section).toHaveScreenshot('hero-section.png', {
      animations: 'disabled',
    })
  })
})
