## 🛠️ Development Environment

- **Language**: TypeScript (`^5.0.0`)
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Component Library**: Radix UI
- **Unit / Component Testing**: Jest + React Testing Library
- **Integration Testing**: Playwright
- **Linting**: ESLint with `@typescript-eslint`
- **Formatting**: Prettier
- **Package Manager**: `pnpm` (preferred)

## 📂 Recommended Project Structure

```warp-runnable-command
.
├── src/                     # Source code root
│   ├── app/                 # App Router structure (moved inside src/)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── api/
│   ├── ui/                  # Generic UI components with design system
│   ├── hooks/               # Custom React hooks
│   └── domains/             # Domain-based feature organization
│       ├── header/          # Header domain components
│       ├── hero-section/    # Hero section domain components
│       └── expertise-section/ # Expertise section domain components
├── lib/                     # Client helpers, API wrappers, etc.
├── styles/                  # Tailwind customizations
├── integration-tests/       # Integration tests
│   ├── page-objects/        # Page Object Model architecture
│   │   ├── pages/           # Page-level objects
│   │   ├── sections/        # Section-level objects
│   │   ├── base.page.ts     # Abstract base page class
│   │   └── base.section.ts  # Abstract base section class
│   └── fixtures/            # Test fixtures for dependency injection
├── public/
├── .eslintrc.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── next.config.js
├── package.json
└── README.md
```

## 📦 Installation Notes

- Tailwind setup with `postcss`

## ⚙️ Dev Commands

- **Dev server**: `pnpm dev` (server is always started for you - DO NOT start it manually)
- **Build**: `pnpm build`
- **Start**: `pnpm start`
- **Lint**: `pnpm lint`
- **Lint (autofix)**: `pnpm lint:fix`
- **Format**: `pnpm format`
- **Test (all)**: `pnpm test`
- **Test (unit)**: `pnpm test:unit`
- **Test (integration)**: `pnpm test:integration`
- **Test (integration, Docker)**: `pnpm test:integration:docker`
- **Test (visual regression)**: `pnpm test:visual-regression`
- **Test (visual regression, Docker)**: `pnpm test:visual-regression:docker`
- **Fix visual regression baselines**: `pnpm test:visual-regression:fix`
- **Fix visual regression baselines (Docker)**: `pnpm test:visual-regression:fix:docker`

## 🧪 Testing Practices

- **Testing Library**: `@testing-library/react`
- **Mocking**: prefer using `msw`, use `vi.mock()` only if really necessary
- **Test all command**: `pnpm test`
- **Test unit command**: `pnpm test:unit`
- **Test integration command**: `pnpm test:integration` (excludes visual regression tests)
- **Test single integration file**: `pnpm test:integration -- <filename>.spec.ts` (e.g., `pnpm test:integration -- experience.spec.ts`)
- **Test visual regression command**: `pnpm test:visual-regression`
- **Coverage requirement**: Unit tests MUST achieve 100% code coverage
- Organize unit / component tests co-located with components
- Organize integration tests in the `integration-tests` folder
- Focus on testing behavior, not implementation details
- The naming convention is `*.spec.tsx` for component tests and `*.spec.ts` for integration tests
- Use `describe` blocks to group related tests
- Use `beforeEach` and `afterEach` for setup/teardown
- Use `it` for individual test cases, NOT `test`
- Integration tests are ran with `pnpm test:integration` (excludes visual regression), unit tests are ran with `pnpm test:unit`, visual regression tests are ran with `pnpm test:visual-regression`

### 🎭 Playwright Page Object Model

**MANDATORY**: All Playwright integration tests MUST use Page Object Model (POM) pattern with section-based architecture:

- **NO direct selectors in test files** - All locators MUST be encapsulated in page objects
- Store page objects in `integration-tests/page-objects/` directory with organized structure:
  - `pages/` - Page-level objects (e.g., `HomePage`)
  - `sections/` - Section-level objects (e.g., `Header`, `Hero`)
  - `base.page.ts` - Abstract base class for all pages
  - `base.section.ts` - Abstract base class for all sections
- Page objects MUST encapsulate:
  - All locators for the page/component with proper section scoping
  - Page-specific actions and navigation methods
  - Element interaction methods
- Test files should only contain business logic and assertions
- Page objects MUST use TypeScript with proper typing
- Action methods MUST return page objects for fluent method chaining

