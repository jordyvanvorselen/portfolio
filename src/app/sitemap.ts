import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/constants'
import { getAllPosts } from '@/lib/api'

const staticPages = [
  {
    url: '',
    priority: 1,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/experience',
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/projects',
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/blog',
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date()

  // Get all blog posts from Contentful
  const blogPosts = await getAllPosts(false)

  // Generate static pages
  const staticEntries: MetadataRoute.Sitemap = staticPages.map(page => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  // Generate blog post entries
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...blogEntries]
}
