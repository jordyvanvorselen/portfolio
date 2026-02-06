import type {
  SerializedEditorState,
  SerializedRootNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from '@/types/lexical'

import {
  formatDate,
  calculateReadTime,
  extractTextFromRichText,
  truncateDescription,
  ensureAbsoluteUrl,
} from '@/lib/blog-helpers'

describe('blog-helpers', () => {
  describe('formatDate', () => {
    it('formats date in default locale (en-US)', () => {
      const result = formatDate('2024-01-15')
      expect(result).toBe('January 15, 2024')
    })

    it('formats date in different locale', () => {
      const result = formatDate('2024-01-15', 'en-GB')
      expect(result).toBe('15 January 2024')
    })

    it('handles different date formats', () => {
      const result = formatDate('2024-12-25T10:30:00Z')
      expect(result).toBe('December 25, 2024')
    })

    it('formats edge case dates correctly', () => {
      const result = formatDate('2024-02-29') // Leap year
      expect(result).toBe('February 29, 2024')
    })
  })

  describe('extractTextFromRichText', () => {
    it('extracts text from simple Lexical document', () => {
      const document = {
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
                } as SerializedTextNode,
              ],
              version: 1,
            } as SerializedParagraphNode,
          ],
          direction: null,
          format: '',
          indent: 0,
          version: 1,
        } as SerializedRootNode,
      } as unknown as SerializedEditorState

      const result = extractTextFromRichText(document)
      expect(result).toBe('Hello world')
    })

    it('extracts text from nested Lexical document', () => {
      const document = {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'First paragraph',
                  format: 0,
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Second paragraph',
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

      const result = extractTextFromRichText(document)
      expect(result).toBe('First paragraph Second paragraph')
    })

    it('handles empty document', () => {
      const document = {
        root: {
          type: 'root',
          children: [],
          direction: null,
          format: '',
          indent: 0,
          version: 1,
        },
      } as unknown as SerializedEditorState

      const result = extractTextFromRichText(document)
      expect(result).toBe('')
    })

    it('extracts text from complex nested structure', () => {
      const document = {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h1',
              children: [
                {
                  type: 'text',
                  text: 'Title',
                  format: 0,
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'This is ',
                  format: 0,
                  version: 1,
                },
                {
                  type: 'text',
                  text: 'bold text',
                  format: 1,
                  version: 1,
                },
                {
                  type: 'text',
                  text: ' in a paragraph.',
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

      const result = extractTextFromRichText(document)
      expect(result).toBe('Title This is bold text in a paragraph.')
    })

    it('extracts text from quote nodes', () => {
      const document = {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Regular text',
                  format: 0,
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'quote',
              children: [
                {
                  type: 'text',
                  text: 'This is a quote',
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

      const result = extractTextFromRichText(document)
      expect(result).toBe('Regular text This is a quote')
    })

    it('handles non-block-level element nodes without adding space', () => {
      const document = {
        root: {
          type: 'root',
          children: [
            {
              type: 'list',
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
                {
                  type: 'listitem',
                  children: [
                    {
                      type: 'text',
                      text: 'Item 2',
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

      const result = extractTextFromRichText(document)
      expect(result).toBe('Item 1Item 2')
    })
  })

  describe('calculateReadTime', () => {
    it('calculates read time for short content', () => {
      const document = {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Short text',
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

      const result = calculateReadTime(document)
      expect(result).toBe('1 min read')
    })

    it('calculates read time for longer content', () => {
      // Create content with approximately 400 words (should be 2 min read)
      const longText = 'word '.repeat(400).trim()
      const document = {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: longText,
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

      const result = calculateReadTime(document)
      expect(result).toBe('2 min read')
    })

    it('calculates read time for empty content', () => {
      const document = {
        root: {
          type: 'root',
          children: [],
          direction: null,
          format: '',
          indent: 0,
          version: 1,
        },
      } as unknown as SerializedEditorState

      const result = calculateReadTime(document)
      expect(result).toBe('1 min read') // Always at least 1 min due to Math.ceil
    })

    it('calculates read time for content with exactly 200 words', () => {
      const exactText = 'word '.repeat(200).trim()
      const document = {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: exactText,
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

      const result = calculateReadTime(document)
      expect(result).toBe('1 min read')
    })
  })

  describe('truncateDescription', () => {
    it('returns text unchanged when shorter than max length', () => {
      const text = 'Short description'
      const result = truncateDescription(text, 150)
      expect(result).toBe('Short description')
    })

    it('truncates text when longer than max length', () => {
      const longText =
        'This is a very long description that exceeds the maximum length and should be truncated with ellipsis at the end'
      const result = truncateDescription(longText, 50)
      expect(result).toBe(
        'This is a very long description that exceeds the m...'
      )
    })

    it('uses default max length of 150', () => {
      const longText = 'a'.repeat(200)
      const result = truncateDescription(longText)
      expect(result).toBe('a'.repeat(150) + '...')
    })

    it('handles empty string', () => {
      const result = truncateDescription('', 150)
      expect(result).toBe('')
    })

    it('handles text exactly at max length', () => {
      const exactText = 'a'.repeat(150)
      const result = truncateDescription(exactText, 150)
      expect(result).toBe(exactText)
    })

    it('trims whitespace before adding ellipsis', () => {
      const textWithSpaces = 'This is text with trailing spaces     '
      const result = truncateDescription(textWithSpaces, 20)
      expect(result).toBe('This is text with tr...')
    })
  })

  describe('ensureAbsoluteUrl', () => {
    it('converts protocol-relative URLs to HTTPS', () => {
      const protocolRelativeUrl = '//images.ctfassets.net/space/image.jpg'
      const result = ensureAbsoluteUrl(protocolRelativeUrl)
      expect(result).toBe('https://images.ctfassets.net/space/image.jpg')
    })

    it('converts HTTP URLs to HTTPS', () => {
      const httpUrl = 'http://images.ctfassets.net/space/image.jpg'
      const result = ensureAbsoluteUrl(httpUrl)
      expect(result).toBe('https://images.ctfassets.net/space/image.jpg')
    })

    it('leaves HTTPS URLs unchanged', () => {
      const httpsUrl = 'https://images.ctfassets.net/space/image.jpg'
      const result = ensureAbsoluteUrl(httpsUrl)
      expect(result).toBe('https://images.ctfassets.net/space/image.jpg')
    })

    it('leaves relative URLs unchanged', () => {
      const relativeUrl = '/local/image.jpg'
      const result = ensureAbsoluteUrl(relativeUrl)
      expect(result).toBe('/local/image.jpg')
    })

    it('returns empty string for undefined input', () => {
      const result = ensureAbsoluteUrl(undefined)
      expect(result).toBe('')
    })

    it('returns empty string for empty string input', () => {
      const result = ensureAbsoluteUrl('')
      expect(result).toBe('')
    })
  })
})
