import { Page } from '@playwright/test'

import { BasePage } from '@/integration-tests/page-objects/base.page'
import { ProjectsHero } from '@/integration-tests/page-objects/sections/projects-hero.section'
import { ProjectsGrid } from '@/integration-tests/page-objects/sections/projects-grid.section'
import { ProjectsCollaboration } from '@/integration-tests/page-objects/sections/projects-collaboration.section'

export class ProjectsPage extends BasePage {
  readonly hero: ProjectsHero = new ProjectsHero(this.page)
  readonly projectsGrid: ProjectsGrid = new ProjectsGrid(this.page)
  readonly collaboration: ProjectsCollaboration = new ProjectsCollaboration(
    this.page
  )

  static async goto(page: Page): Promise<ProjectsPage> {
    await page.goto('/projects')
    return new ProjectsPage(page)
  }
}
