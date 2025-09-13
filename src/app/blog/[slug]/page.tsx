import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { getDetailedPostBySlug, getPostAndMorePosts } from '@/lib/api'
import { Markdown, enhanceContentWithSyntaxHighlighting } from '@/ui/Markdown'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { Badge } from '@/ui/Badge'
import { BlogCard } from '@/domains/blog/BlogCard'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getDetailedPostBySlug(
    slug,
    process.env['VERCEL_ENV'] !== 'production'
  )

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: `${post.title} - Jordy van Vorselen`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [{ url: post.image }] : [],
      type: 'article',
    },
    ...(post.canonicalUrl && { alternates: { canonical: post.canonicalUrl } }),
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const t = await getTranslations('blog.post')

  const post = await getDetailedPostBySlug(
    slug,
    process.env['VERCEL_ENV'] !== 'production'
  )

  if (!post) {
    notFound()
  }

  const { morePosts } = await getPostAndMorePosts(
    slug,
    process.env['VERCEL_ENV'] !== 'production'
  )

  // Enhance content with syntax highlighting
  const enhancedContent = await enhanceContentWithSyntaxHighlighting(
    post.content
  )

  return (
    <main className="flex-1 bg-gray-950">
      {/* Hero Section with same background as BlogHeroSection */}
      <section className="header-offset relative pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Blog Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('backToBlog')}</span>
          </Link>

          {/* Article Header */}
          <div className="text-center">
            <Title
              size="4xl"
              weight="bold"
              color="gradient"
              align="center"
              as="h1"
              className="mb-6"
            >
              {post.title}
            </Title>

            <Text
              size="xl"
              weight="normal"
              color="secondary"
              alignment="center"
              lineHeight="relaxed"
              className="max-w-3xl mx-auto mb-8"
            >
              {post.description}
            </Text>

            {/* Meta Information */}
            <div className="flex items-center justify-center gap-6 text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="w-px h-4 bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{t('readTime', { readTime: post.readTime })}</span>
              </div>
              <div className="w-px h-4 bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{t('authorName')}</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="soft" color="default" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-950 to-transparent"></div>
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Markdown content={enhancedContent} />
      </section>

      {/* Related Posts */}
      {morePosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Title
            size="2xl"
            weight="bold"
            color="primary"
            align="center"
            as="h2"
            className="mb-12"
          >
            {t('relatedPosts')}
          </Title>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {morePosts.map(relatedPost => (
              <BlogCard
                key={relatedPost.slug}
                slug={relatedPost.slug}
                title={relatedPost.title}
                description={relatedPost.description}
                date={relatedPost.date}
                readTime={relatedPost.readTime}
                image={relatedPost.image}
                tags={relatedPost.tags}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
