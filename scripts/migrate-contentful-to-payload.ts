/**
 * Migration script: Contentful -> PayloadCMS
 *
 * Fetches all blog posts from Contentful, downloads/uploads images to Payload,
 * transforms Contentful Rich Text AST to Lexical AST (including CodeBlock resolution),
 * and imports posts into Payload.
 *
 * Idempotent: skips posts that already exist (matched by slug).
 *
 * NOTE: This standalone script may not work outside Next.js due to Payload's
 * dependency on @next/env. Prefer the admin migration page at /admin/migrate.
 *
 * Usage:
 *   DATABASE_URL="..." PAYLOAD_SECRET="..." \
 *   CONTENTFUL_SPACE_ID="..." CONTENTFUL_ACCESS_TOKEN="..." \
 *   npx ts-node scripts/migrate-contentful-to-payload.ts
 *
 * Environment variables:
 *   - DATABASE_URL: PostgreSQL connection string for Payload
 *   - PAYLOAD_SECRET: Payload secret key
 *   - CONTENTFUL_SPACE_ID: Contentful space ID
 *   - CONTENTFUL_ACCESS_TOKEN: Contentful Content Delivery API access token
 *   - CONTENTFUL_ENVIRONMENT: Contentful environment (default: 'master')
 *   - CONTENTFUL_CONTENT_TYPE: Contentful content type ID to migrate (default: 'blogPost')
 *   - CONTENTFUL_USE_PREVIEW: Set to 'true' to use the Preview API (includes draft content)
 *   - CONTENTFUL_PREVIEW_ACCESS_TOKEN: Content Preview API access token (required when CONTENTFUL_USE_PREVIEW is set)
 */

import { createClient, type EntrySkeletonType, type Entry } from 'contentful'
import { getPayload } from 'payload'
// eslint-disable-next-line no-restricted-imports -- standalone script, path aliases unavailable
import config from '../src/payload.config'
// eslint-disable-next-line no-restricted-imports -- standalone script, path aliases unavailable
import {
  transformRichText,
  type ContentfulNode,
  type LinkedEntriesMap,
  type LinkedEntry,
} from '../src/lib/contentful-to-lexical'

// --- Image upload helper ---

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
  }
): Promise<number | null> => {
  const file = imageFields.file
  if (!file) {
    console.warn('  [WARN] Featured image has no file field')
    return null
  }

  let url = file.url
  if (url.startsWith('//')) {
    url = `https:${url}`
  }

  const description =
    imageFields.description ?? imageFields.title ?? 'Blog post image'

  console.log(`  Downloading image: ${url}`)
  const response = await fetch(url)
  if (!response.ok) {
    console.error(`  [ERROR] Failed to download image: ${response.status}`)
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

  console.log(`  Uploaded image as media ID: ${mediaDoc.id}`)
  return mediaDoc.id as number
}

// --- Main migration ---

const migrate = async () => {
  console.log('=== Contentful -> PayloadCMS Migration ===\n')

  // Validate env vars
  const spaceId = process.env['CONTENTFUL_SPACE_ID']
  const environment = process.env['CONTENTFUL_ENVIRONMENT'] ?? 'master'
  const contentType = process.env['CONTENTFUL_CONTENT_TYPE'] ?? 'blogPost'
  const usePreview = process.env['CONTENTFUL_USE_PREVIEW'] === 'true'

  if (!spaceId) {
    console.error('Missing required environment variable: CONTENTFUL_SPACE_ID')
    process.exit(1)
  }

  // Connect to Contentful
  let contentfulClient
  if (usePreview) {
    const previewToken = process.env['CONTENTFUL_PREVIEW_ACCESS_TOKEN']
    if (!previewToken) {
      console.error(
        'Missing required environment variable: CONTENTFUL_PREVIEW_ACCESS_TOKEN (needed for Preview API)'
      )
      process.exit(1)
    }
    contentfulClient = createClient({
      space: spaceId,
      accessToken: previewToken,
      host: 'preview.contentful.com',
      environment,
    })
    console.log('Connected to Contentful (Preview API)\n')
  } else {
    const accessToken = process.env['CONTENTFUL_ACCESS_TOKEN']
    if (!accessToken) {
      console.error(
        'Missing required environment variable: CONTENTFUL_ACCESS_TOKEN'
      )
      process.exit(1)
    }
    contentfulClient = createClient({
      space: spaceId,
      accessToken,
      environment,
    })
    console.log('Connected to Contentful\n')
  }

  // Connect to Payload
  const payload = await getPayload({ config })
  console.log('Connected to Payload\n')

  // Fetch all entries for the given content type from Contentful
  console.log(`Fetching "${contentType}" entries from Contentful...`)
  const entries = await contentfulClient.getEntries<EntrySkeletonType>({
    content_type: contentType,
    include: 10,
  })
  console.log(`Found ${entries.items.length} entries\n`)

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

  for (const entry of entries.items) {
    const fields = entry.fields as Record<string, unknown>
    const title = fields['title'] as string
    const slug = fields['slug'] as string

    console.log(`Processing: "${title}" (${slug})`)

    try {
      // Idempotency check: skip if post with same slug exists
      const existing = await payload.find({
        collection: 'posts',
        where: { slug: { equals: slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log('  Skipped (already exists)\n')
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
        mediaId = await uploadImage(payload, featuredImage.fields)
      } else if (featuredImage) {
        console.warn('  [WARN] Featured image is an unresolved link, skipping')
      }

      // Transform rich text content
      const richTextDocument = fields['content'] as ContentfulNode
      const lexicalContent = transformRichText(richTextDocument, linkedEntries)

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
        draft: true,
      })

      console.log('  Created successfully\n')
      successCount++
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error(`  [ERROR] Failed to migrate "${title}": ${message}\n`)
      errorCount++
    }
  }

  // Summary
  console.log('=== Migration Summary ===')
  console.log(`  Total:   ${entries.items.length}`)
  console.log(`  Success: ${successCount}`)
  console.log(`  Skipped: ${skipCount}`)
  console.log(`  Errors:  ${errorCount}`)

  process.exit(errorCount > 0 ? 1 : 0)
}

migrate().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
