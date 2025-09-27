# Development Environment & Setup

## 🛠️ Technology Stack

- **Language**: TypeScript (`^5.0.0`)
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Component Library**: Radix UI
- **Unit / Component Testing**: Vitest + React Testing Library
- **Integration Testing**: Playwright
- **Linting**: ESLint with `@typescript-eslint`
- **Formatting**: Prettier
- **Package Manager**: `pnpm` (preferred)

## 📦 Installation Notes

- Tailwind setup with `postcss`

## ⚙️ Development Commands

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

## 🔐 Security

- Validate all server-side inputs (API routes)
- Use HTTPS-only cookies and CSRF tokens when applicable
- Protect sensitive routes with middleware or session logic

## 🔍 Documentation & Onboarding

- Each component and hook should include a short comment on usage
- Document top-level files (like `src/app/layout.tsx`) and configs
- Keep `README.md` up to date with getting started, design tokens, and component usage notes
- Do not add comments for self-explanatory code
- When adding a comment, ensure it explains WHY the code is written in a certain way - NOT WHAT IT DOES

## MISC

- The owner of the portfolio is "Jordy van Vorselen", use this name everywhere instead of "Alex Johnson"
- Write ONE small test at a time. Run it. Make it pass with the simplest code possible. Then write the next test.
- **Image URLs**: Always use Unsplash images in mock data and test fixtures. Never use `example.com` or other domains that aren't configured in `next.config.js`
