import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class BlogPostContent extends BaseSection {
  override readonly section: Locator = this.page.getByTestId(
    'blog-post-content-section'
  )
  readonly richTextContent: Locator =
    this.section.getByTestId('payload-rich-text')
  readonly headings: Locator = this.richTextContent.locator(
    'h1, h2, h3, h4, h5, h6'
  )
  readonly paragraphs: Locator = this.richTextContent.locator('p')
  readonly codeBlocks: Locator = this.richTextContent.locator('pre')
  readonly inlineCode: Locator = this.richTextContent.locator('code')
  readonly images: Locator = this.richTextContent.locator('img')
  readonly links: Locator = this.richTextContent.locator('a')
  readonly lists: Locator = this.richTextContent.locator('ul, ol')
  readonly mermaidDiagrams: Locator = this.richTextContent.locator(
    '[data-testid="mermaid-diagram"]'
  )
}
