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
    const tddCard = homePage.expertiseSection.tddCard
    await expect(tddCard).toBeVisible()

    // Check for TDD title
    await expect(
      tddCard.getByRole('heading', { name: 'Test-Driven Development' })
    ).toBeVisible()

    // Check for description text
    await expect(
      tddCard.getByText(/I write tests first, then code/)
    ).toBeVisible()

    // Check for KEY SKILLS & TOOLS section
    await expect(tddCard.getByText('KEY SKILLS & TOOLS')).toBeVisible()

    // Check for skill badges
    await expect(tddCard.getByText('Jest')).toBeVisible()
    await expect(tddCard.getByText('Cypress')).toBeVisible()
    await expect(tddCard.getByText('Testing Library')).toBeVisible()
    await expect(tddCard.getByText('Unit Testing')).toBeVisible()
    await expect(tddCard.getByText('Integration Testing')).toBeVisible()
    await expect(tddCard.getByText('E2E Testing')).toBeVisible()

    // Check for publications section
    await expect(tddCard.getByText('12')).toBeVisible()
    await expect(tddCard.getByText('Publications')).toBeVisible()
    await expect(tddCard.getByText('on this topic')).toBeVisible()
  })

  test('displays software architecture expertise card', async ({
    homePage,
  }) => {
    const architectureCard = homePage.expertiseSection.softwareArchitectureCard
    await expect(architectureCard).toBeVisible()

    // Check for Software Architecture title
    await expect(
      architectureCard.getByRole('heading', { name: 'Software Architecture' })
    ).toBeVisible()

    // Check for description text
    await expect(
      architectureCard.getByText(
        /I design scalable, maintainable systems using proven architectural patterns/
      )
    ).toBeVisible()

    // Check for KEY SKILLS & TOOLS section
    await expect(architectureCard.getByText('KEY SKILLS & TOOLS')).toBeVisible()

    // Check for skill badges
    const skillsSection = architectureCard
      .locator('div')
      .filter({ hasText: 'KEY SKILLS & TOOLS' })
      .first()
    await expect(
      skillsSection.getByRole('status').filter({ hasText: 'Microservices' })
    ).toBeVisible()
    await expect(
      skillsSection
        .getByRole('status')
        .filter({ hasText: 'Domain-Driven Design' })
    ).toBeVisible()
    await expect(
      skillsSection.getByRole('status').filter({ hasText: 'Event Sourcing' })
    ).toBeVisible()
    await expect(
      skillsSection.getByRole('status').filter({ hasText: 'CQRS' })
    ).toBeVisible()
    await expect(
      skillsSection
        .getByRole('status')
        .filter({ hasText: 'Clean Architecture' })
    ).toBeVisible()
    await expect(
      skillsSection
        .getByRole('status')
        .filter({ hasText: 'Hexagonal Architecture' })
    ).toBeVisible()

    // Check for publications section
    await expect(architectureCard.getByText('8')).toBeVisible()
    await expect(architectureCard.getByText('Publications')).toBeVisible()
    await expect(architectureCard.getByText('on this topic')).toBeVisible()
  })

  test('displays ai accelerated development expertise card', async ({
    homePage,
  }) => {
    const aiCard = homePage.expertiseSection.aiAcceleratedDevelopmentCard
    await expect(aiCard).toBeVisible()

    // Check for AI Accelerated Development title
    await expect(
      aiCard.getByRole('heading', { name: 'AI-Accelerated Development' })
    ).toBeVisible()

    // Check for description text
    await expect(
      aiCard.getByText(
        /I leverage AI tools to accelerate team velocity while maintaining code quality/
      )
    ).toBeVisible()

    // Check for KEY SKILLS & TOOLS section
    await expect(aiCard.getByText('KEY SKILLS & TOOLS')).toBeVisible()

    // Check for skill badges
    const skillsSection = aiCard
      .locator('div')
      .filter({ hasText: 'KEY SKILLS & TOOLS' })
      .first()
    await expect(
      skillsSection.getByRole('status').filter({ hasText: 'Claude Code' })
    ).toBeVisible()
    await expect(
      skillsSection
        .getByRole('status')
        .filter({ hasText: 'Trunk-Based Development' })
    ).toBeVisible()
    await expect(
      skillsSection
        .getByRole('status')
        .filter({ hasText: 'Continuous Deployment' })
    ).toBeVisible()
    await expect(
      skillsSection.getByRole('status').filter({ hasText: 'Pair Programming' })
    ).toBeVisible()
    await expect(
      skillsSection.getByRole('status').filter({ hasText: 'Automated Testing' })
    ).toBeVisible()

    // Check for publications section
    await expect(aiCard.getByText('15')).toBeVisible()
    await expect(aiCard.getByText('Publications')).toBeVisible()
    await expect(aiCard.getByText('on this topic')).toBeVisible()
  })

  test('displays call-to-action section', async ({ homePage }) => {
    const callToAction = homePage.expertiseSection.callToAction

    // Check for the main question text
    await expect(
      callToAction.getByText(
        'Ready to discuss how these skills can benefit your project?'
      )
    ).toBeVisible()

    // Check for the availability message with check icon
    await expect(
      callToAction.getByText(
        'Available for consulting and full-time opportunities'
      )
    ).toBeVisible()

    // Check for the check icon
    const checkIcon = callToAction.locator('svg').first()
    await expect(checkIcon).toBeVisible()
  })

  test('expertise section visual regression', async ({ homePage }) => {
    await expect(homePage.expertiseSection.section).toHaveScreenshot(
      'expertise-section.png',
      {
        animations: 'disabled',
      }
    )
  })
})
