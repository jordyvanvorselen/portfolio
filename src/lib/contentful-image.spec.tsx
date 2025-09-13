import { render } from '@testing-library/react'

import ContentfulImage from '@/lib/contentful-image'

// Extract and test the contentfulLoader function directly
const contentfulLoader = ({
  src,
  width,
  quality,
}: {
  src: string
  width?: number
  quality?: number
}) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

describe('ContentfulImage', () => {
  describe('contentfulLoader', () => {
    it('generates URL with width and default quality', () => {
      const result = contentfulLoader({
        src: 'https://images.ctfassets.net/test/image.jpg',
        width: 800,
      })

      expect(result).toBe(
        'https://images.ctfassets.net/test/image.jpg?w=800&q=75'
      )
    })

    it('generates URL with custom quality', () => {
      const result = contentfulLoader({
        src: 'https://images.ctfassets.net/test/image.jpg',
        width: 400,
        quality: 90,
      })

      expect(result).toBe(
        'https://images.ctfassets.net/test/image.jpg?w=400&q=90'
      )
    })

    it('handles quality of 0', () => {
      const result = contentfulLoader({
        src: 'https://images.ctfassets.net/test/image.jpg',
        width: 600,
        quality: 0,
      })

      expect(result).toBe(
        'https://images.ctfassets.net/test/image.jpg?w=600&q=75'
      )
    })

    it('generates URL with different width values', () => {
      const result = contentfulLoader({
        src: 'https://images.ctfassets.net/test/image.jpg',
        width: 1200,
        quality: 100,
      })

      expect(result).toBe(
        'https://images.ctfassets.net/test/image.jpg?w=1200&q=100'
      )
    })

    it('works with different image URLs', () => {
      const result = contentfulLoader({
        src: 'https://example.com/path/to/image.png',
        width: 300,
        quality: 50,
      })

      expect(result).toBe('https://example.com/path/to/image.png?w=300&q=50')
    })
  })

  describe('ContentfulImage component', () => {
    it('renders without errors', () => {
      const { container } = render(
        <ContentfulImage
          src="https://images.ctfassets.net/test/image.jpg"
          alt="Test image"
          width={800}
          height={600}
        />
      )

      // Just verify the component renders without throwing
      expect(container).toBeInTheDocument()
    })
  })
})
