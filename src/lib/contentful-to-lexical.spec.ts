import {
  computeFormat,
  transformNode,
  transformChildren,
  transformRichText,
  FORMAT_MAP,
} from '@/lib/contentful-to-lexical'
import type {
  ContentfulNode,
  LinkedEntriesMap,
  LexicalElementNode,
} from '@/lib/contentful-to-lexical'

const emptyEntries: LinkedEntriesMap = new Map()
const noopWarn = () => {}

describe('contentful-to-lexical', () => {
  describe('computeFormat', () => {
    it('returns 0 for empty marks', () => {
      expect(computeFormat([])).toBe(0)
    })

    it('returns correct bitmask for bold', () => {
      expect(computeFormat([{ type: 'bold' }])).toBe(FORMAT_MAP['bold'])
    })

    it('combines multiple marks into a bitmask', () => {
      const result = computeFormat([{ type: 'bold' }, { type: 'italic' }])
      expect(result).toBe(FORMAT_MAP['bold']! | FORMAT_MAP['italic']!)
    })

    it('ignores unknown mark types', () => {
      expect(computeFormat([{ type: 'unknown' }])).toBe(0)
    })
  })

  describe('transformNode', () => {
    it('transforms text node', () => {
      const node: ContentfulNode = {
        nodeType: 'text',
        value: 'hello',
        marks: [],
      }
      expect(transformNode(node, emptyEntries, noopWarn)).toEqual({
        type: 'text',
        text: 'hello',
        format: 0,
        version: 1,
      })
    })

    it('transforms text node with marks', () => {
      const node: ContentfulNode = {
        nodeType: 'text',
        value: 'bold text',
        marks: [{ type: 'bold' }],
      }
      expect(transformNode(node, emptyEntries, noopWarn)).toEqual({
        type: 'text',
        text: 'bold text',
        format: 1,
        version: 1,
      })
    })

    it('transforms paragraph with required Lexical element fields', () => {
      const node: ContentfulNode = {
        nodeType: 'paragraph',
        content: [{ nodeType: 'text', value: 'hello', marks: [] }],
      }
      const result = transformNode(
        node,
        emptyEntries,
        noopWarn
      ) as LexicalElementNode
      expect(result.type).toBe('paragraph')
      expect(result['indent']).toBe(0)
      expect(result['direction']).toBeNull()
      expect(result['format']).toBe('')
      expect(result.children).toHaveLength(1)
    })

    it('transforms heading with required Lexical element fields', () => {
      const node: ContentfulNode = {
        nodeType: 'heading-2',
        content: [{ nodeType: 'text', value: 'Title', marks: [] }],
      }
      const result = transformNode(
        node,
        emptyEntries,
        noopWarn
      ) as LexicalElementNode
      expect(result.type).toBe('heading')
      expect(result['tag']).toBe('h2')
      expect(result['indent']).toBe(0)
      expect(result['direction']).toBeNull()
      expect(result['format']).toBe('')
    })

    it('transforms ordered list with required Lexical element fields', () => {
      const node: ContentfulNode = {
        nodeType: 'ordered-list',
        content: [],
      }
      const result = transformNode(
        node,
        emptyEntries,
        noopWarn
      ) as LexicalElementNode
      expect(result.type).toBe('list')
      expect(result['listType']).toBe('number')
      expect(result['indent']).toBe(0)
      expect(result['direction']).toBeNull()
      expect(result['format']).toBe('')
    })

    it('transforms unordered list with required Lexical element fields', () => {
      const node: ContentfulNode = {
        nodeType: 'unordered-list',
        content: [],
      }
      const result = transformNode(
        node,
        emptyEntries,
        noopWarn
      ) as LexicalElementNode
      expect(result.type).toBe('list')
      expect(result['listType']).toBe('bullet')
      expect(result['indent']).toBe(0)
      expect(result['direction']).toBeNull()
      expect(result['format']).toBe('')
    })

    it('transforms list item with required Lexical element fields', () => {
      const node: ContentfulNode = {
        nodeType: 'list-item',
        content: [{ nodeType: 'text', value: 'item', marks: [] }],
      }
      const result = transformNode(
        node,
        emptyEntries,
        noopWarn
      ) as LexicalElementNode
      expect(result.type).toBe('listitem')
      expect(result['indent']).toBe(0)
      expect(result['direction']).toBeNull()
      expect(result['format']).toBe('')
    })

    it('transforms blockquote with required Lexical element fields', () => {
      const node: ContentfulNode = {
        nodeType: 'blockquote',
        content: [{ nodeType: 'text', value: 'quote', marks: [] }],
      }
      const result = transformNode(
        node,
        emptyEntries,
        noopWarn
      ) as LexicalElementNode
      expect(result.type).toBe('quote')
      expect(result['indent']).toBe(0)
      expect(result['direction']).toBeNull()
      expect(result['format']).toBe('')
    })

    it('transforms hyperlink with required Lexical element fields', () => {
      const node: ContentfulNode = {
        nodeType: 'hyperlink',
        data: { uri: 'https://example.com' },
        content: [{ nodeType: 'text', value: 'link', marks: [] }],
      }
      const result = transformNode(
        node,
        emptyEntries,
        noopWarn
      ) as LexicalElementNode
      expect(result.type).toBe('link')
      expect(result['indent']).toBe(0)
      expect(result['direction']).toBeNull()
      expect(result['format']).toBe('')
    })

    it('transforms horizontal rule', () => {
      const node: ContentfulNode = { nodeType: 'hr' }
      expect(transformNode(node, emptyEntries, noopWarn)).toEqual({
        type: 'horizontalrule',
        version: 1,
      })
    })

    it('transforms embedded code block with required Lexical element fields', () => {
      const entries: LinkedEntriesMap = new Map([
        [
          'entry-1',
          {
            contentTypeId: 'codeBlock',
            fields: { programmingLanguage: 'typescript', code: 'const x = 1' },
          },
        ],
      ])
      const node: ContentfulNode = {
        nodeType: 'embedded-entry-block',
        data: { target: { sys: { id: 'entry-1' } } },
      }
      const result = transformNode(
        node,
        entries,
        noopWarn
      ) as LexicalElementNode
      expect(result.type).toBe('block')
      expect(result['indent']).toBe(0)
      expect(result['direction']).toBeNull()
      expect(result['format']).toBe('')
    })

    it('returns null for hyperlink without uri and warns', () => {
      const warnings: string[] = []
      const node: ContentfulNode = {
        nodeType: 'hyperlink',
        data: {},
        content: [],
      }
      const result = transformNode(node, emptyEntries, msg =>
        warnings.push(msg)
      )
      expect(result).toBeNull()
      expect(warnings[0]).toContain('missing uri')
    })

    it('returns child text node for hyperlink without uri but with single child', () => {
      const node: ContentfulNode = {
        nodeType: 'hyperlink',
        data: {},
        content: [{ nodeType: 'text', value: 'plain', marks: [] }],
      }
      const result = transformNode(node, emptyEntries, noopWarn)
      expect(result).toEqual({
        type: 'text',
        text: 'plain',
        format: 0,
        version: 1,
      })
    })

    it('returns null and warns for unknown node type', () => {
      const warnings: string[] = []
      const node: ContentfulNode = { nodeType: 'unknown-type' }
      const result = transformNode(node, emptyEntries, msg =>
        warnings.push(msg)
      )
      expect(result).toBeNull()
      expect(warnings[0]).toContain('Unknown node type')
    })

    it('returns null for embedded-entry-block without target id', () => {
      const warnings: string[] = []
      const node: ContentfulNode = {
        nodeType: 'embedded-entry-block',
        data: {},
      }
      transformNode(node, emptyEntries, msg => warnings.push(msg))
      expect(warnings[0]).toContain('missing target sys.id')
    })

    it('returns null for unresolved linked entry', () => {
      const warnings: string[] = []
      const node: ContentfulNode = {
        nodeType: 'embedded-entry-block',
        data: { target: { sys: { id: 'missing' } } },
      }
      transformNode(node, emptyEntries, msg => warnings.push(msg))
      expect(warnings[0]).toContain('Could not resolve linked entry')
    })

    it('returns null for unknown embedded entry content type', () => {
      const warnings: string[] = []
      const entries: LinkedEntriesMap = new Map([
        ['e1', { contentTypeId: 'unknown', fields: {} }],
      ])
      const node: ContentfulNode = {
        nodeType: 'embedded-entry-block',
        data: { target: { sys: { id: 'e1' } } },
      }
      transformNode(node, entries, msg => warnings.push(msg))
      expect(warnings[0]).toContain('Unknown embedded entry content type')
    })
  })

  describe('transformChildren', () => {
    it('filters out null nodes', () => {
      const nodes: ContentfulNode[] = [
        { nodeType: 'text', value: 'hello', marks: [] },
        { nodeType: 'unknown-type' },
      ]
      const result = transformChildren(nodes, emptyEntries, noopWarn)
      expect(result).toHaveLength(1)
    })
  })

  describe('transformRichText', () => {
    it('wraps children in a root node with required fields', () => {
      const doc: ContentfulNode = {
        nodeType: 'document',
        content: [
          {
            nodeType: 'paragraph',
            content: [{ nodeType: 'text', value: 'hello', marks: [] }],
          },
        ],
      }
      const result = transformRichText(doc, emptyEntries, noopWarn)
      expect(result.root.type).toBe('root')
      expect(result.root.direction).toBeNull()
      expect(result.root.format).toBe('')
      expect(result.root.indent).toBe(0)
      expect(result.root.version).toBe(1)
      expect(result.root.children).toHaveLength(1)
    })
  })
})
