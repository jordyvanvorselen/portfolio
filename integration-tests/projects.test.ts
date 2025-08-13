import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'

test.describe('Projects Page', () => {
  test('displays projects page', async ({ projectsPage }) => {
    await expect(projectsPage.page).toHaveTitle(/Projects/)
  })

  test('displays hero section with project statistics', async ({
    projectsPage,
  }) => {
    await expect(projectsPage.hero.title).toBeVisible()
    await expect(projectsPage.hero.description).toBeVisible()
    await expect(projectsPage.hero.projectsCount).toBeVisible()
    await expect(projectsPage.hero.starsCount).toBeVisible()
    await expect(projectsPage.hero.forksCount).toBeVisible()
  })
})
