import { useTranslations } from 'next-intl'

import { Skeleton } from '@/ui/Skeleton'

export const BlogPostSkeleton = () => {
  const t = useTranslations()
  return (
    <main className="flex-1 bg-gray-950">
      <div role="status" className="sr-only">
        {t('blog.post.loading')}
      </div>

      <section
        data-testid="blog-post-hero-skeleton"
        className="header-offset relative px-6 pt-16 pb-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-5 w-32 mb-8" />
          <div className="flex flex-col items-center gap-6">
            <Skeleton className="h-12 w-full max-w-3xl" />
            <Skeleton className="h-6 w-2/3 max-w-2xl" />
            <Skeleton className="h-5 w-80" />
          </div>
        </div>
      </section>

      <section
        data-testid="blog-post-content-skeleton"
        className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 pb-16 flex flex-col gap-4"
      >
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
      </section>
    </main>
  )
}
