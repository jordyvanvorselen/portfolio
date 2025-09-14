import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import {
  BLOCKS,
  INLINES,
  MARKS,
  type Document,
  type Block,
  type Inline,
} from '@contentful/rich-text-types'

import { ensureAbsoluteUrl } from '@/lib/blog-helpers'
import { highlightCode } from '@/lib/shiki'
import { MermaidDiagram } from '@/ui/MermaidDiagram'
import type { ContentfulAsset, ContentfulCodeBlock } from '@/lib/api'

interface HighlightedCodeBlockEntry extends ContentfulCodeBlock {
  highlightedCode?: string
}

interface AssetLink {
  block: ContentfulAsset[]
}

interface EntryLink {
  block: ContentfulCodeBlock[]
}

interface Content {
  json: Document
  links: {
    assets: AssetLink
    entries: EntryLink
  }
}

interface EnhancedContent {
  json: Document
  links: {
    assets: AssetLink
    entries: {
      block: HighlightedCodeBlockEntry[]
    }
  }
}

export async function enhanceContentWithSyntaxHighlighting(
  content: Content
): Promise<EnhancedContent> {
  const codeBlocks = content.links.entries?.block || []

  const highlightedCodeBlocks = await Promise.all(
    codeBlocks.map(async (entry): Promise<HighlightedCodeBlockEntry> => {
      const highlightedCode = await highlightCode(
        entry.code,
        entry.programmingLanguage
      )
      return {
        ...entry,
        highlightedCode,
      }
    })
  )

  return {
    ...content,
    links: {
      ...content.links,
      entries: {
        block: highlightedCodeBlocks,
      },
    },
  }
}

function RichTextAsset({
  id,
  assets,
}: {
  id: string
  assets: ContentfulAsset[] | undefined
}) {
  const asset = assets?.find(asset => asset.sys.id === id)

  if (asset?.url) {
    return (
      <Image
        src={ensureAbsoluteUrl(asset.url)}
        alt={asset.description}
        width={800}
        height={400}
        className="w-full h-auto rounded-lg"
      />
    )
  }

  return null
}

function RichTextCodeBlock({
  id,
  entries,
}: {
  id: string
  entries: (ContentfulCodeBlock | HighlightedCodeBlockEntry)[] | undefined
}) {
  const entry = entries?.find(entry => entry.sys.id === id)

  if (!entry) {
    return null
  }

  // Check if this is a Mermaid diagram
  if (entry.programmingLanguage.toLowerCase() === 'mermaid') {
    return <MermaidDiagram code={entry.code} id={`mermaid-${id}`} />
  }

  return (
    <div className="my-8 rounded-2xl border-2 border-gray-700/50 shadow-2xl backdrop-blur-sm overflow-hidden group relative transition-all duration-500 hover:border-gray-600/70 hover:shadow-3xl">
      {/* Enhanced gradient background with more dramatic sweep */}
      <div className="absolute inset-0 bg-gradient-to-bl from-gray-900 via-black via-80% to-black" />

      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />

      {/* Hover overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/15 to-blue-500/15 opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

      {'highlightedCode' in entry && entry.highlightedCode ? (
        <div
          className="overflow-x-auto relative z-10 [&_.shiki]:!bg-transparent [&_.shiki]:m-0 [&_.shiki]:p-6 [&_.shiki]:text-md [&_.shiki]:leading-relaxed [&_.shiki_pre]:!bg-transparent [&_.shiki_pre]:m-0 [&_.shiki_pre]:p-6 [&_.shiki_code]:font-mono"
          dangerouslySetInnerHTML={{ __html: entry.highlightedCode }}
        />
      ) : (
        <pre className="p-6 overflow-x-auto relative z-10 m-0 bg-transparent text-sm leading-relaxed font-mono">
          <code
            className={`language-${entry.programmingLanguage.toLowerCase()} text-gray-100 font-mono`}
          >
            {entry.code}
          </code>
        </pre>
      )}
    </div>
  )
}

export function Markdown({ content }: { content: Content | EnhancedContent }) {
  return (
    <div data-testid="markdown-content">
      {documentToReactComponents(content.json, {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => (
            <RichTextAsset
              id={node.data['target'].sys.id}
              assets={content.links.assets.block}
            />
          ),
          [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => (
            <RichTextCodeBlock
              id={node.data['target'].sys.id}
              entries={content.links.entries?.block}
            />
          ),
          [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children) => (
            <p className="mb-6 text-gray-300 leading-relaxed text-xl">
              {children}
            </p>
          ),
          [BLOCKS.HEADING_1]: (_node: Block | Inline, children) => (
            <h1 className="text-4xl font-bold text-white mb-8 mt-12 first:mt-0">
              {children}
            </h1>
          ),
          [BLOCKS.HEADING_2]: (_node: Block | Inline, children) => (
            <h2 className="text-3xl font-semibold text-white mb-6 mt-10">
              {children}
            </h2>
          ),
          [BLOCKS.HEADING_3]: (_node: Block | Inline, children) => (
            <h3 className="text-2xl font-semibold text-white mb-5 mt-8">
              {children}
            </h3>
          ),
          [BLOCKS.HEADING_4]: (_node: Block | Inline, children) => (
            <h4 className="text-xl font-semibold text-white mb-4 mt-6">
              {children}
            </h4>
          ),
          [BLOCKS.HEADING_5]: (_node: Block | Inline, children) => (
            <h5 className="text-lg font-semibold text-white mb-4 mt-6">
              {children}
            </h5>
          ),
          [BLOCKS.HEADING_6]: (_node: Block | Inline, children) => (
            <h6 className="text-base font-semibold text-white mb-3 mt-5">
              {children}
            </h6>
          ),
          [BLOCKS.UL_LIST]: (_node: Block | Inline, children) => (
            <ul className="mb-6 pl-6 space-y-2 text-gray-300 text-xl">
              {children}
            </ul>
          ),
          [BLOCKS.OL_LIST]: (_node: Block | Inline, children) => (
            <ol className="mb-6 pl-6 space-y-2 text-gray-300 text-xl list-decimal">
              {children}
            </ol>
          ),
          [BLOCKS.LIST_ITEM]: (_node: Block | Inline, children) => (
            <li className="leading-relaxed">{children}</li>
          ),
          [BLOCKS.QUOTE]: (_node: Block | Inline, children) => (
            <blockquote className="border-l-4 border-teal-500 pl-6 pt-6 py-2 mb-6 text-gray-300 text-xl italic bg-gray-800/30 rounded-r">
              {children}
            </blockquote>
          ),
          [BLOCKS.HR]: () => <hr className="border-gray-600 my-8" />,
          [INLINES.HYPERLINK]: (node: Block | Inline, children) => (
            <a
              href={node.data['uri']}
              className="text-teal-400 hover:text-teal-300 underline decoration-1 underline-offset-2 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        },
        renderMark: {
          [MARKS.BOLD]: (text: React.ReactNode) => (
            <strong className="font-semibold text-white">{text}</strong>
          ),
          [MARKS.ITALIC]: (text: React.ReactNode) => (
            <em className="italic text-gray-200">{text}</em>
          ),
          [MARKS.UNDERLINE]: (text: React.ReactNode) => (
            <u className="underline decoration-1 underline-offset-2">{text}</u>
          ),
          [MARKS.CODE]: (text: React.ReactNode) => (
            <code className="bg-gray-800 text-teal-300 px-1.5 py-0.5 rounded text-sm font-mono">
              {text}
            </code>
          ),
        },
      })}
    </div>
  )
}
