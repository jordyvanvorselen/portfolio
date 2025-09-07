import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'

test('renders blog page', async ({ blogPage }) => {
  await expect(blogPage.page).toHaveTitle(/Blog/)
})

test('displays blog hero section content', async ({ blogPage }) => {
  await expect(blogPage.hero.title).toBeVisible()
  await expect(blogPage.hero.title).toHaveText('More Than Bits')
  await expect(blogPage.hero.subtitle).toBeVisible()
  await expect(blogPage.hero.articleCount).toBeVisible()
  await expect(blogPage.hero.articleCount).toHaveText('6 Articles')
  await expect(blogPage.hero.updateStatus).toBeVisible()
  await expect(blogPage.hero.updateStatus).toHaveText('Regularly Updated')
})

test('displays search bar and filters', async ({ blogPage }) => {
  await expect(blogPage.searchFilters.searchBar).toBeVisible()
  await expect(blogPage.searchFilters.searchBar).toHaveAttribute(
    'placeholder',
    'Search articles...'
  )
  await expect(blogPage.searchFilters.allFilter).toBeVisible()
  await expect(blogPage.searchFilters.allFilter).toHaveText('All')
})

test('displays featured article section', async ({ blogPage }) => {
  await expect(blogPage.featuredSection.title).toBeVisible()
  await expect(blogPage.featuredSection.featuredCard).toBeVisible()
  await expect(blogPage.featuredSection.featuredCard).toHaveAttribute(
    'data-featured',
    'true'
  )
})

test('displays latest articles section', async ({ blogPage }) => {
  await expect(blogPage.blogGrid.title).toBeVisible()
  await expect(blogPage.blogGrid.blogCards).toHaveCount(6) // 1 featured + 5 latest = 6 total articles
})

test('blog hero section visual regression', async ({ blogPage }) => {
  await blogPage.hideHeader()
  await expect(blogPage.hero.section).toHaveScreenshot('blog-hero-section.png')
})

test('blog search filters visual regression', async ({ blogPage }) => {
  await blogPage.hideHeader()
  await expect(blogPage.searchFilters.section).toHaveScreenshot(
    'blog-search-filters.png'
  )
})

test('featured blog section visual regression', async ({ blogPage }) => {
  await blogPage.hideHeader()
  await expect(blogPage.featuredSection.section).toHaveScreenshot(
    'featured-blog-section.png'
  )
})

test('blog grid section visual regression', async ({ blogPage }) => {
  await blogPage.hideHeader()
  await expect(blogPage.blogGrid.section).toHaveScreenshot(
    'blog-grid-section.png'
  )
})
