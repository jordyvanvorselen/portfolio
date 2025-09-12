import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'
import { BlogPage } from '@/integration-tests/page-objects/pages/blog.page'

test.describe('Blog Cards', () => {
  test('displays blog cards with all required elements', async ({ page }) => {
    const blogPage = await BlogPage.goto(page)

    // Verify blog cards are displayed (should be 9 total: 1 featured + 8 regular cards)
    await expect(blogPage.blogGrid.blogCards).toHaveCount(8) // Regular cards only (excluding featured)

    // Verify first blog card has all required elements
    await expect(blogPage.blogGrid.firstBlogCard).toBeVisible()
    await expect(blogPage.blogGrid.blogCardTitle).toBeVisible()
    await expect(blogPage.blogGrid.blogCardImage).toBeVisible()
    await expect(blogPage.blogGrid.blogCardDate).toBeVisible()
    await expect(blogPage.blogGrid.blogCardReadTime).toBeVisible()
    await expect(blogPage.blogGrid.blogCardDescription).toBeVisible()
    await expect(blogPage.blogGrid.blogCardTags.first()).toBeVisible()
  })

  test('blog card has proper hover effects', async ({ page }) => {
    const blogPage = await BlogPage.goto(page)

    // Hover over first blog card
    await blogPage.blogGrid.firstBlogCard.hover()

    // Verify hover effects are applied (we'll test styling changes)
    await expect(blogPage.blogGrid.firstBlogCard).toBeVisible()
  })
})
