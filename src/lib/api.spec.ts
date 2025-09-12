import { 
  getAllPosts, 
  getPostAndMorePosts, 
  getPreviewPostBySlug 
} from '@/lib/api'

// Mock fetch globally
global.fetch = jest.fn()

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

// Mock console.log to avoid noise in tests
const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

describe('api', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    consoleSpy.mockRestore()
  })

  describe('fetchGraphQL default parameter', () => {
    it('tests function declaration branch coverage', async () => {
      // This test specifically targets the function declaration branch
      // The branch coverage issue is likely due to the default parameter
      const mockResponse = {
        data: {
          blogPostCollection: {
            items: []
          }
        }
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      })

      // Call a function that uses fetchGraphQL to ensure the function is executed
      const result = await getAllPosts(false)
      
      // Verify the function executed successfully 
      expect(result).toEqual([])
      expect(fetch).toHaveBeenCalled()
    })
  })

  describe('getAllPosts', () => {
    it('fetches and transforms all published posts', async () => {
      const mockResponse = {
        data: {
          blogPostCollection: {
            items: [
              {
                slug: 'test-post-1',
                title: 'Test Post 1',
                description: 'First test post',
                tags: ['test', 'blog'],
                publicationDate: '2024-01-15',
                featuredImage: {
                  url: 'https://example.com/image1.jpg',
                  description: 'Test image'
                },
                canonicalUrl: null,
                draft: false,
                content: {
                  json: {
                    nodeType: 'document',
                    content: [
                      {
                        nodeType: 'paragraph',
                        content: [
                          {
                            nodeType: 'text',
                            value: 'Test content with multiple words here',
                            marks: []
                          }
                        ]
                      }
                    ]
                  }
                }
              },
              {
                slug: 'test-post-2',
                title: 'Test Post 2',
                description: 'Second test post',
                tags: ['test'],
                publicationDate: '2024-01-10',
                featuredImage: {
                  url: 'https://example.com/image2.jpg',
                  description: 'Test image 2'
                },
                canonicalUrl: 'https://example.com/canonical',
                draft: false,
                content: {
                  json: {
                    nodeType: 'document',
                    content: []
                  }
                }
              }
            ]
          }
        }
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      })

      const result = await getAllPosts(false)

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({
        slug: 'test-post-1',
        title: 'Test Post 1',
        description: 'First test post',
        date: 'January 15, 2024',
        readTime: '1 min read',
        image: 'https://example.com/image1.jpg',
        tags: ['test', 'blog'],
        canonicalUrl: null,
      })
      expect(result[1]).toEqual({
        slug: 'test-post-2',
        title: 'Test Post 2',
        description: 'Second test post',
        date: 'January 10, 2024',
        readTime: '1 min read',
        image: 'https://example.com/image2.jpg',
        tags: ['test'],
        canonicalUrl: 'https://example.com/canonical',
      })

      // Verify the GraphQL query was called correctly
      expect(fetch).toHaveBeenCalledWith(
        'https://graphql.contentful.com/content/v1/spaces/test-space-id',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-access-token',
          },
        })
      )
    })

    it('includes draft posts when isDraftMode is true', async () => {
      const mockResponse = {
        data: {
          blogPostCollection: {
            items: [
              {
                slug: 'draft-post',
                title: 'Draft Post',
                description: 'Draft description',
                tags: [],
                publicationDate: '2024-01-01',
                featuredImage: null,
                canonicalUrl: null,
                draft: true,
                content: {
                  json: {
                    nodeType: 'document',
                    content: []
                  }
                }
              }
            ]
          }
        }
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      })

      const result = await getAllPosts(true)

      expect(result).toHaveLength(1)
      expect(result[0].image).toBe('') // Should handle null featuredImage
      expect(result[0].tags).toEqual([]) // Should handle empty tags

      // Verify preview token is used
      expect(fetch).toHaveBeenCalledWith(
        'https://graphql.contentful.com/content/v1/spaces/test-space-id',
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-preview-token',
          },
        })
      )
    })

    it('returns empty array when no posts found', async () => {
      const mockResponse = {
        data: {
          blogPostCollection: {
            items: []
          }
        }
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      })

      const result = await getAllPosts(false)

      expect(result).toEqual([])
    })

    it('returns empty array when response is malformed', async () => {
      const mockResponse = {
        data: {
          blogPostCollection: null
        }
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      })

      const result = await getAllPosts(false)

      expect(result).toEqual([])
    })

    it('handles posts with undefined tags and featuredImage', async () => {
      const mockResponse = {
        data: {
          blogPostCollection: {
            items: [
              {
                slug: 'no-optional-fields',
                title: 'Post Without Optional Fields',
                description: 'Description',
                tags: undefined,
                publicationDate: '2024-01-01',
                featuredImage: undefined,
                canonicalUrl: null,
                draft: false,
                content: {
                  json: {
                    nodeType: 'document',
                    content: []
                  }
                }
              }
            ]
          }
        }
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      })

      const result = await getAllPosts(false)

      expect(result).toHaveLength(1)
      expect(result[0].image).toBe('') // Should handle undefined featuredImage
      expect(result[0].tags).toEqual([]) // Should handle undefined tags
    })
  })

  describe('getPreviewPostBySlug', () => {
    it('fetches and transforms a single post by slug', async () => {
      const mockResponse = {
        data: {
          blogPostCollection: {
            items: [
              {
                slug: 'preview-post',
                title: 'Preview Post',
                description: 'Preview description',
                tags: ['preview'],
                publicationDate: '2024-01-20',
                featuredImage: {
                  url: 'https://example.com/preview.jpg',
                  description: 'Preview image'
                },
                canonicalUrl: null,
                draft: true,
                content: {
                  json: {
                    nodeType: 'document',
                    content: [
                      {
                        nodeType: 'paragraph',
                        content: [
                          {
                            nodeType: 'text',
                            value: 'Preview content',
                            marks: []
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      })

      const result = await getPreviewPostBySlug('preview-post')

      expect(result).toEqual({
        slug: 'preview-post',
        title: 'Preview Post',
        description: 'Preview description',
        date: 'January 20, 2024',
        readTime: '1 min read',
        image: 'https://example.com/preview.jpg',
        tags: ['preview'],
        canonicalUrl: null,
      })

      // Verify preview mode is used
      expect(fetch).toHaveBeenCalledWith(
        'https://graphql.contentful.com/content/v1/spaces/test-space-id',
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-preview-token',
          },
        })
      )
    })

    it('returns null when post not found', async () => {
      const mockResponse = {
        data: {
          blogPostCollection: {
            items: []
          }
        }
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      })

      const result = await getPreviewPostBySlug('non-existent')

      expect(result).toBeNull()
    })

  })

  describe('getPostAndMorePosts', () => {
    it('fetches post and related posts', async () => {
      const postResponse = {
        data: {
          blogPostCollection: {
            items: [
              {
                slug: 'main-post',
                title: 'Main Post',
                description: 'Main description',
                tags: ['main'],
                publicationDate: '2024-01-15',
                featuredImage: null,
                canonicalUrl: null,
                draft: false,
                content: {
                  json: {
                    nodeType: 'document',
                    content: []
                  },
                  links: {
                    assets: { block: [] },
                    entries: { block: [] }
                  }
                }
              }
            ]
          }
        }
      }

      const morePostsResponse = {
        data: {
          blogPostCollection: {
            items: [
              {
                slug: 'related-post-1',
                title: 'Related Post 1',
                description: 'Related description 1',
                tags: ['related'],
                publicationDate: '2024-01-10',
                featuredImage: null,
                canonicalUrl: null,
                draft: false,
                content: {
                  json: {
                    nodeType: 'document',
                    content: []
                  }
                }
              },
              {
                slug: 'related-post-2',
                title: 'Related Post 2',
                description: 'Related description 2',
                tags: ['related'],
                publicationDate: '2024-01-05',
                featuredImage: null,
                canonicalUrl: null,
                draft: false,
                content: {
                  json: {
                    nodeType: 'document',
                    content: []
                  }
                }
              }
            ]
          }
        }
      }

      ;(fetch as jest.Mock)
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(postResponse),
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(morePostsResponse),
        })

      const result = await getPostAndMorePosts('main-post', false)

      expect(result.post).toBeDefined()
      expect(result.post.slug).toBe('main-post')
      expect(result.morePosts).toHaveLength(2)
      expect(result.morePosts[0].slug).toBe('related-post-1')
      expect(result.morePosts[1].slug).toBe('related-post-2')

      // Verify two fetch calls were made
      expect(fetch).toHaveBeenCalledTimes(2)
    })

    it('handles missing main post', async () => {
      const emptyResponse = {
        data: {
          blogPostCollection: {
            items: []
          }
        }
      }

      ;(fetch as jest.Mock)
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(emptyResponse),
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(emptyResponse),
        })

      const result = await getPostAndMorePosts('non-existent', false)

      expect(result.post).toBeNull()
      expect(result.morePosts).toEqual([])
    })

    it('handles preview mode correctly', async () => {
      const postResponse = {
        data: {
          blogPostCollection: {
            items: [
              {
                slug: 'preview-post',
                title: 'Preview Post',
                description: 'Preview description',
                tags: ['preview'],
                publicationDate: '2024-01-15',
                featuredImage: null,
                canonicalUrl: null,
                draft: true,
                content: {
                  json: {
                    nodeType: 'document',
                    content: []
                  }
                }
              }
            ]
          }
        }
      }

      const morePostsResponse = {
        data: {
          blogPostCollection: {
            items: [
              {
                slug: 'draft-related',
                title: 'Draft Related',
                description: 'Draft related description',
                tags: ['draft'],
                publicationDate: '2024-01-10',
                featuredImage: null,
                canonicalUrl: null,
                draft: true,
                content: {
                  json: {
                    nodeType: 'document',
                    content: []
                  }
                }
              }
            ]
          }
        }
      }

      ;(fetch as jest.Mock)
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(postResponse),
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(morePostsResponse),
        })

      const result = await getPostAndMorePosts('preview-post', true)

      expect(result.post).toBeDefined()
      expect(result.post.slug).toBe('preview-post')
      expect(result.morePosts).toHaveLength(1)
      expect(result.morePosts[0].slug).toBe('draft-related')

      // Verify preview token is used
      expect(fetch).toHaveBeenCalledWith(
        'https://graphql.contentful.com/content/v1/spaces/test-space-id',
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-preview-token',
          },
        })
      )
    })
  })
})