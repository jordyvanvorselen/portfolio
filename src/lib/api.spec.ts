import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import {
  getAllPosts,
  getPostAndMorePosts,
  getPreviewPostBySlug,
  getDetailedPostBySlug,
} from '@/lib/api'

const { cache, find } = vi.hoisted(() => ({
  cache: new Map<string, unknown>(),
  find: vi.fn(),
}))

vi.mock('@payload-config', () => ({ default: {} }))

vi.mock('payload', () => ({
  getPayload: async () => ({ find }),
}))

vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
  unstable_cache:
    (
      fetchPosts: (...args: unknown[]) => Promise<unknown>,
      keyParts: string[]
    ) =>
    async (...args: unknown[]) => {
      const key = JSON.stringify([keyParts, args])
      if (!cache.has(key)) cache.set(key, await fetchPosts(...args))
      return cache.get(key)
    },
}))

describe('Payload API (Mock Backend)', () => {
  beforeAll(() => {
    // Enable mock backend for all tests
    process.env['NEXT_PUBLIC_MOCK_BACKEND'] = 'true'
  })

  afterAll(() => {
    // Clean up
    delete process.env['NEXT_PUBLIC_MOCK_BACKEND']
  })

  describe('getAllPosts', () => {
    it('returns transformed blog posts ordered by date', async () => {
      const posts = await getAllPosts(false)

      expect(posts).toHaveLength(4)
      // Posts should be ordered by publication date descending
      expect(posts[0]).toEqual({
        slug: 'typescript-advanced',
        title: 'Advanced TypeScript',
        description: 'Advanced TypeScript techniques and patterns',
        date: 'January 4, 2024',
        readTime: '1 min read',
        image:
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
        tags: ['TypeScript', 'JavaScript', 'Frontend'],
      })

      expect(posts[1]).toEqual({
        slug: 'python-tips',
        title: 'Python Tips',
        description: 'Useful Python tips for better development',
        date: 'January 3, 2024',
        readTime: '1 min read',
        image:
          'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop',
        tags: ['Python', 'Backend'],
      })
    })

    it('handles draft mode', async () => {
      const posts = await getAllPosts(true)

      expect(posts).toHaveLength(4)
      expect(posts[0]?.slug).toBeDefined()
    })
  })

  describe('getPreviewPostBySlug', () => {
    it('returns null when slug is null', async () => {
      const post = await getPreviewPostBySlug(null)

      expect(post).toBeNull()
    })

    it('returns null when slug is empty string', async () => {
      const post = await getPreviewPostBySlug('')

      expect(post).toBeNull()
    })

    it('fetches a specific post by slug', async () => {
      const post = await getPreviewPostBySlug('react-hooks-guide')

      expect(post).toEqual({
        slug: 'react-hooks-guide',
        title: 'React Hooks Guide',
        description: 'Learn about React hooks and how to use them effectively',
        date: 'January 1, 2024',
        readTime: '1 min read',
        image:
          'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
        tags: ['React', 'JavaScript', 'Frontend'],
        canonicalUrl: 'https://example.com/react-hooks-guide',
      })
    })

    it('returns null when post with slug is not found', async () => {
      const post = await getPreviewPostBySlug('non-existent-slug')

      expect(post).toBeNull()
    })
  })

  describe('getPostAndMorePosts', () => {
    it('fetches main post and related posts simultaneously', async () => {
      const result = await getPostAndMorePosts('react-hooks-guide', false)

      expect(result.post).toEqual({
        slug: 'react-hooks-guide',
        title: 'React Hooks Guide',
        description: 'Learn about React hooks and how to use them effectively',
        date: 'January 1, 2024',
        readTime: '1 min read',
        image:
          'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
        tags: ['React', 'JavaScript', 'Frontend'],
        canonicalUrl: 'https://example.com/react-hooks-guide',
      })

      expect(result.morePosts).toHaveLength(3)
      expect(result.morePosts).not.toContainEqual(
        expect.objectContaining({ slug: 'react-hooks-guide' })
      )
    })

    it('works with preview mode enabled', async () => {
      const result = await getPostAndMorePosts('react-hooks-guide', true)

      expect(result.post).toBeDefined()
      expect(result.morePosts).toBeDefined()
    })

    it('returns null post when main post is not found', async () => {
      const result = await getPostAndMorePosts('non-existent', false)

      expect(result.post).toBeNull()
      expect(result.morePosts).toHaveLength(3) // Still returns other posts
    })
  })

  describe('getDetailedPostBySlug', () => {
    it('returns detailed blog post with Lexical content when slug exists', async () => {
      const result = await getDetailedPostBySlug('react-hooks-guide', false)

      expect(result).toBeDefined()
      expect(result?.slug).toBe('react-hooks-guide')
      expect(result?.title).toBe('React Hooks Guide')
      expect(result?.content).toBeDefined()
    })

    it('returns null when slug does not exist', async () => {
      const result = await getDetailedPostBySlug('non-existent-slug', false)

      expect(result).toBeNull()
    })

    it('works with preview mode enabled', async () => {
      const result = await getDetailedPostBySlug('react-hooks-guide', true)

      expect(result).toBeDefined()
      expect(result?.content).toBeDefined()
    })

    it('includes canonicalUrl when present', async () => {
      const result = await getDetailedPostBySlug('react-hooks-guide', false)

      expect(result).toBeDefined()
      expect(result?.canonicalUrl).toBe('https://example.com/react-hooks-guide')
    })
  })
})

describe('Payload API (database)', () => {
  const postDoc = {
    slug: 'my-post',
    title: 'My post',
    description: 'About my post',
    publicationDate: '2026-09-24T00:00:00.000Z',
    content: { root: { children: [] } },
    featuredImage: null,
    tags: [],
  }

  beforeEach(() => {
    cache.clear()
    find.mockReset()
    find.mockResolvedValue({ docs: [postDoc] })
  })

  it('serves the published post list from the cache instead of querying the database on every visit', async () => {
    await getAllPosts(false)
    await getAllPosts(false)

    expect(find).toHaveBeenCalledTimes(1)
  })

  it('always reads the draft post list from the database so previews show the latest edits', async () => {
    await getAllPosts(true)
    await getAllPosts(true)

    expect(find).toHaveBeenCalledTimes(2)
  })

  it('serves a published post from the cache instead of querying the database on every visit', async () => {
    await getDetailedPostBySlug('my-post', false)
    await getDetailedPostBySlug('my-post', false)

    expect(find).toHaveBeenCalledTimes(1)
  })

  it('caches each published post separately', async () => {
    await getDetailedPostBySlug('my-post', false)
    await getDetailedPostBySlug('other-post', false)

    expect(find).toHaveBeenCalledTimes(2)
  })

  it('always reads a draft post from the database so previews show the latest edits', async () => {
    await getDetailedPostBySlug('my-post', true)
    await getDetailedPostBySlug('my-post', true)

    expect(find).toHaveBeenCalledTimes(2)
  })

  it('serves a published post and its related posts from the cache', async () => {
    await getPostAndMorePosts('my-post', false)
    await getPostAndMorePosts('my-post', false)

    expect(find).toHaveBeenCalledTimes(2)
  })

  it('always reads a draft post and its related posts from the database', async () => {
    await getPostAndMorePosts('my-post', true)
    await getPostAndMorePosts('my-post', true)

    expect(find).toHaveBeenCalledTimes(4)
  })
})
