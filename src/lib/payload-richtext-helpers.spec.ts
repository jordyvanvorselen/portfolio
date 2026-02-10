import { describe, it, expect } from 'vitest'
import type { SerializedEditorState } from '@/types/lexical'

import { extractAndHighlightCodeBlocks } from '@/lib/payload-richtext-helpers'

describe('extractAndHighlightCodeBlocks', () => {
  it('returns empty map when no code blocks present', async () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Hello world',
                format: 0,
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    } as unknown as SerializedEditorState

    const result = await extractAndHighlightCodeBlocks(editorState)

    expect(result).toEqual({})
  })

  it('extracts and highlights code blocks with block IDs', async () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'block',
            fields: {
              id: 'block-123',
              blockType: 'codeBlock',
              language: 'javascript',
              code: 'console.log("hello")',
            },
            children: [],
            version: 1,
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    } as unknown as SerializedEditorState

    const result = await extractAndHighlightCodeBlocks(editorState)

    expect(Object.keys(result)).toHaveLength(1)
    expect(result['block-123']).toBeDefined()
    const highlighted = result['block-123']
    expect(highlighted).toContain('<pre class="shiki')
    expect(highlighted).toContain('console')
    expect(highlighted).toContain('log')
    expect(highlighted).toContain('"hello"')
  })

  it('skips code blocks without block ID', async () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'block',
            // No id property
            fields: {
              blockType: 'codeBlock',
              language: 'javascript',
              code: 'console.log("test")',
            },
            children: [],
            version: 1,
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    } as unknown as SerializedEditorState

    const result = await extractAndHighlightCodeBlocks(editorState)

    expect(result).toEqual({})
  })

  it('handles malformed editor state with no root children', async () => {
    const editorState = {
      root: null,
    } as unknown as SerializedEditorState

    const result = await extractAndHighlightCodeBlocks(editorState)

    expect(result).toEqual({})
  })
})
