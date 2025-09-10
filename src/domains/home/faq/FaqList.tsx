'use client'

import { useState } from 'react'

import { Accordion } from '@/ui/Accordion'
import { FaqItem } from '@/domains/home/faq/FaqItem'
import { faqData } from '@/domains/home/faq/faq.data'

export const FaqList = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto mt-24 md:mt-28">
      <Accordion
        openIndex={openIndex}
        onOpenChange={setOpenIndex}
        allowMultiple={false}
      >
        {faqData.map((faq, index) => (
          <FaqItem key={index} index={index} faq={faq} />
        ))}
      </Accordion>
    </div>
  )
}
