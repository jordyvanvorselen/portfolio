import { expect } from '@playwright/test'
import { test } from '@/integration-tests/fixtures/pages.fixture'

test.describe('Mobile Menu', () => {
  test.beforeEach(async ({ homePage }) => {
    // Resize to mobile viewport
    await homePage.page.setViewportSize({ width: 375, height: 667 })
  })

  test('displays mobile menu button on small screens', async ({ homePage }) => {
    await expect(homePage.header.mobileMenuButton).toBeVisible()
  })

  test('opens mobile menu when hamburger button is clicked', async ({
    homePage,
  }) => {
    const mobileMenu = await homePage.header.openMobileMenu()
    await expect(mobileMenu.section).toBeVisible()
  })

  test('closes mobile menu when close button is clicked', async ({
    homePage,
  }) => {
    const mobileMenu = await homePage.header.openMobileMenu()
    await expect(mobileMenu.section).toBeVisible()
    await mobileMenu.close()
    await expect(mobileMenu.section).toHaveClass(
      /translate-x-full.*opacity-0.*pointer-events-none/
    )
  })

  test('displays all navigation items as full-width buttons in mobile menu', async ({
    homePage,
  }) => {
    const mobileMenu = await homePage.header.openMobileMenu()

    await expect(mobileMenu.homeLink).toBeVisible()
    await expect(mobileMenu.blogLink).toBeVisible()
    await expect(mobileMenu.projectsLink).toBeVisible()
    await expect(mobileMenu.experienceLink).toBeVisible()
    await expect(mobileMenu.contactLink).toBeVisible()
  })

  test('displays social links as full-width buttons in mobile menu', async ({
    homePage,
  }) => {
    const mobileMenu = await homePage.header.openMobileMenu()

    await expect(mobileMenu.githubLink).toBeVisible()
    await expect(mobileMenu.linkedinLink).toBeVisible()
  })

  test('displays language switcher as full-width button in mobile menu', async ({
    homePage,
  }) => {
    const mobileMenu = await homePage.header.openMobileMenu()

    await expect(mobileMenu.languageSwitcher).toBeVisible()
  })

  test('mobile menu navigation links navigate to correct pages', async ({
    homePage,
  }) => {
    const mobileMenu = await homePage.header.openMobileMenu()

    await mobileMenu.blogLink.click()
    await expect(homePage.page).toHaveURL('/blog')

    await homePage.page.goBack()
    const mobileMenu2 = await homePage.header.openMobileMenu()
    await mobileMenu2.projectsLink.click()
    await expect(homePage.page).toHaveURL('/projects')
  })

  test('mobile menu visual regression', async ({ homePage }) => {
    const mobileMenu = await homePage.header.openMobileMenu()
    await expect(mobileMenu.section).toHaveScreenshot('mobile-menu.png')
  })
})
