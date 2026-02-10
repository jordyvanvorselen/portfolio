/**
 * Pure transformation functions for converting Contentful Rich Text AST
 * to Lexical AST. No side effects — all functions are deterministic.
 */

import { randomBytes } from 'crypto'

// --- Contentful Rich Text types ---

export interface ContentfulNode {
  nodeType: string
  value?: string
  marks?: Array<{ type: string }>
  content?: ContentfulNode[]
  data?: Record<string, unknown>
}

// --- Lexical output types ---

export interface LexicalNode {
  type: string
  version: number
  [key: string]: unknown
}

export interface LexicalElementNode extends LexicalNode {
  children: LexicalNode[]
}

export interface LexicalRoot {
  root: {
    type: 'root'
    children: LexicalNode[]
    direction: null
    format: ''
    indent: 0
    version: 1
  }
}

// --- Linked entry abstraction (decoupled from Contentful SDK) ---

export interface LinkedEntry {
  contentTypeId: string
  fields: Record<string, unknown>
}

export type LinkedEntriesMap = Map<string, LinkedEntry>

// --- Format bitmask for text marks ---

export const FORMAT_MAP: Record<string, number> = {
  bold: 1,
  italic: 2,
  strikethrough: 4,
  underline: 8,
  code: 16,
  subscript: 32,
  superscript: 64,
}

export const computeFormat = (marks: Array<{ type: string }>): number => {
  return marks.reduce((bitmask, mark) => {
    const value = FORMAT_MAP[mark.type]
    return value !== undefined ? bitmask | value : bitmask
  }, 0)
}

// --- Contentful Rich Text -> Lexical AST transformer ---

export const transformNode = (
  node: ContentfulNode,
  linkedEntries: LinkedEntriesMap,
  warn: (msg: string) => void = console.warn
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
        children: transformChildren(node.content ?? [], linkedEntries, warn),
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
        children: transformChildren(node.content ?? [], linkedEntries, warn),
        version: 1,
      }
      return headingNode
    }

    case 'ordered-list': {
      const orderedListNode: LexicalElementNode = {
        type: 'list',
        listType: 'number',
        children: transformChildren(node.content ?? [], linkedEntries, warn),
        version: 1,
      }
      return orderedListNode
    }

    case 'unordered-list': {
      const unorderedListNode: LexicalElementNode = {
        type: 'list',
        listType: 'bullet',
        children: transformChildren(node.content ?? [], linkedEntries, warn),
        version: 1,
      }
      return unorderedListNode
    }

    case 'list-item': {
      const listItemNode: LexicalElementNode = {
        type: 'listitem',
        children: transformChildren(node.content ?? [], linkedEntries, warn),
        version: 1,
      }
      return listItemNode
    }

    case 'blockquote': {
      const quoteNode: LexicalElementNode = {
        type: 'quote',
        children: transformChildren(node.content ?? [], linkedEntries, warn),
        version: 1,
      }
      return quoteNode
    }

    case 'hr': {
      return { type: 'horizontalrule', version: 1 } satisfies LexicalNode
    }

    case 'hyperlink':
    case 'entry-hyperlink':
    case 'asset-hyperlink': {
      const data = node.data as { uri?: string } | undefined
      const url = data?.uri
      const children = transformChildren(
        node.content ?? [],
        linkedEntries,
        warn
      )
      if (!url) {
        warn(`${node.nodeType} missing uri, rendering as plain text`)
        return children.length === 1 ? children[0]! : null
      }
      const linkNode: LexicalElementNode = {
        type: 'link',
        fields: { url },
        children,
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
        warn('embedded-entry-block missing target sys.id')
        return null
      }

      const linkedEntry = linkedEntries.get(entryId)
      if (!linkedEntry) {
        warn(`Could not resolve linked entry: ${entryId}`)
        return null
      }

      if (linkedEntry.contentTypeId === 'codeBlock') {
        const blockNode: LexicalElementNode = {
          type: 'block',
          fields: {
            id: randomBytes(12).toString('hex'),
            blockName: '',
            blockType: 'codeBlock',
            language:
              (linkedEntry.fields['programmingLanguage'] as string) ?? '',
            code: (linkedEntry.fields['code'] as string) ?? '',
          },
          children: [],
          version: 2,
        }
        return blockNode
      }

      warn(`Unknown embedded entry content type: ${linkedEntry.contentTypeId}`)
      return null
    }

    default: {
      warn(`Unknown node type: ${node.nodeType}`)
      return null
    }
  }
}

export const transformChildren = (
  nodes: ContentfulNode[],
  linkedEntries: LinkedEntriesMap,
  warn: (msg: string) => void = console.warn
): LexicalNode[] => {
  return nodes
    .map(child => transformNode(child, linkedEntries, warn))
    .filter((n): n is LexicalNode => n !== null)
}

export const transformRichText = (
  document: ContentfulNode,
  linkedEntries: LinkedEntriesMap,
  warn: (msg: string) => void = console.warn
): LexicalRoot => {
  const children = transformChildren(
    document.content ?? [],
    linkedEntries,
    warn
  )

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
