import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'

test.describe('Expertise Section', () => {
  test('displays expertise section', async ({ homePage }) => {
    await expect(homePage.expertiseSection.section).toBeVisible()
    await expect(homePage.expertiseSection.title).toBeVisible()
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

  test('displays continuous delivery expertise card', async ({ homePage }) => {
    await expect(homePage.continuousDeliveryCard.section).toBeVisible()
    await expect(homePage.continuousDeliveryCard.title).toBeVisible()
    await expect(homePage.continuousDeliveryCard.description).toBeVisible()
    await expect(homePage.continuousDeliveryCard.keySkillsLabel).toBeVisible()

    // Check for skill badges
    await expect(
      homePage.continuousDeliveryCard.githubActionsBadge
    ).toBeVisible()
    await expect(
      homePage.continuousDeliveryCard.dockerKubernetesBadge
    ).toBeVisible()
    await expect(
      homePage.continuousDeliveryCard.infrastructureAsCodeBadge
    ).toBeVisible()
    await expect(
      homePage.continuousDeliveryCard.progressiveDeploymentBadge
    ).toBeVisible()
    await expect(
      homePage.continuousDeliveryCard.automatedRollbacksBadge
    ).toBeVisible()

    // Check for publications section
    await expect(
      homePage.continuousDeliveryCard.publicationsCount
    ).toBeVisible()
    await expect(
      homePage.continuousDeliveryCard.publicationsLabel
    ).toBeVisible()
    await expect(
      homePage.continuousDeliveryCard.publicationsSubtext
    ).toBeVisible()
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
    await homePage.hideHeader()
    await expect(homePage.expertiseSection.section).toHaveScreenshot(
      'expertise-section.png'
    )
  })
})
