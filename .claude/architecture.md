# Domain-Based Architecture & Component Guidelines

## 📂 Project Structure

The project follows a **domain-driven architecture** with clear separation of concerns:

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root layout & metadata
│   ├── page.tsx         # Home page
│   ├── blog/            # Blog pages
│   ├── experience/      # Experience pages
│   ├── projects/        # Projects pages
│   └── globals.css      # Global styles & utility classes
├── ui/                  # Generic UI Components (25+ components)
│   ├── Badge.tsx        # Design system badges
│   ├── Text.tsx         # Typography system
│   ├── Button.tsx       # Interactive buttons
│   ├── Card.tsx         # Content containers
│   ├── SocialIcon.tsx   # Social media icons
│   ├── NavigationLink.tsx # Navigation links
│   ├── LanguageSwitcher.tsx # i18n language selection
│   ├── MobileMenu*.tsx  # Mobile navigation components
│   └── Timeline*.tsx    # Timeline components
├── domains/             # Feature Domains
│   ├── common/          # Shared components (Header, Footer, MobileMenu)
│   ├── home/            # Home page features
│   │   ├── hero/        # Landing introduction & social links
│   │   └── expertise/   # Skills showcase & expertise cards
│   ├── blog/            # Blog functionality & search
│   ├── experience/      # Experience timeline & cards
│   └── projects/        # Projects showcase & collaboration
├── hooks/               # Custom React hooks
├── i18n/                # Internationalization
├── lib/                 # Client helpers, API wrappers
├── types/               # TypeScript type definitions
├── test/utils/          # Test utilities & helpers
└── utils/               # Utility functions
```

## 🧱 Component Guidelines

- Use `radix-ui` components by default for form elements, cards, dialogs, etc.
- Use `lucide-react` for all UI icons and `DevIcon` component for technology icons, always use proper aria-label attributes for accessibility
- Style components with Tailwind utility classes
- Co-locate CSS modules or component-specific styling in the same directory

## CSS Utility Classes (globals.css)

**CRITICAL**: The project defines custom CSS utility classes in `src/app/globals.css` for layout management:

- **`.content-section`**: Applies **FIXED** height of `calc(100vh - 4rem)` - prevents section expansion beyond viewport
- **`.content-section-min`**: Applies **MINIMUM** height of `calc(100vh - 4rem)` - allows section expansion as needed
- **`.header-offset`**: Adds top margin of `4rem` to account for fixed header

**Usage Guidelines:**

- Use `.content-section-min` for sections that need to expand beyond viewport (mobile scroll, dynamic content)
- Use `.content-section` only for sections that should be strictly constrained to viewport height
- Always pair with `.header-offset` for proper header spacing

## Domain-Based Architecture

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

## Design System Development Workflow

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

## Component Naming Convention

- **Component files**: Use PascalCase for React component files (e.g., `HeroSection.tsx`, `UserProfile.tsx`)
- **Test files**: Use PascalCase for component test files (e.g., `HeroSection.spec.tsx`, `UserProfile.spec.tsx`)
- **Integration test page objects**: Use kebab-case with `.section.ts` suffix for sections (e.g., `header.section.ts`, `hero.section.ts`) and `.page.ts` suffix for pages (e.g., `home.page.ts`)
- **Component exports**: Always use PascalCase for component names in exports and imports

## Icon Usage

**All icons come from lucide-react, except technology icons which use devicon**

```typescript
// Use lucide-react for all UI icons
import { Github, Linkedin, UserPlus, Mail, Calendar } from "lucide-react";

// Always use aria-label for icon-only links/buttons
<a href="https://github.com/user" aria-label="GitHub">
  <Github className="w-5 h-5" />
</a>

// For technology/developer icons, use DevIcon component from @src/ui/DevIcon.tsx
import { DevIcon } from '@/ui/DevIcon'

// Technology icons for portfolio with brand colors
<div className="flex gap-2">
  <DevIcon name="java" className="w-6 h-6" />
  <DevIcon name="python" className="w-6 h-6" />
  <DevIcon name="react" className="w-6 h-6" />
  <DevIcon name="nodejs" className="w-6 h-6" />
</div>

// DevIcon supports wordmark variants
<DevIcon name="amazonwebservices" wordmark className="w-8 h-8" />
```