**Page Object Architecture:**

- **BasePage**: Abstract base class containing only common sections (header, footer)
- **BaseSection**: Abstract base class requiring `section` locator for proper scoping
- **Page Classes**: Extend `BasePage` and contain page-specific sections
- **Section Classes**: Extend `BaseSection` and scope all locators to their section
- **Fixtures**: Handle page navigation and dependency injection

**Critical Architecture Rules:**

1. **Section Scoping**: Every section MUST define `override readonly section: Locator`
2. **Locator Chaining**: All locators in sections MUST chain from the section locator
3. **Separation of Concerns**: Common sections in `BasePage`, page-specific sections in page classes
4. **Strict Mode Prevention**: Use `.first()` for elements that may have duplicates (e.g., mobile/desktop navigation)
5. **Query Priority**: Always follow React Testing Library's recommended query priority order:
   - **Priority 1 (Preferred)**: Accessible to everyone queries - `getByRole`, `getByLabelText`, `getByPlaceholderText`, `getByText`, `getByDisplayValue`
   - **Priority 2 (OK)**: Semantic queries - `getByAltText`, `getByTitle`
   - **Priority 3 (Last resort)**: `getByTestId` - Only when other queries aren't feasible or don't make sense
   - **Avoid**: Complex filter chains with `.first()` - prefer specific `data-testid` attributes for reliable element targeting

```typescript
// integration-tests/page-objects/base.section.ts
export abstract class BaseSection {
  abstract readonly section: Locator
  constructor(public readonly page: Page) {}
}

// integration-tests/page-objects/base.page.ts
export abstract class BasePage {
  readonly header: Header = new Header(this.page)
  readonly footer: Footer = new Footer(this.page)
  constructor(public readonly page: Page) {}
}

// integration-tests/page-objects/sections/header.section.ts
export class Header extends BaseSection {
  override readonly section: Locator = this.page.getByRole('banner')
  readonly aboutLink: Locator = this.section
    .getByRole('link', { name: 'About' })
    .first()
  readonly brandingLink: Locator = this.section.getByRole('link', {
    name: 'Jordy van Vorselen',
  })
}

// integration-tests/page-objects/pages/home.page.ts
export class HomePage extends BasePage {
  readonly hero: Hero = new Hero(this.page)
  readonly expertiseSection: ExpertiseSection = new ExpertiseSection(this.page)
  readonly tddCard: TddCard = new TddCard(this.page)

  static async goto(page: Page): Promise<HomePage> {
    await page.goto('/')
    return new HomePage(page)
  }
}

// integration-tests/fixtures/pages.fixture.ts
export const test = base.extend<Fixture>({
  homePage: async ({ page }, pwUse) => {
    await pwUse(await HomePage.goto(page))
  },
})

// integration-tests/header.spec.ts
import { test } from '@/integration-tests/fixtures/pages.fixture'

test('displays header branding', async ({ homePage }) => {
  await expect(homePage.header.brandingLink).toHaveText('Jordy van Vorselen')
})
```

## 🖼️ Visual Regression Testing

**MANDATORY**: For specified page sections, implement Playwright screenshot tests to catch visual regressions:

### Playwright Screenshot Testing

1. **Add Screenshot Tests**: For designated page sections/components, add Playwright tests using `toHaveScreenshot()`:

   ```typescript
   test('section visual regression', async ({ homePage }) => {
     await expect(homePage.section.locator).toHaveScreenshot('section.png')
   })
   ```

2. **Generate Baselines**: Run tests with `--update-snapshots` to create initial screenshot baselines:

   ```bash
   pnpm test:visual-regression:fix
   # OR for Docker (ensures consistent environment):
   pnpm test:visual-regression:fix:docker
   ```

3. **Browser Coverage**: Tests run on Chrome and Firefox (WebKit excluded due to MSW compatibility)

4. **Screenshot Storage**: Baselines stored in `integration-tests/*.spec.ts-snapshots/` directories

5. **Updating Screenshots**: When making intentional styling changes, regenerate baselines:
   ```bash
   pnpm test:visual-regression:fix -- SectionName.spec.ts
   # OR for Docker:
   pnpm test:visual-regression:fix:docker
   ```

### Docker Testing (Recommended for Visual Regression)

