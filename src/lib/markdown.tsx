import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import {
  BLOCKS,
  type Document,
  type Block,
  type Inline,
} from '@contentful/rich-text-types'

import { ensureAbsoluteUrl } from '@/lib/blog-helpers'

interface Asset {
  sys: {
    id: string
  }
  url: string
  description: string
}

interface CodeBlockEntry {
  sys: {
    id: string
  }
  title: string
  programmingLanguage: string
  code: string
}

interface AssetLink {
  block: Asset[]
}

interface EntryLink {
  block: CodeBlockEntry[]
}

interface Content {
  json: Document
  links: {
    assets: AssetLink
    entries: EntryLink
  }
}

function RichTextAsset({
  id,
  assets,
}: {
  id: string
  assets: Asset[] | undefined
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
  entries: CodeBlockEntry[] | undefined
}) {
  const entry = entries?.find(entry => entry.sys.id === id)

  if (!entry) {
    return null
  }

  return (
    <div className="my-6 rounded-lg bg-gray-900 border border-gray-700 overflow-hidden">
      {entry.title && (
        <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 text-sm text-gray-300 font-medium">
          {entry.title}
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code
          className={`language-${entry.programmingLanguage.toLowerCase()} text-gray-100`}
        >
          {entry.code}
        </code>
      </pre>
    </div>
  )
}

export function Markdown({ content }: { content: Content }) {
  return documentToReactComponents(content.json, {
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
    },
  })
}
