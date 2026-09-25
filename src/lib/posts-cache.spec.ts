import { vi } from 'vitest'
import { revalidateTag, unstable_cache } from 'next/cache'

import {
  POSTS_CACHE_TAG,
  cachePublishedPosts,
  revalidatePostsCache,
} from '@/lib/posts-cache'

vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
  unstable_cache: vi.fn(fetchPosts => fetchPosts),
}))

describe('posts cache', () => {
  describe('cachePublishedPosts', () => {
    it('tags cached posts so publishing in Payload can clear them', () => {
      const fetchPosts = async () => []

      cachePublishedPosts('all-posts', fetchPosts)

      expect(unstable_cache).toHaveBeenCalledWith(
        fetchPosts,
        ['all-posts'],
        expect.objectContaining({ tags: [POSTS_CACHE_TAG] })
      )
    })

    it('refreshes cached posts every hour in case a change skipped the Payload hooks', () => {
      cachePublishedPosts('all-posts', async () => [])

      expect(unstable_cache).toHaveBeenCalledWith(
        expect.any(Function),
        ['all-posts'],
        expect.objectContaining({ revalidate: 60 * 60 })
      )
    })
  })

  describe('revalidatePostsCache', () => {
    it('expires cached posts right away so the next visitor sees the change', () => {
      revalidatePostsCache({ doc: { slug: 'my-post' } })

      expect(revalidateTag).toHaveBeenCalledWith(POSTS_CACHE_TAG, {
        expire: 0,
      })
    })

    it('returns the document unchanged so Payload saves it as is', () => {
      const doc = { slug: 'my-post' }

      expect(revalidatePostsCache({ doc })).toBe(doc)
    })
  })
})
