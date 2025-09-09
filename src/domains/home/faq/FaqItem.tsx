import { AccordionItem } from '@/ui/AccordionItem'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { FaqItem as FaqItemType } from '@/domains/home/faq/faq.data'

export interface FaqItemProps {
  index: number
  faq: FaqItemType
}

export const FaqItem = ({ index, faq }: FaqItemProps) => {
  const trigger = (
    <Title
      size="md"
      weight="semibold"
      color="accent"
      align="left"
      as="h3"
      className="leading-relaxed"
    >
      {faq.question}
    </Title>
  )

  return (
    <AccordionItem
      index={index}
      trigger={trigger}
      ariaLabel={`FAQ: ${faq.question}`}
    >
      <Text
        size="base"
        weight="normal"
        color="secondary"
        alignment="left"
        lineHeight="relaxed"
        className="p-3"
      >
        {faq.answer}
      </Text>
    </AccordionItem>
  )
}
