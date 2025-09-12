import type { Metadata } from 'next'

import { BlogHeroSection } from '@/domains/blog/BlogHeroSection'
import { BlogSearchFilters } from '@/domains/blog/BlogSearchFilters'
import { BlogCard } from '@/domains/blog/BlogCard'
import { FeaturedBlogCard } from '@/domains/blog/FeaturedBlogCard'
import { BlogSectionTitle } from '@/domains/blog/BlogSectionTitle'
import { getAllPosts, type BlogPost } from '@/lib/api'
import { getUniqueTagsFromPosts } from '@/lib/blog-helpers'
import { filterPosts } from '@/lib/blog-filters'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog - Jordy van Vorselen',
    description: 'Blog posts by Jordy van Vorselen',
  }
}

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const t = await getTranslations('blog.search.emptyState')
  const params = await searchParams

  let allBlogPosts: BlogPost[] = []

  try {
    allBlogPosts = await getAllPosts(process.env['VERCEL_ENV'] !== 'production')
  } catch (error) {
    console.error('Failed to fetch blog posts from Contentful:', error)
  }

  const uniqueTags = getUniqueTagsFromPosts(allBlogPosts)

  // Extract filter parameters from URL
  const selectedTag = typeof params.tag === 'string' ? params.tag : undefined
  const searchQuery =
    typeof params.search === 'string' ? params.search : undefined

  // Filter posts based on URL parameters
  const filteredPosts = filterPosts(allBlogPosts, {
    tag: selectedTag,
    search: searchQuery,
  })

  // Check if any filters are active
  const hasActiveFilters = Boolean(selectedTag || searchQuery)

  // If filters are active, don't show featured post - show all filtered posts as regular posts
  const [featuredPost, ...regularPosts] = hasActiveFilters
    ? [null, ...filteredPosts]
    : filteredPosts

  return (
    <main className="flex-1 flex flex-col bg-gray-950">
      <BlogHeroSection articleCount={allBlogPosts.length} />
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div data-testid="blog-search-filters">
          <BlogSearchFilters
            tags={uniqueTags}
            selectedTag={selectedTag}
            searchQuery={searchQuery}
          />
        </div>

        {featuredPost && (
          <div
            data-testid="featured-blog-section"
            className="mt-12 min-h-[400px] md:min-h-[450px] lg:min-h-[500px]"
          >
            <BlogSectionTitle translationKey="blog.sections.featuredArticle" />
            <FeaturedBlogCard
              slug={featuredPost.slug}
              title={featuredPost.title}
              description={featuredPost.description}
              date={featuredPost.date}
              readTime={featuredPost.readTime}
              image={featuredPost.image}
              tags={featuredPost.tags}
            />
          </div>
        )}

        {allBlogPosts.length === 0 && (
          <div className="mt-12 text-center text-gray-400">
            <p className="text-lg">{t('noPostsTitle')}</p>
            <p className="text-sm mt-2">{t('noPostsSubtitle')}</p>
          </div>
        )}

        {allBlogPosts.length > 0 && filteredPosts.length === 0 && (
          <div className="mt-12 text-center text-gray-400">
            <p className="text-lg">{t('noResultsTitle')}</p>
            <p className="text-sm mt-2">{t('noResultsSubtitle')}</p>
          </div>
        )}

        {regularPosts.length > 0 && (
          <div data-testid="blog-grid">
            <BlogSectionTitle translationKey="blog.sections.latestArticles" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map(post => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  readTime={post.readTime}
                  image={post.image}
                  tags={post.tags}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
