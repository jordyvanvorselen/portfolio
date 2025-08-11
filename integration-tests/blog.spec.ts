import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'

test('renders blog page', async ({ blogPage }) => {
  await expect(blogPage.page).toHaveTitle(/Blog/)
})
