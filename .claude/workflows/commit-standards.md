# Commit Standards & Discipline

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

- **CRITICAL**: After running `pnpm format:fix` to fix linting issues, ALWAYS run `git add .` to stage the formatting changes before attempting to commit
- Use small, frequent commits rather than large, infrequent ones

## Conventional Commits Specification

Always use semantic commits following the specification:

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

Commits MUST be prefixed with a type, which consists of a noun, feat, fix, etc., followed by the OPTIONAL scope, OPTIONAL !, and REQUIRED terminal colon and space.

### Commit Types

- **feat**: MUST be used when a commit adds a new feature to your application or library
- **fix**: MUST be used when a commit represents a bug fix for your application
- **test**: Used for adding or modifying tests
- **refactor**: Used for code changes that neither fix bugs nor add features
- **docs**: Used for documentation changes
- **chore**: Used for maintenance tasks, build changes, etc.

### Commit Format

```
type(scope): description

[optional body]

[optional footer(s)]
```

### Examples

```bash
feat: add user authentication system
fix(header): resolve navigation menu overflow on mobile
test: add unit tests for user validation
refactor: extract common validation logic
docs: update API documentation
chore: update dependencies
```

### Breaking Changes

Breaking changes MUST be indicated in the type/scope prefix of a commit, or as an entry in the footer.

If included as a footer, a breaking change MUST consist of the uppercase text BREAKING CHANGE, followed by a colon, space, and description:

```
BREAKING CHANGE: environment variables now take precedence over config files.
```

If included in the type/scope prefix, breaking changes MUST be indicated by a ! immediately before the ::

```
feat!: remove deprecated user API
```

## Commit Best Practices

- Use conventional commit format: `type: description`
- Keep commits atomic and focused on single changes
- Separate structural changes from behavioral changes
- Always include test coverage in the same commit as the feature
- Write clear, descriptive commit messages
- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests when applicable
