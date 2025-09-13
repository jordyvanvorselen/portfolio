import { Page } from '@playwright/test'

import { BasePage } from '@/integration-tests/page-objects/base.page'
import { BlogPostHero } from '@/integration-tests/page-objects/sections/blog-post-hero.section'
import { BlogPostContent } from '@/integration-tests/page-objects/sections/blog-post-content.section'
import { RelatedPosts } from '@/integration-tests/page-objects/sections/related-posts.section'

export class BlogPostPage extends BasePage {
  readonly hero: BlogPostHero = new BlogPostHero(this.page)
  readonly content: BlogPostContent = new BlogPostContent(this.page)
  readonly relatedPosts: RelatedPosts = new RelatedPosts(this.page)

  static async goto(page: Page, slug: string): Promise<BlogPostPage> {
    await page.goto(`/blog/${slug}`)
    await page.waitForLoadState('networkidle')
    return new BlogPostPage(page)
  }

  async navigateBackToBlog(): Promise<void> {
    await this.hero.backToBlogLink.click()
  }

  async clickRelatedPost(index: number): Promise<void> {
    await this.relatedPosts.relatedPostCards.nth(index).click()
  }
}
