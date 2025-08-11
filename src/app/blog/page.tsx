import type { Metadata } from 'next'

import { BlogHeroSection } from '@/domains/blog/BlogHeroSection'
import { BlogSearchFilters } from '@/domains/blog/BlogSearchFilters'
import { BlogCard } from '@/domains/blog/BlogCard'
import { FeaturedBlogCard } from '@/domains/blog/FeaturedBlogCard'
import { Title } from '@/ui/Title'

export const metadata: Metadata = {
  title: 'Blog - Jordy van Vorselen',
  description: 'Blog posts by Jordy van Vorselen',
}

const blogPosts = [
  {
    title: 'Advanced TypeScript Patterns for Enterprise Applications',
    description:
      'Explore advanced TypeScript patterns and techniques that will help you build more maintainable and type-safe enterprise applications. From conditional types to template literals.',
    date: 'January 8, 2024',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    tags: ['TypeScript', 'JavaScript', 'Enterprise'],
  },
  {
    title: 'Implementing Clean Architecture in React Applications',
    description:
      'Learn how to structure your React applications using Clean Architecture principles. This approach will make your code more testable, maintainable, and independent of frameworks.',
    date: 'January 1, 2024',
    readTime: '15 min read',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    tags: ['React', 'Architecture', 'Clean Code'],
  },
  {
    title: 'Database Optimization Strategies for High-Traffic Applications',
    description:
      "Discover proven database optimization techniques that can dramatically improve your application's performance. From indexing strategies to query optimization and caching.",
    date: 'December 20, 2023',
    readTime: '10 min read',
    image:
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop',
    tags: ['Database', 'Performance', 'SQL'],
  },
  {
    title: 'Testing Strategies for Modern Web Applications',
    description:
      'A deep dive into testing methodologies for modern web applications. Learn about unit testing, integration testing, and end-to-end testing with practical examples.',
    date: 'December 15, 2023',
    readTime: '11 min read',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    tags: ['Testing', 'Quality Assurance', 'Jest'],
  },
  {
    title: 'GraphQL vs REST: Choosing the Right API Architecture',
    description:
      'An in-depth comparison of GraphQL and REST APIs. Learn when to use each approach and how to implement them effectively in your applications.',
    date: 'December 10, 2023',
    readTime: '9 min read',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    tags: ['GraphQL', 'REST', 'API'],
  },
  {
    title: 'Building Scalable Node.js Applications',
    description:
      'Best practices for building scalable Node.js applications that can handle high loads. Learn about clustering, caching, and performance monitoring.',
    date: 'December 5, 2023',
    readTime: '12 min read',
    image:
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop',
    tags: ['Node.js', 'Scalability', 'Performance'],
  },
]

export default function BlogPage() {
  const [featuredPost, ...regularPosts] = blogPosts

  return (
    <main className="flex-1 flex flex-col bg-gray-950">
      <BlogHeroSection />
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogSearchFilters />

        <div className="mt-12 mb-16">
          <Title variant="section-label-small" className="mb-8">
            Featured article
          </Title>
          <FeaturedBlogCard {...featuredPost} />
        </div>

        <div>
          <Title variant="section-label-small" className="mb-8">
            Latest articles
          </Title>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
