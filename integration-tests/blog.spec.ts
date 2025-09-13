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
  await expect(blogPage.hero.articleCount).toHaveText('4 Articles')
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
  await expect(blogPage.blogGrid.blogCards).toHaveCount(3) // 1 featured + 3 latest = 4 total articles
})

test('blog hero section visual regression', async ({ blogPage }) => {
  await blogPage.hideHeader()
  await expect(blogPage.hero.section).toHaveScreenshot('blog-hero-section.png')
})

test('blog search filters visual regression', async ({ blogPage }) => {
  await blogPage.hideHeader()

  // Wait for search input to be ready
  await expect(blogPage.searchFilters.searchBar).toBeVisible()

  // Additional wait for hydration and layout stability
  await blogPage.page.waitForTimeout(100)

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

test('filters posts by search term in title', async ({ blogPage }) => {
  await blogPage.searchFilters.searchBar.fill('hooks')
  await expect(blogPage.page).toHaveURL(/.*blog\?search=hooks/)
  await expect(blogPage.blogGrid.blogCards).toHaveCount(1)
  await expect(blogPage.blogGrid.firstBlogCard).toContainText(
    'React Hooks Guide'
  )
})

test('filters posts by search term in description', async ({ blogPage }) => {
  await blogPage.searchFilters.searchBar.fill('advanced')
  await expect(blogPage.page).toHaveURL(/.*blog\?search=advanced/)
  await expect(blogPage.blogGrid.blogCards).toHaveCount(1)
  await expect(blogPage.blogGrid.firstBlogCard).toContainText(
    'Advanced TypeScript'
  )
})

test('performs case-insensitive search', async ({ blogPage }) => {
  await blogPage.searchFilters.searchBar.fill('REACT')
  await expect(blogPage.page).toHaveURL(/.*blog\?search=REACT/)
  await expect(blogPage.blogGrid.blogCards).toHaveCount(2)
})

test('shows all articles when search is cleared', async ({ blogPage }) => {
  await blogPage.searchFilters.searchBar.fill('hooks')
  await expect(blogPage.page).toHaveURL(/.*blog\?search=hooks/)
  await expect(blogPage.blogGrid.blogCards).toHaveCount(1)

  await blogPage.searchFilters.searchBar.clear()
  await expect(blogPage.page).toHaveURL(/.*blog$/)
  await expect(blogPage.blogGrid.blogCards).toHaveCount(3)
})

test('shows no results for non-existent search term', async ({ blogPage }) => {
  await blogPage.searchFilters.searchBar.fill('nonexistent')
  await expect(blogPage.page).toHaveURL(/.*blog\?search=nonexistent/)
  await expect(blogPage.blogGrid.blogCards).toHaveCount(0)
})

test('ignores empty search terms', async ({ blogPage }) => {
  await blogPage.searchFilters.searchBar.fill('')
  await expect(blogPage.page).toHaveURL(/.*blog$/)
  await expect(blogPage.blogGrid.blogCards).toHaveCount(3)
})

test('ignores whitespace-only search terms', async ({ blogPage }) => {
  await blogPage.searchFilters.searchBar.fill('   ')
  await expect(blogPage.page).toHaveURL(/.*blog$/)
  await expect(blogPage.blogGrid.blogCards).toHaveCount(3)
})

test('searches for python content', async ({ blogPage }) => {
  await blogPage.searchFilters.searchBar.fill('python')
  await expect(blogPage.page).toHaveURL(/.*blog\?search=python/)
  await expect(blogPage.blogGrid.blogCards).toHaveCount(1)
  await expect(blogPage.blogGrid.firstBlogCard).toContainText('Python Tips')
})

test('filters posts by Python tag', async ({ blogPage }) => {
  await blogPage.searchFilters.pythonFilter.click()
  await expect(blogPage.page).toHaveURL(/.*blog\?tag=Python/)
  await expect(blogPage.blogGrid.blogCards).toHaveCount(1)
  await expect(blogPage.blogGrid.firstBlogCard).toContainText('Python Tips')
})

test('filters posts by React tag', async ({ blogPage }) => {
  await blogPage.searchFilters.reactFilter.click()
  await expect(blogPage.page).toHaveURL(/.*blog\?tag=React/)
  await expect(blogPage.blogGrid.blogCards).toHaveCount(2)
})

test('filters posts by JavaScript tag', async ({ blogPage }) => {
  await blogPage.searchFilters.javascriptFilter.click()
  await expect(blogPage.page).toHaveURL(/.*blog\?tag=JavaScript/)
  await expect(blogPage.blogGrid.blogCards).toHaveCount(2)
})

test('combines tag and search filters', async ({ blogPage }) => {
  await blogPage.searchFilters.javascriptFilter.click()
  await expect(blogPage.page).toHaveURL(/.*blog\?tag=JavaScript/)
  await blogPage.searchFilters.searchBar.fill('hooks')
  await expect(blogPage.page).toHaveURL(/.*blog\?tag=JavaScript&search=hooks/)
  await expect(blogPage.blogGrid.blogCards).toHaveCount(1)
  await expect(blogPage.blogGrid.firstBlogCard).toContainText(
    'React Hooks Guide'
  )
})

test('returns no results when tag and search do not match any posts', async ({
  blogPage,
}) => {
  await blogPage.searchFilters.pythonFilter.click()
  await expect(blogPage.page).toHaveURL(/.*blog\?tag=Python/)
  await blogPage.searchFilters.searchBar.fill('hooks')
  await expect(blogPage.page).toHaveURL(/.*blog\?tag=Python&search=hooks/)
  await expect(blogPage.blogGrid.blogCards).toHaveCount(0)
})

test('shows all articles when clicking All filter after tag selection', async ({
  blogPage,
}) => {
  await blogPage.searchFilters.pythonFilter.click()
  await expect(blogPage.page).toHaveURL(/.*blog\?tag=Python/)
  await expect(blogPage.blogGrid.blogCards).toHaveCount(1)

  await blogPage.searchFilters.allFilter.click()
  await expect(blogPage.page).toHaveURL(/.*blog$/)
  await expect(blogPage.blogGrid.blogCards).toHaveCount(3)
})
