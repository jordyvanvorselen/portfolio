import type { SerializedEditorState, SerializedLexicalNode } from 'lexical'

export interface SerializedTextNode extends SerializedLexicalNode {
  type: 'text'
  text: string
  format: number
  version: number
}

export interface SerializedElementNode extends SerializedLexicalNode {
  type: string
  children: SerializedLexicalNode[]
  version: number
}

export interface SerializedParagraphNode extends SerializedElementNode {
  type: 'paragraph'
}

export interface SerializedHeadingNode extends SerializedElementNode {
  type: 'heading'
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export interface SerializedQuoteNode extends SerializedElementNode {
  type: 'quote'
}

export interface SerializedRootNode extends SerializedElementNode {
  type: 'root'
  direction: null | 'ltr' | 'rtl'
  format: string
  indent: number
}

export type { SerializedEditorState }
