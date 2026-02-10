'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { Filter } from '@/ui/Filter'
import { useDebounce } from '@/hooks/useDebounce'

interface BlogSearchFiltersProps {
  searchPlaceholder: string
  allFilterLabel: string
  tags: string[]
  selectedTag?: string | undefined
  searchQuery?: string | undefined
}

export const BlogSearchFiltersClient = ({
  searchPlaceholder,
  allFilterLabel,
  tags,
  selectedTag,
  searchQuery,
}: BlogSearchFiltersProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchInput, setSearchInput] = useState(searchQuery || '')
  const debouncedSearch = useDebounce(searchInput, 300)

  // Update URL when search changes (debounced)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (debouncedSearch && debouncedSearch.trim()) {
      params.set('search', debouncedSearch.trim())
    } else {
      params.delete('search')
    }

    const queryString = params.toString()
    const newUrl = queryString ? `/blog?${queryString}` : '/blog'

    router.push(newUrl, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  const handleFilterClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (tag === 'All') {
      params.delete('tag')
    } else {
      params.set('tag', tag)
    }

    const queryString = params.toString()
    const newUrl = queryString ? `/blog?${queryString}` : '/blog'

    router.push(newUrl, { scroll: false })
  }

  const activeFilter = selectedTag || 'All'

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
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
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
          {tags.map(tag => (
            <Filter
              key={tag}
              variant={activeFilter === tag ? 'active' : 'default'}
              color="default"
              onClick={() => handleFilterClick(tag)}
            >
              {tag}
            </Filter>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useTranslations } from 'next-intl'

interface BlogSearchFiltersServerProps {
  tags: string[]
  selectedTag?: string | undefined
  searchQuery?: string | undefined
}

export const BlogSearchFilters = ({
  tags,
  selectedTag,
  searchQuery,
}: BlogSearchFiltersServerProps) => {
  const t = useTranslations()

  return (
    <BlogSearchFiltersClient
      searchPlaceholder={t('blog.search.placeholder')}
      allFilterLabel={t('blog.search.filters.all')}
      tags={tags}
      selectedTag={selectedTag}
      searchQuery={searchQuery}
    />
  )
}
