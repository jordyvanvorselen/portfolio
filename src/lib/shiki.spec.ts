import { describe, it, expect } from 'vitest'
import { highlightCode } from '@/lib/shiki'

describe('shiki highlighter', () => {
  describe('highlightCode', () => {
    it('highlights JavaScript code with syntax highlighting', async () => {
      const code = 'const greeting = "Hello, World!"'
      const language = 'javascript'

      const result = await highlightCode(code, language)

      expect(result).toContain('<pre')
      expect(result).toContain('const')
      expect(result).toContain('Hello, World!')
      expect(result).toContain('class=')
    })

    it('handles TypeScript code highlighting', async () => {
      const code = 'interface User { name: string; }'
      const language = 'typescript'

      const result = await highlightCode(code, language)

      expect(result).toContain('<pre')
      expect(result).toContain('interface')
      expect(result).toContain('User')
      expect(result).toContain('string')
    })

    it('handles case-insensitive language names', async () => {
      const code = 'console.log("test")'
      const language = 'JAVASCRIPT'

      const result = await highlightCode(code, language)

      expect(result).toContain('<pre')
      expect(result).toContain('console')
    })

    it('provides fallback for unsupported languages', async () => {
      const code = 'some random code'
      const language = 'unsupported-language'

      const result = await highlightCode(code, language)

      expect(result).toContain('<pre><code>')
      expect(result).toContain('some random code')
    })

    it('escapes HTML entities in fallback mode', async () => {
      const code = 'const html = "<div>Hello & goodbye</div>"'
      const language = 'unsupported-language'

      const result = await highlightCode(code, language)

      expect(result).toContain('&lt;div&gt;')
      expect(result).toContain('&amp;')
      expect(result).toContain('&quot;')
    })
  })
})
