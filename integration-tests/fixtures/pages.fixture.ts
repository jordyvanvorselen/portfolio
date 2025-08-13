import { test as base } from '@playwright/test'

import { HomePage } from '@/integration-tests/page-objects/pages/home.page'
import { BlogPage } from '@/integration-tests/page-objects/pages/blog.page'
import { ProjectsPage } from '@/integration-tests/page-objects/pages/projects.page'

type Fixture = {
  homePage: HomePage
  blogPage: BlogPage
  projectsPage: ProjectsPage
}

export const test = base.extend<Fixture>({
  page: async ({ page }, pwUse) => {
    await page.addInitScript(() => (window.isUnderTest = true))

    await pwUse(page)
  },

  homePage: async ({ page }, pwUse) => {
    await pwUse(await HomePage.goto(page))
  },

  blogPage: async ({ page }, pwUse) => {
    await pwUse(await BlogPage.goto(page))
  },

  projectsPage: async ({ page }, pwUse) => {
    await pwUse(await ProjectsPage.goto(page))
  },
})
