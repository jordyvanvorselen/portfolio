import { createClient, type Entry } from 'contentful'
import {
  formatDate,
  calculateReadTime,
  ensureAbsoluteUrl,
} from '@/lib/blog-helpers'
import type { TypeBlogPostSkeleton } from '@/lib/contentful-types'

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
  content: {
    json: any // eslint-disable-line @typescript-eslint/no-explicit-any
    links: {
      assets: { block: any[] } // eslint-disable-line @typescript-eslint/no-explicit-any
      entries: { block: any[] } // eslint-disable-line @typescript-eslint/no-explicit-any
    }
  }
}

function getClient(preview: boolean) {
  return createClient({
    space: process.env['CONTENTFUL_SPACE_ID']!,
    accessToken: preview
      ? process.env['CONTENTFUL_PREVIEW_ACCESS_TOKEN']!
      : process.env['CONTENTFUL_ACCESS_TOKEN']!,
    host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  })
}

function transformEntry(entry: Entry<TypeBlogPostSkeleton>): BlogPost {
  const result: BlogPost = {
    slug: entry.fields.slug as string,
    title: entry.fields.title as string,
    description: entry.fields.description as string,
    date: formatDate(entry.fields.publicationDate as string),
    readTime: calculateReadTime(entry.fields.content as any), // eslint-disable-line @typescript-eslint/no-explicit-any
    image: ensureAbsoluteUrl(
      (entry.fields.featuredImage as any)?.fields?.file?.url // eslint-disable-line @typescript-eslint/no-explicit-any
    ),
    tags: entry.fields.tags as string[],
  }

  if (entry.fields.canonicalUrl) {
    result.canonicalUrl = entry.fields.canonicalUrl as string
  }

  return result
}

function transformDetailedEntry(
  entry: Entry<TypeBlogPostSkeleton>
): DetailedBlogPost {
  const basicPost = transformEntry(entry)
  return {
    ...basicPost,
    content: {
      json: entry.fields.content as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      links: {
        assets: { block: [] },
        entries: { block: [] },
      },
    },
  }
}

export async function getPreviewPostBySlug(
  slug: string | null
): Promise<BlogPost | null> {
  if (!slug) return null

  const client = getClient(true)

  const entries = await client.getEntries<TypeBlogPostSkeleton>({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  })

  if (!entries.items[0]) return null

  const entry = entries.items[0]
  return transformEntry(entry)
}

export async function getAllPosts(isDraftMode: boolean): Promise<BlogPost[]> {
  const client = getClient(isDraftMode)

  const entries = await client.getEntries<TypeBlogPostSkeleton>({
    content_type: 'blogPost',
    order: ['-fields.publicationDate'],
  })

  return entries.items.map(transformEntry)
}

export async function getPostAndMorePosts(
  slug: string,
  preview: boolean
): Promise<{ post: BlogPost | null; morePosts: BlogPost[] }> {
  const client = getClient(preview)

  const [postEntries, morePostEntries] = await Promise.all([
    client.getEntries<TypeBlogPostSkeleton>({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    }),
    client.getEntries<TypeBlogPostSkeleton>({
      content_type: 'blogPost',
      'fields.slug[ne]': slug,
      order: ['-fields.publicationDate'],
      limit: 2,
    }),
  ])

  return {
    post: postEntries.items[0] ? transformEntry(postEntries.items[0]) : null,
    morePosts: morePostEntries.items.map(transformEntry),
  }
}

export async function getDetailedPostBySlug(
  slug: string,
  preview: boolean
): Promise<DetailedBlogPost | null> {
  const client = getClient(preview)

  const entries = await client.getEntries<TypeBlogPostSkeleton>({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
    include: 10,
  })

  if (!entries.items[0]) return null

  return transformDetailedEntry(entries.items[0])
}
