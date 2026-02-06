import type {
  SerializedEditorState,
  SerializedElementNode,
} from '@/types/lexical'
import { highlightCode } from '@/lib/shiki'

interface BlockNode extends SerializedElementNode {
  type: 'block'
  id?: string
  fields: {
    blockType: string
    language?: string
    code?: string
  }
}

const isBlockNode = (node: unknown): node is BlockNode => {
  return (
    typeof node === 'object' &&
    node !== null &&
    'type' in node &&
    node.type === 'block' &&
    'fields' in node &&
    typeof (node as BlockNode).fields === 'object'
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

async function traverseAndHighlight(
  node: unknown,
  map: Map<string, string>
): Promise<void> {
  if (isBlockNode(node)) {
    const { blockType, language, code } = node.fields
    if (blockType === 'codeBlock' && node.id && code && language) {
      const highlighted = await highlightCode(code, language)
      map.set(node.id, highlighted)
    }
  }

  if (isElementNode(node)) {
    for (const child of node.children) {
      await traverseAndHighlight(child, map)
    }
  }
}

export async function extractAndHighlightCodeBlocks(
  data: SerializedEditorState
): Promise<Map<string, string>> {
  const map = new Map<string, string>()

  if (data.root && 'children' in data.root) {
    for (const child of data.root.children) {
      await traverseAndHighlight(child, map)
    }
  }

  return map
}
