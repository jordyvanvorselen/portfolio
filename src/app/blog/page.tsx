import type { Metadata } from 'next'

import { BlogHeroSection } from '@/domains/blog/BlogHeroSection'
import { BlogSearchFilters } from '@/domains/blog/BlogSearchFilters'
import { BlogCard } from '@/domains/blog/BlogCard'
import { FeaturedBlogCard } from '@/domains/blog/FeaturedBlogCard'
import { BlogSectionTitle } from '@/domains/blog/BlogSectionTitle'
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog - Jordy van Vorselen',
    description: 'Blog posts by Jordy van Vorselen',
  }
}

const blogPostsKeys = [
  'advancedTypeScript',
  'cleanArchitecture',
  'databaseOptimization',
  'testingStrategies',
  'graphqlVsRest',
  'scalableNodejs',
] as const

export default function BlogPage() {
  const blogPosts = blogPostsKeys.map(key => ({
    translationKey: key,
    // Use a placeholder image for now, the actual image will be loaded client-side
    image:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
  }))

  const [featuredPost, ...regularPosts] = blogPosts

  return (
    <main className="flex-1 flex flex-col bg-gray-950">
      <BlogHeroSection />
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div data-testid="blog-search-filters">
          <BlogSearchFilters />
        </div>

        {featuredPost && (
          <div
            data-testid="featured-blog-section"
            className="mt-12 mb-16 min-h-[400px] md:min-h-[450px] lg:min-h-[500px]"
          >
            <BlogSectionTitle translationKey="blog.sections.featuredArticle" />
            <FeaturedBlogCard
              translationKey={featuredPost.translationKey}
              image={featuredPost.image}
            />
          </div>
        )}

        <div data-testid="blog-grid">
          <BlogSectionTitle translationKey="blog.sections.latestArticles" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map(post => (
              <BlogCard
                key={post.translationKey}
                translationKey={post.translationKey}
                image={post.image}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
