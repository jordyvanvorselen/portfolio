import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'

test.describe('Expertise Section', () => {
  test('displays expertise section', async ({ homePage }) => {
    await expect(homePage.expertiseSection.section).toBeVisible()

    // Check for the "Core Expertise" label
    await expect(homePage.expertiseSection.label).toBeVisible()

    await expect(homePage.expertiseSection.title).toBeVisible()

    // Check for the description text
    await expect(homePage.expertiseSection.description).toBeVisible()
  })

  test('displays test-driven development expertise card', async ({
    homePage,
  }) => {
    await expect(homePage.tddCard.section).toBeVisible()
    await expect(homePage.tddCard.title).toBeVisible()
    await expect(homePage.tddCard.description).toBeVisible()
    await expect(homePage.tddCard.keySkillsLabel).toBeVisible()

    // Check for skill badges
    await expect(homePage.tddCard.jestBadge).toBeVisible()
    await expect(homePage.tddCard.cypressBadge).toBeVisible()
    await expect(homePage.tddCard.testingLibraryBadge).toBeVisible()
    await expect(homePage.tddCard.unitTestingBadge).toBeVisible()
    await expect(homePage.tddCard.integrationTestingBadge).toBeVisible()
    await expect(homePage.tddCard.e2eTestingBadge).toBeVisible()

    // Check for publications section
    await expect(homePage.tddCard.publicationsCount).toBeVisible()
    await expect(homePage.tddCard.publicationsLabel).toBeVisible()
    await expect(homePage.tddCard.publicationsSubtext).toBeVisible()
  })

  test('displays software architecture expertise card', async ({
    homePage,
  }) => {
    await expect(homePage.softwareArchitectureCard.section).toBeVisible()
    await expect(homePage.softwareArchitectureCard.title).toBeVisible()
    await expect(homePage.softwareArchitectureCard.description).toBeVisible()
    await expect(homePage.softwareArchitectureCard.keySkillsLabel).toBeVisible()

    // Check for skill badges
    await expect(
      homePage.softwareArchitectureCard.microservicesBadge
    ).toBeVisible()
    await expect(homePage.softwareArchitectureCard.dddBadge).toBeVisible()
    await expect(
      homePage.softwareArchitectureCard.eventSourcingBadge
    ).toBeVisible()
    await expect(homePage.softwareArchitectureCard.cqrsBadge).toBeVisible()
    await expect(
      homePage.softwareArchitectureCard.cleanArchitectureBadge
    ).toBeVisible()
    await expect(
      homePage.softwareArchitectureCard.hexagonalArchitectureBadge
    ).toBeVisible()

    // Check for publications section
    await expect(
      homePage.softwareArchitectureCard.publicationsCount
    ).toBeVisible()
    await expect(
      homePage.softwareArchitectureCard.publicationsLabel
    ).toBeVisible()
    await expect(
      homePage.softwareArchitectureCard.publicationsSubtext
    ).toBeVisible()
  })

  test('displays ai accelerated development expertise card', async ({
    homePage,
  }) => {
    await expect(homePage.aiCard.section).toBeVisible()
    await expect(homePage.aiCard.title).toBeVisible()
    await expect(homePage.aiCard.description).toBeVisible()
    await expect(homePage.aiCard.keySkillsLabel).toBeVisible()

    // Check for skill badges
    await expect(homePage.aiCard.claudeCodeBadge).toBeVisible()
    await expect(homePage.aiCard.trunkBasedBadge).toBeVisible()
    await expect(homePage.aiCard.continuousDeploymentBadge).toBeVisible()
    await expect(homePage.aiCard.pairProgrammingBadge).toBeVisible()
    await expect(homePage.aiCard.automatedTestingBadge).toBeVisible()

    // Check for publications section
    await expect(homePage.aiCard.publicationsCount).toBeVisible()
    await expect(homePage.aiCard.publicationsLabel).toBeVisible()
    await expect(homePage.aiCard.publicationsSubtext).toBeVisible()
  })

  test('displays call-to-action section', async ({ homePage }) => {
    await expect(homePage.expertiseSection.callToAction).toBeVisible()
    await expect(homePage.expertiseSection.callToActionQuestion).toBeVisible()
    await expect(
      homePage.expertiseSection.callToActionAvailability
    ).toBeVisible()
    await expect(homePage.expertiseSection.callToActionCheckIcon).toBeVisible()
  })

  test('expertise section visual regression', async ({ homePage }) => {
    await expect(homePage.expertiseSection.section).toHaveScreenshot(
      'expertise-section.png'
    )
  })
})
