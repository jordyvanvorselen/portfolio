# Visual Testing & Design Comparison Guide

## Manual Visual Testing Workflow (Design Comparison)

For design file comparisons, use this workflow after styling changes:

1. **Take Screenshot**: Use Playwright MCP tools to navigate to `http://localhost:3000` and capture screenshots
2. **Compare with Design**: Compare current implementation against design files in `/design/` directory
3. **Identify Discrepancies**: Look for differences in layout, colors, typography, spacing, interactive states
4. **Fix Issues**: Make necessary styling adjustments for pixel-perfect match
5. **Re-test**: Repeat until implementation matches design exactly

**Note**: The Next.js development server is always running - DO NOT start it manually.

## Playwright Screenshot Testing Process

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

## Docker Testing (Recommended for Visual Regression)

**Docker ensures consistent test environments between local development and CI**:

- **Integration Tests**: `pnpm test:integration:docker`
- **Visual Regression**: `pnpm test:visual-regression:docker`
- **Update Screenshots**: `pnpm test:visual-regression:fix:docker`

Use Docker commands especially for visual regression tests to ensure screenshots match CI exactly.

## Design Comparison Best Practices

- Always compare against files in `/design/` directory
- Check for pixel-perfect alignment
- Verify color accuracy (hex values, gradients)
- Test typography (font sizes, weights, line heights)
- Validate spacing and padding consistency
- Test responsive behavior across breakpoints
- Check interactive states (hover, focus, active)

## Visual Regression Testing Commands

- **Test visual regression command**: `pnpm test:visual-regression`
- **Test visual regression (Docker)**: `pnpm test:visual-regression:docker`
- **Fix visual regression baselines**: `pnpm test:visual-regression:fix`
- **Fix visual regression baselines (Docker)**: `pnpm test:visual-regression:fix:docker`
