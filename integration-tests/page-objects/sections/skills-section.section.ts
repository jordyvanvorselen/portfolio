import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class SkillsSection extends BaseSection {
  override readonly section: Locator = this.page.locator('#skills-section')

  // Company logos - using alt text (Priority 2: Semantic queries)
  readonly asmlLogo: Locator = this.section.getByAltText('ASML logo')
  readonly signifyLogo: Locator = this.section.getByAltText('Signify logo')
  readonly kabisaLogo: Locator = this.section.getByAltText('Kabisa logo')

  // Main heading and text - using role and text (Priority 1: Accessible queries)
  readonly title: Locator = this.section.getByRole('heading', {
    name: 'Hired By The Best',
    level: 2,
  })
  readonly subtitle: Locator = this.section.getByText(
    /I've worked with.*companies using these technologies/
  )

  // Experience link - using role (Priority 1: Accessible queries)
  readonly experienceLink: Locator = this.section.getByRole('link', {
    name: /Complete experience overview/,
  })

  // Technology cards - using text content (Priority 1: Accessible queries)
  readonly typescriptCard: Locator = this.section.getByText('TypeScript')
  readonly javaCard: Locator = this.section.getByText('Java')
  readonly elixirCard: Locator = this.section.getByText('Elixir')
  readonly pythonCard: Locator = this.section.getByText('Python')
  readonly rubyCard: Locator = this.section.getByText('Ruby')
  readonly csharpCard: Locator = this.section.getByText('C#')
  readonly awsCard: Locator = this.section.getByText('AWS')
  readonly flutterCard: Locator = this.section.getByText('Flutter')
  readonly devopsCard: Locator = this.section.getByText('DevOps')
  readonly blockchainCard: Locator = this.section.getByText('Blockchain')
}
