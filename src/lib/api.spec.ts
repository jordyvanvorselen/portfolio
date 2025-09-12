import {
  getAllPosts,
  getPostAndMorePosts,
  getPreviewPostBySlug,
} from '@/lib/api'
import { vi } from 'vitest'

// Mock contentful SDK
vi.mock('contentful', () => ({
  createClient: vi.fn(() => ({
    getEntries: vi.fn(),
  })),
}))

import { createClient } from 'contentful'

// Mock environment variables
const originalEnv = process.env
beforeAll(() => {
  process.env = {
    ...originalEnv,
    CONTENTFUL_SPACE_ID: 'test-space-id',
    CONTENTFUL_ACCESS_TOKEN: 'test-access-token',
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: 'test-preview-token',
  }
})

afterAll(() => {
  process.env = originalEnv
})

describe('Contentful API', () => {
  let mockClient: { getEntries: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    vi.clearAllMocks()
    mockClient = {
      getEntries: vi.fn(),
    }
    ;(createClient as ReturnType<typeof vi.fn>).mockReturnValue(mockClient)
  })

  describe('getAllPosts', () => {
    it('returns transformed blog posts from published content', async () => {
      const mockEntries = {
        items: [
          {
            fields: {
              slug: 'my-first-post',
              title: 'My First Post',
              description: 'An introduction to my blog',
              tags: ['introduction', 'blog'],
              publicationDate: '2024-01-15T10:00:00.000Z',
              featuredImage: {
                fields: {
                  file: {
                    url: 'https://images.ctfassets.net/space/image1.jpg',
                  },
                },
              },
              canonicalUrl: 'https://example.com/original-post',
              content: {
                nodeType: 'document',
                content: [
                  {
                    nodeType: 'paragraph',
                    content: [
                      {
                        nodeType: 'text',
                        value:
                          'This is my first blog post with some content to read.',
                        marks: [],
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      }

      mockClient.getEntries.mockResolvedValueOnce(mockEntries)

      const posts = await getAllPosts(false)

      expect(posts).toHaveLength(1)
      expect(posts[0]).toEqual({
        slug: 'my-first-post',
        title: 'My First Post',
        description: 'An introduction to my blog',
        date: 'January 15, 2024',
        readTime: '1 min read',
        image: 'https://images.ctfassets.net/space/image1.jpg',
        tags: ['introduction', 'blog'],
        canonicalUrl: 'https://example.com/original-post',
      })
    })

    it('uses production content delivery API for published posts', async () => {
      mockClient.getEntries.mockResolvedValueOnce({ items: [] })

      await getAllPosts(false)

      expect(createClient).toHaveBeenCalledWith({
        space: 'test-space-id',
        accessToken: 'test-access-token',
        host: 'cdn.contentful.com',
      })
      expect(mockClient.getEntries).toHaveBeenCalledWith({
        content_type: 'blogPost',
        order: ['-fields.publicationDate'],
      })
    })

    it('uses preview API for draft mode', async () => {
      mockClient.getEntries.mockResolvedValueOnce({ items: [] })

      await getAllPosts(true)

      expect(createClient).toHaveBeenCalledWith({
        space: 'test-space-id',
        accessToken: 'test-preview-token',
        host: 'preview.contentful.com',
      })
    })

    it('handles posts without featured images gracefully', async () => {
      const mockEntries = {
        items: [
          {
            fields: {
              slug: 'no-image-post',
              title: 'Post Without Image',
              description: 'A post without an image',
              tags: ['text-only'],
              publicationDate: '2024-01-10T09:00:00.000Z',
              featuredImage: null,
              canonicalUrl: undefined,
              content: {
                nodeType: 'document',
                content: [],
              },
            },
          },
        ],
      }

      mockClient.getEntries.mockResolvedValueOnce(mockEntries)

      const posts = await getAllPosts(false)

      expect(posts[0]?.image).toBe('')
      expect(posts[0]?.canonicalUrl).toBeUndefined()
    })

    it('handles posts with undefined tags and featured images', async () => {
      const mockEntries = {
        items: [
          {
            fields: {
              slug: 'minimal-post',
              title: 'Minimal Post',
              description: 'A minimal post',
              tags: undefined,
              publicationDate: '2024-01-01T00:00:00.000Z',
              featuredImage: undefined,
              canonicalUrl: null,
              content: {
                nodeType: 'document',
                content: [],
              },
            },
          },
        ],
      }

      mockClient.getEntries.mockResolvedValueOnce(mockEntries)

      const posts = await getAllPosts(false)

      expect(posts[0]?.tags).toEqual([])
      expect(posts[0]?.image).toBe('')
    })

    it('returns empty array when no posts are found', async () => {
      mockClient.getEntries.mockResolvedValueOnce({ items: [] })

      const posts = await getAllPosts(false)

      expect(posts).toEqual([])
    })

    it('orders posts by publication date descending', async () => {
      const mockEntries = {
        items: [
          {
            fields: {
              slug: 'newer-post',
              title: 'Newer Post',
              description: 'More recent post',
              tags: [],
              publicationDate: '2024-02-01T00:00:00.000Z',
              content: { nodeType: 'document', content: [] },
            },
          },
          {
            fields: {
              slug: 'older-post',
              title: 'Older Post',
              description: 'Earlier post',
              tags: [],
              publicationDate: '2024-01-01T00:00:00.000Z',
              content: { nodeType: 'document', content: [] },
            },
          },
        ],
      }

      mockClient.getEntries.mockResolvedValueOnce(mockEntries)

      const posts = await getAllPosts(false)

      expect(posts[0]?.slug).toBe('newer-post')
      expect(posts[1]?.slug).toBe('older-post')
      expect(posts[0]?.date).toBe('February 1, 2024')
      expect(posts[1]?.date).toBe('January 1, 2024')
    })
  })

  describe('getPreviewPostBySlug', () => {
    it('returns null when slug is null', async () => {
      const post = await getPreviewPostBySlug(null)

      expect(post).toBeNull()
      expect(mockClient.getEntries).not.toHaveBeenCalled()
    })

    it('returns null when slug is empty string', async () => {
      const post = await getPreviewPostBySlug('')

      expect(post).toBeNull()
    })

    it('fetches a specific post by slug using preview API', async () => {
      const mockEntries = {
        items: [
          {
            fields: {
              slug: 'preview-post',
              title: 'Preview Post',
              description: 'A post in preview mode',
              tags: ['preview', 'draft'],
              publicationDate: '2024-01-20T14:30:00.000Z',
              featuredImage: {
                fields: {
                  file: {
                    url: 'https://images.ctfassets.net/space/preview.jpg',
                  },
                },
              },
              canonicalUrl: null,
              content: {
                nodeType: 'document',
                content: [
                  {
                    nodeType: 'paragraph',
                    content: [
                      {
                        nodeType: 'text',
                        value:
                          'This is preview content that might not be published yet.',
                        marks: [],
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      }

      mockClient.getEntries.mockResolvedValueOnce(mockEntries)

      const post = await getPreviewPostBySlug('preview-post')

      expect(post).toEqual({
        slug: 'preview-post',
        title: 'Preview Post',
        description: 'A post in preview mode',
        date: 'January 20, 2024',
        readTime: '1 min read',
        image: 'https://images.ctfassets.net/space/preview.jpg',
        tags: ['preview', 'draft'],
      })

      expect(createClient).toHaveBeenCalledWith({
        space: 'test-space-id',
        accessToken: 'test-preview-token',
        host: 'preview.contentful.com',
      })
      expect(mockClient.getEntries).toHaveBeenCalledWith({
        content_type: 'blogPost',
        'fields.slug': 'preview-post',
        limit: 1,
      })
    })

    it('returns null when post with slug is not found', async () => {
      mockClient.getEntries.mockResolvedValueOnce({ items: [] })

      const post = await getPreviewPostBySlug('non-existent-slug')

      expect(post).toBeNull()
    })
  })

  describe('getPostAndMorePosts', () => {
    it('fetches main post and related posts simultaneously', async () => {
      const mainPostResponse = {
        items: [
          {
            fields: {
              slug: 'main-article',
              title: 'Main Article',
              description: 'The primary article content',
              tags: ['featured'],
              publicationDate: '2024-01-15T12:00:00.000Z',
              content: {
                nodeType: 'document',
                content: [
                  {
                    nodeType: 'paragraph',
                    content: [
                      {
                        nodeType: 'text',
                        value:
                          'This is the main article with substantial content for reading.',
                        marks: [],
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      }

      const morePostsResponse = {
        items: [
          {
            fields: {
              slug: 'related-article-1',
              title: 'Related Article 1',
              description: 'First related article',
              tags: ['related'],
              publicationDate: '2024-01-10T10:00:00.000Z',
              content: { nodeType: 'document', content: [] },
            },
          },
          {
            fields: {
              slug: 'related-article-2',
              title: 'Related Article 2',
              description: 'Second related article',
              tags: ['related'],
              publicationDate: '2024-01-05T08:00:00.000Z',
              content: { nodeType: 'document', content: [] },
            },
          },
        ],
      }

      mockClient.getEntries
        .mockResolvedValueOnce(mainPostResponse)
        .mockResolvedValueOnce(morePostsResponse)

      const result = await getPostAndMorePosts('main-article', false)

      expect(result.post).toEqual({
        slug: 'main-article',
        title: 'Main Article',
        description: 'The primary article content',
        date: 'January 15, 2024',
        readTime: '1 min read',
        image: '',
        tags: ['featured'],
        canonicalUrl: undefined,
      })

      expect(result.morePosts).toHaveLength(2)
      expect(result.morePosts[0]?.slug).toBe('related-article-1')
      expect(result.morePosts[1]?.slug).toBe('related-article-2')

      expect(mockClient.getEntries).toHaveBeenNthCalledWith(1, {
        content_type: 'blogPost',
        'fields.slug': 'main-article',
        limit: 1,
      })
      expect(mockClient.getEntries).toHaveBeenNthCalledWith(2, {
        content_type: 'blogPost',
        'fields.slug[ne]': 'main-article',
        order: ['-fields.publicationDate'],
        limit: 2,
      })
    })

    it('uses preview API when preview mode is enabled', async () => {
      mockClient.getEntries
        .mockResolvedValueOnce({ items: [] })
        .mockResolvedValueOnce({ items: [] })

      await getPostAndMorePosts('any-slug', true)

      expect(createClient).toHaveBeenCalledWith({
        space: 'test-space-id',
        accessToken: 'test-preview-token',
        host: 'preview.contentful.com',
      })
    })

    it('uses production API when preview mode is disabled', async () => {
      mockClient.getEntries
        .mockResolvedValueOnce({ items: [] })
        .mockResolvedValueOnce({ items: [] })

      await getPostAndMorePosts('any-slug', false)

      expect(createClient).toHaveBeenCalledWith({
        space: 'test-space-id',
        accessToken: 'test-access-token',
        host: 'cdn.contentful.com',
      })
    })

    it('returns null post when main post is not found', async () => {
      mockClient.getEntries
        .mockResolvedValueOnce({ items: [] })
        .mockResolvedValueOnce({ items: [] })

      const result = await getPostAndMorePosts('non-existent', false)

      expect(result.post).toBeNull()
      expect(result.morePosts).toEqual([])
    })

    it('excludes the main post from more posts results', async () => {
      const mainPostResponse = {
        items: [
          {
            fields: {
              slug: 'exclude-me',
              title: 'Main Post',
              description: 'Main post description',
              tags: [],
              publicationDate: '2024-01-15T12:00:00.000Z',
              content: { nodeType: 'document', content: [] },
            },
          },
        ],
      }

      const morePostsResponse = {
        items: [
          {
            fields: {
              slug: 'other-post',
              title: 'Other Post',
              description: 'Different post',
              tags: [],
              publicationDate: '2024-01-10T12:00:00.000Z',
              content: { nodeType: 'document', content: [] },
            },
          },
        ],
      }

      mockClient.getEntries
        .mockResolvedValueOnce(mainPostResponse)
        .mockResolvedValueOnce(morePostsResponse)

      const result = await getPostAndMorePosts('exclude-me', false)

      expect(result.post?.slug).toBe('exclude-me')
      expect(result.morePosts).toHaveLength(1)
      expect(result.morePosts[0]?.slug).toBe('other-post')

      // Verify the exclusion filter was applied
      expect(mockClient.getEntries).toHaveBeenCalledWith(
        expect.objectContaining({
          'fields.slug[ne]': 'exclude-me',
        })
      )
    })
  })
})
