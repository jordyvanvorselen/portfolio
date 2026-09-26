import {
  FileCheck,
  FlaskConical,
  Gauge,
  GitPullRequest,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

import type { PillarId } from '@/domains/scorecard/scorecard.data'

export const pillarIcons: Record<PillarId, LucideIcon> = {
  measurement: Gauge,
  tests: FlaskConical,
  specs: FileCheck,
  pipeline: ShieldCheck,
  review: GitPullRequest,
  releases: Rocket,
}
