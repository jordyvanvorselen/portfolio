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

  it('renders heading content', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            tag: 'h1',
            children: [
              {
                type: 'text',
                text: 'Main Title',
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

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeVisible()
    expect(heading).toHaveTextContent('Main Title')
  })

  it('renders bold text formatting', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Bold text',
                format: 1, // 1 = bold
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

    expect(screen.getByText('Bold text')).toBeVisible()
    expect(screen.getByText('Bold text').tagName).toBe('STRONG')
  })

  it('renders italic text formatting', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Italic text',
                format: 2, // 2 = italic
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

    expect(screen.getByText('Italic text').tagName).toBe('EM')
  })

  it('renders underlined text formatting', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Underlined text',
                format: 8, // 8 = underline
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

    expect(screen.getByText('Underlined text').tagName).toBe('U')
  })

  it('renders inline code formatting', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'code snippet',
                format: 16, // 16 = code
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

    expect(screen.getByText('code snippet').tagName).toBe('CODE')
  })

  it('renders unordered lists with bullet markers', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'list',
            listType: 'bullet',
            children: [
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Item 1',
                    format: 0,
                    version: 1,
                  },
                ],
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

    const list = screen.getByRole('list')
    expect(list.tagName).toBe('UL')
    expect(list.className).toContain('list-disc')
    expect(screen.getByText('Item 1')).toBeVisible()
  })

  it('renders ordered lists', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'list',
            listType: 'number',
            children: [
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Step 1',
                    format: 0,
                    version: 1,
                  },
                ],
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

    const list = screen.getByRole('list')
    expect(list.tagName).toBe('OL')
    expect(screen.getByText('Step 1')).toBeVisible()
  })

  it('renders checklists with checked and unchecked items', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'list',
            listType: 'check',
            children: [
              {
                type: 'listitem',
                checked: true,
                children: [
                  {
                    type: 'text',
                    text: 'Completed task',
                    format: 0,
                    version: 1,
                  },
                ],
                version: 1,
              },
              {
                type: 'listitem',
                checked: false,
                children: [
                  {
                    type: 'text',
                    text: 'Pending task',
                    format: 0,
                    version: 1,
                  },
                ],
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

    expect(screen.getByText('Completed task')).toBeVisible()
    expect(screen.getByText('Pending task')).toBeVisible()

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(2)
    expect(checkboxes[0]).toBeChecked()
    expect(checkboxes[1]).not.toBeChecked()
  })

  it('renders blockquotes', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'quote',
            children: [
              {
                type: 'text',
                text: 'A quote',
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

    expect(screen.getByText('A quote').closest('blockquote')).toBeVisible()
  })

  it('renders links', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'link',
                fields: {
                  url: 'https://example.com',
                },
                children: [
                  {
                    type: 'text',
                    text: 'Click here',
                    format: 0,
                    version: 1,
                  },
                ],
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

    const link = screen.getByRole('link', { name: 'Click here' })
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders unknown node types with default div wrapper', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'unknown-custom-node',
            children: [
              {
                type: 'text',
                text: 'Custom content',
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

    expect(screen.getByText('Custom content')).toBeVisible()
  })

  it('handles non-element non-text nodes gracefully', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              null, // Invalid node
              {
                type: 'text',
                text: 'Valid text',
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

    expect(screen.getByText('Valid text')).toBeVisible()
  })

  it('renders Mermaid diagrams from code blocks', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'block',
            fields: {
              blockType: 'codeBlock',
              language: 'mermaid',
              code: 'graph TD\n  A-->B',
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

    render(<PayloadRichText data={editorState} />)

    // MermaidDiagram component renders a div with data-testid
    expect(screen.getByTestId('mermaid-diagram')).toBeVisible()
  })

  it('renders code blocks without highlighting', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'block',
            fields: {
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

    render(<PayloadRichText data={editorState} />)

    expect(screen.getByText('console.log("hello")')).toBeVisible()
  })

  it('renders code blocks with pre-highlighted Shiki HTML', () => {
    const highlightedCodeBlocks: Record<string, string> = {
      'block-1': '<pre class="shiki">Highlighted code</pre>',
    }

    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'block',
            fields: {
              id: 'block-1',
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

    render(
      <PayloadRichText
        data={editorState}
        highlightedCodeBlocks={highlightedCodeBlocks}
      />
    )

    expect(screen.getByText('Highlighted code')).toBeVisible()
  })

  it('renders code block with undefined language as plain code', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'block',
            fields: {
              blockType: 'codeBlock',
              language: undefined,
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

    render(<PayloadRichText data={editorState} />)

    expect(screen.getByText('console.log("test")')).toBeVisible()
  })

  it('renders empty content when code block has no code', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'block',
            fields: {
              blockType: 'codeBlock',
              language: 'javascript',
              code: undefined,
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

    render(<PayloadRichText data={editorState} />)

    const richText = screen.getByTestId('payload-rich-text')
    expect(richText).toBeVisible()
    expect(richText).toHaveTextContent('')
  })

  it('renders upload nodes as images', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'upload',
            fields: null,
            value: {
              url: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935',
              alt: 'Python programming',
              width: 800,
              height: 400,
            },
            relationTo: 'media',
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

    render(<PayloadRichText data={editorState} />)

    const image = screen.getByRole('img', { name: 'Python programming' })
    expect(image).toBeVisible()
    expect(image.getAttribute('src')).toContain(
      'images.unsplash.com%2Fphoto-1526379095098-d400fd0bf935'
    )
    expect(image).toHaveAttribute('width', '800')
    expect(image).toHaveAttribute('height', '400')
  })

  it('renders upload nodes with missing alt as empty string', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'upload',
            fields: null,
            value: {
              url: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935',
            },
            relationTo: 'media',
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

    render(<PayloadRichText data={editorState} />)

    const image = screen.getByRole('presentation')
    expect(image).toBeVisible()
    expect(image).toHaveAttribute('alt', '')
    expect(image).toHaveAttribute('width', '800')
    expect(image).toHaveAttribute('height', '400')
  })

  it('renders code blocks without children property', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'block',
            fields: {
              id: 'block-no-children',
              blockType: 'codeBlock',
              language: 'typescript',
              code: 'const x: number = 42;',
            },
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

    expect(screen.getByText('const x: number = 42;')).toBeVisible()
  })

  it('renders nothing for unknown block types without children', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'block',
            fields: {
              blockType: 'customBlock',
            },
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

    const richText = screen.getByTestId('payload-rich-text')
    expect(richText).toBeVisible()
    expect(richText).toHaveTextContent('')
  })

  it('renders unknown block types with default div wrapper', () => {
    const editorState: SerializedEditorState = {
      root: {
        type: 'root',
        children: [
          {
            type: 'block',
            fields: {
              blockType: 'customBlock',
            },
            children: [
              {
                type: 'text',
                text: 'Custom block content',
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

    expect(screen.getByText('Custom block content')).toBeVisible()
  })
})
