import { Fragment, type ReactNode } from 'react'
import Image from 'next/image'
import type { SerializedEditorState } from '@/types/lexical'
import type { SerializedElementNode, SerializedTextNode } from '@/types/lexical'
import { MermaidDiagram } from '@/ui/MermaidDiagram'

export interface PayloadRichTextProps {
  data: SerializedEditorState
  highlightedCodeBlocks?: Map<string, string>
}

interface BlockNode extends SerializedElementNode {
  type: 'block'
  fields: {
    id?: string
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

const isBlockNode = (node: unknown): node is BlockNode => {
  return (
    typeof node === 'object' &&
    node !== null &&
    'type' in node &&
    node.type === 'block' &&
    'fields' in node
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
    text = (
      <code className="bg-gray-800 text-teal-300 px-1.5 py-0.5 rounded text-sm font-mono">
        {text}
      </code>
    )
  }
  if (isBold) {
    text = <strong className="font-semibold text-white">{text}</strong>
  }
  if (isItalic) {
    text = <em className="italic text-gray-200">{text}</em>
  }
  if (isUnderline) {
    text = <u className="underline decoration-1 underline-offset-2">{text}</u>
  }

  return <Fragment key={index}>{text}</Fragment>
}

const headingClasses: Record<string, string> = {
  h1: 'text-4xl font-bold text-white mb-8 mt-12 first:mt-0',
  h2: 'text-3xl font-semibold text-white mb-6 mt-10',
  h3: 'text-2xl font-semibold text-white mb-5 mt-8',
  h4: 'text-xl font-semibold text-white mb-4 mt-6',
  h5: 'text-lg font-semibold text-white mb-4 mt-6',
  h6: 'text-base font-semibold text-white mb-3 mt-5',
}

// Render a block node (may not have children)
const renderBlockNode = (
  node: BlockNode,
  index: number,
  highlightedCodeBlocks?: Map<string, string>
): ReactNode => {
  if (node.fields.blockType === 'codeBlock') {
    const { language, code } = node.fields

    // Handle Mermaid diagrams
    if (language?.toLowerCase() === 'mermaid' && code) {
      return (
        <MermaidDiagram
          key={index}
          code={code}
          id={`mermaid-${node.fields.id || index}`}
        />
      )
    }

    // Check for pre-highlighted code
    const blockId = node.fields.id
    if (blockId && highlightedCodeBlocks?.has(blockId)) {
      const highlightedHTML = highlightedCodeBlocks.get(blockId)!
      return (
        <div
          key={index}
          className="my-8 rounded-2xl border-2 border-gray-700/50 shadow-2xl backdrop-blur-sm overflow-hidden group relative transition-all duration-500 hover:border-gray-600/70 hover:shadow-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-gray-900 via-black via-80% to-black" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/15 to-blue-500/15 opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
          <div
            className="overflow-x-auto relative z-10 [&_.shiki]:!bg-transparent [&_.shiki]:m-0 [&_.shiki]:p-6 [&_.shiki]:text-md [&_.shiki]:leading-relaxed [&_.shiki_pre]:!bg-transparent [&_.shiki_pre]:m-0 [&_.shiki_pre]:p-6 [&_.shiki_code]:font-mono"
            dangerouslySetInnerHTML={{ __html: highlightedHTML }}
          />
        </div>
      )
    }

    // Fallback to plain code block
    if (code) {
      return (
        <div
          key={index}
          className="my-8 rounded-2xl border-2 border-gray-700/50 shadow-2xl backdrop-blur-sm overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-gray-900 via-black via-80% to-black" />
          <pre className="p-6 overflow-x-auto relative z-10 m-0 bg-transparent text-sm leading-relaxed font-mono">
            <code className="text-gray-100 font-mono">{code}</code>
          </pre>
        </div>
      )
    }
  }

  // Unknown block type — render children if present
  if ('children' in node && Array.isArray(node.children)) {
    const children = node.children.map((child, childIndex) =>
      renderNode(child, childIndex, highlightedCodeBlocks)
    )
    return <div key={index}>{children}</div>
  }

  return null
}

// Render an element node
const renderElementNode = (
  node: SerializedElementNode,
  index: number,
  highlightedCodeBlocks?: Map<string, string>
): ReactNode => {
  // Handle upload nodes (images)
  if (node.type === 'upload') {
    const uploadNode = node as SerializedElementNode & {
      value: { url: string; alt?: string; width?: number; height?: number }
    }
    return (
      <Image
        key={index}
        src={uploadNode.value.url}
        alt={uploadNode.value.alt ?? ''}
        width={uploadNode.value.width ?? 800}
        height={uploadNode.value.height ?? 400}
      />
    )
  }

  const children = node.children.map((child, childIndex) =>
    renderNode(child, childIndex, highlightedCodeBlocks)
  )

  switch (node.type) {
    case 'paragraph':
      return (
        <p key={index} className="mb-6 text-gray-300 leading-relaxed text-xl">
          {children}
        </p>
      )

    case 'heading': {
      const headingNode = node as SerializedElementNode & { tag: string }
      const HeadingTag = headingNode.tag as
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
      return (
        <HeadingTag key={index} className={headingClasses[HeadingTag]}>
          {children}
        </HeadingTag>
      )
    }

    case 'list': {
      const listNode = node as SerializedElementNode & { listType: string }
      const { listType } = listNode
      const isOrdered = listType === 'number'
      const isChecklist = listType === 'check'
      const ListTag = isOrdered ? 'ol' : 'ul'
      const listStyleClass = isOrdered
        ? ' list-decimal'
        : isChecklist
          ? ' list-none pl-0'
          : ' list-disc'
      return (
        <ListTag
          key={index}
          className={`mb-6 pl-6 space-y-2 text-gray-300 text-xl${listStyleClass}`}
        >
          {children}
        </ListTag>
      )
    }

    case 'listitem': {
      const listItemNode = node as SerializedElementNode & {
        checked?: boolean
      }
      if (listItemNode.checked !== undefined) {
        return (
          <li
            key={index}
            className="flex items-start gap-3 leading-relaxed list-none"
          >
            <input
              type="checkbox"
              checked={listItemNode.checked}
              readOnly
              className="mt-1.5 h-4 w-4 rounded border-gray-600 bg-gray-800 accent-teal-500"
            />
            <span>{children}</span>
          </li>
        )
      }
      return (
        <li key={index} className="leading-relaxed">
          {children}
        </li>
      )
    }

    case 'quote':
      return (
        <blockquote
          key={index}
          className="border-l-4 border-teal-500 pl-6 pt-6 py-2 mb-6 text-gray-300 text-xl italic bg-gray-800/30 rounded-r"
        >
          {children}
        </blockquote>
      )

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
          className="text-teal-400 hover:text-teal-300 underline decoration-1 underline-offset-2 transition-colors duration-200"
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

  if (isBlockNode(node)) {
    return renderBlockNode(node, index, highlightedCodeBlocks)
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
