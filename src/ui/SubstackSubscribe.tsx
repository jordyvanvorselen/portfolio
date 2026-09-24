import { useTranslations } from 'next-intl'

export interface SubstackSubscribeProps {
  publicationUrl: string
  caption?: string
}

// Substack's own signup form, so readers subscribe without leaving the blog
export const SubstackSubscribe = ({
  publicationUrl,
  caption,
}: SubstackSubscribeProps) => {
  const t = useTranslations('blog.post')

  return (
    <div className="my-10 flex flex-col items-center gap-4 rounded-xl border border-gray-800 bg-gray-900/50 px-6 py-8">
      {caption && (
        <p className="max-w-xl text-center text-lg leading-relaxed text-gray-300">
          {caption}
        </p>
      )}
      <iframe
        title={t('subscribeFormTitle')}
        src={`${publicationUrl}/embed`}
        loading="lazy"
        className="h-[150px] w-full max-w-lg rounded-lg border-0"
      />
    </div>
  )
}
