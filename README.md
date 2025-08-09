<div align="center">

# 🚀 Jordy van Vorselen | Portfolio

> **A modern, responsive portfolio website built with cutting-edge web technologies and test-driven development principles**

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Jest](https://img.shields.io/badge/Jest-Testing-C21325?style=for-the-badge&logo=jest)](https://jestjs.io/)
[![Playwright](https://img.shields.io/badge/Playwright-Integration-45ba4b?style=for-the-badge&logo=playwright)](https://playwright.dev/)

_Showcasing professional expertise through exceptional user experience and bulletproof code quality_

</div>

## ✨ About This Project

This portfolio website represents the intersection of **exceptional design**, **bulletproof engineering**, and **cutting-edge web technologies**. Built with Test-Driven Development (TDD) principles, every component is thoroughly tested with 100% code coverage, ensuring reliability and maintainability.

The project demonstrates expertise in modern frontend development, featuring a carefully crafted user experience that seamlessly adapts across all device sizes while maintaining pixel-perfect design fidelity.

## 🛠️ Technology Stack

<div align="center">

| Category                  | Technologies                                                                                                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend Framework**    | ![Next.js](https://img.shields.io/badge/Next.js-App%20Router-000000?logo=next.js)                                                                                     |
| **Language**              | ![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Mode-3178C6?logo=typescript)                                                                           |
| **Styling**               | ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Utility%20First-06B6D4?logo=tailwindcss)                                                                  |
| **Component Library**     | ![Radix UI](https://img.shields.io/badge/Radix%20UI-Accessible-000000?logo=radixui)                                                                                   |
| **Icons**                 | ![Lucide React](https://img.shields.io/badge/Lucide%20React-Beautiful%20Icons-F56565?logo=lucide)                                                                     |
| **Testing (Unit)**        | ![Jest](https://img.shields.io/badge/Jest-React%20Testing%20Library-C21325?logo=jest)                                                                                 |
| **Testing (Integration)** | ![Playwright](https://img.shields.io/badge/Playwright-E2E%20Testing-45ba4b?logo=playwright)                                                                           |
| **Code Quality**          | ![ESLint](https://img.shields.io/badge/ESLint-TypeScript-4B32C3?logo=eslint) ![Prettier](https://img.shields.io/badge/Prettier-Code%20Formatter-F7B93E?logo=prettier) |
| **Package Manager**       | ![pnpm](https://img.shields.io/badge/pnpm-Fast%20&%20Efficient-F69220?logo=pnpm)                                                                                      |

</div>

## 📁 Project Architecture

This project follows a **domain-driven architecture** with clear separation of concerns:

```
📦 Portfolio
├── 🚀 app/                      # Next.js App Router
│   ├── layout.tsx               # Root layout & metadata
│   ├── page.tsx                 # Home page
│   └── api/                     # API routes
├── 🎨 src/
│   ├── ui/                      # 🧩 Generic UI Components
│   │   ├── Badge.tsx            # Design system badges
│   │   ├── Text.tsx             # Typography system
│   │   ├── SocialIcon.tsx       # Social media icons
│   │   └── NavigationLink.tsx   # Navigation links
│   └── domains/                 # 🏗️ Feature Domains
│       ├── header/              # Navigation & branding
│       ├── hero-section/        # Landing introduction
│       └── expertise-section/   # Skills showcase
├── 🧪 integration-tests/        # E2E Testing Suite
│   ├── pages/                   # Page Object Models
│   └── fixtures/                # Test fixtures
├── 🔧 hooks/                    # Custom React hooks
├── 📚 lib/                      # Utilities & helpers
└── 🎯 public/                   # Static assets
```

### 🏗️ Domain-Based Architecture

**Design System First**: Every UI pattern is first created as a reusable component in `src/ui/` with comprehensive variant systems, then utilized across domain-specific features.

**Domain Separation**: Features are organized by business domains, each containing components specific to that functionality while leveraging shared UI components.

## 🧪 Testing Strategy

This project maintains **100% code coverage** through a comprehensive three-tier testing strategy:

### 🔴 Unit Testing (Jest + React Testing Library)

- **Coverage**: 100% code coverage mandatory
- **Focus**: Component behavior and business logic
- **Location**: Co-located with components (`*.spec.tsx`)
- **Run**: `pnpm test:unit`

```bash
✅ 42 unit tests passing
✅ 100% code coverage maintained
```

### 🟡 Integration Testing (Playwright)

- **Pattern**: Page Object Model (POM) mandatory
- **Focus**: User workflows and component interactions
- **Location**: `integration-tests/` directory
- **Run**: `pnpm test:integration`

```bash
✅ 36 integration tests passing
✅ Chrome & Firefox coverage
✅ Page Object Model enforced
```

### 🟢 Visual Regression Testing (Playwright Screenshots)

- **Purpose**: Pixel-perfect design fidelity
- **Method**: Automated screenshot comparisons
- **Baseline**: Generated with `--update-snapshots`
- **Coverage**: All major UI sections

```bash
✅ Visual regression tests
✅ Multi-browser screenshot validation
✅ Automated baseline management
```

## 🔄 Test-Driven Development Workflow

Following **Kent Beck's TDD principles** and **Tidy First** methodology:

### Red → Green → Refactor Cycle

```mermaid
graph LR
    A[🔴 Write Failing Test] --> B[🟢 Make Test Pass]
    B --> C[🔵 Refactor Code]
    C --> A

    style A fill:#ffebee,stroke:#f44336,color:#000000
    style B fill:#e8f5e8,stroke:#4caf50,color:#000000
    style C fill:#e3f2fd,stroke:#2196f3,color:#000000
```

1. **🔴 Red**: Write the smallest possible failing test
2. **🟢 Green**: Implement minimal code to make test pass
3. **🔵 Refactor**: Improve code structure while maintaining green tests

### Commit Discipline

- ✅ Commit after reaching **Green** state
- ✅ Commit after **Refactoring** phase
- ✅ Separate structural from behavioral changes
- ✅ Conventional commit format enforced

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **pnpm** (recommended package manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/jordyvanvorselen/portfolio.git
cd portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

🌐 Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Development Commands

| Command                 | Description                  |
| ----------------------- | ---------------------------- |
| `pnpm dev`              | 🔥 Start development server  |
| `pnpm build`            | 🏗️ Build for production      |
| `pnpm start`            | ▶️ Start production server   |
| `pnpm test`             | 🧪 Run all tests             |
| `pnpm test:unit`        | 🔬 Run unit tests only       |
| `pnpm test:integration` | 🌐 Run integration tests     |
| `pnpm lint`             | 🔍 Check code quality        |
| `pnpm lint:fix`         | 🛠️ Fix linting issues        |
| `pnpm format`           | ✨ Format code with Prettier |

## 📊 Code Quality Metrics

<div align="center">

| Metric            | Status                                                                           |
| ----------------- | -------------------------------------------------------------------------------- |
| **Test Coverage** | ![100%](https://img.shields.io/badge/Coverage-100%25-brightgreen)                |
| **Type Safety**   | ![TypeScript Strict](https://img.shields.io/badge/TypeScript-Strict%20Mode-blue) |
| **Linting**       | ![ESLint Passing](https://img.shields.io/badge/ESLint-Passing-brightgreen)       |
| **Code Style**    | ![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-ff69b4)           |
| **Build Status**  | ![Passing](https://img.shields.io/badge/Build-Passing-brightgreen)               |

</div>

## 🎯 Design Philosophy

- **🎨 Pixel-Perfect Design**: Every element precisely matches design specifications
- **📱 Mobile-First**: Responsive design ensuring exceptional experience on all devices
- **♿ Accessibility**: WCAG compliant with proper ARIA labels and semantic HTML
- **⚡ Performance**: Optimized for Core Web Vitals and SEO
- **🧩 Component Reusability**: Design system approach with comprehensive variant systems
- **🔒 Type Safety**: Comprehensive TypeScript coverage with strict mode enabled

---

<div align="center">

**Built with ❤️ by [Jordy van Vorselen](https://github.com/jordyvanvorselen)**

_Showcasing the perfect blend of exceptional design, robust engineering, and test-driven development_

</div>
