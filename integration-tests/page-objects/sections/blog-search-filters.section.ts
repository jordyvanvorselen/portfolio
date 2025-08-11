import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class BlogSearchFilters extends BaseSection {
  override readonly section: Locator = this.page.getByTestId(
    'blog-search-filters'
  )
  readonly searchBar: Locator =
    this.section.getByPlaceholder('Search articles...')
  readonly allFilter: Locator = this.section.getByRole('button', {
    name: 'All',
  })
}
