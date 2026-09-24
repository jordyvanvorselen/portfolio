import type { SerializedEditorState } from '@/types/lexical'

export interface SubstackEmbeddedPost {
  title: string
  canonicalUrl: string
  coverImage?: string
}

export interface ConvertOptions {
  uploadImage: (image: { src: string; alt: string }) => Promise<number>
  resolveLinkCard: (
    post: SubstackEmbeddedPost
  ) => Promise<{ url: string; imageId?: number }>
  createId: () => string
}

type LexicalNode = Record<string, unknown>

export class UnsupportedSubstackContentError extends Error {
  constructor(element: string) {
    super(
      `The blog cannot show "${element}" from Substack yet. Add support for it before crossposting.`
    )
    this.name = 'UnsupportedSubstackContentError'
  }
}

const PASS_THROUGH_TAGS = new Set(['SPAN'])

const TEXT_NODE = 3

const textNode = (text: string, format: number): LexicalNode => ({
  mode: 'normal',
  text,
  type: 'text',
  style: '',
  detail: 0,
  format,
  version: 1,
})

// Lexical text format bitmask: bold=1, italic=2, strikethrough=4, underline=8, code=16
const FORMAT_BY_TAG: Record<string, number> = {
  STRONG: 1,
  B: 1,
  EM: 2,
  I: 2,
  S: 4,
  DEL: 4,
  U: 8,
  CODE: 16,
}

const convertInline = (
  node: ChildNode,
  format: number,
  options: ConvertOptions
): LexicalNode[] => {
  if (node.nodeType === TEXT_NODE) {
    return [textNode((node as Text).data, format)]
  }
  const element = node as Element
  if (element.tagName === 'BR') {
    return [{ type: 'linebreak', version: 1 }]
  }
  if (element.classList.contains('footnote-anchor')) {
    throw new UnsupportedSubstackContentError('footnote')
  }
  const tagFormat = FORMAT_BY_TAG[element.tagName]
  if (
    tagFormat === undefined &&
    element.tagName !== 'A' &&
    !PASS_THROUGH_TAGS.has(element.tagName)
  ) {
    throw new UnsupportedSubstackContentError(element.tagName.toLowerCase())
  }
  const children = Array.from(element.childNodes).flatMap(child =>
    convertInline(child, format | (tagFormat ?? 0), options)
  )
  const href = element.getAttribute('href')
  if (element.tagName === 'A' && href) {
    return [
      {
        id: options.createId(),
        type: 'link',
        fields: {
          url: href,
          newTab: true,
          linkType: 'custom',
        },
        format: '',
        indent: 0,
        version: 3,
        direction: null,
        children,
      },
    ]
  }
  return children
}

const inlineChildren = (
  element: Element,
  options: ConvertOptions
): LexicalNode[] =>
  Array.from(element.childNodes).flatMap(child =>
    convertInline(child, 0, options)
  )

// Quotes and list items hold inline content only, so their paragraphs become line breaks
const flattenParagraphs = (
  element: Element,
  options: ConvertOptions
): LexicalNode[] => {
  const paragraphs = Array.from(element.children).filter(
    child => child.tagName === 'P'
  )
  if (paragraphs.length === 0) {
    return inlineChildren(element, options)
  }
  return paragraphs.flatMap((paragraph, index) => [
    ...(index > 0 ? [{ type: 'linebreak', version: 1 }] : []),
    ...inlineChildren(paragraph, options),
  ])
}

const elementNode = (
  type: string,
  children: LexicalNode[],
  extra: LexicalNode = {}
): LexicalNode => ({
  type,
  format: '',
  indent: 0,
  version: 1,
  direction: null,
  ...extra,
  children,
})

// Substack stores widget settings as JSON in a data-attrs attribute
const readAttrs = (element: Element | null): Record<string, unknown> => {
  const raw = element?.getAttribute('data-attrs')
  return raw ? (JSON.parse(raw) as Record<string, unknown>) : {}
}

const asString = (value: unknown): string | undefined =>
  typeof value === 'string' && value !== '' ? value : undefined

const required = (value: string | undefined, what: string): string => {
  if (value === undefined) {
    throw new UnsupportedSubstackContentError(what)
  }
  return value
}

const convertImage = async (
  container: Element,
  options: ConvertOptions
): Promise<LexicalNode> => {
  const img = container.querySelector('img')
  const attrs = readAttrs(img)
  const src = required(
    asString(attrs['src']) ?? asString(img?.getAttribute('src')),
    'image without a source'
  )
  const alt = asString(attrs['alt']) ?? img?.getAttribute('alt') ?? ''
  const caption = container.querySelector('figcaption')?.textContent?.trim()

  return {
    id: options.createId(),
    type: 'upload',
    relationTo: 'media',
    value: await options.uploadImage({ src, alt }),
    fields: caption ? { caption } : {},
    format: '',
    version: 3,
  }
}

