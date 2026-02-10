import type {
  SerializedEditorState,
  SerializedTextNode,
  SerializedElementNode,
} from '@/types/lexical'

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

export const calculateReadTime = (content: SerializedEditorState): string => {
  const text = extractTextFromRichText(content)
  const wordsPerMinute = 200
  const words = text.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

const isTextNode = (node: unknown): node is SerializedTextNode => {
  return (
    typeof node === 'object' &&
    node !== null &&
    'type' in node &&
    node.type === 'text'
  )
}

const isElementNode = (node: unknown): node is SerializedElementNode => {
  return (
    typeof node === 'object' &&
    node !== null &&
    'type' in node &&
    'children' in node &&
    Array.isArray((node as SerializedElementNode).children)
  )
}

export const extractTextFromRichText = (
  editorState: SerializedEditorState
): string => {
  let text = ''
  let needsSpace = false

  const traverse = (node: unknown): void => {
    if (isTextNode(node)) {
      if (needsSpace && text.length > 0) {
        text += ' '
      }
      text += node.text
      needsSpace = false
    }

    if (isElementNode(node)) {
      node.children.forEach(traverse)
      // After processing a block-level node's children, add space for the next block
      if (
        node.type === 'paragraph' ||
        node.type === 'heading' ||
        node.type === 'quote'
      ) {
        needsSpace = true
      }
    }
  }

  if (isElementNode(editorState.root)) {
    editorState.root.children.forEach(traverse)
  }

  return text.trim()
}

export const truncateDescription = (
  text: string,
  maxLength: number = 150
): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

// Utility function to ensure asset URLs are absolute HTTPS URLs
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
