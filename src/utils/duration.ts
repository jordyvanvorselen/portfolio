const translations = {
  en: { year: 'year', years: 'years', month: 'month', months: 'months' },
  nl: { year: 'jaar', years: 'jaar', month: 'maand', months: 'maanden' },
} as const

type SupportedLocale = keyof typeof translations

export const calculateDuration = (
  startDate: string,
  locale: string,
  now: Date = new Date()
): string => {
  const start = new Date(startDate)
  const t =
    translations[(locale in translations ? locale : 'en') as SupportedLocale]

  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()

  if (months < 0) {
    years--
    months += 12
  }

  const parts: string[] = []

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? t.year : t.years}`)
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? t.month : t.months}`)
  }

  return parts.join(' ')
}
