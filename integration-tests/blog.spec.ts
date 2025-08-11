import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'

test('renders blog page', async ({ blogPage }) => {
  await expect(blogPage.page).toHaveTitle(/Blog/)
})

test('displays blog hero section content', async ({ blogPage }) => {
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

test('displays featured article section', async ({ blogPage }) => {
  await expect(
    blogPage.page.getByRole('heading', { name: 'Featured article' })
  ).toBeVisible()
  await expect(blogPage.featuredBlogCard).toBeVisible()
  await expect(blogPage.featuredBlogCard).toHaveAttribute(
    'data-featured',
    'true'
  )
})

test('displays latest articles section', async ({ blogPage }) => {
  await expect(
    blogPage.page.getByRole('heading', { name: 'Latest articles' })
  ).toBeVisible()
  await expect(blogPage.blogCards).toHaveCount(6) // 1 featured + 5 latest = 6 total articles
})
