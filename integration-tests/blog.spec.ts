import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'

test('renders blog page', async ({ blogPage }) => {
  await expect(blogPage.page).toHaveTitle(/Blog/)
})

test('displays blog hero section content', async ({ blogPage }) => {
  await expect(blogPage.hero.icon).toBeVisible()
  await expect(blogPage.hero.title).toBeVisible()
  await expect(blogPage.hero.title).toHaveText('Engineering Insights')
  await expect(blogPage.hero.subtitle).toBeVisible()
  await expect(blogPage.hero.articleCount).toBeVisible()
  await expect(blogPage.hero.articleCount).toHaveText('6 Articles')
  await expect(blogPage.hero.updateStatus).toBeVisible()
  await expect(blogPage.hero.updateStatus).toHaveText('Regularly Updated')
})

test('displays search bar and filters', async ({ blogPage }) => {
  await expect(blogPage.searchBar).toBeVisible()
  await expect(blogPage.searchBar).toHaveAttribute(
    'placeholder',
    'Search articles...'
  )
  await expect(blogPage.allFilter).toBeVisible()
  await expect(blogPage.allFilter).toHaveText('All')
})
