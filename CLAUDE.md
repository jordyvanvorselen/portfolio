# Portfolio Project Context

**Owner**: Jordy van Vorselen  
**Repository**: `jordyvanvorselen/portfolio`  
**Framework**: Next.js with TypeScript, TDD methodology

## Core Principles

- **Test-Driven Development (TDD)**: Red → Green → Refactor cycle
- **Domain-Based Architecture**: Clear separation of UI components and domain features
- **100% Test Coverage**: Comprehensive unit, integration, and visual regression testing
- **Tidy First**: Separate structural from behavioral changes
- **Design System First**: Reusable UI components with comprehensive variant systems

## Context Imports

@.claude/development.md
@.claude/architecture.md  
@.claude/testing.md
@.claude/code-style.md

## Workflow Imports

@.claude/workflows/github-issues.md
@.claude/workflows/tdd-cycle.md
@.claude/workflows/commit-standards.md

## Guide Imports

@.claude/guides/i18n.md
@.claude/guides/visual-testing.md
@.claude/guides/ci-cd.md

## Quick Reference

- **Testing Commands**: `pnpm test`, `pnpm test:unit`, `pnpm test:integration`, `pnpm test:visual-regression`
- **Development**: `pnpm dev` (always running), `pnpm build`, `pnpm lint`, `pnpm format`
- **Mandatory**: Use path aliases (`@/*`), arrow function components, TypeScript strict mode
- **Architecture**: `src/ui/` for generic components, `src/domains/` for features
- **Icons**: `lucide-react` for UI, `DevIcon` for technology icons
