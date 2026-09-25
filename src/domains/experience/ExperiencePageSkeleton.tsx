import { useTranslations } from 'next-intl'

import { PageHeroSkeleton } from '@/domains/common/PageHeroSkeleton'
import { Skeleton } from '@/ui/Skeleton'

const ExperienceCardSkeleton = () => (
  <div
    data-testid="experience-card-skeleton"
    className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 flex flex-col gap-4"
  >
    <div className="flex items-start gap-4">
      <Skeleton
        className="h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0"
        rounded="xl"
      />
      <div className="flex-1 flex flex-col gap-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-4/5" />
  </div>
)

export const ExperiencePageSkeleton = () => {
  const t = useTranslations()
  return (
    <main className="flex-1 flex flex-col bg-gray-950">
      <div role="status" className="sr-only">
        {t('pages.experience.loading')}
      </div>

      <PageHeroSkeleton />

      <div className="w-full lg:w-7/10 mx-auto px-2 sm:px-4 lg:px-6 pb-20">
        <div className="flex flex-col items-center gap-6 mb-16">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-5 w-full max-w-3xl" />
        </div>

        <div className="flex flex-col gap-8 xl:w-1/2">
          <ExperienceCardSkeleton />
          <ExperienceCardSkeleton />
          <ExperienceCardSkeleton />
        </div>
      </div>
    </main>
  )
}
