import { Calendar, Clock } from 'lucide-react'
import Image from 'next/image'

import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { Badge } from '@/ui/Badge'
import { useTranslations, useMessages } from 'next-intl'

export interface BlogCardProps {
  translationKey: string
  image: string
}

export const BlogCard = ({ translationKey, image }: BlogCardProps) => {
  const t = useTranslations()
  const messages = useMessages() as Record<string, unknown> // We need raw access for arrays

  const title = t(`blog.posts.${translationKey}.title`)
  const description = t(`blog.posts.${translationKey}.description`)
  const date = t(`blog.posts.${translationKey}.date`)
  const readTime = t(`blog.posts.${translationKey}.readTime`)
  const blogMessages = messages['blog'] as Record<string, unknown> | undefined
  const postsMessages = blogMessages?.['posts'] as
    | Record<string, unknown>
    | undefined
  const postMessages = postsMessages?.[translationKey] as
    | Record<string, unknown>
    | undefined
  const tags = (postMessages?.['tags'] as string[]) || []
  return (
    <article className="group relative overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/5 backdrop-blur-sm cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        <div className="aspect-[16/9] overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={800}
            height={600}
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

          <Title
            size="sm"
            weight="bold"
            color="primary"
            align="left"
            as="h3"
            hoverColor="teal"
            lineClamp={2}
            className="text-xl mb-3 transition-colors duration-300"
          >
            {title}
          </Title>

          <Text
            size="base"
            weight="normal"
            color="secondary"
            alignment="left"
            lineHeight="relaxed"
            lineClamp={3}
            className="mb-4"
          >
            {description}
          </Text>

          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="soft" color="default" size="sm">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="soft" color="default" size="sm">
                {t('blog.card.moreCount', { count: tags.length - 3 })}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
