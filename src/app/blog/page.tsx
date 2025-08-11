import type { Metadata } from 'next'

import { BlogHeroSection } from '@/domains/blog/BlogHeroSection'

export const metadata: Metadata = {
  title: 'Blog - Jordy van Vorselen',
  description: 'Blog posts by Jordy van Vorselen',
}

export default function BlogPage() {
  return (
    <main className="flex-1 flex flex-col min-h-screen bg-gray-950">
      <BlogHeroSection />
    </main>
  )
}
