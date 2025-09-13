import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'
import { BlogPostPage } from '@/integration-tests/page-objects/pages/blog-post.page'

test.describe('Blog Post Page', () => {
  test('renders blog post page with correct title', async ({
    blogPostPage,
  }) => {
    await expect(blogPostPage.page).toHaveTitle(/React Hooks Guide/)
  })

  test('displays blog post hero section content', async ({ blogPostPage }) => {
    await expect(blogPostPage.hero.backToBlogLink).toBeVisible()
    await expect(blogPostPage.hero.backToBlogLink).toHaveText('Back to Blog')
    await expect(blogPostPage.hero.title).toBeVisible()
    await expect(blogPostPage.hero.title).toHaveText('React Hooks Guide')
    await expect(blogPostPage.hero.description).toBeVisible()
    await expect(blogPostPage.hero.description).toHaveText(
      'Learn about React hooks and how to use them effectively'
    )
  })

  test('displays blog post metadata', async ({ blogPostPage }) => {
    await expect(blogPostPage.hero.publishDate).toBeVisible()
    await expect(blogPostPage.hero.readTime).toBeVisible()
    await expect(blogPostPage.hero.author).toBeVisible()
  })

  test('displays blog post tags', async ({ blogPostPage }) => {
    await expect(blogPostPage.hero.tags).toBeVisible()
    await expect(blogPostPage.hero.tagBadges).toHaveCount(3)
    await expect(blogPostPage.hero.tagBadges.nth(0)).toHaveText('React')
    await expect(blogPostPage.hero.tagBadges.nth(1)).toHaveText('JavaScript')
    await expect(blogPostPage.hero.tagBadges.nth(2)).toHaveText('Frontend')
  })

  test('displays blog post content', async ({ blogPostPage }) => {
    await expect(blogPostPage.content.section).toBeVisible()
    await expect(blogPostPage.content.markdownContent).toBeVisible()
  })

  test('displays related posts section', async ({ blogPostPage }) => {
    await expect(blogPostPage.relatedPosts.section).toBeVisible()
    await expect(blogPostPage.relatedPosts.title).toBeVisible()
    await expect(blogPostPage.relatedPosts.title).toHaveText('Related Posts')
    await expect(blogPostPage.relatedPosts.relatedPostCards).toHaveCount(2)
  })

  test('related posts have required elements', async ({ blogPostPage }) => {
    await expect(blogPostPage.relatedPosts.firstRelatedPost).toBeVisible()
    await expect(
      blogPostPage.relatedPosts.relatedPostTitles.first()
    ).toBeVisible()
    await expect(
      blogPostPage.relatedPosts.relatedPostDescriptions.first()
    ).toBeVisible()
    await expect(
      blogPostPage.relatedPosts.relatedPostImages.first()
    ).toBeVisible()
  })

  test('back to blog link navigation', async ({ blogPostPage }) => {
    await blogPostPage.navigateBackToBlog()
    await expect(blogPostPage.page).toHaveURL(/.*\/blog$/)
  })

  test('related post navigation', async ({ blogPostPage }) => {
    await blogPostPage.clickRelatedPost(0)
    await expect(blogPostPage.page).toHaveURL(/.*\/blog\/.*/)
  })

  test('navigation from blog page to individual post', async ({ page }) => {
    // Start from blog page
    await page.goto('/blog')
    await page.waitForLoadState('networkidle')

    // Click on first blog card
    const firstCard = page.locator('article').first()
    await firstCard.click()

    // Verify we're on a blog post page
    await expect(page).toHaveURL(/.*\/blog\/.*/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('handles non-existent blog post slug', async ({ page }) => {
    await page.goto('/blog/non-existent-slug')
    // Next.js notFound() should display 404 content or redirect
    // In development with MSW, check for the absence of blog post content
    await expect(
      page.locator('[data-testid="blog-post-hero-section"]')
    ).not.toBeVisible()
    await expect(page).toHaveURL(/.*\/blog\/non-existent-slug/)
  })

  test('blog post hero section visual regression', async ({ blogPostPage }) => {
    await blogPostPage.hideHeader()
    await expect(blogPostPage.hero.section).toHaveScreenshot(
      'blog-post-hero.png'
    )
  })

  test('blog post content section visual regression', async ({
    blogPostPage,
  }) => {
    await blogPostPage.hideHeader()
    await expect(blogPostPage.content.section).toHaveScreenshot(
      'blog-post-content.png'
    )
  })

  test('related posts section visual regression', async ({ blogPostPage }) => {
    await blogPostPage.hideHeader()
    await expect(blogPostPage.relatedPosts.section).toHaveScreenshot(
      'related-posts.png'
    )
  })
})

test.describe('Blog Post Page - Multiple Posts', () => {
  test('renders different blog post correctly', async ({ page }) => {
    const blogPostPage = await BlogPostPage.goto(page, 'python-tips')

    await expect(blogPostPage.page).toHaveTitle(/Python Tips/)
    await expect(blogPostPage.hero.title).toHaveText('Python Tips')
    await expect(blogPostPage.hero.description).toHaveText(
      'Useful Python tips for better development'
    )
    await expect(blogPostPage.hero.tagBadges.nth(0)).toHaveText('Python')
    await expect(blogPostPage.hero.tagBadges.nth(1)).toHaveText('Backend')
  })

  test('renders another blog post correctly', async ({ page }) => {
    const blogPostPage = await BlogPostPage.goto(page, 'typescript-advanced')

    await expect(blogPostPage.page).toHaveTitle(/Advanced TypeScript/)
    await expect(blogPostPage.hero.title).toHaveText('Advanced TypeScript')
    await expect(blogPostPage.hero.description).toHaveText(
      'Advanced TypeScript techniques and patterns'
    )
    await expect(blogPostPage.hero.tagBadges.nth(0)).toHaveText('TypeScript')
    await expect(blogPostPage.hero.tagBadges.nth(1)).toHaveText('JavaScript')
    await expect(blogPostPage.hero.tagBadges.nth(2)).toHaveText('Frontend')
  })
})

test.describe('Blog Post Page - Content Features', () => {
  test('displays markdown content elements', async ({ blogPostPage }) => {
    // Test that basic markdown content is rendered
    await expect(blogPostPage.content.markdownContent).toBeVisible()
    await expect(blogPostPage.content.paragraphs).toHaveCount(2)
  })

  test('handles code blocks if present', async ({ blogPostPage }) => {
    // This test will pass even if no code blocks are present
    const codeBlockCount = await blogPostPage.content.codeBlocks.count()
    if (codeBlockCount > 0) {
      await expect(blogPostPage.content.codeBlocks.first()).toBeVisible()
    }
  })

  test('handles images if present', async ({ blogPostPage }) => {
    // This test will pass even if no images are present in content
    const imageCount = await blogPostPage.content.images.count()
    if (imageCount > 0) {
      await expect(blogPostPage.content.images.first()).toBeVisible()
    }
  })

  test('handles mermaid diagrams if present', async ({ blogPostPage }) => {
    // This test will pass even if no mermaid diagrams are present
    const mermaidCount = await blogPostPage.content.mermaidDiagrams.count()
    if (mermaidCount > 0) {
      await expect(blogPostPage.content.mermaidDiagrams.first()).toBeVisible()
    }
  })
})
