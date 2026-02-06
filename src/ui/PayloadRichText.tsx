import { Fragment, type ReactNode } from 'react'
import type { SerializedEditorState } from '@/types/lexical'
import type { SerializedElementNode, SerializedTextNode } from '@/types/lexical'
import { MermaidDiagram } from '@/ui/MermaidDiagram'

export interface PayloadRichTextProps {
  data: SerializedEditorState
  highlightedCodeBlocks?: Map<string, string>
}

interface BlockNode extends SerializedElementNode {
  type: 'block'
  id?: string
  fields: {
    blockType: string
    language?: string
    code?: string
  }
}

// Type guards
const isTextNode = (node: unknown): node is SerializedTextNode => {
  return (
    typeof node === 'object' &&
    node !== null &&
    'type' in node &&
    node.type === 'text' &&
    'text' in node
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

// Render a text node with formatting
const renderTextNode = (node: SerializedTextNode, index: number): ReactNode => {
  let text: ReactNode = node.text

  // Format bitmask: bold=1, italic=2, strikethrough=4, underline=8, code=16
  const isBold = (node.format & 1) === 1
  const isItalic = (node.format & 2) === 2
  const isUnderline = (node.format & 8) === 8
  const isCode = (node.format & 16) === 16

  if (isCode) {
    text = <code>{text}</code>
  }
  if (isBold) {
    text = <strong>{text}</strong>
  }
  if (isItalic) {
    text = <em>{text}</em>
  }
  if (isUnderline) {
    text = <u>{text}</u>
  }

  return <Fragment key={index}>{text}</Fragment>
}

// Render an element node
const renderElementNode = (
  node: SerializedElementNode,
  index: number,
  highlightedCodeBlocks?: Map<string, string>
): ReactNode => {
  // Handle block nodes first (they may not have renderable children)
  if (node.type === 'block') {
    const blockNode = node as BlockNode
    if (blockNode.fields.blockType === 'codeBlock') {
      const { language, code } = blockNode.fields

      // Handle Mermaid diagrams
      if (language?.toLowerCase() === 'mermaid' && code) {
        return (
          <MermaidDiagram
            key={index}
            code={code}
            id={`mermaid-${blockNode.id || index}`}
          />
        )
      }

      // Check for pre-highlighted code
      const blockId = blockNode.id
      if (blockId && highlightedCodeBlocks?.has(blockId)) {
        const highlightedHTML = highlightedCodeBlocks.get(blockId)!
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: highlightedHTML }}
          />
        )
      }

      // Fallback to plain code block
      if (code) {
        return (
          <pre key={index}>
            <code>{code}</code>
          </pre>
        )
      }
    }
  }

  const children = node.children.map((child, childIndex) =>
    renderNode(child, childIndex, highlightedCodeBlocks)
  )

  switch (node.type) {
    case 'paragraph':
      return <p key={index}>{children}</p>

    case 'heading': {
      const headingNode = node as SerializedElementNode & { tag: string }
      const HeadingTag = headingNode.tag as
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
      return <HeadingTag key={index}>{children}</HeadingTag>
    }

    case 'list': {
      const listNode = node as SerializedElementNode & { listType: string }
      const ListTag = listNode.listType === 'number' ? 'ol' : 'ul'
      return <ListTag key={index}>{children}</ListTag>
    }

    case 'listitem':
      return <li key={index}>{children}</li>

    case 'quote':
      return <blockquote key={index}>{children}</blockquote>

    case 'link': {
      const linkNode = node as SerializedElementNode & {
        fields: { url: string }
      }
      return (
        <a
          key={index}
          href={linkNode.fields.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )
    }

    default:
      return <div key={index}>{children}</div>
  }
}

// Render any node
const renderNode = (
  node: unknown,
  index: number,
  highlightedCodeBlocks?: Map<string, string>
): ReactNode => {
  if (isTextNode(node)) {
    return renderTextNode(node, index)
  }

  if (isElementNode(node)) {
    return renderElementNode(node, index, highlightedCodeBlocks)
  }

  return null
}

export const PayloadRichText = ({
  data,
  highlightedCodeBlocks,
}: PayloadRichTextProps) => {
  const renderContent = (editorState: SerializedEditorState) => {
    if (
      !editorState.root ||
      !('children' in editorState.root) ||
      !Array.isArray(editorState.root.children)
    ) {
      return null
    }

    return editorState.root.children.map((child, index) =>
      renderNode(child, index, highlightedCodeBlocks)
    )
  }

  return <div data-testid="payload-rich-text">{renderContent(data)}</div>
}
