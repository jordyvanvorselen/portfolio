import { Calendar, Clock } from 'lucide-react'

import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { Badge } from '@/ui/Badge'

export interface BlogCardProps {
  title: string
  description: string
  date: string
  readTime: string
  image: string
  tags: string[]
}

export const BlogCard = ({
  title,
  description,
  date,
  readTime,
  image,
  tags,
}: BlogCardProps) => {
  return (
    <article className="group relative overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/5 backdrop-blur-sm cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800/60 via-transparent to-transparent" />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" aria-hidden="true" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" aria-hidden="true" />
              <span>{readTime}</span>
            </div>
          </div>

          <Title variant="blog-card-title">{title}</Title>

          <Text variant="blog-card-description">{description}</Text>

          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="blog-tag">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="blog-tag-more">+{tags.length - 3} more</Badge>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
