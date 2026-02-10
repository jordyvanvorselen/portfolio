import { getPayload } from 'payload'
import config from '@payload-config'
import {
  formatDate,
  calculateReadTime,
  ensureAbsoluteUrl,
} from '@/lib/blog-helpers'
import type { SerializedEditorState } from '@/types/lexical'
import type { Media, Post } from '@/payload-types'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  image: string
  tags: string[]
  canonicalUrl?: string
}

export interface DetailedBlogPost extends BlogPost {
  content: SerializedEditorState
}

// Mock data imports for testing
import {
  mockBlogPosts,
  mockContent,
  mockContentWithMermaid,
  mockContentWithImages,
} from '@/test/msw/mock-data/blog-posts.mock'

const isMockBackend = (): boolean => {
  return process.env['NEXT_PUBLIC_MOCK_BACKEND'] === 'true'
}

function transformPost(post: Post): BlogPost {
  const featuredImage = post.featuredImage as Media | null | undefined
  const tags = (post.tags as string[]) || []

  const result: BlogPost = {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: formatDate(post.publicationDate),
    readTime: calculateReadTime(post.content as SerializedEditorState),
    image: ensureAbsoluteUrl(featuredImage?.url || ''),
    tags,
  }

  if (post.canonicalUrl) {
    result.canonicalUrl = post.canonicalUrl
  }

  return result
}

function transformDetailedPost(post: Post): DetailedBlogPost {
  const basicPost = transformPost(post)

  return {
    ...basicPost,
    content: post.content as SerializedEditorState,
  }
}

export async function getPreviewPostBySlug(
  slug: string | null
): Promise<BlogPost | null> {
  if (!slug) return null

  if (isMockBackend()) {
    const mockPost = mockBlogPosts.find(p => p.slug === slug)
    return mockPost || null
  }

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    draft: true,
  })

  if (!result.docs[0]) return null

  return transformPost(result.docs[0] as Post)
}

export async function getAllPosts(isDraftMode: boolean): Promise<BlogPost[]> {
  if (isMockBackend()) {
    return mockBlogPosts
  }

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    sort: '-publicationDate',
    draft: isDraftMode,
  })

  return result.docs.map(doc => transformPost(doc as Post))
}

export async function getPostAndMorePosts(
  slug: string,
  preview: boolean
): Promise<{ post: BlogPost | null; morePosts: BlogPost[] }> {
  if (isMockBackend()) {
    const mockPost = mockBlogPosts.find(p => p.slug === slug)
    const morePosts = mockBlogPosts.filter(p => p.slug !== slug).slice(0, 3)
    return {
      post: mockPost || null,
      morePosts,
    }
  }

  const payload = await getPayload({ config })

  const [postResult, morePostsResult] = await Promise.all([
    payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      draft: preview,
    }),
    payload.find({
      collection: 'posts',
      where: {
        slug: {
          not_equals: slug,
        },
      },
      sort: '-publicationDate',
      limit: 3,
      draft: preview,
    }),
  ])

  return {
    post: postResult.docs[0] ? transformPost(postResult.docs[0] as Post) : null,
    morePosts: morePostsResult.docs.map(doc => transformPost(doc as Post)),
  }
}

export async function getDetailedPostBySlug(
  slug: string,
  preview: boolean
): Promise<DetailedBlogPost | null> {
  if (isMockBackend()) {
    const mockPost = mockBlogPosts.find(p => p.slug === slug)
    if (!mockPost) return null

    const mockContentMap: Record<string, SerializedEditorState> = {
      'typescript-advanced': mockContentWithMermaid,
      'python-tips': mockContentWithImages,
    }

    return {
      ...mockPost,
      content: mockContentMap[slug] ?? mockContent,
    }
  }

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    draft: preview,
  })

  if (!result.docs[0]) return null

  return transformDetailedPost(result.docs[0] as Post)
}
