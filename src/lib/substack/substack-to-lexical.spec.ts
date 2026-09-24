import { readFileSync } from 'node:fs'
import path from 'node:path'

import {
  substackToLexical,
  UnsupportedSubstackContentError,
} from '@/lib/substack/substack-to-lexical'

const publishedPost = (slug: string): string =>
  readFileSync(
    path.join(process.cwd(), 'test/fixtures/substack', `${slug}.html`),
    'utf8'
  )

const parse = (html: string): Element => {
  const container = document.createElement('div')
  container.innerHTML = html
  return container
}

const noAssets = {
  uploadImage: async () => {
    throw new Error('no images expected')
  },
  resolveLinkCard: async () => {
    throw new Error('no link cards expected')
  },
  createId: () => 'id-1',
}

describe('substackToLexical', () => {
  it('converts paragraphs to Lexical paragraphs', async () => {
    const state = await substackToLexical(
      parse('<p>Your most experienced senior engineer has just resigned.</p>'),
      noAssets
    )

    expect(state.root.children).toEqual([
      expect.objectContaining({
        type: 'paragraph',
        children: [
          expect.objectContaining({
            type: 'text',
            text: 'Your most experienced senior engineer has just resigned.',
            format: 0,
          }),
        ],
      }),
    ])
  })

  it('keeps bold, italic, strikethrough, underline and inline code as text formats', async () => {
    const state = await substackToLexical(
      parse(
        '<p><strong>DM me</strong> <em>and <code>.rules</code></em> <s>old</s> <u>new</u></p>'
      ),
      noAssets
    )

    const paragraph = state.root.children[0] as unknown as {
      children: { text: string; format: number }[]
    }
    expect(
      paragraph.children.map(({ text, format }) => ({ text, format }))
    ).toEqual([
      { text: 'DM me', format: 1 },
      { text: ' ', format: 0 },
      { text: 'and ', format: 2 },
      { text: '.rules', format: 2 | 16 },
      { text: ' ', format: 0 },
      { text: 'old', format: 4 },
      { text: ' ', format: 0 },
      { text: 'new', format: 8 },
    ])
  })

  it('converts links, keeping their formatted text', async () => {
    const state = await substackToLexical(
      parse(
        '<p>Try <a href="https://github.com/microsoft/apm" rel="">Agent <strong>Package</strong> Manager</a></p>'
      ),
      noAssets
    )

    const paragraph = state.root.children[0] as unknown as {
      children: unknown[]
    }
    expect(paragraph.children[1]).toEqual(
      expect.objectContaining({
        type: 'link',
        id: 'id-1',
        fields: {
          url: 'https://github.com/microsoft/apm',
          newTab: true,
          linkType: 'custom',
        },
        children: [
          expect.objectContaining({ text: 'Agent ', format: 0 }),
          expect.objectContaining({ text: 'Package', format: 1 }),
          expect.objectContaining({ text: ' Manager', format: 0 }),
        ],
      })
    )
  })

  it('keeps only the text of links without an address', async () => {
    const state = await substackToLexical(
      parse('<p><a>Agent Package Manager</a></p>'),
      noAssets
    )

    expect(state.root.children).toEqual([
      expect.objectContaining({
        children: [
          expect.objectContaining({
            type: 'text',
            text: 'Agent Package Manager',
          }),
        ],
      }),
    ])
  })

  it('converts line breaks inside a paragraph', async () => {
    const state = await substackToLexical(
      parse('<p>Friday<br>Monday</p>'),
      noAssets
    )

    const paragraph = state.root.children[0] as unknown as {
      children: { type: string }[]
    }
    expect(paragraph.children.map(({ type }) => type)).toEqual([
      'text',
      'linebreak',
      'text',
    ])
  })

  it('converts section headings', async () => {
    const state = await substackToLexical(
      parse('<h2>Take ownership of your knowledge</h2><h3>Step 1</h3>'),
      noAssets
    )

    expect(state.root.children).toEqual([
      expect.objectContaining({
        type: 'heading',
        tag: 'h2',
        children: [
          expect.objectContaining({ text: 'Take ownership of your knowledge' }),
        ],
      }),
      expect.objectContaining({ type: 'heading', tag: 'h3' }),
    ])
  })

  it('converts quotes, joining their paragraphs with line breaks', async () => {
    const state = await substackToLexical(
      parse(
        '<blockquote><p><em>Why can’t the AI just follow our rules?</em></p><p>Nobody knows.</p></blockquote>'
      ),
      noAssets
    )

    expect(state.root.children).toEqual([
      expect.objectContaining({
        type: 'quote',
        children: [
          expect.objectContaining({
            text: 'Why can’t the AI just follow our rules?',
            format: 2,
          }),
          expect.objectContaining({ type: 'linebreak' }),
          expect.objectContaining({ text: 'Nobody knows.' }),
        ],
      }),
    ])
  })

  it('converts bulleted and numbered lists', async () => {
    const state = await substackToLexical(
      parse(
        '<ul><li><p>Rules</p></li><li><p>Skills</p></li></ul><ol><li>Measure</li></ol>'
      ),
      noAssets
    )

    expect(state.root.children).toEqual([
      expect.objectContaining({
        type: 'list',
        listType: 'bullet',
        tag: 'ul',
        children: [
          expect.objectContaining({
            type: 'listitem',
            value: 1,
            children: [expect.objectContaining({ text: 'Rules' })],
          }),
          expect.objectContaining({ type: 'listitem', value: 2 }),
        ],
      }),
      expect.objectContaining({
        type: 'list',
        listType: 'number',
        tag: 'ol',
        children: [
          expect.objectContaining({
            children: [expect.objectContaining({ text: 'Measure' })],
          }),
        ],
      }),
    ])
  })

  it('uploads images in their original size and keeps the caption', async () => {
    const uploadImage = vitest.fn(async () => 42)
    const state = await substackToLexical(
      parse(
        `<div class="captioned-image-container"><figure><a class="image-link" href="https://substackcdn.com/image/fetch/x"><img src="https://substackcdn.com/image/fetch/w_1456/x.png" width="1456" height="762" data-attrs="{&quot;src&quot;:&quot;https://substack-post-media.s3.amazonaws.com/public/images/robot.png&quot;,&quot;alt&quot;:&quot;A robot ignores a pile of rules&quot;}" alt="A robot ignores a pile of rules"></a><figcaption class="image-caption">Rules get skipped. A failing test doesn’t.</figcaption></figure></div>`
      ),
      { ...noAssets, uploadImage }
    )

    expect(uploadImage).toHaveBeenCalledWith({
      src: 'https://substack-post-media.s3.amazonaws.com/public/images/robot.png',
      alt: 'A robot ignores a pile of rules',
    })
    expect(state.root.children).toEqual([
      {
        id: 'id-1',
        type: 'upload',
        relationTo: 'media',
        value: 42,
        fields: { caption: 'Rules get skipped. A failing test doesn’t.' },
        format: '',
        version: 3,
      },
    ])
  })

  it('uploads images without a caption as plain images', async () => {
    const state = await substackToLexical(
      parse(
        '<div class="captioned-image-container"><figure><img src="https://substackcdn.com/image/fetch/w_1456/cover.png" alt=""></figure></div>'
      ),
      { ...noAssets, uploadImage: async () => 7 }
    )

    expect(state.root.children).toEqual([
      expect.objectContaining({ type: 'upload', value: 7, fields: {} }),
    ])
  })

  it('uploads images without alt text with an empty alt', async () => {
    const uploadImage = vitest.fn(async () => 3)
    await substackToLexical(
      parse(
        '<div class="captioned-image-container"><figure><img src="https://substackcdn.com/image/fetch/w_1456/cover.png"></figure></div>'
      ),
      { ...noAssets, uploadImage }
    )

    expect(uploadImage).toHaveBeenCalledWith({
      src: 'https://substackcdn.com/image/fetch/w_1456/cover.png',
      alt: '',
    })
  })

  it('converts highlighted code to code blocks with their language', async () => {
    const state = await substackToLexical(
      parse(
        '<div class="highlighted_code_block" data-attrs="{&quot;language&quot;:&quot;java&quot;}"><pre class="shiki"><code class="language-java">@Test\nvoid rulesHold() {}</code></pre></div>'
      ),
      noAssets
    )

    expect(state.root.children).toEqual([
      {
        type: 'block',
        format: '',
        version: 2,
        fields: {
          id: 'id-1',
          blockName: '',
          blockType: 'codeBlock',
          language: 'java',
          code: '@Test\nvoid rulesHold() {}',
        },
      },
    ])
  })

  it('converts plain preformatted text to code blocks', async () => {
    const state = await substackToLexical(
      parse('<pre><code>pnpm crosspost</code></pre>'),
      noAssets
    )

    expect(state.root.children).toEqual([
      expect.objectContaining({
        fields: expect.objectContaining({
          blockType: 'codeBlock',
          language: 'text',
          code: 'pnpm crosspost',
        }),
      }),
    ])
  })

  it('converts subscribe widgets to a subscribe block for the same publication', async () => {
    const state = await substackToLexical(
      parse(
        '<div class="subscription-widget-wrap-editor" data-attrs="{&quot;url&quot;:&quot;https://jordyvanvorselen.substack.com/subscribe?&quot;,&quot;text&quot;:&quot;Subscribe&quot;}"><div class="subscription-widget"><div class="preamble"><p class="cta-caption">I write for founders and CTOs of AI-native teams.</p></div><form><input type="email"></form></div></div>'
      ),
      noAssets
    )

    expect(state.root.children).toEqual([
      expect.objectContaining({
        fields: {
          id: 'id-1',
          blockName: '',
          blockType: 'substackSubscribe',
          caption: 'I write for founders and CTOs of AI-native teams.',
          publicationUrl: 'https://jordyvanvorselen.substack.com',
        },
      }),
    ])
  })

  it('converts callouts to a callout block with their own rich text', async () => {
    const state = await substackToLexical(
      parse(
        '<div class="callout-block" data-callout="true"><p>Around 10 engineers share 30+ rules.</p><p>We have <em>and </em>keep freedom.</p></div>'
      ),
      noAssets
    )

    const callout = state.root.children[0] as unknown as {
      fields: { blockType: string; content: { root: { children: unknown[] } } }
    }
    expect(callout.fields.blockType).toBe('callout')
    expect(callout.fields.content.root.children).toEqual([
      expect.objectContaining({
        type: 'paragraph',
        children: [
          expect.objectContaining({
            text: 'Around 10 engineers share 30+ rules.',
          }),
        ],
      }),
      expect.objectContaining({ type: 'paragraph' }),
    ])
  })

  it('converts post embeds to link cards pointing where the post lives', async () => {
    const resolveLinkCard = vitest.fn(async () => ({
      url: '/blog/agents-dont-care-about-your-instructions',
      imageId: 9,
    }))
    const state = await substackToLexical(
      parse(
        `<div class="digest-post-embed" data-attrs="{&quot;title&quot;:&quot;Agents don’t care about your instructions&quot;,&quot;caption&quot;:&quot;Rules get skipped.&quot;,&quot;publishedBylines&quot;:[{&quot;name&quot;:&quot;Jordy van Vorselen&quot;}],&quot;post_date&quot;:&quot;2026-08-22T18:14:36.812Z&quot;,&quot;cover_image&quot;:&quot;https://substack-post-media.s3.amazonaws.com/public/images/cover.png&quot;,&quot;canonical_url&quot;:&quot;https://jordyvanvorselen.substack.com/p/agents-dont-care-about-your-instructions&quot;}"></div>`
      ),
      { ...noAssets, resolveLinkCard }
    )

    expect(resolveLinkCard).toHaveBeenCalledWith({
      title: 'Agents don’t care about your instructions',
      canonicalUrl:
        'https://jordyvanvorselen.substack.com/p/agents-dont-care-about-your-instructions',
      coverImage:
        'https://substack-post-media.s3.amazonaws.com/public/images/cover.png',
    })
    expect(state.root.children).toEqual([
      expect.objectContaining({
        fields: {
          id: 'id-1',
          blockName: '',
          blockType: 'linkCard',
          url: '/blog/agents-dont-care-about-your-instructions',
          title: 'Agents don’t care about your instructions',
          description: 'Rules get skipped.',
          author: 'Jordy van Vorselen',
          publicationDate: '2026-08-22T18:14:36.812Z',
          image: 9,
        },
      }),
    ])
  })

  it('converts post embeds without extras to a bare link card', async () => {
    const state = await substackToLexical(
      parse(
        '<div class="digest-post-embed" data-attrs="{&quot;title&quot;:&quot;Old post&quot;,&quot;canonical_url&quot;:&quot;https://jordyvanvorselen.substack.com/p/old&quot;}"></div>'
      ),
      {
        ...noAssets,
        resolveLinkCard: async () => ({
          url: 'https://jordyvanvorselen.substack.com/p/old',
        }),
      }
    )

    expect(state.root.children).toEqual([
      expect.objectContaining({
        fields: {
          id: 'id-1',
          blockName: '',
          blockType: 'linkCard',
          url: 'https://jordyvanvorselen.substack.com/p/old',
          title: 'Old post',
        },
      }),
    ])
  })

  it('converts the direct message button to a Substack button to the profile', async () => {
    const state = await substackToLexical(
      parse(
        '<div class="directMessage button" data-attrs="{&quot;userId&quot;:121638202,&quot;userName&quot;:&quot;Jordy van Vorselen&quot;}"></div>'
      ),
      noAssets
    )

    expect(state.root.children).toEqual([
      expect.objectContaining({
        fields: {
          id: 'id-1',
          blockName: '',
          blockType: 'substackButton',
          label: 'Message Jordy van Vorselen',
          url: 'https://substack.com/profile/121638202',
        },
      }),
    ])
  })

  it('converts Substack buttons to Substack buttons with the same link', async () => {
    const state = await substackToLexical(
      parse(
        '<p class="button-wrapper" data-attrs="{&quot;url&quot;:&quot;https://substack.com/@jordyvanvorselen/note/p-212295771&quot;,&quot;text&quot;:&quot;Leave a comment&quot;}"><a class="button primary" href="https://substack.com/@jordyvanvorselen/note/p-212295771"><span>Leave a comment</span></a></p>'
      ),
      noAssets
    )

    expect(state.root.children).toEqual([
      expect.objectContaining({
        fields: {
          id: 'id-1',
          blockName: '',
          blockType: 'substackButton',
          label: 'Leave a comment',
          url: 'https://substack.com/@jordyvanvorselen/note/p-212295771',
        },
      }),
    ])
  })

  describe('stops instead of silently dropping content it cannot copy', () => {
    it.each([
      [
        'footnotes',
        '<p>Claim<a class="footnote-anchor" href="#footnote-1">1</a></p>',
        'footnote',
      ],
      [
        'unknown Substack widgets',
        '<div class="poll-embed"></div>',
        'div.poll-embed',
      ],
      ['dividers', '<hr>', 'hr'],
      ['plain containers', '<div><p>Hi</p></div>', 'div'],
      [
        'images without a source',
        '<div class="captioned-image-container"><figure></figure></div>',
        'image without a source',
      ],
      [
        'post embeds without a link',
        '<div class="digest-post-embed" data-attrs="{&quot;title&quot;:&quot;Old post&quot;}"></div>',
        'post embed without a link',
      ],
      ['unknown inline elements', '<p>H<sub>2</sub>O</p>', 'sub'],
    ])('%s', async (_name, html, element) => {
      await expect(substackToLexical(parse(html), noAssets)).rejects.toThrow(
        new UnsupportedSubstackContentError(element)
      )
    })
  })

  it.each([
    ['why-your-team-gets-slower'],
    ['agents-dont-care-about-your-instructions'],
  ])('converts the published post "%s"', async slug => {
    const state = await substackToLexical(parse(publishedPost(slug)), {
      uploadImage: async () => 1,
      resolveLinkCard: async ({ canonicalUrl }) => ({ url: canonicalUrl }),
      createId: () => 'id-1',
    })

    expect(state.root.children.length).toBeGreaterThan(10)
  })
})
