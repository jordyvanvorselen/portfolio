import { Skeleton } from '@/ui/Skeleton'

export const PageHeroSkeleton = () => (
  <section
    data-testid="page-hero-skeleton"
    className="header-offset relative pt-16 pb-20 overflow-hidden mt-8"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
      <Skeleton className="h-16 w-full max-w-lg" />
      <Skeleton className="h-7 w-full max-w-3xl" />
      <Skeleton className="h-7 w-2/3 max-w-xl" />
      <Skeleton className="h-6 w-80 mt-2" />
    </div>
  </section>
)
