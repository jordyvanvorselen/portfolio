# CI/CD Pipeline & GitHub Actions

## GitHub Actions Architecture Overview

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

## Pipeline Stages

| Stage                    | Purpose                          | Tools             | Status                                                                |
| ------------------------ | -------------------------------- | ----------------- | --------------------------------------------------------------------- |
| **🔍 Lint & Format**     | Code style & quality enforcement | ESLint + Prettier | ![Badge](https://img.shields.io/badge/ESLint-Passing-brightgreen)     |
| **🏗️ Build**             | Application build verification   | Next.js           | ![Badge](https://img.shields.io/badge/Build-Passing-brightgreen)      |
| **📋 Typecheck**         | Static type analysis             | TypeScript        | ![Badge](https://img.shields.io/badge/TypeScript-Strict-blue)         |
| **🧪 Unit Tests**        | Component & logic testing        | Vitest + RTL      | ![Badge](https://img.shields.io/badge/Coverage-100%25-brightgreen)    |
| **🌐 Integration Tests** | E2E testing workflows            | Playwright        | ![Badge](https://img.shields.io/badge/Tests-88%20passing-brightgreen) |
| **🖼️ Visual Regression** | Visual regression testing        | Playwright        | ![Badge](https://img.shields.io/badge/Tests-20%20passing-brightgreen) |

## Key Features

- **✅ Quality Gates**: All stages must pass before deployment
- **🔍 Pre-commit Hooks**: Automatic linting and formatting on commit
- **🚀 Playwright Browser Caching**: Optimized CI performance with browser cache
- **📁 Artifact Management**: Test results uploaded for 30-day retention
- **🔄 Environment-based Deployment**: Production (main) vs Preview (PRs)
- **⚡ Composite Actions**: Reusable Node.js/pnpm setup action
- **🛡️ Security**: Vercel deployment with encrypted secrets

## Deployment Strategy

### Production Deployment (main branch)

- Triggered on push to `main`
- Full quality gate validation (lint, build, typecheck, tests)
- Deployed to production Vercel environment

### Preview Deployment (PRs)

- Triggered on pull request creation/updates
- Same quality validation as production
- Deployed to unique preview URL for review

## Quality Gates

All of the following must pass before deployment:

1. **Code Quality**: ESLint and Prettier checks
2. **Build Verification**: Next.js application builds successfully
3. **Type Safety**: TypeScript strict mode validation
4. **Unit Tests**: 100% test coverage requirement
5. **Integration Tests**: All E2E workflows pass
6. **Visual Regression**: No unintended visual changes