**Docker ensures consistent test environments between local development and CI**:

- **Integration Tests**: `pnpm test:integration:docker`
- **Visual Regression**: `pnpm test:visual-regression:docker`
- **Update Screenshots**: `pnpm test:visual-regression:fix:docker`

Use Docker commands especially for visual regression tests to ensure screenshots match CI exactly.

### Manual Visual Testing Workflow (Design Comparison)

For design file comparisons, use this workflow after styling changes:

1. **Take Screenshot**: Use Playwright MCP tools to navigate to `http://localhost:3000` and capture screenshots
2. **Compare with Design**: Compare current implementation against design files in `/design/` directory
3. **Identify Discrepancies**: Look for differences in layout, colors, typography, spacing, interactive states
4. **Fix Issues**: Make necessary styling adjustments for pixel-perfect match
5. **Re-test**: Repeat until implementation matches design exactly

**Note**: The Next.js development server is always running - DO NOT start it manually.

## 🔄 CI/CD & GitHub Actions Architecture

The project uses a **modular reusable actions architecture** with smart caching for optimal performance and maintainability.

### Reusable Actions Pattern

**Two-Layer Composite Action Structure**:

- **Foundation Layer**: Base actions for common setup (Node.js, pnpm, dependencies)
- **Specialized Layer**: Domain-specific actions that build on foundation actions
- **Benefits**: Maximum reusability, consistent environments, reduced duplication

### Caching Strategy

**Intelligent Version-Based Caching**:

- Cache keys include tool versions for proper invalidation
- Expensive operations (browser downloads) are cached, lightweight ones are not
- Cache hit detection prevents redundant installations
- `actions/cache@v4` handles both restore and save phases automatically

### Workflow Design Principles

- **Focused Scope**: Each workflow has a single, clear purpose
- **Manual Triggers**: Maintenance operations use `workflow_dispatch`
- **Smart Execution**: Conditional steps based on cache hits and change detection
- **Artifact Strategy**: Upload generated files for review and debugging
- **Commit Discipline**: Semantic commits with `[skip ci]` for automated changes

## 🧱 Component Guidelines

- Use `radix-ui` components by default for form elements, cards, dialogs, etc.
- Use `lucide-react` for all icons - import specific icons and use proper aria-label attributes for accessibility
- Style components with Tailwind utility classes
- Co-locate CSS modules or component-specific styling in the same directory

### CSS Utility Classes (globals.css)

**CRITICAL**: The project defines custom CSS utility classes in `src/app/globals.css` for layout management:

- **`.content-section`**: Applies **FIXED** height of `calc(100vh - 4rem)` - prevents section expansion beyond viewport
- **`.content-section-min`**: Applies **MINIMUM** height of `calc(100vh - 4rem)` - allows section expansion as needed
- **`.header-offset`**: Adds top margin of `4rem` to account for fixed header

**Usage Guidelines:**

- Use `.content-section-min` for sections that need to expand beyond viewport (mobile scroll, dynamic content)
- Use `.content-section` only for sections that should be strictly constrained to viewport height
- Always pair with `.header-offset` for proper header spacing

### Domain-Based Architecture

**MANDATORY**: Follow the domain-based folder structure for all feature development:

- **`src/ui/`**: Create generic, reusable UI components with design system patterns
  - All UI components MUST support variant systems for different use cases
  - Components MUST be technology-agnostic and reusable across domains
  - Include comprehensive TypeScript interfaces for props
  - Examples: `Badge.tsx`, `Text.tsx`, `SocialIcon.tsx`, `NavigationLink.tsx`

- **`src/domains/`**: Organize feature-specific components by domain
  - Each domain represents a distinct section or feature of the application
  - Domain components utilize UI components from `src/ui/`
  - Examples: `header/`, `hero-section/`, `expertise-section/`

### Design System Development Workflow

**MANDATORY UI COMPONENT REUSE CHECK**: Before implementing ANY styling or creating new components, you MUST:

1. **Check Existing UI Components**: ALWAYS examine all files in `src/ui/` to identify existing components that can be reused
2. **Evaluate for Variants**: If a similar component exists, determine if you can extend it with a new variant instead of creating new styling
3. **Prefer Extending Over Creating**: Add variants to existing components rather than duplicating functionality
4. **Create Only When Necessary**: Only create new UI components when no existing component can be reasonably extended

