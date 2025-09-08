'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Filter } from '@/ui/Filter'

const technicalCategories = [
  'API',
  'Architecture',
  'Backend',
  'Clean Code',
  'Cypress',
  'Database',
  'Docker',
  'Enterprise',
  'Frontend',
  'GraphQL',
  'JavaScript',
  'Jest',
  'Microservices',
  'Node.js',
  'Optimization',
  'Patterns',
  'Performance',
  'Quality Assurance',
  'REST',
  'React',
  'SQL',
  'Testing',
  'TypeScript',
]

interface BlogSearchFiltersProps {
  searchPlaceholder: string
  allFilterLabel: string
}

export const BlogSearchFiltersClient = ({
  searchPlaceholder,
  allFilterLabel,
}: BlogSearchFiltersProps) => {
  const [activeFilter, setActiveFilter] = useState('All')

  const handleFilterClick = (category: string) => {
    setActiveFilter(category)
  }

  return (
    <div className="space-y-8 mb-12">
      <div className="flex justify-center">
        <div className="relative w-full max-w-2xl">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            aria-label="search"
          />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full pl-12 pr-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-wrap gap-2 justify-center max-w-5xl">
          <Filter
            key="All"
            variant={activeFilter === 'All' ? 'active' : 'default'}
            color="default"
            onClick={() => handleFilterClick('All')}
          >
            {allFilterLabel}
          </Filter>
          {technicalCategories.map(category => (
            <Filter
              key={category}
              variant={activeFilter === category ? 'active' : 'default'}
              color="default"
              onClick={() => handleFilterClick(category)}
            >
              {category}
            </Filter>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useTranslations } from 'next-intl'

export const BlogSearchFilters = () => {
  const t = useTranslations()

  return (
    <BlogSearchFiltersClient
      searchPlaceholder={t('blog.search.placeholder')}
      allFilterLabel={t('blog.search.filters.all')}
    />
  )
}
