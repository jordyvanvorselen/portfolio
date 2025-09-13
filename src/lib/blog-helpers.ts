import type { Document, Node, Text } from '@contentful/rich-text-types'

export const formatDate = (
  dateString: string,
  locale: string = 'en-US'
): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export const calculateReadTime = (content: Document): string => {
  const text = extractTextFromRichText(content)
  const wordsPerMinute = 200
  const words = text.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

export const extractTextFromRichText = (document: Document): string => {
  let text = ''

  const traverse = (node: Node) => {
    if (node.nodeType === 'text') {
      text += (node as Text).value + ' '
    }

    if ('content' in node && Array.isArray(node.content)) {
      node.content.forEach(traverse)
    }
  }

  traverse(document)
  return text.trim()
}

export const truncateDescription = (
  text: string,
  maxLength: number = 150
): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

// Utility function to ensure Contentful asset URLs are absolute HTTPS URLs
export const ensureAbsoluteUrl = (url: string | undefined): string => {
  if (!url) return ''

  // If URL starts with //, prepend https:
  if (url.startsWith('//')) {
    return `https:${url}`
  }

  // If URL starts with http://, convert to https://
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://')
  }

  // Return as-is if already absolute HTTPS or relative
  return url
}

// Utility function to extract unique tags from blog posts
export const getUniqueTagsFromPosts = (
  posts: { tags: string[] }[]
): string[] => {
  const allTags = posts.flatMap(post => post.tags)
  const uniqueTags = Array.from(new Set(allTags))
  return uniqueTags.sort()
}
