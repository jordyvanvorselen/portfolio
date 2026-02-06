import type { SerializedEditorState } from '@/types/lexical'

export interface PayloadRichTextProps {
  data: SerializedEditorState
  highlightedCodeBlocks?: Map<string, string>
}

export const PayloadRichText = ({ data }: PayloadRichTextProps) => {
  // Simple implementation to render paragraph text
  const renderContent = (editorState: SerializedEditorState) => {
    const paragraphs: string[] = []

    const traverse = (node: unknown): void => {
      if (
        typeof node === 'object' &&
        node !== null &&
        'type' in node &&
        node.type === 'text' &&
        'text' in node
      ) {
        paragraphs.push(node.text as string)
      }

      if (
        typeof node === 'object' &&
        node !== null &&
        'children' in node &&
        Array.isArray((node as { children: unknown[] }).children)
      ) {
        ;(node as { children: unknown[] }).children.forEach(traverse)
      }
    }

    if (
      editorState.root &&
      'children' in editorState.root &&
      Array.isArray(editorState.root.children)
    ) {
      editorState.root.children.forEach(traverse)
    }

    return paragraphs.join(' ')
  }

  return <div data-testid="payload-rich-text">{renderContent(data)}</div>
}
