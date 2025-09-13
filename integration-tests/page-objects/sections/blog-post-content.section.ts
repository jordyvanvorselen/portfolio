import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class BlogPostContent extends BaseSection {
  override readonly section: Locator = this.page.getByTestId(
    'blog-post-content-section'
  )
  readonly markdownContent: Locator =
    this.section.getByTestId('markdown-content')
  readonly headings: Locator = this.markdownContent.locator(
    'h1, h2, h3, h4, h5, h6'
  )
  readonly paragraphs: Locator = this.markdownContent.locator('p')
  readonly codeBlocks: Locator = this.markdownContent.locator('pre')
  readonly inlineCode: Locator = this.markdownContent.locator('code')
  readonly images: Locator = this.markdownContent.locator('img')
  readonly links: Locator = this.markdownContent.locator('a')
  readonly lists: Locator = this.markdownContent.locator('ul, ol')
  readonly mermaidDiagrams: Locator = this.markdownContent.locator(
    '[data-testid="mermaid-diagram"]'
  )
}
