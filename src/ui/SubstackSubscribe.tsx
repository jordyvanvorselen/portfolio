import { useTranslations } from 'next-intl'

import { Button } from '@/ui/Button'
import { SubstackIcon } from '@/ui/SubstackIcon'

export interface SubstackSubscribeProps {
  publicationUrl: string
  caption?: string
}

// Links to Substack's subscribe page: its embeddable form only comes in the publication's light theme
export const SubstackSubscribe = ({
  publicationUrl,
  caption,
}: SubstackSubscribeProps) => {
  const t = useTranslations('blog.post')

  return (
    <div className="my-10 flex flex-col items-center gap-6 rounded-xl border border-gray-800 bg-gray-900/50 px-6 py-8">
      {caption && (
        <p className="max-w-xl text-center text-lg leading-relaxed text-gray-300">
          {caption}
        </p>
      )}
      <Button
        href={`${publicationUrl}/subscribe`}
        className="inline-flex items-center gap-2"
      >
        <SubstackIcon />
        {t('subscribeOnSubstack')}
        <span className="sr-only">{t('opensOnSubstack')}</span>
      </Button>
    </div>
  )
}
