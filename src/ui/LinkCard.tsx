import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export interface LinkCardProps {
  href: string
  title: string
  description?: string
  author?: string
  date?: string
  imageUrl?: string
}

// Preview card for another post, laid out like Substack's post embed
export const LinkCard = ({
  href,
  title,
  description,
  author,
  date,
  imageUrl,
}: LinkCardProps) => {
  const t = useTranslations('blog.post')
  const isExternal = /^https?:\/\//.test(href)
  const byline = [author, date].filter(Boolean).join(' · ')

  return (
    <Link
      href={href}
      className="group my-8 flex items-stretch gap-6 rounded-xl border border-gray-700 bg-gray-800/50 p-6 no-underline backdrop-blur-sm transition-all duration-300 hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-500/5"
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div>
          <span className="block text-xl font-semibold text-white transition-colors duration-300 group-hover:text-teal-400">
            {title}
          </span>
          {byline && (
            <span className="mt-2 block text-sm uppercase tracking-wide text-gray-400">
              {byline}
            </span>
          )}
          {description && (
            <span className="mt-3 block text-base leading-relaxed text-gray-300 line-clamp-2">
              {description}
            </span>
          )}
        </div>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-teal-400">
          {t('readFullStory')}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          width={140}
          height={140}
          className="h-28 w-28 shrink-0 rounded-lg object-cover sm:h-36 sm:w-36"
        />
      )}
    </Link>
  )
}
