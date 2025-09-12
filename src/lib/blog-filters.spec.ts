import { filterPosts, normalizeSearchTerm } from '@/lib/blog-filters'
import type { BlogPost } from '@/lib/api'

const mockPosts: BlogPost[] = [
  {
    slug: 'react-hooks-guide',
    title: 'React Hooks Guide',
    description: 'Learn about React hooks and how to use them effectively',
    date: 'January 1, 2024',
    readTime: '5 min read',
    image: '/test-image.jpg',
    tags: ['React', 'JavaScript', 'Hooks'],
  },
  {
    slug: 'python-tips',
    title: 'Python Tips and Tricks',
    description: 'Useful Python tips for developers',
    date: 'January 2, 2024',
    readTime: '3 min read',
    image: '/test-image.jpg',
    tags: ['Python', 'Programming'],
  },
  {
    slug: 'typescript-advanced',
    title: 'Advanced TypeScript',
    description: 'Deep dive into advanced TypeScript features',
    date: 'January 3, 2024',
    readTime: '7 min read',
    image: '/test-image.jpg',
    tags: ['TypeScript', 'JavaScript'],
  },
]

describe('blog-filters', () => {
  describe('normalizeSearchTerm', () => {
    it('converts search term to lowercase', () => {
      expect(normalizeSearchTerm('REACT')).toBe('react')
    })

    it('trims whitespace', () => {
      expect(normalizeSearchTerm('  react  ')).toBe('react')
    })

    it('handles empty strings', () => {
      expect(normalizeSearchTerm('')).toBe('')
    })

    it('handles undefined input', () => {
      expect(normalizeSearchTerm(undefined)).toBe('')
    })
  })

  describe('filterPosts', () => {
    it('returns all posts when no filters are applied', () => {
      const result = filterPosts(mockPosts, {})
      expect(result).toEqual(mockPosts)
    })

    it('filters posts by tag', () => {
      const result = filterPosts(mockPosts, { tag: 'Python' })
      expect(result).toHaveLength(1)
      expect(result[0]!.title).toBe('Python Tips and Tricks')
    })

    it('filters posts by search term in title', () => {
      const result = filterPosts(mockPosts, { search: 'hooks' })
      expect(result).toHaveLength(1)
      expect(result[0]!.title).toBe('React Hooks Guide')
    })

    it('filters posts by search term in description', () => {
      const result = filterPosts(mockPosts, { search: 'advanced' })
      expect(result).toHaveLength(1)
      expect(result[0]!.title).toBe('Advanced TypeScript')
    })

    it('performs case-insensitive search', () => {
      const result = filterPosts(mockPosts, { search: 'REACT' })
      expect(result).toHaveLength(1)
      expect(result[0]!.title).toBe('React Hooks Guide')
    })

    it('combines tag and search filters', () => {
      const result = filterPosts(mockPosts, {
        tag: 'JavaScript',
        search: 'hooks',
      })
      expect(result).toHaveLength(1)
      expect(result[0]!.title).toBe('React Hooks Guide')
    })

    it('returns empty array when no posts match combined filters', () => {
      const result = filterPosts(mockPosts, { tag: 'Python', search: 'hooks' })
      expect(result).toHaveLength(0)
    })

    it('handles non-existent tag', () => {
      const result = filterPosts(mockPosts, { tag: 'NonExistent' })
      expect(result).toHaveLength(0)
    })

    it('handles search term with no matches', () => {
      const result = filterPosts(mockPosts, { search: 'nonexistent' })
      expect(result).toHaveLength(0)
    })

    it('ignores empty search terms', () => {
      const result = filterPosts(mockPosts, { search: '' })
      expect(result).toEqual(mockPosts)
    })

    it('ignores whitespace-only search terms', () => {
      const result = filterPosts(mockPosts, { search: '   ' })
      expect(result).toEqual(mockPosts)
    })

    it('searches across multiple words', () => {
      const result = filterPosts(mockPosts, { search: 'python tips' })
      expect(result).toHaveLength(1)
      expect(result[0]!.title).toBe('Python Tips and Tricks')
    })
  })
})
