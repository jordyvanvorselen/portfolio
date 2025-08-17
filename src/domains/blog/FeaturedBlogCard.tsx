import { Calendar, Clock, Star } from 'lucide-react'
import Image from 'next/image'

import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { Badge } from '@/ui/Badge'

export interface FeaturedBlogCardProps {
  title: string
  description: string
  date: string
  readTime: string
  image: string
  tags: string[]
}

export const FeaturedBlogCard = ({
  title,
  description,
  date,
  readTime,
  image,
  tags,
}: FeaturedBlogCardProps) => {
  return (
    <article
      data-featured="true"
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/90 via-gray-800/70 to-gray-900/90 border border-teal-500/30 hover:border-teal-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/10 backdrop-blur-sm cursor-pointer"
    >
      {/* Featured badge */}
      <div className="absolute top-4 left-4 z-20">
        <div className="flex items-center gap-2 bg-teal-500/20 border border-teal-400/40 text-teal-400 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
          <Star className="w-3 h-3 fill-current" aria-hidden="true" />
          Featured
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Image section */}
        <div className="aspect-[16/9] lg:aspect-auto overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={800}
            height={600}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-gray-900/10 lg:to-gray-800/60" />
        </div>

        {/* Content section */}
        <div className="relative p-8 lg:py-12 lg:flex lg:flex-col lg:justify-center">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>{readTime}</span>
            </div>
          </div>

          <Title
            size="lg"
            weight="bold"
            color="accent"
            align="left"
            as="h3"
            className="text-2xl lg:text-3xl mb-4"
          >
            {title}
          </Title>

          <Text
            size="base"
            weight="normal"
            color="secondary"
            alignment="left"
            lineHeight="relaxed"
            className="text-lg text-gray-300 mb-6 line-clamp-3"
          >
            {description}
          </Text>

          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 4).map(tag => (
              <Badge
                key={tag}
                variant="soft"
                color="default"
                size="sm"
                rounded={false}
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 4 && (
              <Badge variant="soft" color="default" size="sm" rounded={false}>
                +{tags.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
