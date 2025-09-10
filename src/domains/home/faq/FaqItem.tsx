import { useTranslations } from 'next-intl'

import { AccordionItem } from '@/ui/AccordionItem'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { FaqItem as FaqItemType } from '@/domains/home/faq/faq.data'

export interface FaqItemProps {
  index: number
  faq: FaqItemType
}

export const FaqItem = ({ index, faq }: FaqItemProps) => {
  const t = useTranslations()
  const trigger = (
    <Title
      size="md"
      weight="semibold"
      color="secondary"
      align="left"
      as="h3"
      className="leading-relaxed"
    >
      {t(faq.questionKey)}
    </Title>
  )

  return (
    <AccordionItem
      index={index}
      trigger={trigger}
      ariaLabel={`FAQ: ${t(faq.questionKey)}`}
    >
      <Text
        size="base"
        weight="normal"
        color="secondary"
        alignment="left"
        lineHeight="relaxed"
        className="p-3"
      >
        {t(faq.answerKey)}
      </Text>
    </AccordionItem>
  )
}
