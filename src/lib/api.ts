import { createClient, type Entry, type Asset } from 'contentful'
import {
  formatDate,
  calculateReadTime,
  ensureAbsoluteUrl,
} from '@/lib/blog-helpers'
import type { TypeBlogPostSkeleton } from '@/lib/contentful-types'
import type { Document } from '@contentful/rich-text-types'

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

export interface ContentfulAsset {
  sys: { id: string }
  url: string
  description: string
}

export interface ContentfulCodeBlock {
  sys: { id: string }
  title: string
  programmingLanguage: string
  code: string
}

export interface DetailedBlogPost extends BlogPost {
  content: {
    json: Document
    links: {
      assets: { block: ContentfulAsset[] }
      entries: { block: ContentfulCodeBlock[] }
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
    readTime: calculateReadTime(entry.fields.content as any), // TODO: Replace with Payload Lexical content
    image: ensureAbsoluteUrl(
      (entry.fields.featuredImage as Asset)?.fields?.file?.url as string
    ),
    tags: entry.fields.tags as string[],
  }

  if (entry.fields.canonicalUrl) {
    result.canonicalUrl = entry.fields.canonicalUrl as string
  }

  return result
}

function transformDetailedEntry(
  entry: Entry<TypeBlogPostSkeleton>,
  includes?: {
    Asset?: Array<{
      sys: { id: string }
      fields?: {
        file?: { url?: string }
        description?: string
      }
    }>
    Entry?: Array<{
      sys: { id: string }
      fields?: {
        title?: string
        programmingLanguage?: string
        code?: string
      }
    }>
  }
): DetailedBlogPost {
  const basicPost = transformEntry(entry)

  // Extract linked assets and entries from includes, with robust defaults
  const assets = Array.isArray(includes?.Asset) ? includes.Asset : []
  const entries = Array.isArray(includes?.Entry) ? includes.Entry : []

  return {
    ...basicPost,
    content: {
      json: entry.fields.content as Document,
      links: {
        assets: {
          block: assets.map(
            (asset): ContentfulAsset => ({
              sys: { id: asset.sys.id },
              url: asset.fields?.file?.url || '',
              description: asset.fields?.description || '',
            })
          ),
        },
        entries: {
          block: entries.map(
            (entry): ContentfulCodeBlock => ({
              sys: { id: entry.sys.id },
              title: entry.fields?.title || '',
              programmingLanguage: entry.fields?.programmingLanguage || '',
              code: entry.fields?.code || '',
            })
          ),
        },
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
      limit: 3,
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

  return transformDetailedEntry(entries.items[0], entries.includes)
}
