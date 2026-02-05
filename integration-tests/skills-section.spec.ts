import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'

test.describe('Skills Section', () => {
  test('displays skills section with all content', async ({ homePage }) => {
    // Verify section is visible
    await expect(homePage.skillsSection.section).toBeVisible()

    // Verify company logos are displayed with proper alt text
    await expect(homePage.skillsSection.asmlLogo).toHaveAttribute(
      'alt',
      'ASML logo'
    )
    await expect(homePage.skillsSection.signifyLogo).toHaveAttribute(
      'alt',
      'Signify logo'
    )
    await expect(homePage.skillsSection.kabisaLogo).toHaveAttribute(
      'alt',
      'Kabisa logo'
    )

    // Verify main heading and subtitle
    await expect(homePage.skillsSection.title).toBeVisible()
    await expect(homePage.skillsSection.title).toHaveText('Trusted By The Best')
    await expect(homePage.skillsSection.subtitle).toBeVisible()
    await expect(homePage.skillsSection.subtitle).toContainText(
      'biggest Dutch companies, using these technologies'
    )

    // Verify all 10 technology cards are displayed
    await expect(homePage.skillsSection.typescriptCard).toBeVisible()
    await expect(homePage.skillsSection.javaCard).toBeVisible()
    await expect(homePage.skillsSection.elixirCard).toBeVisible()
    await expect(homePage.skillsSection.pythonCard).toBeVisible()
    await expect(homePage.skillsSection.rubyCard).toBeVisible()
    await expect(homePage.skillsSection.csharpCard).toBeVisible()
    await expect(homePage.skillsSection.awsCard).toBeVisible()
    await expect(homePage.skillsSection.flutterCard).toBeVisible()
    await expect(homePage.skillsSection.devopsCard).toBeVisible()
    await expect(homePage.skillsSection.blockchainCard).toBeVisible()

    // Verify experience link is present
    await expect(homePage.skillsSection.experienceLink).toBeVisible()
  })

  test('experience link navigates to experience page', async ({
    homePage,
    page,
  }) => {
    await homePage.skillsSection.experienceLink.click()
    await expect(page).toHaveURL('/experience')
  })

  test('skills section visual regression', async ({ homePage }) => {
    await homePage.hideHeader()
    await expect(homePage.skillsSection.section).toHaveScreenshot(
      'skills-section.png'
    )
  })
})
