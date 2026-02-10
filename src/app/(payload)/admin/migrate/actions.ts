'use server'

import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import { createClient, type EntrySkeletonType, type Entry } from 'contentful'
import {
  transformRichText,
  type ContentfulNode,
  type LinkedEntriesMap,
  type LinkedEntry,
} from '@/lib/contentful-to-lexical'

export interface ContentType {
  id: string
  name: string
}

export interface MigrationResult {
  total: number
  success: number
  skipped: number
  errors: number
  log: string[]
}

interface ContentfulFileDetails {
  url: string
  contentType: string
  fileName: string
}

const uploadImage = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  imageFields: {
    title?: string
    description?: string
    file?: ContentfulFileDetails
  },
  log: string[]
): Promise<number | null> => {
  const file = imageFields.file
  if (!file) {
    log.push('  [WARN] Featured image has no file field')
    return null
  }

  let url = file.url
  if (url.startsWith('//')) {
    url = `https:${url}`
  }

  const description = imageFields.description ?? imageFields.title ?? 'Blog post image'

  log.push(`  Downloading image: ${url}`)
  const response = await fetch(url)
  if (!response.ok) {
    log.push(`  [ERROR] Failed to download image: ${response.status}`)
    return null
  }

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const mediaDoc = await payload.create({
    collection: 'media',
    data: { alt: description },
    file: {
      data: buffer,
      mimetype: file.contentType ?? 'image/jpeg',
      name: file.fileName ?? 'image.jpg',
      size: buffer.length,
    },
  })

  log.push(`  Uploaded image as media ID: ${mediaDoc.id}`)
  return mediaDoc.id as number
}

const createContentfulClient = (usePreview: boolean) => {
  const spaceId = process.env['CONTENTFUL_SPACE_ID']
  const environment = process.env['CONTENTFUL_ENVIRONMENT'] ?? 'master'

  if (!spaceId) {
    throw new Error('Missing required environment variable: CONTENTFUL_SPACE_ID')
  }

  if (usePreview) {
    const previewToken = process.env['CONTENTFUL_PREVIEW_ACCESS_TOKEN']
    if (!previewToken) {
      throw new Error(
        'Missing required environment variable: CONTENTFUL_PREVIEW_ACCESS_TOKEN (needed for Preview API)'
      )
    }
    return createClient({
      space: spaceId,
      accessToken: previewToken,
      host: 'preview.contentful.com',
      environment,
    })
  }

  const accessToken = process.env['CONTENTFUL_ACCESS_TOKEN']
  if (!accessToken) {
    throw new Error('Missing required environment variable: CONTENTFUL_ACCESS_TOKEN')
  }
  return createClient({
    space: spaceId,
    accessToken,
    environment,
  })
}

export const fetchContentTypes = async (usePreview: boolean): Promise<ContentType[]> => {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user) {
    throw new Error('Unauthorized: you must be logged in as an admin user.')
  }

  const contentfulClient = createContentfulClient(usePreview)
  const response = await contentfulClient.getContentTypes()

  return response.items.map((ct) => ({ id: ct.sys.id, name: ct.name }))
}

export const runMigration = async (
  contentType: string,
  usePreview: boolean
): Promise<MigrationResult> => {
  const log: string[] = []

  // Auth check: verify caller is a logged-in admin user
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user) {
    throw new Error('Unauthorized: you must be logged in as an admin user.')
  }

  log.push('=== Contentful -> PayloadCMS Migration ===')
  log.push(`Authenticated as: ${user.email}`)

  // Connect to Contentful
  const contentfulClient = createContentfulClient(usePreview)
  log.push(`Connected to Contentful${usePreview ? ' (Preview API)' : ''}`)

  // Fetch all entries for the given content type from Contentful
  log.push(`Fetching "${contentType}" entries from Contentful...`)
  const entries = await contentfulClient.getEntries<EntrySkeletonType>({
    content_type: contentType,
    include: 10,
  })
  log.push(`Found ${entries.items.length} entries`)

  // Build linked entries map for resolving embedded entries
  const linkedEntries: LinkedEntriesMap = new Map()
  if (entries.includes?.Entry) {
    for (const entry of entries.includes.Entry as Entry<EntrySkeletonType>[]) {
      const linked: LinkedEntry = {
        contentTypeId: entry.sys.contentType.sys.id,
        fields: entry.fields as Record<string, unknown>,
      }
      linkedEntries.set(entry.sys.id, linked)
    }
  }

  let successCount = 0
  let skipCount = 0
  let errorCount = 0

  const warn = (msg: string) => log.push(`  [WARN] ${msg}`)

  for (const entry of entries.items) {
    const fields = entry.fields as Record<string, unknown>
    const title = fields['title'] as string
    const slug = fields['slug'] as string

    log.push(`Processing: "${title}" (${slug})`)

    try {
      // Idempotency check: skip if post with same slug exists
      const existing = await payload.find({
        collection: 'posts',
        where: { slug: { equals: slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        log.push('  Skipped (already exists)')
        skipCount++
        continue
      }

      // Upload featured image (guard against unresolved links missing `fields`)
      let mediaId: number | null = null
      const featuredImage = fields['featuredImage'] as
        | {
            fields?: {
              title?: string
              description?: string
              file?: ContentfulFileDetails
            }
          }
        | undefined
      if (featuredImage?.fields) {
        mediaId = await uploadImage(payload, featuredImage.fields, log)
      } else if (featuredImage) {
        log.push('  [WARN] Featured image is an unresolved link, skipping')
      }

      // Transform rich text content
      const richTextDocument = fields['content'] as ContentfulNode
      const lexicalContent = transformRichText(richTextDocument, linkedEntries, warn)

      // Extract other fields
      const description = (fields['description'] as string) ?? ''
      const publicationDate =
        (fields['publicationDate'] as string) ?? new Date().toISOString()
      const tags = (fields['tags'] as string[]) ?? []
      const canonicalUrl = (fields['canonicalUrl'] as string) ?? undefined

      // Create post in Payload
      const postData: Record<string, unknown> = {
        title,
        slug,
        description,
        publicationDate,
        tags,
        content: lexicalContent,
        _status: 'published',
      }

      if (mediaId !== null) {
        postData['featuredImage'] = mediaId
      }

      if (canonicalUrl) {
        postData['canonicalUrl'] = canonicalUrl
      }

      await payload.create({
        collection: 'posts',
        data: postData,
      })

      log.push('  Created successfully')
      successCount++
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      log.push(`  [ERROR] Failed to migrate "${title}": ${message}`)
      const data = (err as { data?: { errors?: Array<{ path: string; message: string }> } })
        .data
      if (data?.errors) {
        for (const fieldErr of data.errors) {
          log.push(`    -> ${fieldErr.path}: ${fieldErr.message}`)
        }
      }
      errorCount++
    }
  }

  // Summary
  log.push('')
  log.push('=== Migration Summary ===')
  log.push(`  Total:   ${entries.items.length}`)
  log.push(`  Success: ${successCount}`)
  log.push(`  Skipped: ${skipCount}`)
  log.push(`  Errors:  ${errorCount}`)

  return {
    total: entries.items.length,
    success: successCount,
    skipped: skipCount,
    errors: errorCount,
    log,
  }
}
