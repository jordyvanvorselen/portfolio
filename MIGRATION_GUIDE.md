# Design System Migration Guide

This guide provides complete mapping tables to convert legacy variants to the new design system props for all UI components. Use this reference to systematically migrate domain components from legacy variants to the modern design token system.

## Table of Contents

- [Title Component (18 legacy variants)](#title-component)
- [Text Component (26 legacy variants)](#text-component)
- [Button Component (7 legacy variants)](#button-component)
- [Badge Component (5 legacy variants)](#badge-component)
- [NavigationLink Component (3 legacy variants)](#navigationlink-component)
- [SocialIcon Component (3 legacy variants)](#socialicon-component)
- [StatusBadge Component (4 legacy variants)](#statusbadge-component)
- [IconContainer Component (3 legacy variants)](#iconcontainer-component)
- [Filter Component (1 legacy prop)](#filter-component)
- [Migration Checklist](#migration-checklist)
- [Quick Reference Tables](#quick-reference-tables)

---

## Title Component

### Legacy Variant Mappings

| Legacy Variant          | New Design System Props                                             | Visual Description                   |
| ----------------------- | ------------------------------------------------------------------- | ------------------------------------ |
| `logo`                  | `size="md" weight="bold" color="primary" align="left" as="span"`    | Medium logo text with bold weight    |
| `hero-name`             | `size="4xl" weight="bold" color="gradient" align="center" as="h1"`  | Large hero name with gradient text   |
| `hero-title`            | `size="xl" weight="normal" color="secondary" align="center" as="p"` | Hero subtitle, lighter weight        |
| `blog-hero-title`       | `size="4xl" weight="bold" color="gradient" align="left" as="h1"`    | Blog page main title                 |
| `blog-card-title`       | `size="lg" weight="bold" color="accent" align="left" as="h3"`       | Blog card title with accent color    |
| `section-title`         | `size="3xl" weight="bold" color="primary" align="left" as="h2"`     | Main section headings                |
| `section-title-compact` | `size="3xl" weight="bold" color="gradient" align="left" as="h2"`    | Compact section titles with gradient |
| `section-label-small`   | `size="2xl" weight="bold" color="primary" align="left" as="h3"`     | Smaller section labels               |
| `subsection-label`      | `size="xs" weight="bold" color="muted" align="left" as="h4"`        | Small subsection labels, uppercase   |
| `card-title`            | `size="lg" weight="bold" color="accent" align="left" as="h3"`       | Card titles with hover effects       |
| `footer-author`         | `size="lg" weight="bold" color="primary" align="left" as="h3"`      | Footer author name                   |
| `footer-section`        | `size="md" weight="semibold" color="primary" align="left" as="h4"`  | Footer section headings              |
| `projects-hero-title`   | `size="4xl" weight="bold" color="primary" align="left" as="h1"`     | Projects page main title             |
| `projects-grid-title`   | `size="2xl" weight="bold" color="primary" align="left" as="h2"`     | Projects grid section title          |
| `project-card-title`    | `size="2xl" weight="bold" color="accent" align="left" as="h2"`      | Individual project card titles       |
| `project-section-label` | `size="sm" weight="semibold" color="muted" align="left" as="h3"`    | Project section labels               |

### Before/After Examples

#### Before (Legacy)

```tsx
<Title variant="hero-name">Jordy van Vorselen</Title>
<Title variant="section-title">About Me</Title>
<Title variant="card-title">Project Title</Title>
```

#### After (Design System)

```tsx
<Title size="4xl" weight="bold" color="gradient" align="center" as="h1">Jordy van Vorselen</Title>
<Title size="3xl" weight="bold" color="primary" align="left" as="h2">About Me</Title>
<Title size="lg" weight="bold" color="accent" align="left" as="h3">Project Title</Title>
```

### Special Considerations

- Legacy variants include additional CSS classes that may need to be preserved via `className`
- Gradient color creates text with gradient effect
- Accent color includes hover transitions for interactive elements

---

## Text Component

### Legacy Variant Mappings

| Legacy Variant                  | New Design System Props                                                                 | Visual Description               |
| ------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------- |
| `description`                   | `size="lg" weight="medium" color="secondary" alignment="center" lineHeight="relaxed"`   | Main page descriptions, centered |
| `description-compact`           | `size="base" weight="medium" color="secondary" alignment="center" lineHeight="relaxed"` | Compact descriptions             |
| `blog-hero-subtitle`            | `size="xl" weight="normal" color="secondary" alignment="left" lineHeight="relaxed"`     | Blog hero subtitle               |
| `blog-card-description`         | `size="base" weight="normal" color="secondary" alignment="left" lineHeight="relaxed"`   | Blog card descriptions           |
| `card-description`              | `size="base" weight="normal" color="secondary" alignment="left" lineHeight="relaxed"`   | General card descriptions        |
| `publication-number`            | `size="2xl" weight="bold" color="primary"`                                              | Large publication numbers        |
| `publication-label`             | `size="lg" weight="semibold" color="primary"`                                           | Publication labels               |
| `publication-description`       | `size="sm" weight="normal" color="muted"`                                               | Publication descriptions         |
| `call-to-action-question`       | `size="base" weight="normal" color="secondary"`                                         | CTA question text                |
| `call-to-action-availability`   | `size="base" weight="semibold" color="secondary"`                                       | Availability status              |
| `footer-description`            | `size="base" weight="normal" color="secondary"`                                         | Footer description text          |
| `footer-info`                   | `size="sm" weight="normal" color="secondary"`                                           | Footer information               |
| `footer-copyright`              | `size="sm" weight="normal" color="secondary"`                                           | Copyright text                   |
| `footer-availability`           | `size="sm" weight="normal" color="accent"`                                              | Availability indicator           |
| `projects-hero-description`     | `size="xl" weight="normal" color="secondary" alignment="center" lineHeight="relaxed"`   | Projects page description        |
| `projects-grid-description`     | `size="xl" weight="normal" color="secondary" alignment="center"`                        | Projects grid description        |
| `project-card-description`      | `size="lg" weight="normal" color="secondary" lineHeight="relaxed"`                      | Project card descriptions        |
| `project-card-long-description` | `size="base" weight="normal" color="muted" lineHeight="relaxed"`                        | Long project descriptions        |
| `scroll-indicator-main`         | `size="base" weight="normal" color="secondary"`                                         | Scroll indicator main text       |
| `scroll-indicator-subtitle`     | `size="xs" weight="normal" color="muted"`                                               | Scroll indicator subtitle        |

### Before/After Examples

#### Before (Legacy)

```tsx
<Text variant="description">Welcome to my portfolio</Text>
<Text variant="card-description">This project demonstrates...</Text>
<Text variant="footer-availability">Available for work</Text>
```

#### After (Design System)

```tsx
<Text size="lg" weight="medium" color="secondary" alignment="center" lineHeight="relaxed">Welcome to my portfolio</Text>
<Text size="base" weight="normal" color="secondary" alignment="left" lineHeight="relaxed">This project demonstrates...</Text>
<Text size="sm" weight="normal" color="accent">Available for work</Text>
```

### Special Considerations

- Many legacy variants include responsive classes and specific max-widths
- Some variants have hover effects and transitions
- Footer variants use specific hex colors that may need className overrides

---

## Button Component

### Legacy Variant Mappings

| Legacy Variant      | New Design System Props                       | Visual Description                |
| ------------------- | --------------------------------------------- | --------------------------------- |
| `primary`           | `variant="solid" color="primary" size="md"`   | Primary action button             |
| `primary-blue`      | `variant="solid" color="accent" size="md"`    | Blue accent button                |
| `secondary`         | `variant="solid" color="secondary" size="md"` | Secondary action button           |
| `footer-action`     | `variant="ghost" color="neutral" size="xs"`   | Small footer action buttons       |
| `project-secondary` | `variant="outline" color="neutral" size="md"` | Project secondary actions         |
| `github`            | `variant="outline" color="accent" size="md"`  | GitHub link buttons, rounded-full |
| `demo`              | `variant="ghost" color="neutral" size="md"`   | Demo link buttons, rounded-full   |

### Size Mappings

| Legacy Size | New Size |
| ----------- | -------- |
| `small`     | `md`     |
| `large`     | `xl`     |

### Before/After Examples

#### Before (Legacy)

```tsx
<Button variant="primary" size="large">Get Started</Button>
<Button variant="github" href="https://github.com/user/repo">GitHub</Button>
<Button variant="footer-action">Contact</Button>
```

#### After (Design System)

```tsx
<Button variant="solid" color="primary" size="xl">Get Started</Button>
<Button variant="outline" color="accent" size="md" href="https://github.com/user/repo" className="rounded-full">GitHub</Button>
<Button variant="ghost" color="neutral" size="xs">Contact</Button>
```

### Special Considerations

- GitHub and demo variants include `rounded-full` styling
- Large secondary variant has special background styling
- Primary-blue large variant has shadow effects

---

## Badge Component

### Legacy Variant Mappings

| Legacy Variant  | New Design System Props                                       | Visual Description         |
| --------------- | ------------------------------------------------------------- | -------------------------- |
| `availability`  | `variant="soft" color="primary" size="md" rounded={false}`    | Availability status badges |
| `section-label` | `variant="soft" color="primary" size="md" rounded={false}`    | Section label badges       |
| `skill`         | `variant="soft" color="default" size="sm" rounded={false}`    | Skill tags                 |
| `technology`    | `variant="outline" color="default" size="md" rounded={false}` | Technology badges          |
| `project-tech`  | `variant="soft" color="default" size="sm" rounded={true}`     | Project technology tags    |

### Before/After Examples

#### Before (Legacy)

```tsx
<Badge variant="availability">Available</Badge>
<Badge variant="skill">React</Badge>
<Badge variant="project-tech">TypeScript</Badge>
```

#### After (Design System)

```tsx
<Badge variant="soft" color="primary" size="md">Available</Badge>
<Badge variant="soft" color="default" size="sm">React</Badge>
<Badge variant="soft" color="default" size="sm" rounded>TypeScript</Badge>
```

---

## NavigationLink Component

### Legacy Variant Mappings

| Legacy Variant | New Design System Props                       | Visual Description       |
| -------------- | --------------------------------------------- | ------------------------ |
| `desktop`      | `variant="default" size="md" color="primary"` | Desktop navigation links |
| `mobile`       | `variant="default" size="sm" color="primary"` | Mobile navigation links  |
| `footer`       | `variant="default" size="md" color="primary"` | Footer navigation links  |

### Before/After Examples

#### Before (Legacy)

```tsx
<NavigationLink href="/about" variant="desktop">About</NavigationLink>
<NavigationLink href="/projects" variant="mobile">Projects</NavigationLink>
<NavigationLink href="/contact" variant="footer">Contact</NavigationLink>
```

#### After (Design System)

```tsx
<NavigationLink href="/about" variant="default" size="md" color="primary">About</NavigationLink>
<NavigationLink href="/projects" variant="default" size="sm" color="primary">Projects</NavigationLink>
<NavigationLink href="/contact" variant="default" size="md" color="primary">Contact</NavigationLink>
```

---

## SocialIcon Component

### Legacy Variant Mappings

| Legacy Variant | New Design System Props                                          | Visual Description            |
| -------------- | ---------------------------------------------------------------- | ----------------------------- |
| `simple`       | `variant="icon" size="md" color="muted" interactive="hover"`     | Simple icon links             |
| `button`       | `variant="button" size="lg" color="muted" interactive="hover"`   | Button-style social icons     |
| `footer`       | `variant="text" size="md" color="secondary" interactive="hover"` | Footer social links with text |

### Before/After Examples

#### Before (Legacy)

```tsx
<SocialIcon href="https://github.com" label="GitHub" icon={Github} variant="simple" />
<SocialIcon href="https://linkedin.com" label="LinkedIn" icon={Linkedin} variant="button" />
<SocialIcon href="https://twitter.com" label="Twitter" icon={Twitter} variant="footer" />
```

#### After (Design System)

```tsx
<SocialIcon href="https://github.com" label="GitHub" icon={Github} variant="icon" size="md" color="muted" interactive="hover" />
<SocialIcon href="https://linkedin.com" label="LinkedIn" icon={Linkedin} variant="button" size="lg" color="muted" interactive="hover" />
<SocialIcon href="https://twitter.com" label="Twitter" icon={Twitter} variant="text" size="md" color="secondary" interactive="hover" />
```

---

## StatusBadge Component

### Legacy Status Mappings

| Legacy Status | New Design System Props          | Visual Description        |
| ------------- | -------------------------------- | ------------------------- |
| `active`      | `variant="soft" color="success"` | Active project status     |
| `maintained`  | `variant="soft" color="info"`    | Maintained project status |
| `featured`    | `variant="soft" color="primary"` | Featured project status   |
| `archived`    | `variant="soft" color="default"` | Archived project status   |

### Before/After Examples

#### Before (Legacy)

```tsx
<StatusBadge status="active">Active</StatusBadge>
<StatusBadge status="featured">Featured</StatusBadge>
<StatusBadge status="archived">Archived</StatusBadge>
```

#### After (Design System)

```tsx
<StatusBadge variant="soft" color="success">Active</StatusBadge>
<StatusBadge variant="soft" color="primary">Featured</StatusBadge>
<StatusBadge variant="soft" color="default">Archived</StatusBadge>
```

---

## IconContainer Component

### Legacy Variant Mappings

| Legacy Variant | New Design System Props                               | Visual Description      |
| -------------- | ----------------------------------------------------- | ----------------------- |
| `expertise`    | `variant="rounded" effect="blur" interactive="scale"` | Expertise section icons |
| `feature`      | `variant="circle" effect="blur" interactive="static"` | Feature highlight icons |
| `highlight`    | `variant="default" effect="blur" interactive="hover"` | General highlight icons |

### Before/After Examples

#### Before (Legacy)

```tsx
<IconContainer color="#3b82f6" legacyVariant="expertise">
  <Icon className="w-7 h-7" />
</IconContainer>
<IconContainer color="#10b981" legacyVariant="feature">
  <Icon className="w-7 h-7" />
</IconContainer>
```

#### After (Design System)

```tsx
<IconContainer color="#3b82f6" variant="rounded" effect="blur" interactive="scale">
  <Icon className="w-7 h-7" />
</IconContainer>
<IconContainer color="#10b981" variant="circle" effect="blur" interactive="static">
  <Icon className="w-7 h-7" />
</IconContainer>
```

---

## Filter Component

### Legacy Prop Mappings

| Legacy Prop      | New Design System Props | Visual Description    |
| ---------------- | ----------------------- | --------------------- |
| `active={true}`  | `variant="active"`      | Active filter state   |
| `active={false}` | `variant="default"`     | Inactive filter state |

### Before/After Examples

#### Before (Legacy)

```tsx
<Filter active={true}>React</Filter>
<Filter active={false}>Vue</Filter>
```

#### After (Design System)

```tsx
<Filter variant="active">React</Filter>
<Filter variant="default">Vue</Filter>
```

---

## Migration Checklist

### 🔍 Phase 1: Identify Legacy Usage

1. **Search for legacy variants across domains:**

   ```bash
   # Search for Title variants
   grep -r 'variant="hero-name"' src/domains/
   grep -r 'variant="section-title"' src/domains/

   # Search for Text variants
   grep -r 'variant="description"' src/domains/
   grep -r 'variant="card-description"' src/domains/

   # Search for Button variants
   grep -r 'variant="primary"' src/domains/
   grep -r 'variant="github"' src/domains/

   # Search for other legacy patterns
   grep -r 'legacyVariant=' src/domains/
   grep -r 'status=' src/domains/
   grep -r 'active=' src/domains/
   ```

2. **Create inventory of files to migrate:**
   - List all domain components using legacy variants
   - Note which variants are used in each file
   - Prioritize by frequency of use

### 🔄 Phase 2: Apply Mappings

1. **Use the mapping tables above to convert each variant**
2. **Replace legacy usage systematically:**
   - One component type at a time (all Title variants, then Text variants, etc.)
   - One domain folder at a time
   - One file at a time within each domain

3. **Common migration patterns:**

   ```tsx
   // Title migrations
   <Title variant="hero-name" /> → <Title size="4xl" weight="bold" color="gradient" align="center" as="h1" />
   <Title variant="section-title" /> → <Title size="3xl" weight="bold" color="primary" align="left" as="h2" />

   // Text migrations
   <Text variant="description" /> → <Text size="lg" weight="medium" color="secondary" alignment="center" lineHeight="relaxed" />
   <Text variant="card-description" /> → <Text size="base" weight="normal" color="secondary" alignment="left" lineHeight="relaxed" />

   // Button migrations
   <Button variant="primary" size="large" /> → <Button variant="solid" color="primary" size="xl" />
   <Button variant="github" /> → <Button variant="outline" color="accent" size="md" className="rounded-full" />
   ```

### 🧪 Phase 3: Test Changes

1. **Run unit tests after each file migration:**

   ```bash
   pnpm test:unit
   ```

2. **Run visual regression tests after styling changes:**

   ```bash
   pnpm test:visual-regression
   ```

3. **Check for compilation errors:**
   ```bash
   pnpm build
   ```

### 🔒 Phase 4: Maintain Backward Compatibility

**During migration period, both systems work side-by-side:**

- Legacy variants are automatically mapped to new design system props
- Gradual migration is possible without breaking existing functionality
- Components accept both legacy and new props simultaneously

**Remove legacy support only after complete migration:**

- Remove legacy variant type definitions
- Remove legacy mapping logic from components
- Update TypeScript interfaces to be more strict

---

## Quick Reference Tables

### Most Common Migrations

| Legacy Pattern                            | New Pattern                                                                                  | Use Case          |
| ----------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------- |
| `<Title variant="section-title">`         | `<Title size="3xl" weight="bold" color="primary" as="h2">`                                   | Section headings  |
| `<Text variant="description">`            | `<Text size="lg" weight="medium" color="secondary" alignment="center" lineHeight="relaxed">` | Page descriptions |
| `<Button variant="primary" size="large">` | `<Button variant="solid" color="primary" size="xl">`                                         | Main CTAs         |
| `<Badge variant="skill">`                 | `<Badge variant="soft" color="default" size="sm">`                                           | Skill tags        |
| `<NavigationLink variant="desktop">`      | `<NavigationLink variant="default" size="md" color="primary">`                               | Navigation        |

### Size Conversion Reference

| Component | Legacy Small   | Legacy Large   | New Small   | New Large    |
| --------- | -------------- | -------------- | ----------- | ------------ |
| Button    | `size="small"` | `size="large"` | `size="md"` | `size="xl"`  |
| Title     | N/A            | N/A            | `size="xs"` | `size="4xl"` |
| Text      | N/A            | N/A            | `size="xs"` | `size="2xl"` |
| Badge     | N/A            | N/A            | `size="sm"` | `size="lg"`  |

### Color Mapping Reference

| Legacy Color    | New Color           | Visual Result               |
| --------------- | ------------------- | --------------------------- |
| Primary buttons | `color="primary"`   | Teal theme color            |
| Secondary text  | `color="secondary"` | Gray-300 text               |
| Muted text      | `color="muted"`     | Gray-400 text               |
| Accent elements | `color="accent"`    | Teal-400 highlights         |
| Gradient titles | `color="gradient"`  | Multi-color gradient effect |

---

## Additional Notes

### Performance Considerations

- Legacy variants are mapped at runtime, so migrating improves performance
- New design system uses TypeScript for better type safety
- Design tokens are more predictable and maintainable

### Design Consistency

- New system ensures consistent spacing, colors, and typography
- Easier to maintain brand consistency across components
- Better support for responsive design patterns

### Developer Experience

- IntelliSense and autocompletion work better with design tokens
- More explicit about styling intentions
- Easier to customize and extend component variants

### Accessibility

- New system includes better ARIA patterns
- More semantic HTML element choices
- Improved focus management and keyboard navigation
