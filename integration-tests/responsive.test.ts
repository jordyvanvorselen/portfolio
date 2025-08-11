import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'

test.describe('Responsive Design', () => {
  test.describe('Mobile (375px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
    })

    test('header should be mobile-friendly', async ({ homePage }) => {
      await expect(homePage.header.section).toBeVisible()

      // Header should not overflow
      const headerBox = await homePage.header.section.boundingBox()
      expect(headerBox?.width).toBeLessThanOrEqual(375)

      // All navigation links should be accessible
      await expect(homePage.header.homeLink).toBeVisible()
      await expect(homePage.header.blogLink).toBeVisible()
      await expect(homePage.header.projectsLink).toBeVisible()
      await expect(homePage.header.experienceLink).toBeVisible()
      await expect(homePage.header.contactLink).toBeVisible()
    })

    test('hero section should stack vertically', async ({ homePage }) => {
      await expect(homePage.hero.section).toBeVisible()

      // Hero content should not overflow
      const heroBox = await homePage.hero.section.boundingBox()
      expect(heroBox?.width).toBeLessThanOrEqual(375)

      // Hero action buttons should be accessible
      await expect(homePage.hero.getInTouchButton).toBeVisible()
      await expect(homePage.hero.downloadResumeButton).toBeVisible()
    })
  })

  test.describe('Tablet (768px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
    })

    test('header should show condensed navigation', async ({ homePage }) => {
      await expect(homePage.header.section).toBeVisible()

      // Header should fit within tablet width
      const headerBox = await homePage.header.section.boundingBox()
      expect(headerBox?.width).toBeLessThanOrEqual(768)

      // Navigation should be visible but potentially condensed
      await expect(homePage.header.navigation).toBeVisible()
    })

    test('hero section should be optimized for tablet', async ({
      homePage,
    }) => {
      await expect(homePage.hero.section).toBeVisible()

      // Hero content should not overflow
      const heroBox = await homePage.hero.section.boundingBox()
      expect(heroBox?.width).toBeLessThanOrEqual(768)
    })
  })

  test.describe('Desktop (1200px+)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1200, height: 800 })
    })

    test('header should show full navigation', async ({ homePage }) => {
      await expect(homePage.header.section).toBeVisible()

      // Full navigation should be visible
      await expect(homePage.header.navigation).toBeVisible()

      // All navigation items should be visible
      await expect(homePage.header.homeLink).toBeVisible()
      await expect(homePage.header.blogLink).toBeVisible()
      await expect(homePage.header.projectsLink).toBeVisible()
      await expect(homePage.header.experienceLink).toBeVisible()
      await expect(homePage.header.contactLink).toBeVisible()
    })

    test('hero section should use full layout', async ({ homePage }) => {
      await expect(homePage.hero.section).toBeVisible()

      // Hero actions should be side by side
      await expect(homePage.hero.getInTouchButton).toBeVisible()
      await expect(homePage.hero.downloadResumeButton).toBeVisible()
    })
  })
})