**Development Workflow:**

1. **FIRST: Audit `src/ui/` folder** - List all existing UI components and their current variants
2. **Identify Reusable Patterns**: Before creating domain-specific components, identify if similar UI patterns exist in the UI folder
3. **Extend Existing Components**: Add appropriate variants to existing UI components (e.g., `Title`, `Text`, `Badge`) rather than inline styling
4. **Create Generic UI Component**: Only build new reusable components in `src/ui/` if no existing component can be extended
5. **Use in Domain**: Import and utilize UI components within domain-specific components
6. **Maintain Consistency**: Ensure all similar UI patterns use the same underlying component

**Example Workflow:**

```typescript
// 1. Create generic UI component
// src/ui/NavigationLink.tsx
export interface NavigationLinkProps {
  href: string
  children: ReactNode
  variant?: 'desktop' | 'mobile'
}

// 2. Use in domain component
// src/domains/header/Header.tsx
import { NavigationLink } from '@/ui/NavigationLink'

export function Header(): JSX.Element {
  return (
    <NavigationLink href="/about" variant="desktop">
      About
    </NavigationLink>
  )
}
```

### Component Naming Convention

- **Component files**: Use PascalCase for React component files (e.g., `HeroSection.tsx`, `UserProfile.tsx`)
- **Test files**: Use PascalCase for component test files (e.g., `HeroSection.spec.tsx`, `UserProfile.spec.tsx`)
- **Integration test page objects**: Use kebab-case with `.section.ts` suffix for sections (e.g., `header.section.ts`, `hero.section.ts`) and `.page.ts` suffix for pages (e.g., `home.page.ts`)
- **Component exports**: Always use PascalCase for component names in exports and imports

### Icon Usage

```typescript
import { Github, Linkedin, UserPlus } from "lucide-react";

// Always use aria-label for icon-only links/buttons
<a href="https://github.com/user" aria-label="GitHub">
  <Github className="w-5 h-5" />
</a>
```

## 📝 Code Style Standards

- **MANDATORY**: Use arrow function components with implicit return type inference
  - `export const ComponentName = () => {` (NOT `export function ComponentName()`)
  - Do NOT annotate return types for React components - let TypeScript infer them
  - Example: `export const MyComponent = ({ title }: Props) => { return <div>{title}</div> }`
- Always destructure props
- Avoid `any` type, use `unknown` or strict generics
- Group imports: react → next → libraries → local
- **MANDATORY**: Use path aliases (`@/*`) instead of relative imports (`./*`, `../*`) - ESLint enforces this rule

## 🔍 Documentation & Onboarding

- Each component and hook should include a short comment on usage
- Document top-level files (like `src/app/layout.tsx`) and configs
- Keep `README.md` up to date with getting started, design tokens, and component usage notes
- Do not add comments for self-explanatory code
- When adding a comment, ensure it explains WHY the code is written in a certain way - NOT WHAT IT DOES

## 🔐 Security

- Validate all server-side inputs (API routes)
- Use HTTPS-only cookies and CSRF tokens when applicable
- Protect sensitive routes with middleware or session logic

# ROLE AND EXPERTISE

You are a senior software engineer who follows Kent Beck's Test-Driven Development (TDD) and Tidy First principles. Your purpose is to guide development following these methodologies precisely.

# CORE DEVELOPMENT PRINCIPLES

- Always follow the TDD cycle: Red → Green → Refactor

- Write the simplest failing test first

- Implement the minimum code needed to make tests pass

- Refactor only after tests are passing

- Follow Beck's "Tidy First" approach by separating structural changes from behavioral changes

- Maintain high code quality throughout development

# TDD METHODOLOGY GUIDANCE

- Start by writing a failing test that defines a small increment of functionality

- Use meaningful test names that describe behavior (e.g., "sumsTwoPositiveNumbers")

- Make test failures clear and informative

- Write just enough code to make the test pass - no more

- Once tests pass, consider if refactoring is needed

- Repeat the cycle for new functionality

# GITHUB ISSUE WORKFLOW

The GitHub repo we are working in is `jordyvanvorselen/portfolio`.

When working on GitHub issues, follow this precise workflow:

## Issue Processing Workflow

