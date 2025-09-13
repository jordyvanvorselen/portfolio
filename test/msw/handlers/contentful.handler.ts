import { http, HttpResponse } from 'msw'
import {
  createMockBlogPostsResponse,
  type ContentfulBlogPostsResponse,
} from '@/test/msw/mock-data/blog-posts.mock'

/**
 * MSW handlers for Contentful API endpoints
 * Note: Filtering happens client-side, so we return all posts and let the app filter them
 */
export const contentfulHandlers = [
  // Handle Contentful CDA (Content Delivery API) requests
  http.get('https://cdn.contentful.com/spaces/*/entries', ({ request }) => {
    const url = new URL(request.url)
    const contentType = url.searchParams.get('content_type')

    // Only handle blog post requests
    if (contentType !== 'blogPost') {
      return new HttpResponse(null, { status: 404 })
    }
    // Get all mock blog posts
    let mockResponse: ContentfulBlogPostsResponse =
      createMockBlogPostsResponse()

    // Handle include parameter (for detailed content fetching)
    const include = url.searchParams.get('include')
    if (!include) {
      // Remove includes if not requested
      const { includes, ...responseWithoutIncludes } = mockResponse
      mockResponse = responseWithoutIncludes as ContentfulBlogPostsResponse
    }

    // Handle filtering by slug (for individual post requests)
    const slugFilter = url.searchParams.get('fields.slug')
    if (slugFilter) {
      const filteredItems = mockResponse.items.filter(
        post => post.fields.slug === slugFilter
      )
      mockResponse = {
        ...mockResponse,
        total: filteredItems.length,
        items: filteredItems,
      }
    }

    // Handle filtering by slug exclusion (for "more posts" requests)
    const slugExclude = url.searchParams.get('fields.slug[ne]')
    if (slugExclude) {
      const filteredItems = mockResponse.items.filter(
        post => post.fields.slug !== slugExclude
      )
      mockResponse = {
        ...mockResponse,
        total: filteredItems.length,
        items: filteredItems,
      }
    }

    // Handle limit parameter
    const limit = url.searchParams.get('limit')
    if (limit) {
      const limitNumber = parseInt(limit, 10)
      mockResponse = {
        ...mockResponse,
        items: mockResponse.items.slice(0, limitNumber),
      }
    }

    // Handle order parameter (sort by publication date descending by default)
    const order = url.searchParams.get('order')
    if (order === '-fields.publicationDate' || !order) {
      mockResponse = {
        ...mockResponse,
        items: [...mockResponse.items].sort((a, b) =>
          b.fields.publicationDate.localeCompare(a.fields.publicationDate)
        ),
      }
    }

    return HttpResponse.json(mockResponse)
  }),

  // Handle Contentful Preview API requests (same logic but different endpoint)
  http.get('https://preview.contentful.com/spaces/*/entries', ({ request }) => {
    const url = new URL(request.url)
    const contentType = url.searchParams.get('content_type')

    // Only handle blog post requests
    if (contentType !== 'blogPost') {
      return new HttpResponse(null, { status: 404 })
    }

    // For preview API, we can return the same mock data
    // In a real scenario, this might include draft posts
    let mockResponse: ContentfulBlogPostsResponse =
      createMockBlogPostsResponse()

    // Handle filtering by slug (for preview posts)
    const slugFilter = url.searchParams.get('fields.slug')
    if (slugFilter) {
      const filteredItems = mockResponse.items.filter(
        post => post.fields.slug === slugFilter
      )
      mockResponse = {
        ...mockResponse,
        total: filteredItems.length,
        items: filteredItems,
      }
    }

    // Handle limit parameter
    const limit = url.searchParams.get('limit')
    if (limit) {
      const limitNumber = parseInt(limit, 10)
      mockResponse = {
        ...mockResponse,
        items: mockResponse.items.slice(0, limitNumber),
      }
    }

    return HttpResponse.json(mockResponse)
  }),
]
