import { useTranslations } from 'next-intl'

import { PageHeroSkeleton } from '@/domains/common/PageHeroSkeleton'
import { Skeleton } from '@/ui/Skeleton'

const BlogCardSkeleton = () => (
  <div
    data-testid="blog-card-skeleton"
    className="overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700"
  >
    <Skeleton className="aspect-[16/9] rounded-none" />
    <div className="p-6 min-h-[18.5rem] flex flex-col gap-3">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-6 w-4/5" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
)

export const BlogPageSkeleton = () => {
  const t = useTranslations()
  return (
    <main className="flex-1 flex flex-col bg-gray-950">
      <div role="status" className="sr-only">
        {t('blog.loading')}
      </div>

      <PageHeroSkeleton />

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Skeleton className="h-12 w-full" />

        <div
          data-testid="featured-blog-card-skeleton"
          className="mt-12 overflow-hidden rounded-2xl border border-teal-500/30 bg-gray-800/70 lg:grid lg:grid-cols-2 lg:gap-8"
        >
          <Skeleton className="aspect-[16/9] rounded-none" />
          <div className="p-8 lg:py-12 flex flex-col justify-center gap-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-5/6" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </div>
      </div>
    </main>
  )
}
