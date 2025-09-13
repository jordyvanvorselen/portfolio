import { describe, it, expect } from 'vitest'
import {
  normalizeSearchTerm,
  filterPosts,
  type FilterOptions,
} from '@/lib/blog-filters'
import type { BlogPost } from '@/lib/api'

describe('blog-filters', () => {
  describe('normalizeSearchTerm', () => {
    it('returns empty string when term is undefined', () => {
      const result = normalizeSearchTerm(undefined)
      expect(result).toBe('')
    })

    it('returns empty string when term is null', () => {
      const result = normalizeSearchTerm(null as unknown as string | undefined)
      expect(result).toBe('')
    })

    it('returns empty string when term is empty string', () => {
      const result = normalizeSearchTerm('')
      expect(result).toBe('')
    })

    it('trims and lowercases the search term', () => {
      const result = normalizeSearchTerm('  React HOOKS  ')
      expect(result).toBe('react hooks')
    })

    it('handles single word terms', () => {
      const result = normalizeSearchTerm('JavaScript')
      expect(result).toBe('javascript')
    })
  })

  describe('filterPosts', () => {
    const mockPosts: BlogPost[] = [
      {
        slug: 'react-hooks-guide',
        title: 'React Hooks Guide',
        description: 'A comprehensive guide to React hooks',
        date: '2024-01-15',
        readTime: '5 min',
        image: 'https://example.com/image1.jpg',
        tags: ['React', 'JavaScript'],
      },
      {
        slug: 'python-tips',
        title: 'Python Tips',
        description: 'Useful Python programming tips',
        date: '2024-01-10',
        readTime: '3 min',
        image: 'https://example.com/image2.jpg',
        tags: ['Python', 'Programming'],
      },
      {
        slug: 'react-components',
        title: 'React Components',
        description: 'Building reusable React components',
        date: '2024-01-05',
        readTime: '7 min',
        image: 'https://example.com/image3.jpg',
        tags: ['React', 'Components'],
      },
    ]

    it('returns all posts when no filters are applied', () => {
      const options: FilterOptions = {}
      const result = filterPosts(mockPosts, options)
      expect(result).toEqual(mockPosts)
    })

    it('filters posts by tag', () => {
      const options: FilterOptions = { tag: 'Python' }
      const result = filterPosts(mockPosts, options)
      expect(result).toHaveLength(1)
      expect(result[0]?.slug).toBe('python-tips')
    })

    it('ignores tag filter when tag is empty string', () => {
      const options: FilterOptions = { tag: '' }
      const result = filterPosts(mockPosts, options)
      expect(result).toEqual(mockPosts)
    })

    it('ignores tag filter when tag is only whitespace', () => {
      const options: FilterOptions = { tag: '   ' }
      const result = filterPosts(mockPosts, options)
      expect(result).toEqual(mockPosts)
    })

    it('filters posts by search term in title', () => {
      const options: FilterOptions = { search: 'hooks' }
      const result = filterPosts(mockPosts, options)
      expect(result).toHaveLength(1)
      expect(result[0]?.slug).toBe('react-hooks-guide')
    })

    it('filters posts by search term in description', () => {
      const options: FilterOptions = { search: 'programming' }
      const result = filterPosts(mockPosts, options)
      expect(result).toHaveLength(1)
      expect(result[0]?.slug).toBe('python-tips')
    })

    it('performs case-insensitive search', () => {
      const options: FilterOptions = { search: 'REACT' }
      const result = filterPosts(mockPosts, options)
      expect(result).toHaveLength(2)
      expect(result.map(p => p.slug)).toContain('react-hooks-guide')
      expect(result.map(p => p.slug)).toContain('react-components')
    })

    it('ignores search filter when search is empty string', () => {
      const options: FilterOptions = { search: '' }
      const result = filterPosts(mockPosts, options)
      expect(result).toEqual(mockPosts)
    })

    it('ignores search filter when search is only whitespace', () => {
      const options: FilterOptions = { search: '   ' }
      const result = filterPosts(mockPosts, options)
      expect(result).toEqual(mockPosts)
    })

    it('combines tag and search filters', () => {
      const options: FilterOptions = { tag: 'React', search: 'hooks' }
      const result = filterPosts(mockPosts, options)
      expect(result).toHaveLength(1)
      expect(result[0]?.slug).toBe('react-hooks-guide')
    })

    it('returns empty array when no posts match filters', () => {
      const options: FilterOptions = { tag: 'NonExistent' }
      const result = filterPosts(mockPosts, options)
      expect(result).toHaveLength(0)
    })

    it('handles empty posts array', () => {
      const options: FilterOptions = { tag: 'React', search: 'hooks' }
      const result = filterPosts([], options)
      expect(result).toHaveLength(0)
    })

    it('handles posts with no tags', () => {
      const postsWithoutTags: BlogPost[] = [
        {
          slug: 'no-tags-post',
          title: 'Post Without Tags',
          description: 'A post with no tags',
          date: '2024-01-01',
          readTime: '2 min',
          image: 'https://example.com/image.jpg',
          tags: [],
        },
      ]
      const options: FilterOptions = { tag: 'React' }
      const result = filterPosts(postsWithoutTags, options)
      expect(result).toHaveLength(0)
    })
  })
})
