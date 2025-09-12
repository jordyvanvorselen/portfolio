import type { BlogPost } from './api'

export interface FilterOptions {
  tag?: string
  search?: string
}

export const normalizeSearchTerm = (term: string | undefined): string => {
  if (!term) return ''
  return term.trim().toLowerCase()
}

export const filterPosts = (posts: BlogPost[], options: FilterOptions): BlogPost[] => {
  const { tag, search } = options
  
  let filteredPosts = posts

  // Filter by tag
  if (tag && tag.trim()) {
    filteredPosts = filteredPosts.filter(post => 
      post.tags.includes(tag)
    )
  }

  // Filter by search term
  if (search && search.trim()) {
    const normalizedSearch = normalizeSearchTerm(search)
    filteredPosts = filteredPosts.filter(post => {
      const titleMatch = normalizeSearchTerm(post.title).includes(normalizedSearch)
      const descriptionMatch = normalizeSearchTerm(post.description).includes(normalizedSearch)
      return titleMatch || descriptionMatch
    })
  }

  return filteredPosts
}