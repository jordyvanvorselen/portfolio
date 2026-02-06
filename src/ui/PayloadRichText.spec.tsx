import { render, screen } from '@testing-library/react'
import type { SerializedEditorState } from '@/types/lexical'

import { PayloadRichText } from '@/ui/PayloadRichText'

describe('PayloadRichText', () => {
  it('renders simple paragraph content', () => {
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

    render(<PayloadRichText data={editorState} />)

    expect(screen.getByText('Hello world')).toBeVisible()
  })

  it('renders empty content when root has no children', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    } as unknown as SerializedEditorState

    render(<PayloadRichText data={editorState} />)

    const richText = screen.getByTestId('payload-rich-text')
    expect(richText).toBeVisible()
    expect(richText).toHaveTextContent('')
  })

  it('renders empty content when root is malformed', () => {
    const editorState = {
      root: null,
    } as unknown as SerializedEditorState

    render(<PayloadRichText data={editorState} />)

    const richText = screen.getByTestId('payload-rich-text')
    expect(richText).toBeVisible()
    expect(richText).toHaveTextContent('')
  })
})
