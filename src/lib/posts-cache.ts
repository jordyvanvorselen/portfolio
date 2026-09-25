import { revalidateTag, unstable_cache } from 'next/cache'

export const POSTS_CACHE_TAG = 'posts'

const ONE_HOUR = 60 * 60

export const cachePublishedPosts = <Args extends unknown[], Result>(
  key: string,
  fetchPosts: (...args: Args) => Promise<Result>
) =>
  unstable_cache(fetchPosts, [key], {
    tags: [POSTS_CACHE_TAG],
    revalidate: ONE_HOUR,
  })

export const revalidatePostsCache = <Doc>({ doc }: { doc: Doc }): Doc => {
  revalidateTag(POSTS_CACHE_TAG, { expire: 0 })
  return doc
}
