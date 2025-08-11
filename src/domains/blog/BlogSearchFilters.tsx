'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Filter } from '@/ui/Filter'

const categories = [
  'All',
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

export const BlogSearchFilters = () => {
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
            placeholder="Search articles..."
            className="w-full pl-12 pr-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-wrap gap-2 justify-center max-w-5xl">
          {categories.map(category => (
            <Filter
              key={category}
              active={activeFilter === category}
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
