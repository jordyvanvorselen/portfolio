import { useTranslations } from 'next-intl'

import { FaqHeader } from '@/domains/home/faq/FaqHeader'
import { FaqList } from '@/domains/home/faq/FaqList'

export const FaqSection = () => {
  const t = useTranslations()
  return (
    <section
      id="faq-section"
      aria-label={t('faq.section.ariaLabel')}
      className="content-section-min relative overflow-hidden py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-950 border-t border-gray-800"
    >
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col justify-center px-4 md:px-8 lg:px-12 py-8">
        <div className="max-w-4xl mx-auto w-full space-y-12 md:space-y-16 lg:space-y-20">
          <FaqHeader />
          <FaqList />
        </div>
      </div>
    </section>
  )
}
