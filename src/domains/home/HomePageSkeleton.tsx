import { useTranslations } from 'next-intl'

import { Skeleton } from '@/ui/Skeleton'

const ExpertiseCardSkeleton = () => (
  <div
    data-testid="expertise-card-skeleton"
    className="rounded-xl border border-gray-800 bg-gray-900/50 p-8 flex flex-col items-center gap-4"
  >
    <Skeleton className="h-14 w-14" rounded="xl" />
    <Skeleton className="h-6 w-2/3" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
)

export const HomePageSkeleton = () => {
  const t = useTranslations()
  return (
    <main className="flex-1 flex flex-col">
      <div role="status" className="sr-only">
        {t('pages.home.loading')}
      </div>

      <section
        data-testid="home-hero-skeleton"
        className="content-section-min xl:h-[calc(100vh-4rem)] header-offset relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>
        <div className="relative z-10 h-full flex flex-col xl:flex-row items-center">
          <div className="flex-1 xl:w-5/7 flex flex-col items-center gap-6 px-4 md:px-8 lg:px-12 py-16 md:py-20 xl:py-0">
            <Skeleton className="h-32 w-32 xl:hidden" rounded="full" />
            <Skeleton className="h-20 w-full max-w-md" />
            <Skeleton className="h-20 w-full max-w-sm" />
            <Skeleton className="h-10 w-full max-w-md" />
            <Skeleton className="h-6 w-full max-w-xl" />
            <Skeleton className="h-6 w-2/3 max-w-lg" />
            <div className="flex gap-4 mt-4">
              <Skeleton className="h-12 w-40" rounded="lg" />
              <Skeleton className="h-12 w-40" rounded="lg" />
            </div>
          </div>
          <div className="hidden xl:flex xl:w-2/7 h-full items-center justify-center p-12">
            <Skeleton className="h-3/4 w-full" rounded="2xl" />
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col items-center gap-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-full max-w-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-12 w-full">
            <ExpertiseCardSkeleton />
            <ExpertiseCardSkeleton />
            <ExpertiseCardSkeleton />
          </div>
        </div>
      </section>
    </main>
  )
}
