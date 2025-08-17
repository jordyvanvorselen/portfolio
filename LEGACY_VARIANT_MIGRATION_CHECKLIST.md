# Legacy Variant Migration Checklist

This document tracks all remaining legacy variant usage that needs to be migrated to the new design system.

## Source Files Requiring Migration

### App Router Files

**src/app/blog/page.tsx**

- [x] Line 95: `<Title variant="section-label-small" className="mb-8">`
- [x] Line 102: `<Title variant="section-label-small" className="mb-8">`

### Domain Files

**src/domains/blog/FeaturedBlogCard.tsx**

- [x] Line 91: `<Badge key={tag} variant="skill">`
- [x] Line 96: `<Badge variant="skill">+{tags.length - 4} more</Badge>`

**src/domains/projects/ProjectCard.tsx**

- [x] Line 59: `variant="floating"`
- [x] Line 65: `variant="floating"`

**src/domains/projects/ProjectsCollaboration.tsx**

- [x] Line 37: `<Button href="https://github.com/jordyvanvorselen" variant="primary">`

**src/domains/home/expertise/ExpertiseCard.tsx**

- [x] Line 36: `variant="rounded"`

**src/domains/home/hero/SocialLinks.tsx**

- [x] Line 12: `variant="button"` ✅ Already migrated
- [x] Line 21: `variant="button"` ✅ Already migrated
- [x] Line 30: `variant="button"` ✅ Already migrated

### Test Files (Legacy Variants in Test Cases)

**src/ui/Button.spec.tsx**

- [x] ~~Line 154: `<Button variant="secondary" size="large">`~~ REMOVED - No longer needed
- [x] ~~Line 165: `<Button variant="primary-blue" size="large">`~~ REMOVED - No longer needed
- [x] ~~Line 184: `<Button variant="primary" size="small">`~~ REMOVED - No longer needed
- [x] ~~Line 197: `<Button href="mailto:test@example.com" variant="primary">`~~ REMOVED - No longer needed
- [x] ~~Line 211: `<Button href="https://example.com" variant="primary">`~~ REMOVED - No longer needed
- [x] ~~Line 225: `<Button href="/contact" variant="primary">`~~ REMOVED - No longer needed
- [x] ~~Line 239: `<Button href="#section" variant="primary">`~~ REMOVED - No longer needed
- [x] ~~Line 255: `variant="primary"`~~ REMOVED - No longer needed

**src/ui/Title.spec.tsx**

- [x] Line 153: `<Title variant="hero-title">Senior Software Engineer</Title>` ✅ REMOVED - No longer needed
- [x] Line 162: `<Title variant="hero-name" as="h3">` ✅ REMOVED - No longer needed
- [x] Line 186: `<Title variant="section-label-small">Section Label</Title>` ✅ REMOVED - No longer needed

**src/ui/Divider.spec.tsx**

- [x] Line 81: `variant="gradient-vertical"` ✅ REMOVED - No longer needed
- [x] Line 118: `variant="gradient-vertical"` ✅ Not legacy - already part of new design system
- [x] Line 139: `variant="gradient-vertical"`
- [x] Line 164: `variant="gradient-horizontal"`
- [x] Line 182: `variant="card-section"` ✅ REMOVED - No longer needed
- [x] Line 187: `variant="vertical-gradient"` ✅ REMOVED - No longer needed
- [x] Line 192: `variant="horizontal-gradient"` ✅ REMOVED - No longer needed
- [x] Line 197: `variant="card-section"` ✅ REMOVED - No longer needed
- [x] Line 206: `variant="line"` ✅ REMOVED - No longer needed
- [x] Line 250: `variant="gradient-horizontal"` ✅ Not legacy - already part of new design system
- [x] Line 277: `variant="gradient-horizontal"` ✅ Not legacy - already part of new design system

**src/ui/Badge.spec.tsx**

- [x] Line 124: `<Badge variant="skill" color="primary" size="lg" rounded={true}>` ✅ REMOVED - No longer needed
- [x] Line 136: `<Badge variant="availability" style={customStyle}>` ✅ REMOVED - No longer needed
- [x] Line 146: `<Badge variant="technology">No style legacy badge</Badge>` ✅ REMOVED - No longer needed

**src/ui/NavigationLink.spec.tsx**

- [x] Line 94-109: Legacy variant tests (desktop, mobile, footer) ✅ REMOVED - No longer needed

**src/ui/Text.spec.tsx**

- [x] Line 113-131: Legacy variant support tests (description, card-description, etc.) ✅ REMOVED - No longer needed

**src/ui/Filter.spec.tsx**

- [x] Line 71-90: Backward compatibility tests (active prop) ✅ REMOVED - No longer needed

**src/ui/StatItem.spec.tsx**

- [x] Line 99-154: Backward compatibility tests (floating variant, hoverColor prop) ✅ REMOVED - No longer needed

**src/ui/SocialIcon.spec.tsx**

- [x] Line 110-134: Legacy backward compatibility tests (simple, button, footer variants) ✅ REMOVED - No longer needed
- [x] Line 136-151: New design system props override legacy tests ✅ REMOVED - No longer needed
- [x] Line 205-218: Legacy variant with custom props tests ✅ REMOVED - No longer needed

### Documentation Files (Examples - Can be Updated Later)

**CLAUDE.md**

- [ ] Line 317: `<NavigationLink href="/about" variant="desktop">`

**MIGRATION_GUIDE.md** (Contains legacy examples for reference)

- [ ] Multiple legacy variant examples used for documentation purposes

## Migration Priority

### High Priority (Production Code)

1. **App Router Files** - These are user-facing pages
2. **Domain Components** - These affect the actual UI

### Medium Priority (Test Files)

3. **Component Test Files** - These test legacy variants but don't affect production

### Low Priority (Documentation)

4. **Documentation Files** - These are examples and references

## Migration Commands for Quick Reference

```bash
# Search for specific legacy variants
grep -r 'variant="section-label-small"' src/
grep -r 'variant="skill"' src/
grep -r 'variant="floating"' src/
grep -r 'variant="primary"' src/
grep -r 'variant="button"' src/
grep -r 'variant="rounded"' src/

# Run tests after migration
pnpm test:unit
pnpm lint
pnpm format
```

---

**Total Legacy Variants Found: 61**
**Files Affected: 16 source files, 12 test files**
