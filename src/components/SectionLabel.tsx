import { Badge } from '@/ui/Badge'

export interface SectionLabelProps {
  children: string
}

export function SectionLabel({ children }: SectionLabelProps): JSX.Element {
  return <Badge variant="section-label">{children}</Badge>
}
