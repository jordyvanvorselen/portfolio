import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'

export interface TypeBlogPostFields {
  title: EntryFieldTypes.Symbol
  description: EntryFieldTypes.Text
  tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
  publicationDate: EntryFieldTypes.Date
  featuredImage: EntryFieldTypes.AssetLink
  slug: EntryFieldTypes.Symbol
  canonicalUrl?: EntryFieldTypes.Symbol
  draft?: EntryFieldTypes.Boolean
  content: EntryFieldTypes.RichText
}

export type TypeBlogPostSkeleton = EntrySkeletonType<
  TypeBlogPostFields,
  'blogPost'
>
export type TypeBlogPost<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeBlogPostSkeleton, Modifiers, Locales>
export type TypeBlogPostWithoutLinkResolutionResponse =
  TypeBlogPost<'WITHOUT_LINK_RESOLUTION'>
export type TypeBlogPostWithoutUnresolvableLinksResponse =
  TypeBlogPost<'WITHOUT_UNRESOLVABLE_LINKS'>
export type TypeBlogPostWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeBlogPost<'WITH_ALL_LOCALES', Locales>
export type TypeBlogPostWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeBlogPost<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeBlogPostWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeBlogPost<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>

export interface TypeCodeBlockFields {
  title: EntryFieldTypes.Symbol
  programmingLanguage: EntryFieldTypes.Symbol
  code: EntryFieldTypes.Text
}

export type TypeCodeBlockSkeleton = EntrySkeletonType<
  TypeCodeBlockFields,
  'codeBlock'
>
export type TypeCodeBlock<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeCodeBlockSkeleton, Modifiers, Locales>
export type TypeCodeBlockWithoutLinkResolutionResponse =
  TypeCodeBlock<'WITHOUT_LINK_RESOLUTION'>
export type TypeCodeBlockWithoutUnresolvableLinksResponse =
  TypeCodeBlock<'WITHOUT_UNRESOLVABLE_LINKS'>
export type TypeCodeBlockWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeCodeBlock<'WITH_ALL_LOCALES', Locales>
export type TypeCodeBlockWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeCodeBlock<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeCodeBlockWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeCodeBlock<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
