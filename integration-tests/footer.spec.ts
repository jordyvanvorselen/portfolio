import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'

test.describe('Footer', () => {
  test('displays footer with all sections and links', async ({ homePage }) => {
    // Author section
    await expect(homePage.footer.authorName).toBeVisible()
    await expect(homePage.footer.authorDescription).toBeVisible()
    await expect(homePage.footer.location).toBeVisible()
    await expect(homePage.footer.email).toBeVisible()
    await expect(homePage.footer.company).toBeVisible()
    await expect(homePage.footer.btwNumber).toBeVisible()

    // Quick Links section
    await expect(homePage.footer.quickLinksSection).toBeVisible()
    await expect(homePage.footer.homeLink).toBeVisible()
    await expect(homePage.footer.blogLink).toBeVisible()
    await expect(homePage.footer.projectsLink).toBeVisible()
    await expect(homePage.footer.experienceLink).toBeVisible()

    // Connect section
    await expect(homePage.footer.connectSection).toBeVisible()
    await expect(homePage.footer.githubLink).toBeVisible()
    await expect(homePage.footer.linkedinLink).toBeVisible()
    await expect(homePage.footer.emailLink).toBeVisible()
    await expect(homePage.footer.getInTouchButton).toBeVisible()

    // Footer bottom
    await expect(homePage.footer.copyright).toBeVisible()
    await expect(homePage.footer.availabilityStatus).toBeVisible()
    await expect(homePage.footer.backToTopButton).toBeVisible()
  })

  test('has correct footer structure and semantics', async ({ homePage }) => {
    // Footer should be a contentinfo landmark
    await expect(homePage.footer.footer).toBeVisible()

    // Author name should be Jordy van Vorselen
    await expect(homePage.footer.authorName).toHaveText('Jordy van Vorselen')

    // Copyright should show Jordy van Vorselen
    await expect(homePage.footer.copyright).toContainText('Jordy van Vorselen')
  })

  test('scrolls to top when back to top button is clicked', async ({
    homePage,
    page,
  }) => {
    // Wait a moment for smooth scrolling to complete
    await page.waitForTimeout(1000)

    // First, scroll down to make the footer visible and scroll position meaningful
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    // Verify we're not at the top
    const initialScrollPosition = await page.evaluate(() => window.scrollY)
    expect(initialScrollPosition).toBeGreaterThan(0)

    // Click the back to top button
    await homePage.footer.backToTopButton.click()

    // Wait for smooth scroll animation to complete
    await page.waitForFunction(() => window.scrollY === 0)
  })

  test('footer visual regression', async ({ homePage }) => {
    await homePage.hideHeader()
    await expect(homePage.footer.section).toHaveScreenshot('footer.png')
  })
})
