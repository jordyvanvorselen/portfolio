import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'

test.describe('Projects Page', () => {
  test('displays complete projects page with hero and grid', async ({
    projectsPage,
  }) => {
    // Page title
    await expect(projectsPage.page).toHaveTitle(/Projects/)

    // Hero section
    await expect(projectsPage.hero.title).toBeVisible()
    await expect(projectsPage.hero.description).toBeVisible()
    await expect(projectsPage.hero.projectsCount).toBeVisible()
    await expect(projectsPage.hero.starsCount).toBeVisible()
    await expect(projectsPage.hero.forksCount).toBeVisible()

    // Projects grid
    await expect(projectsPage.projectsGrid.section).toBeVisible()
    await expect(projectsPage.projectsGrid.firstProjectCard).toBeVisible()
    await expect(projectsPage.projectsGrid.firstProjectTitle).toBeVisible()
    await expect(
      projectsPage.projectsGrid.firstProjectDescription
    ).toBeVisible()
  })
})
