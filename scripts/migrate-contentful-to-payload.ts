/**
 * Migration script: Contentful -> PayloadCMS
 *
 * Fetches all blog posts from Contentful, downloads/uploads images to Payload,
 * transforms Contentful Rich Text AST to Lexical AST (including CodeBlock resolution),
 * and imports posts into Payload.
 *
 * Idempotent: skips posts that already exist (matched by slug).
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
 */

import { createClient, type EntrySkeletonType, type Entry } from 'contentful'
import { getPayload } from 'payload'
// eslint-disable-next-line no-restricted-imports -- standalone script, path aliases unavailable
import config from '../src/payload.config'

// --- Contentful Rich Text types ---

interface ContentfulNode {
  nodeType: string
  value?: string
  marks?: Array<{ type: string }>
  content?: ContentfulNode[]
  data?: Record<string, unknown>
}

// --- Lexical output types ---

interface LexicalNode {
  type: string
  version: number
  [key: string]: unknown
}

interface LexicalElementNode extends LexicalNode {
  children: LexicalNode[]
}

interface LexicalRoot {
  root: {
    type: 'root'
    children: LexicalNode[]
    direction: null
    format: ''
    indent: 0
    version: 1
  }
}

// --- Format bitmask for text marks ---

const FORMAT_MAP: Record<string, number> = {
  bold: 1,
  italic: 2,
  strikethrough: 4,
  underline: 8,
  code: 16,
  subscript: 32,
  superscript: 64,
}

const computeFormat = (marks: Array<{ type: string }>): number => {
  return marks.reduce((bitmask, mark) => {
    const value = FORMAT_MAP[mark.type]
    return value !== undefined ? bitmask | value : bitmask
  }, 0)
}

// --- Contentful Rich Text -> Lexical AST transformer ---

type LinkedEntriesMap = Map<string, Entry<EntrySkeletonType>>

const transformNode = (
  node: ContentfulNode,
  linkedEntries: LinkedEntriesMap
): LexicalNode | null => {
  switch (node.nodeType) {
    case 'text': {
      return {
        type: 'text',
        text: node.value ?? '',
        format: computeFormat(node.marks ?? []),
        version: 1,
      } satisfies LexicalNode
    }

    case 'paragraph': {
      const paragraphNode: LexicalElementNode = {
        type: 'paragraph',
        children: transformChildren(node.content ?? [], linkedEntries),
        version: 1,
      }
      return paragraphNode
    }

    case 'heading-1':
    case 'heading-2':
    case 'heading-3':
    case 'heading-4':
    case 'heading-5':
    case 'heading-6': {
      const level = node.nodeType.replace('heading-', '')
      const headingNode: LexicalElementNode = {
        type: 'heading',
        tag: `h${level}`,
        children: transformChildren(node.content ?? [], linkedEntries),
        version: 1,
      }
      return headingNode
    }

    case 'ordered-list': {
      const orderedListNode: LexicalElementNode = {
        type: 'list',
        listType: 'number',
        children: transformChildren(node.content ?? [], linkedEntries),
        version: 1,
      }
      return orderedListNode
    }

    case 'unordered-list': {
      const unorderedListNode: LexicalElementNode = {
        type: 'list',
        listType: 'bullet',
        children: transformChildren(node.content ?? [], linkedEntries),
        version: 1,
      }
      return unorderedListNode
    }

    case 'list-item': {
      const listItemNode: LexicalElementNode = {
        type: 'listitem',
        children: transformChildren(node.content ?? [], linkedEntries),
        version: 1,
      }
      return listItemNode
    }

    case 'blockquote': {
      const quoteNode: LexicalElementNode = {
        type: 'quote',
        children: transformChildren(node.content ?? [], linkedEntries),
        version: 1,
      }
      return quoteNode
    }

    case 'hr': {
      return { type: 'horizontalrule', version: 1 } satisfies LexicalNode
    }

    case 'hyperlink': {
      const data = node.data as { uri?: string } | undefined
      const linkNode: LexicalElementNode = {
        type: 'link',
        fields: { url: data?.uri ?? '' },
        children: transformChildren(node.content ?? [], linkedEntries),
        version: 1,
      }
      return linkNode
    }

    case 'embedded-entry-block': {
      const target = node.data?.['target'] as
        | { sys?: { id?: string } }
        | undefined
      const entryId = target?.sys?.id
      if (!entryId) {
        console.warn('  [WARN] embedded-entry-block missing target sys.id')
        return null
      }

      const linkedEntry = linkedEntries.get(entryId)
      if (!linkedEntry) {
        console.warn(`  [WARN] Could not resolve linked entry: ${entryId}`)
        return null
      }

      const contentTypeId = linkedEntry.sys.contentType.sys.id
      if (contentTypeId === 'codeBlock') {
        const fields = linkedEntry.fields as Record<string, unknown>
        const blockNode: LexicalElementNode = {
          type: 'block',
          fields: {
            blockType: 'codeBlock',
            language: (fields['programmingLanguage'] as string) ?? '',
            code: (fields['code'] as string) ?? '',
          },
          children: [],
          version: 1,
        }
        return blockNode
      }

      console.warn(
        `  [WARN] Unknown embedded entry content type: ${contentTypeId}`
      )
      return null
    }

    default: {
      console.warn(`  [WARN] Unknown node type: ${node.nodeType}`)
      return null
    }
  }
}

const transformChildren = (
  nodes: ContentfulNode[],
  linkedEntries: LinkedEntriesMap
): LexicalNode[] => {
  return nodes
    .map(child => transformNode(child, linkedEntries))
    .filter((n): n is LexicalNode => n !== null)
}

const transformRichText = (
  document: ContentfulNode,
  linkedEntries: LinkedEntriesMap
): LexicalRoot => {
  const children = transformChildren(document.content ?? [], linkedEntries)

  return {
    root: {
      type: 'root',
      children,
      direction: null,
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

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
  const accessToken = process.env['CONTENTFUL_ACCESS_TOKEN']
  const environment = process.env['CONTENTFUL_ENVIRONMENT'] ?? 'master'

  if (!spaceId || !accessToken) {
    console.error(
      'Missing required environment variables: CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN'
    )
    process.exit(1)
  }

  // Connect to Contentful
  const contentfulClient = createClient({
    space: spaceId,
    accessToken,
    environment,
  })
  console.log('Connected to Contentful\n')

  // Connect to Payload
  const payload = await getPayload({ config })
  console.log('Connected to Payload\n')

  // Fetch all blog posts from Contentful
  console.log('Fetching blog posts from Contentful...')
  const entries = await contentfulClient.getEntries<EntrySkeletonType>({
    content_type: 'blogPost',
    include: 10,
  })
  console.log(`Found ${entries.items.length} blog posts\n`)

  // Build linked entries map for resolving embedded entries
  const linkedEntries: LinkedEntriesMap = new Map()
  if (entries.includes?.Entry) {
    for (const entry of entries.includes.Entry) {
      linkedEntries.set(entry.sys.id, entry)
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

      // Upload featured image
      let mediaId: number | null = null
      const featuredImage = fields['featuredImage'] as
        | {
            fields: {
              title?: string
              description?: string
              file?: ContentfulFileDetails
            }
          }
        | undefined
      if (featuredImage) {
        mediaId = await uploadImage(payload, featuredImage.fields)
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
