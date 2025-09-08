import { expect } from '@playwright/test'
import { test } from '@/integration-tests/fixtures/pages.fixture'

test.describe('Header Component', () => {
  test('displays header with branding', async ({ homePage }) => {
    await expect(homePage.header.section).toBeVisible()
    await expect(homePage.header.brandingLink).toBeVisible()
    await expect(homePage.header.brandingLink).toHaveText('More Than Bits')
  })

  test('displays navigation menu', async ({ homePage }) => {
    await expect(homePage.header.homeLink).toBeVisible()
    await expect(homePage.header.blogLink).toBeVisible()
    await expect(homePage.header.projectsLink).toBeVisible()
    await expect(homePage.header.experienceLink).toBeVisible()
    await expect(homePage.header.contactLink).toBeVisible()
  })

  test('displays availability status', async ({ homePage }) => {
    await expect(homePage.header.availabilityStatus).toBeVisible()
    await expect(homePage.header.availabilityStatus).toHaveText('Available')
  })

  test('displays availability icon', async ({ homePage }) => {
    await expect(homePage.header.availabilityIcon).toBeVisible()
  })

  test('displays social icons', async ({ homePage }) => {
    await expect(homePage.header.githubLink).toBeVisible()
    await expect(homePage.header.linkedinLink).toBeVisible()
  })

  test('branding link navigates to home page', async ({ homePage }) => {
    await homePage.header.brandingLink.click()
    await expect(homePage.page).toHaveURL('/')
  })

  test('navigation links navigate to correct pages', async ({ homePage }) => {
    await homePage.header.homeLink.click()
    await expect(homePage.page).toHaveURL('/')

    await homePage.header.blogLink.click()
    await expect(homePage.page).toHaveURL('/blog')

    await homePage.page.goBack()
    await homePage.header.projectsLink.click()
    await expect(homePage.page).toHaveURL('/projects')

    await homePage.page.goBack()
    await homePage.header.experienceLink.click()
    await expect(homePage.page).toHaveURL('/experience')

    await homePage.page.goBack()
    await homePage.header.contactLink.click()
    await expect(homePage.page).toHaveURL('/contact')
  })

  test('external social links open in new tab', async ({
    homePage,
    context,
  }) => {
    const [githubPage] = await Promise.all([
      context.waitForEvent('page'),
      homePage.header.githubLink.click(),
    ])

    await expect(githubPage).toHaveURL('https://github.com/jordyvanvorselen')
    await githubPage.close()

    const [linkedinPage] = await Promise.all([
      context.waitForEvent('page'),
      homePage.header.linkedinLink.click(),
    ])

    await expect(linkedinPage.url()).toContain('linkedin.com')
    await expect(linkedinPage.url()).toContain('jordy-van-vorselen')
    await linkedinPage.close()
  })

  test('toggles language switcher correctly', async ({ homePage }) => {
    // Verify initial state (English)
    await expect(homePage.header.languageSwitcher).toBeVisible()
    await expect(homePage.header.languageSwitcher).toHaveAttribute(
      'aria-label',
      'Nederlands'
    )

    // Verify initial content is in English
    await expect(homePage.hero.description).toContainText('exceptional quality')

    // Verify Dutch flag is visible
    await expect(
      homePage.header.languageSwitcher.locator('.fi-nl')
    ).toBeVisible()

    // Click to switch to Dutch
    await homePage.header.languageSwitcher.click()

    // Wait for page reload
    await homePage.page.waitForLoadState('networkidle')

    // Verify switched state (should now show British flag and switch to English option)
    await expect(homePage.header.languageSwitcher).toHaveAttribute(
      'aria-label',
      'English'
    )

    // Verify content is now in Dutch
    await expect(homePage.hero.description).toContainText(
      'uitzonderlijke kwaliteit'
    )

    // Verify British flag is visible
    await expect(
      homePage.header.languageSwitcher.locator('.fi-gb')
    ).toBeVisible()

    // Click to switch back to English
    await homePage.header.languageSwitcher.click()

    // Wait for page reload
    await homePage.page.waitForLoadState('networkidle')

    // Verify back to original state
    await expect(homePage.header.languageSwitcher).toHaveAttribute(
      'aria-label',
      'Nederlands'
    )

    // Verify content is back to English
    await expect(homePage.hero.description).toContainText('exceptional quality')
  })

  test('header visual regression', async ({ homePage }) => {
    await expect(homePage.header.section).toHaveScreenshot('header.png')
  })

  test.describe('Mobile Menu', () => {
    test.beforeEach(async ({ homePage }) => {
      // Resize to mobile viewport
      await homePage.page.setViewportSize({ width: 375, height: 667 })
    })

    test('displays mobile menu button on small screens', async ({
      homePage,
    }) => {
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
  })
})
