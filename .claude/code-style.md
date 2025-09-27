# Code Style Standards & Conventions

## 📝 Core Code Standards

- **MANDATORY**: Use arrow function components with implicit return type inference
  - `export const ComponentName = () => {` (NOT `export function ComponentName()`)
  - Do NOT annotate return types for React components - let TypeScript infer them
  - Example: `export const MyComponent = ({ title }: Props) => { return <div>{title}</div> }`
- Always destructure props
- Avoid `any` type, use `unknown` or strict generics
- Group imports: react → next → libraries → local
- **MANDATORY**: Use path aliases (`@/*`) instead of relative imports (`./*`, `../*`) - ESLint enforces this rule

## 🔧 Code Quality Standards

- Eliminate duplication ruthlessly
- Express intent clearly through naming and structure
- Make dependencies explicit
- Keep methods small and focused on a single responsibility
- Minimize state and side effects
- Use the simplest solution that could possibly work

## 🛠️ Refactoring Guidelines

- Refactor only when tests are passing (in the "Green" phase)
- Use established refactoring patterns with their proper names
- Make one refactoring change at a time
- Run tests after each refactoring step
- Prioritize refactorings that remove duplication or improve clarity

## 📦 Import Organization

Group imports in this specific order:

```typescript
// 1. React imports
import { useState, useEffect } from 'react'

// 2. Next.js imports
import { useRouter } from 'next/router'
import Image from 'next/image'

// 3. External library imports
import { Button } from '@radix-ui/react-button'
import { Github } from 'lucide-react'

// 4. Local imports (using path aliases)
import { Badge } from '@/ui/Badge'
import { useSomeHook } from '@/hooks/useSomeHook'
```

## 🎯 TypeScript Best Practices

- Always use strict TypeScript configuration
- Prefer `unknown` over `any` for truly unknown types
- Use proper generic constraints
- Define interfaces for all component props
- Use union types for variant systems
- Export types alongside components

```typescript
// Good: Proper interface definition
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  onClick?: () => void
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
}: ButtonProps) => {
  // Component implementation
}

// Good: Export types
export type { ButtonProps }
```

## 🧪 Testing Standards

### Testing Pattern

```typescript
// ✅ CORRECT - Direct component rendering
describe('MyComponent', () => {
  it('displays translated text', () => {
    render(<MyComponent />)
    expect(screen.getByText('hero.title')).toBeVisible()
  })
})

// ❌ WRONG - Never use wrappers
render(
  <I18nTestWrapper>
    <MyComponent />
  </I18nTestWrapper>
)
```

### Test Naming

- Use descriptive test names that describe behavior
- Prefer `it` over `test` for individual test cases
- Use `describe` blocks to group related functionality

```typescript
// Good
describe('UserProfile', () => {
  it('displays user name when provided', () => {
    // test implementation
  })

  it('shows placeholder when user name is missing', () => {
    // test implementation
  })
})
```

## 🎨 Component Patterns

### Component Structure

```typescript
// Standard component pattern
interface ComponentProps {
  // Props definition
}

export const Component = ({ prop1, prop2 }: ComponentProps) => {
  // Hooks at the top
  const [state, setState] = useState()

  // Event handlers
  const handleClick = () => {
    // Handler logic
  }

  // Early returns for loading/error states
  if (loading) return <LoadingSpinner />

  // Main render
  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}

// Export component and types
export type { ComponentProps }
```

### Conditional Rendering

```typescript
// Good: Use logical AND for conditional rendering
{isVisible && <Component />}

// Good: Use ternary for either/or rendering
{condition ? <ComponentA /> : <ComponentB />}

// Good: Early return for complex conditions
if (!data) {
  return <EmptyState />
}
```

### Event Handlers

```typescript
// Good: Arrow function handlers
const handleSubmit = (event: FormEvent) => {
  event.preventDefault()
  // Handle submission
}

// Good: Inline handlers for simple operations
<button onClick={() => setIsOpen(!isOpen)}>
  Toggle
</button>
```

## 📏 Formatting Rules

- Use Prettier for consistent code formatting
- 2-space indentation
- Single quotes for strings
- Trailing commas in objects and arrays
- Semicolons required
- Line length: 100 characters

## 🚫 Anti-Patterns to Avoid

- No `any` types
- No relative imports (use `@/*` aliases)
- No function declarations for components (use arrow functions)
- No manual return type annotations for React components
- No complex nested ternary operators
- No mutating props or state directly
- No side effects in render functions
