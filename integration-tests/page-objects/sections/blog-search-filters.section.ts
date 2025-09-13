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
  readonly reactFilter: Locator = this.section.getByRole('button', {
    name: 'React',
  })
  readonly pythonFilter: Locator = this.section.getByRole('button', {
    name: 'Python',
  })
  readonly javascriptFilter: Locator = this.section.getByRole('button', {
    name: 'JavaScript',
  })
  readonly typescriptFilter: Locator = this.section.getByRole('button', {
    name: 'TypeScript',
  })
}
