import type { Metadata } from 'next'

import { BlogHeroSection } from '@/domains/blog/BlogHeroSection'
import { BlogSearchFilters } from '@/domains/blog/BlogSearchFilters'
import { BlogCard } from '@/domains/blog/BlogCard'
import { FeaturedBlogCard } from '@/domains/blog/FeaturedBlogCard'
import { BlogSectionTitle } from '@/domains/blog/BlogSectionTitle'
import { getAllPosts, type BlogPost } from '@/lib/api'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog - Jordy van Vorselen',
    description: 'Blog posts by Jordy van Vorselen',
  }
}

export default async function BlogPage() {
  let blogPosts: BlogPost[] = []

  try {
    blogPosts = await getAllPosts(process.env['VERCEL_ENV'] !== 'production')
  } catch (error) {
    console.error('Failed to fetch blog posts from Contentful:', error)
  }

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

        {blogPosts.length === 0 && (
          <div className="mt-12 text-center text-gray-400">
            <p className="text-lg">No blog posts available at the moment.</p>
            <p className="text-sm mt-2">
              Please check back later for new content.
            </p>
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
