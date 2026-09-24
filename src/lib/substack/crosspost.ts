import { truncateDescription } from '@/lib/blog-helpers'
import { substackToLexical } from '@/lib/substack/substack-to-lexical'

// Payload rejects descriptions over 150 characters; truncating adds '...'
const MAX_DESCRIPTION_LENGTH = 147

export interface CrosspostSettings {
  payloadUrl: string
  email: string
  password: string
  parseHtml: (html: string) => Element
}

export interface CrosspostResult {
  id: number
  adminUrl: string
}

interface SubstackPost {
  title: string
  subtitle?: string | null
  slug: string
  post_date: string
  cover_image?: string | null
  canonical_url: string
  postTags: { name: string }[]
  body_html: string
}

interface BlogPostDoc {
  id: number
  slug: string
  featuredImage?: number | null
}

const fetchJson = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, init)
  if (!response.ok) {
    throw new Error(
      `${init?.method ?? 'GET'} ${url} failed: ${response.status}`
    )
  }
  return (await response.json()) as T
}

const fetchSubstackPost = (postUrl: string): Promise<SubstackPost> => {
  const url = new URL(postUrl)
  const slug = url.pathname.replace(/^\/p\//, '').replace(/\/$/, '')
  return fetchJson<SubstackPost>(`${url.origin}/api/v1/posts/${slug}`)
}

const createPayloadClient = async ({
  payloadUrl,
  email,
  password,
}: CrosspostSettings) => {
  const { token } = await fetchJson<{ token: string }>(
    `${payloadUrl}/api/users/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }
  )
  const authorization = { Authorization: `JWT ${token}` }

  const findPost = async (field: 'slug' | 'canonicalUrl', value: string) => {
    const query = new URLSearchParams({
      [`where[${field}][equals]`]: value,
      draft: 'true',
      depth: '0',
      limit: '1',
    })
    const { docs } = await fetchJson<{ docs: BlogPostDoc[] }>(
      `${payloadUrl}/api/posts?${query.toString()}`,
      { headers: authorization }
    )
    return docs[0]
  }

  return {
    findPost,
    uploadImage: async ({ src, alt }: { src: string; alt: string }) => {
      const image = await fetch(src)
      const filename = decodeURIComponent(
        new URL(src).pathname.replace(/^.*\//, '')
      )
      const form = new FormData()
      const blob = await image.blob()
      form.append('file', new File([blob], filename, { type: blob.type }))
      form.append('_payload', JSON.stringify({ alt }))
      const { doc } = await fetchJson<{ doc: { id: number } }>(
        `${payloadUrl}/api/media`,
        { method: 'POST', headers: authorization, body: form }
      )
      return doc.id
    },
    createDraftPost: async (post: Record<string, unknown>) => {
      const { doc } = await fetchJson<{ doc: { id: number } }>(
        `${payloadUrl}/api/posts?draft=true`,
        {
          method: 'POST',
          headers: { ...authorization, 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...post, _status: 'draft' }),
        }
      )
      return doc.id
    },
  }
}

// Copies a published Substack post into Payload as a draft blog post
export const crosspost = async (
  substackPostUrl: string,
  settings: CrosspostSettings
): Promise<CrosspostResult> => {
  const post = await fetchSubstackPost(substackPostUrl)
  if (!post.subtitle) {
    throw new Error(
      'The Substack post has no subtitle. Add one on Substack: the blog uses it as the description.'
    )
  }
  const payload = await createPayloadClient(settings)
  const adminUrl = (id: number) =>
    `${settings.payloadUrl}/admin/collections/posts/${id}`

  const existing = await payload.findPost('slug', post.slug)
  if (existing) {
    throw new Error(
      `"${post.slug}" is already on the blog: ${adminUrl(existing.id)}`
    )
  }

  const featuredImage = post.cover_image
    ? await payload.uploadImage({ src: post.cover_image, alt: post.title })
    : undefined

  const content = await substackToLexical(settings.parseHtml(post.body_html), {
    uploadImage: payload.uploadImage,
    resolveLinkCard: async ({ title, canonicalUrl, coverImage }) => {
      const blogCopy = await payload.findPost('canonicalUrl', canonicalUrl)
      if (blogCopy) {
        return {
          url: `/blog/${blogCopy.slug}`,
          ...(blogCopy.featuredImage && { imageId: blogCopy.featuredImage }),
        }
      }
      return {
        url: canonicalUrl,
        ...(coverImage && {
          imageId: await payload.uploadImage({ src: coverImage, alt: title }),
        }),
      }
    },
    createId: () => crypto.randomUUID().replace(/-/g, '').slice(0, 24),
  })

  const id = await payload.createDraftPost({
    title: post.title,
    slug: post.slug,
    description: truncateDescription(post.subtitle, MAX_DESCRIPTION_LENGTH),
    publicationDate: post.post_date,
    tags: post.postTags.map(({ name }) => name),
    canonicalUrl: post.canonical_url,
    ...(featuredImage !== undefined && { featuredImage }),
    content,
  })

  return {
    id,
    adminUrl: `${settings.payloadUrl}/admin/collections/posts/${id}`,
  }
}
