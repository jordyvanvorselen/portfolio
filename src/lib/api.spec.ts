import { describe, it, expect } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '@/test/msw/register.server'
import {
  getAllPosts,
  getPostAndMorePosts,
  getPreviewPostBySlug,
  getDetailedPostBySlug,
} from '@/lib/api'
import { createMockBlogPostsResponse } from '@/test/msw/mock-data/blog-posts.mock'

describe('Contentful API', () => {
  describe('getAllPosts', () => {
    it('returns transformed blog posts from published content ordered by date', async () => {
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

    it('handles draft mode by using preview API', async () => {
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

    it('fetches a specific post by slug using preview API', async () => {
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

    it('uses preview API when preview mode is enabled', async () => {
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
    it('returns detailed blog post with content when slug exists', async () => {
      const result = await getDetailedPostBySlug('react-hooks-guide', false)

      expect(result).toEqual({
        slug: 'react-hooks-guide',
        title: 'React Hooks Guide',
        description: 'Learn about React hooks and how to use them effectively',
        date: 'January 1, 2024',
        readTime: '1 min read',
        image:
          'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
        tags: ['React', 'JavaScript', 'Frontend'],
        canonicalUrl: 'https://example.com/react-hooks-guide',
        content: {
          json: {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value:
                      'Learn about React hooks and how to use them effectively in your applications.',
                    marks: [],
                    data: {},
                  },
                ],
              },
              {
                nodeType: 'embedded-entry-block',
                data: {
                  target: {
                    sys: {
                      id: 'codeblock-1',
                      type: 'Link',
                      linkType: 'Entry',
                    },
                  },
                },
                content: [],
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value:
                      'This code example shows how to use the useState hook.',
                    marks: [],
                    data: {},
                  },
                ],
              },
            ],
          },
          links: {
            assets: {
              block: [
                {
                  sys: { id: 'asset-1' },
                  url: '//images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
                  description: 'Sample asset 1',
                },
              ],
            },
            entries: {
              block: [
                {
                  sys: { id: 'codeblock-1' },
                  title: 'JavaScript Example',
                  programmingLanguage: 'JavaScript',
                  code: 'console.log("Hello, World!");',
                },
                {
                  sys: { id: 'codeblock-2' },
                  title: 'TypeScript Interface',
                  programmingLanguage: 'TypeScript',
                  code: 'interface User {\n  name: string;\n  id: number;\n}',
                },
                {
                  sys: { id: 'mermaid-1' },
                  title: 'TypeScript Architecture Diagram',
                  programmingLanguage: 'mermaid',
                  code: 'graph TD\n    A[Component] --> B[Props]\n    A --> C[State]\n    B --> D[Render]\n    C --> D',
                },
              ],
            },
          },
        },
      })
    })

    it('returns null when slug does not exist', async () => {
      const result = await getDetailedPostBySlug('non-existent-slug', false)

      expect(result).toBeNull()
    })

    it('uses preview API when preview mode is enabled', async () => {
      const result = await getDetailedPostBySlug('react-hooks-guide', true)

      expect(result).toBeDefined()
      expect(result?.content).toBeDefined()
    })

    it('includes canonicalUrl when present in entry', async () => {
      const result = await getDetailedPostBySlug('react-hooks-guide', false)

      expect(result).toBeDefined()
      expect(result?.canonicalUrl).toBe('https://example.com/react-hooks-guide')
    })

    it('handles missing includes gracefully', async () => {
      // Mock a response without includes
      const originalResponse = createMockBlogPostsResponse()
      const responseWithoutIncludes = {
        ...originalResponse,
        includes: undefined,
      }

      // Override the mock for this test
      const mockHandler = http.get(
        'https://cdn.contentful.com/spaces/*/entries',
        () => HttpResponse.json(responseWithoutIncludes)
      )

      server.use(mockHandler)

      const result = await getDetailedPostBySlug('react-hooks-guide', false)

      expect(result).toBeDefined()
      expect(result?.content.links.assets.block).toEqual([])
      expect(result?.content.links.entries.block).toEqual([])
    })

    it('handles missing Asset and Entry fields in includes', async () => {
      // Mock a response with partial includes
      const originalResponse = createMockBlogPostsResponse()
      const responseWithPartialIncludes = {
        ...originalResponse,
        includes: {
          Asset: [{ sys: { id: 'asset-1' }, fields: {} }],
          Entry: [{ sys: { id: 'entry-1' }, fields: {} }],
        },
      }

      // Override the mock for this test
      const mockHandler = http.get(
        'https://cdn.contentful.com/spaces/*/entries',
        () => HttpResponse.json(responseWithPartialIncludes)
      )

      server.use(mockHandler)

      const result = await getDetailedPostBySlug('react-hooks-guide', false)

      expect(result).toBeDefined()
      expect(result?.content.links.assets.block[0]).toEqual({
        sys: { id: 'asset-1' },
        url: '',
        description: '',
      })
      expect(result?.content.links.entries.block[0]).toEqual({
        sys: { id: 'entry-1' },
        title: '',
        programmingLanguage: '',
        code: '',
      })
    })
  })
})
