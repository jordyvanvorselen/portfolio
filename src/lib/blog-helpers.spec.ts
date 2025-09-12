import type { Document } from '@contentful/rich-text-types'

import { 
  formatDate, 
  calculateReadTime, 
  extractTextFromRichText, 
  truncateDescription 
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
    it('extracts text from simple rich text document', () => {
      const document: Document = {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'Hello world',
                marks: [],
                data: {}
              }
            ]
          }
        ]
      }

      const result = extractTextFromRichText(document)
      expect(result).toBe('Hello world')
    })

    it('extracts text from nested rich text document', () => {
      const document: Document = {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'First paragraph',
                marks: [],
                data: {}
              }
            ]
          },
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'Second paragraph',
                marks: [],
                data: {}
              }
            ]
          }
        ]
      }

      const result = extractTextFromRichText(document)
      expect(result).toBe('First paragraph Second paragraph')
    })

    it('handles empty document', () => {
      const document: Document = {
        nodeType: 'document',
        data: {},
        content: []
      }

      const result = extractTextFromRichText(document)
      expect(result).toBe('')
    })

    it('extracts text from complex nested structure', () => {
      const document: Document = {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'heading-1',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'Title',
                marks: [],
                data: {}
              }
            ]
          },
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'This is ',
                marks: [],
                data: {}
              },
              {
                nodeType: 'text',
                value: 'bold text',
                marks: [{ type: 'bold' }],
                data: {}
              },
              {
                nodeType: 'text',
                value: ' in a paragraph.',
                marks: [],
                data: {}
              }
            ]
          }
        ]
      }

      const result = extractTextFromRichText(document)
      expect(result).toBe('Title This is  bold text  in a paragraph.')
    })
  })

  describe('calculateReadTime', () => {
    it('calculates read time for short content', () => {
      const document: Document = {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'Short text',
                marks: [],
                data: {}
              }
            ]
          }
        ]
      }

      const result = calculateReadTime(document)
      expect(result).toBe('1 min read')
    })

    it('calculates read time for longer content', () => {
      // Create content with approximately 400 words (should be 2 min read)
      const longText = 'word '.repeat(400).trim()
      const document: Document = {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: longText,
                marks: [],
                data: {}
              }
            ]
          }
        ]
      }

      const result = calculateReadTime(document)
      expect(result).toBe('2 min read')
    })

    it('calculates read time for empty content', () => {
      const document: Document = {
        nodeType: 'document',
        data: {},
        content: []
      }

      const result = calculateReadTime(document)
      expect(result).toBe('1 min read') // Always at least 1 min due to Math.ceil
    })

    it('calculates read time for content with exactly 200 words', () => {
      const exactText = 'word '.repeat(200).trim()
      const document: Document = {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: exactText,
                marks: [],
                data: {}
              }
            ]
          }
        ]
      }

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
      const longText = 'This is a very long description that exceeds the maximum length and should be truncated with ellipsis at the end'
      const result = truncateDescription(longText, 50)
      expect(result).toBe('This is a very long description that exceeds the m...')
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
})