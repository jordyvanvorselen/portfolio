import { formatDate, calculateReadTime } from '@/lib/blog-helpers'

const POST_GRAPHQL_FIELDS = `
  slug
  title
  description
  tags
  publicationDate
  featuredImage {
    url
    description
  }
  canonicalUrl
  content {
    json
  }
`

async function fetchGraphQL(query: string, preview: boolean): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env['CONTENTFUL_SPACE_ID']}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env['CONTENTFUL_PREVIEW_ACCESS_TOKEN']
            : process.env['CONTENTFUL_ACCESS_TOKEN']
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ['posts'] },
    }
  ).then(response => response.json())
}

function transformPost(post: any): any {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: formatDate(post.publicationDate),
    readTime: calculateReadTime(post.content.json),
    image: post.featuredImage?.url || '',
    tags: post.tags || [],
    canonicalUrl: post.canonicalUrl,
  }
}

function extractPost(fetchResponse: any): any {
  const post = fetchResponse?.data?.blogPostCollection?.items?.[0]
  return post ? transformPost(post) : null
}

function extractPostEntries(fetchResponse: any): any[] {
  const posts = fetchResponse?.data?.blogPostCollection?.items
  return posts && posts.length > 0 ? posts.map(transformPost) : []
}

export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      blogPostCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  )
  return extractPost(entry)
}

export async function getAllPosts(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      blogPostCollection(
        where: {
          slug_exists: true
        }
        order: publicationDate_DESC
        preview: ${isDraftMode ? 'true' : 'false'}
      ) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  )

  return extractPostEntries(entries)
}

export async function getPostAndMorePosts(
  slug: string,
  preview: boolean
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      blogPostCollection(where: { slug: "${slug}" }, preview: ${
        preview ? 'true' : 'false'
      }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  const entries = await fetchGraphQL(
    `query {
      blogPostCollection(
        where: {
          slug_not_in: ["${slug}"]
        }
        order: publicationDate_DESC
        preview: ${preview ? 'true' : 'false'}
        limit: 2
      ) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  }
}
