import { useTranslations } from 'next-intl'

import { PageHeroSkeleton } from '@/domains/common/PageHeroSkeleton'
import { Skeleton } from '@/ui/Skeleton'

const ProjectSkeleton = () => (
  <div
    data-testid="project-skeleton"
    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
  >
    <Skeleton className="aspect-[16/10] w-full" rounded="2xl" />
    <div className="flex flex-col gap-4">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-2 mt-2">
        <Skeleton className="h-6 w-20" rounded="full" />
        <Skeleton className="h-6 w-20" rounded="full" />
        <Skeleton className="h-6 w-20" rounded="full" />
      </div>
    </div>
  </div>
)

export const ProjectsPageSkeleton = () => {
  const t = useTranslations()
  return (
    <main className="bg-gray-950 overflow-x-hidden">
      <div role="status" className="sr-only">
        {t('pages.projects.loading')}
      </div>

      <PageHeroSkeleton />

      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 mb-20">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-5 w-full max-w-3xl" />
          </div>
          <div className="space-y-32">
            <ProjectSkeleton />
            <ProjectSkeleton />
          </div>
        </div>
      </section>
    </main>
  )
}
