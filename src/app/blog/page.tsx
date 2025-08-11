import type { Metadata } from 'next'

import { BlogHeroSection } from '@/domains/blog/BlogHeroSection'
import { BlogSearchFilters } from '@/domains/blog/BlogSearchFilters'

export const metadata: Metadata = {
  title: 'Blog - Jordy van Vorselen',
  description: 'Blog posts by Jordy van Vorselen',
}

export default function BlogPage() {
  return (
    <main className="flex-1 flex flex-col min-h-screen bg-gray-950">
      <BlogHeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogSearchFilters />
      </div>
    </main>
  )
}
