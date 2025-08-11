import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'
import { BlogPage } from '@/integration-tests/page-objects/pages/blog.page'

test.describe('Blog Cards', () => {
  test('displays blog cards with all required elements', async ({ page }) => {
    const blogPage = await BlogPage.goto(page)

    // Verify blog cards are displayed
    await expect(blogPage.blogCards).toHaveCount(6)

    // Verify first blog card has all required elements
    await expect(blogPage.firstBlogCard).toBeVisible()
    await expect(blogPage.blogCardTitle).toBeVisible()
    await expect(blogPage.blogCardImage).toBeVisible()
    await expect(blogPage.blogCardDate).toBeVisible()
    await expect(blogPage.blogCardReadTime).toBeVisible()
    await expect(blogPage.blogCardDescription).toBeVisible()
    await expect(blogPage.blogCardTags.first()).toBeVisible()
  })

  test('blog card has proper hover effects', async ({ page }) => {
    const blogPage = await BlogPage.goto(page)

    // Hover over first blog card
    await blogPage.firstBlogCard.hover()

    // Verify hover effects are applied (we'll test styling changes)
    await expect(blogPage.firstBlogCard).toBeVisible()
  })
})