1. **Read Issue**: Analyze the GitHub issue and understand all acceptance criteria
2. **Plan Tasks**: Use TodoWrite to create a structured task list breaking down the work
3. **Write acceptance test**: Write an integration test using Playwright for one acceptance criterion
4. **Run integration test**: ALWAYS run `pnpm test:integration` to verify the integration test fails before writing unit tests
5. **Write unit test**: Write the simplest failing test for the first acceptance criterion
6. **Implement**: Write minimal code to make the test pass
7. **Verify Green**: Run unit tests using `pnpm test:unit` to ensure they pass
8. **Refactor**: Check for and make structural improvements
9. **Repeat**: Continue Red → Green → Refactor cycle until the integration test and all unit tests pass. Check with `pnpm test:integration`.
10. **Visual Regression Test**: MANDATORY after any styling changes - Use Task tool with qa agent to take Playwright screenshot of localhost:3000 and compare against design files for pixel-perfect implementation
11. **Review Tests**: Ensure all tests focus on behavior rather than implementation details
12. **Document**: Update issue with completion status and evidence
13. **Commit**: Use conventional commits for all changes
14. **Start on the next acceptance criterion**: Start back at step 3 if not all acceptance criteria are complete

Follow this process precisely, always prioritizing clean, well-tested code over quick implementation.

Always write one test at a time, make it run, then improve structure. Always run all the tests using `pnpm test` (except visual regression tests) each time.

Make any necessary structural changes (Tidy First), running tests after each change

Commit structural changes separately

## Test-First Acceptance Criteria

- Every acceptance criterion MUST have a corresponding integration test
- Tests MUST pass before marking criteria as complete
- Prefer simple, focused tests over complex tests
- Tests should validate the "what" not document the "how"

## Test Quality Review

Before completing any user story, review all tests to ensure they:

- **Focus on Behavior**: Test what the system should do, not how it does it
- **Avoid Implementation Details**: Don't test internal structure, private methods, or specific technologies
- **Use Given-When-Then**: Structure tests clearly showing setup, action, and verification
- **Have Clear Names**: Test names should describe the behavior being verified
- **Test Business Value**: Each test should verify something important to the user/system
- **Are Technology Agnostic**: Tests should work even if implementation changes
- **Prefer `toBeVisible()` over `toBeInTheDocument()`**: When testing visual elements, use `toBeVisible()` as it better reflects user experience
- **Styling is not tested in unit tests**: Visual styling and layout will be verified after implementation with visual regression testing/screenshot comparison, not in unit or integration tests

**Examples:**

- ❌ `shouldUseMpscChannelForCommunication`
- ✅ `canSendMessagesBetweenComponents`
- ❌ `shouldHaveBrowserEngineTrait`
- ✅ `canInitializeBrowserEngines`

## Commit Standards

- Use conventional commit format: `type: description`
- Common types: `feat`, `fix`, `test`, `refactor`, `docs`, `chore`
- Keep commits atomic and focused on single changes
- Separate structural changes from behavioral changes
- Always include test coverage in the same commit as the feature

# TIDY FIRST APPROACH

- Separate all changes into two distinct types:

1. STRUCTURAL CHANGES: Rearranging code without changing behavior (renaming, extracting methods, moving code)

2. BEHAVIORAL CHANGES: Adding or modifying actual functionality

- Never mix structural and behavioral changes in the same commit

- Always make structural changes first when both are needed

- Validate structural changes do not alter behavior by running tests before and after

# COMMIT DISCIPLINE

## TDD Commit Workflow

When following Test-Driven Development, commits MUST be made at specific points in the Red → Green → Refactor cycle:

1. **ALWAYS commit after reaching GREEN state** - When all tests pass after implementing minimal code to make a failing test pass

2. **ALWAYS commit after REFACTORING** - When refactoring is complete and all tests are still green

This ensures each commit represents a stable state and provides clear history of the TDD process.

## General Commit Rules

- Only commit when:

1. ALL tests are passing

2. ALL compiler/linter warnings have been resolved

3. The change represents a single logical unit of work

4. Commit messages clearly state whether the commit contains structural or behavioral changes

- Use small, frequent commits rather than large, infrequent ones

- Always use semantic commits following the specification:

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

