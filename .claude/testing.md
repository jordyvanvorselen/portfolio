# Testing Strategy & TDD Practices

## 🧪 Three-Tier Testing Strategy

This project maintains **100% code coverage** through a comprehensive three-tier testing strategy:

### 🔴 Unit Testing (Vitest + React Testing Library + MSW)

- **Coverage**: 100% code coverage mandatory
- **Focus**: Component behavior and business logic
- **Location**: Co-located with components (`*.spec.tsx`)
- **API Mocking**: MSW (Mock Service Worker) for realistic API interactions
- **Run**: `pnpm test:unit`

### 🟡 Integration Testing (Playwright + MSW)

- **Architecture**: Section-based Page Object Model (POM) with `BasePage`/`BaseSection` pattern
- **Focus**: User workflows and component interactions with proper element scoping
- **Location**: `integration-tests/page-objects/` directory with organized structure
- **API Mocking**: MSW (Mock Service Worker) for consistent test data
- **Browsers**: Chrome & Firefox (WebKit excluded due to MSW compatibility)
- **Run**: `pnpm test:integration`

### 🟢 Visual Regression Testing (Playwright Screenshots)

- **Purpose**: Pixel-perfect design fidelity across browsers and devices
- **Method**: Automated screenshot comparisons with baseline images
- **Coverage**: Header, Hero, Expertise, Blog sections with dedicated visual tests
- **Browsers**: Chrome & Firefox with platform-specific baselines
- **Storage**: Baselines in `integration-tests/*.spec.ts-snapshots/` directories

## 🎭 Playwright Page Object Model

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

## 🌐 API Mocking with Mock Service Worker (MSW)

**Professional-Grade API Mocking**: This project leverages **Mock Service Worker (MSW)** for seamless API mocking across all environments, ensuring consistent and reliable data handling throughout the development lifecycle.

**MSW Integration Features:**

- **🔄 Universal Coverage**: Single mock definitions shared across dev server, unit tests, and integration tests
- **🎯 Request Interception**: Browser-level network interception for authentic API simulation
- **📊 Dynamic Responses**: Configurable mock data generation with realistic scenarios
- **🛠️ Development Server**: Offline development with complete API simulation
- **🧪 Test Consistency**: Identical mock responses across all test environments
- **🚀 Hot Reloading**: Instant mock updates during development
- **📁 Organized Structure**: Centralized mock definitions in `test/msw/` directory

**Mock Architecture:**

```typescript
// test/msw/defaultHandlers.ts - Centralized API mocks
export const defaultHandlers = [
  rest.get('/api/blog/posts', (req, res, ctx) => {
    return res(ctx.json(mockBlogPosts))
  }),
  rest.get('/api/projects', (req, res, ctx) => {
    return res(ctx.json(mockProjects))
  }),
]

// Shared across environments:
// - Development server (browser)
// - Unit tests (happy-dom)
// - Integration tests (Playwright)
```

## Testing Best Practices

- **Testing Library**: `@testing-library/react`
- **Test Environment**: `happy-dom` (replaced jsdom)
- **Mocking**: MSW (Mock Service Worker) for API mocking in dev server, unit tests, and integration tests - use `vitest.mock()` only if really necessary
- **Coverage requirement**: Unit tests MUST achieve 100% code coverage
- Organize unit / component tests co-located with components
- Organize integration tests in the `integration-tests` folder
- Focus on testing behavior, not implementation details
- The naming convention is `*.spec.tsx` for component tests and `*.spec.ts` for integration tests
- Use `describe` blocks to group related tests
- Use `beforeEach` and `afterEach` for setup/teardown
- Use `it` for individual test cases, NOT `test`
- **Prefer `toBeVisible()` over `toBeInTheDocument()`**: When testing visual elements, use `toBeVisible()` as it better reflects user experience
- **Styling is not tested in unit tests**: Visual styling and layout will be verified after implementation with visual regression testing/screenshot comparison, not in unit or integration tests

## Test Quality Review

Before completing any user story, review all tests to ensure they:

- **Focus on Behavior**: Test what the system should do, not how it does it
- **Avoid Implementation Details**: Don't test internal structure, private methods, or specific technologies
- **Use Given-When-Then**: Structure tests clearly showing setup, action, and verification
- **Have Clear Names**: Test names should describe the behavior being verified
- **Test Business Value**: Each test should verify something important to the user/system
- **Are Technology Agnostic**: Tests should work even if implementation changes

**Examples:**

- ❌ `shouldUseMpscChannelForCommunication`
- ✅ `canSendMessagesBetweenComponents`
- ❌ `shouldHaveBrowserEngineTrait`
- ✅ `canInitializeBrowserEngines`
