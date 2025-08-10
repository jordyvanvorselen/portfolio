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

  test('displays test-driven development expertise card', async ({ homePage }) => {
    const tddCard = homePage.expertiseSection.tddCard
    await expect(tddCard).toBeVisible()
    
    // Check for TDD title
    await expect(tddCard.getByRole('heading', { name: 'Test-Driven Development' })).toBeVisible()
    
    // Check for description text
    await expect(tddCard.getByText(/I write tests first, then code/)).toBeVisible()
    
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
})