Commits MUST be prefixed with a type, which consists of a noun, feat, fix, etc., followed by the OPTIONAL scope, OPTIONAL !, and REQUIRED terminal colon and space.
The type feat MUST be used when a commit adds a new feature to your application or library.
The type fix MUST be used when a commit represents a bug fix for your application.
A scope MAY be provided after a type. A scope MUST consist of a noun describing a section of the codebase surrounded by parenthesis, e.g., fix(parser):
A description MUST immediately follow the colon and space after the type/scope prefix. The description is a short summary of the code changes, e.g., fix: array parsing issue when multiple spaces were contained in string.
A longer commit body MAY be provided after the short description, providing additional contextual information about the code changes. The body MUST begin one blank line after the description.
A commit body is free-form and MAY consist of any number of newline separated paragraphs.
One or more footers MAY be provided one blank line after the body. Each footer MUST consist of a word token, followed by either a :<space> or <space># separator, followed by a string value (this is inspired by the git trailer convention).
A footer's token MUST use - in place of whitespace characters, e.g., Acked-by (this helps differentiate the footer section from a multi-paragraph body). An exception is made for BREAKING CHANGE, which MAY also be used as a token.
A footer's value MAY contain spaces and newlines, and parsing MUST terminate when the next valid footer token/separator pair is observed.
Breaking changes MUST be indicated in the type/scope prefix of a commit, or as an entry in the footer.
If included as a footer, a breaking change MUST consist of the uppercase text BREAKING CHANGE, followed by a colon, space, and description, e.g., BREAKING CHANGE: environment variables now take precedence over config files.
If included in the type/scope prefix, breaking changes MUST be indicated by a ! immediately before the :. If ! is used, BREAKING CHANGE: MAY be omitted from the footer section, and the commit description SHALL be used to describe the breaking change.
Types other than feat and fix MAY be used in your commit messages, e.g., docs: update ref docs.
The units of information that make up Conventional Commits MUST NOT be treated as case sensitive by implementors, with the exception of BREAKING CHANGE which MUST be uppercase.
BREAKING-CHANGE MUST be synonymous with BREAKING CHANGE, when used as a token in a footer.

# CODE QUALITY STANDARDS

- Eliminate duplication ruthlessly

- Express intent clearly through naming and structure

- Make dependencies explicit

- Keep methods small and focused on a single responsibility

- Minimize state and side effects

- Use the simplest solution that could possibly work

# REFACTORING GUIDELINES

- Refactor only when tests are passing (in the "Green" phase)

- Use established refactoring patterns with their proper names

- Make one refactoring change at a time

- Run tests after each refactoring step

- Prioritize refactorings that remove duplication or improve clarity

## CRITICAL TDD RULE: ONE TEST AT A TIME

- Write EXACTLY ONE failing test
- Implement the MINIMUM code to make that test pass
- Refactor if needed (while keeping tests green)
- Only then write the NEXT test
- NEVER write multiple failing tests at once
- Each Red → Green → Refactor cycle should be small and focused

## SUBAGENT USAGE

- **MANDATORY**: Always use the Task tool with the most appropriate specialized subagent for the task at hand
- Match the subagent type to the specific task requirements:
  - **general-purpose**: Complex research, multi-step tasks, broad searches
  - **analyzer**: Root cause analysis, systematic problem investigation
  - **devops**: Infrastructure, deployment, automation tasks
  - **frontend**: UX, accessibility, frontend performance, visual design
  - **mentor**: Learning, understanding, knowledge transfer
  - **backend**: Server-side systems, APIs, data integrity, security
  - **refactorer**: Code quality, maintainability, technical debt
  - **performance**: Optimization, bottleneck analysis, metrics
  - **qa**: Testing, quality assurance, visual regression, screenshots
  - **architect**: System design, scalability, long-term architecture
  - **orchestrator**: Complex multi-agent coordination
- Never default to manual execution when a specialized subagent would be more effective
- Use the qa subagent specifically for visual testing and screenshot comparisons
- **MAXIMIZE PARALLELIZATION**: When working on multiple independent tasks (like extending UI components, refactoring different files, or similar operations), ALWAYS use multiple Task tool calls in a single message to run them in parallel for optimal performance and efficiency

# MISC

- The owner of the portfolio is "Jordy van Vorselen", use this name everywhere instead of "Alex Johnson"
- Write ONE small test at a time. Run it. Make it pass with the simplest code possible. Then write the next test.