const blockNode = (
  fields: Record<string, unknown>,
  options: ConvertOptions
): LexicalNode => ({
  type: 'block',
  format: '',
  version: 2,
  fields: { id: options.createId(), blockName: '', ...fields },
})

const convertCode = (
  element: Element,
  language: string | undefined,
  options: ConvertOptions
): LexicalNode =>
  blockNode(
    {
      blockType: 'codeBlock',
      language: language ?? 'text',
      code: element.querySelector('pre')?.textContent ?? element.textContent,
    },
    options
  )

const convertLinkCard = async (
  element: Element,
  options: ConvertOptions
): Promise<LexicalNode> => {
  const attrs = readAttrs(element)
  const title = required(asString(attrs['title']), 'post embed without a title')
  const coverImage = asString(attrs['cover_image'])
  const bylines = attrs['publishedBylines'] as { name?: string }[] | undefined
  const author = asString(bylines?.[0]?.name)
  const description = asString(attrs['caption'])
  const publicationDate = asString(attrs['post_date'])

  const { url, imageId } = await options.resolveLinkCard({
    title,
    canonicalUrl: required(
      asString(attrs['canonical_url']),
      'post embed without a link'
    ),
    ...(coverImage && { coverImage }),
  })

  return blockNode(
    {
      blockType: 'linkCard',
      url,
      title,
      ...(description && { description }),
      ...(author && { author }),
      ...(publicationDate && { publicationDate }),
      ...(imageId !== undefined && { image: imageId }),
    },
    options
  )
}

const convertBlock = async (
  element: Element,
  options: ConvertOptions
): Promise<LexicalNode> => {
  const tag = element.tagName.toLowerCase()

  if (element.classList.contains('captioned-image-container')) {
    return convertImage(element, options)
  }

  if (element.classList.contains('subscription-widget-wrap-editor')) {
    const subscribeUrl = required(
      asString(readAttrs(element)['url']),
      'subscribe widget without a link'
    )
    const caption = element.querySelector('.cta-caption')?.textContent?.trim()
    return blockNode(
      {
        blockType: 'substackSubscribe',
        ...(caption && { caption }),
        publicationUrl: new URL(subscribeUrl).origin,
      },
      options
    )
  }

  if (element.classList.contains('digest-post-embed')) {
    return convertLinkCard(element, options)
  }

  if (element.classList.contains('directMessage')) {
    const attrs = readAttrs(element)
    return blockNode(
      {
        blockType: 'substackButton',
        label: `Message ${required(asString(attrs['userName']), 'message button without a name')}`,
        url: `https://substack.com/profile/${String(attrs['userId'])}`,
      },
      options
    )
  }

  if (element.classList.contains('button-wrapper')) {
    const attrs = readAttrs(element)
    return blockNode(
      {
        blockType: 'substackButton',
        label: required(asString(attrs['text']), 'button without a label'),
        url: required(asString(attrs['url']), 'button without a link'),
      },
      options
    )
  }

  if (element.classList.contains('callout-block')) {
    return blockNode(
      {
        blockType: 'callout',
        content: await convertChildren(element, options),
      },
      options
    )
  }

  if (element.classList.contains('highlighted_code_block')) {
    return convertCode(
      element,
      asString(readAttrs(element)['language']),
      options
    )
  }

  if (tag === 'pre') {
    return convertCode(element, undefined, options)
  }

  if (/^h[1-6]$/.test(tag)) {
    return elementNode('heading', inlineChildren(element, options), { tag })
  }

  if (tag === 'blockquote') {
    return elementNode('quote', flattenParagraphs(element, options))
  }

  if (tag === 'ul' || tag === 'ol') {
    const items = Array.from(element.children).map((item, index) =>
      elementNode('listitem', flattenParagraphs(item, options), {
        value: index + 1,
      })
    )
    return elementNode('list', items, {
      tag,
      start: 1,
      listType: tag === 'ul' ? 'bullet' : 'number',
    })
  }

  if (tag === 'p') {
    return elementNode('paragraph', inlineChildren(element, options), {
      textStyle: '',
      textFormat: 0,
    })
  }

  throw new UnsupportedSubstackContentError(
    tag === 'div' && element.className ? `div.${element.classList[0]}` : tag
  )
}

const convertChildren = async (
  element: Element,
  options: ConvertOptions
): Promise<SerializedEditorState> => {
  const children = await Promise.all(
    Array.from(element.children).map(child => convertBlock(child, options))
  )

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: null,
      children,
    },
  } as unknown as SerializedEditorState
}

// Converts the body HTML of a Substack post to the Lexical JSON Payload stores
export const substackToLexical = (
  body: Element,
  options: ConvertOptions
): Promise<SerializedEditorState> => convertChildren(body, options)
