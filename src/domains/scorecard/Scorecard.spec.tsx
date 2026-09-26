import { act, fireEvent, render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { vi } from 'vitest'

import { Scorecard } from '@/domains/scorecard/Scorecard'

const BEST_ANSWERS = ['2', '1', ...Array<string>(12).fill('4')]
const WORST_ANSWERS = ['2', '4', ...Array<string>(12).fill('1')]
const HEALTHY_ANSWERS = [
  '2',
  '3',
  ...Array.from({ length: 6 }, () => ['4', '3']).flat(),
]
const CHECKS_MS = 10_000
const COUNTDOWN_MS = 5_000

class InstantIntersectionObserver {
  constructor(private readonly callback: IntersectionObserverCallback) {}

  observe() {
    this.callback(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    )
    this.callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    )
  }

  disconnect() {}
}

const canvasContext = {
  scale: vi.fn(),
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
}

const prefersReducedMotion = (matches: boolean) => {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    query =>
      ({
        matches,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }) as unknown as MediaQueryList
  )
}

const advance = (ms: number) =>
  act(() => {
    vi.advanceTimersByTime(ms)
  })

const press = (key: string, options: Partial<KeyboardEventInit> = {}) =>
  fireEvent.keyDown(window, { key, ...options })

const answerAll = (keys: string[]) => {
  for (const key of keys) {
    press(key)
    advance(300)
  }
}

const startQuiz = () => {
  fireEvent.click(
    screen.getAllByRole('button', { name: 'scorecard.intro.start' })[0]!
  )
}

const openSampleReport = () => {
  fireEvent.click(
    screen.getAllByRole('button', { name: 'scorecard.intro.sample' })[0]!
  )
}

const seeReportButton = () =>
  screen.queryByRole('button', { name: /analyzing.seeReport/ })

const waitForChecks = () => {
  for (let step = 0; step < CHECKS_MS / 100 && !seeReportButton(); step++) {
    advance(100)
  }
}

const finishChecks = () => {
  waitForChecks()
  fireEvent.click(seeReportButton()!)
  advance(3_000)
}

const questionHeading = () => screen.getByRole('heading', { level: 2 })

describe(Scorecard, () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: [
        'setTimeout',
        'clearTimeout',
        'requestAnimationFrame',
        'cancelAnimationFrame',
        'performance',
        'Date',
      ],
    })
    vi.stubGlobal('IntersectionObserver', InstantIntersectionObserver)
    prefersReducedMotion(true)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  describe('intro', () => {
    it('invites the visitor to start or see a sample report', () => {
      render(<Scorecard />)

      expect(
        screen.getByRole('heading', { level: 1, name: /intro.titleLead/ })
      ).toBeVisible()
      expect(
        screen.getAllByRole('button', { name: 'scorecard.intro.start' })
      ).toHaveLength(2)
      expect(
        screen.getAllByRole('button', { name: 'scorecard.intro.sample' })
      ).toHaveLength(2)
    })

    it('renders the intro on the server before any motion preference is known', () => {
      const html = renderToString(<Scorecard />)

      expect(html).toContain('scorecard.intro.start')
    })

    it('shows the review and incident symptoms as multipliers', () => {
      render(<Scorecard />)

      expect(screen.getByText('scorecard.symptoms.title')).toBeVisible()
      expect(screen.getAllByText('5.4×')[0]).toBeVisible()
      expect(screen.getAllByText('3.4×')[0]).toBeVisible()
    })

    it('counts the symptom multipliers up once they are in view', () => {
      prefersReducedMotion(false)
      render(<Scorecard />)

      advance(2_000)

      expect(screen.getAllByText('5.4×')).toHaveLength(2)
      expect(screen.getAllByText('3.4×')).toHaveLength(2)
    })

    it('links every rail to its research in a new tab', () => {
      render(<Scorecard />)

      const links = screen.getAllByRole('link', {
        name: /intro.opensInNewTab/,
      })
      expect(links).toHaveLength(6)
      for (const link of links) {
        expect(link).toHaveAttribute('target', '_blank')
      }
    })
  })

  describe('quiz', () => {
    it('asks the first of 14 questions after starting', () => {
      render(<Scorecard />)

      startQuiz()

      expect(
        screen.getByRole('progressbar', { name: 'scorecard.quiz.progress' })
      ).toHaveAttribute('aria-valuenow', '1')
      expect(questionHeading()).toHaveTextContent(
        'scorecard.questions.teamSize.text'
      )
      expect(screen.getByText('scorecard.quiz.aboutTeam')).toBeVisible()
    })

    it('shows which number keys answer a question', () => {
      render(<Scorecard />)

      startQuiz()

      expect(screen.getByText('key', { selector: 'kbd' })).toBeVisible()
    })

    it('moves to the next question after an answer is clicked', () => {
      render(<Scorecard />)
      startQuiz()

      fireEvent.click(
        screen.getByRole('button', {
          name: 'scorecard.questions.teamSize.options.1',
        })
      )
      advance(300)

      expect(questionHeading()).toHaveTextContent(
        'scorecard.questions.aiShare.text'
      )
    })

    it('shows the rail a scored question belongs to', () => {
      render(<Scorecard />)
      startQuiz()

      answerAll(['1', '1'])

      expect(questionHeading()).toHaveTextContent(
        'scorecard.questions.leadTime.text'
      )
      expect(
        screen.getByText('scorecard.pillars.measurement.name')
      ).toBeVisible()
    })

    it('answers with the number keys', () => {
      render(<Scorecard />)
      startQuiz()

      press('3')
      advance(300)

      expect(questionHeading()).toHaveTextContent(
        'scorecard.questions.aiShare.text'
      )
    })

    it('ignores keys that are not an answer or that use a modifier', () => {
      render(<Scorecard />)
      startQuiz()

      press('9')
      press('2', { metaKey: true })
      press('2', { ctrlKey: true })
      press('2', { altKey: true })
      advance(300)

      expect(questionHeading()).toHaveTextContent(
        'scorecard.questions.teamSize.text'
      )
    })

    it('ignores number keys typed into a text field', () => {
      render(
        <>
          <input aria-label="notes" />
          <Scorecard />
        </>
      )
      startQuiz()

      fireEvent.keyDown(screen.getByRole('textbox', { name: 'notes' }), {
        key: '2',
      })
      advance(300)

      expect(questionHeading()).toHaveTextContent(
        'scorecard.questions.teamSize.text'
      )
    })

    it('goes back to the previous question and keeps the answer', () => {
      render(<Scorecard />)
      startQuiz()
      answerAll(['3'])

      fireEvent.click(
        screen.getByRole('button', { name: 'scorecard.quiz.back' })
      )

      expect(
        screen.getByRole('button', {
          name: 'scorecard.questions.teamSize.options.2',
        })
      ).toHaveAttribute('aria-pressed', 'true')
    })

    it('goes back with the backspace key', () => {
      render(<Scorecard />)
      startQuiz()
      answerAll(['3'])

      press('Backspace')

      expect(questionHeading()).toHaveTextContent(
        'scorecard.questions.teamSize.text'
      )
    })

    it('returns to the intro from the first question', () => {
      render(<Scorecard />)
      startQuiz()

      fireEvent.click(
        screen.getByRole('button', { name: 'scorecard.quiz.intro' })
      )

      expect(
        screen.getAllByRole('button', { name: 'scorecard.intro.start' })[0]
      ).toBeVisible()
    })

    it('only counts the last answer when the visitor answers twice quickly', () => {
      render(<Scorecard />)
      startQuiz()

      press('1')
      press('4')
      advance(300)
      fireEvent.click(
        screen.getByRole('button', { name: 'scorecard.quiz.back' })
      )

      expect(
        screen.getByRole('button', {
          name: 'scorecard.questions.teamSize.options.3',
        })
      ).toHaveAttribute('aria-pressed', 'true')
    })
  })

  describe('delivery checks', () => {
    it('runs a check per rail with the visitor’s own answers', () => {
      render(<Scorecard />)
      startQuiz()

      answerAll(WORST_ANSWERS)

      expect(
        screen.getByRole('heading', { name: 'scorecard.analyzing.title' })
      ).toBeVisible()
      expect(
        screen.getByText(
          /scorecard.analyzing.run name=scorecard.pillars.review.name/
        )
      ).toBeVisible()
      expect(
        screen.getByText(/scorecard.questions.reviewOwner.options.0/)
      ).toBeVisible()
      expect(screen.getByRole('status')).toHaveTextContent(
        'scorecard.analyzing.statusDoneLeak name=scorecard.pillars.measurement.name'
      )
    })

    it('streams the checks one rail at a time', () => {
      prefersReducedMotion(false)
      render(<Scorecard />)
      openSampleReport()

      expect(screen.getByRole('status')).toHaveTextContent(
        'scorecard.analyzing.statusStarting'
      )
      advance(600)
      expect(screen.getByRole('status')).toHaveTextContent(
        'scorecard.analyzing.statusChecking name=scorecard.pillars.measurement.name'
      )
      expect(screen.getByText('scorecard.analyzing.inProgress')).toBeVisible()

      advance(CHECKS_MS)
      expect(
        screen.getByText('scorecard.analyzing.railsToFix count=6')
      ).toBeVisible()
    })

    it('opens the report by itself after the countdown', () => {
      prefersReducedMotion(false)
      render(<Scorecard />)
      openSampleReport()
      waitForChecks()

      advance(COUNTDOWN_MS + 1_000)

      expect(
        screen.getByRole('heading', {
          level: 1,
          name: 'scorecard.tiers.leaking.name',
        })
      ).toBeVisible()
    })

    it('opens the report straight away from the button', () => {
      render(<Scorecard />)
      openSampleReport()

      fireEvent.click(
        screen.getByRole('button', { name: /analyzing.seeReport/ })
      )

      expect(
        screen.getByRole('heading', {
          level: 1,
          name: 'scorecard.tiers.leaking.name',
        })
      ).toBeVisible()
    })
  })

  describe('report with a leak', () => {
    it('shows the tier, the biggest leak and its first fix', () => {
      render(<Scorecard />)
      openSampleReport()
      finishChecks()

      expect(
        screen.getByRole('heading', {
          level: 1,
          name: 'scorecard.tiers.leaking.name',
        })
      ).toBeVisible()
      expect(screen.getByText('scorecard.results.leakEyebrow')).toBeVisible()
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'scorecard.pillars.review.name',
        })
      ).toBeVisible()
      expect(screen.getByText('scorecard.pillars.review.fix')).toBeVisible()
      expect(
        screen.getByText('scorecard.results.biggestLeakBadge')
      ).toBeVisible()
    })

    it('states the overall score above the tier', () => {
      render(<Scorecard />)
      openSampleReport()
      finishChecks()

      expect(screen.getByText('scorecard.results.scoreLine')).toHaveTextContent(
        'scorecard.results.scoreLine4242'
      )
    })

    it('says the engine outruns the rails when AI writes more than the rails score', () => {
      render(<Scorecard />)
      openSampleReport()
      finishChecks()

      expect(screen.getByText('scorecard.results.outrunTitle')).toBeVisible()
    })

    it('estimates the time and money lost to the leaks', () => {
      render(<Scorecard />)
      openSampleReport()
      finishChecks()

      expect(screen.getByText('scorecard.results.costTitle')).toBeVisible()
      expect(
        screen.getByText('scorecard.results.hoursValue hours=35')
      ).toBeVisible()
      expect(screen.getByText('€11,400')).toBeVisible()
    })

    it('counts the verdict, gauges and cost up with motion', () => {
      prefersReducedMotion(false)
      render(<Scorecard />)
      openSampleReport()
      finishChecks()

      advance(3_000)

      expect(
        screen.getByText('scorecard.results.hoursValue hours=35')
      ).toBeVisible()
      expect(screen.getAllByText('70%')[0]).toBeVisible()
    })
  })

  describe('healthy report', () => {
    it('celebrates a perfect score without naming a leak', () => {
      render(<Scorecard />)
      startQuiz()
      answerAll(BEST_ANSWERS)
      expect(screen.getByText('scorecard.analyzing.allHealthy')).toBeVisible()
      finishChecks()

      expect(
        screen.getByRole('heading', {
          level: 1,
          name: 'scorecard.tiers.overdrive.name',
        })
      ).toBeVisible()
      expect(screen.getByText('scorecard.results.perfectTitle')).toBeVisible()
      expect(
        screen.getByText('scorecard.results.costTitleNothingLost')
      ).toBeVisible()
      expect(
        screen.queryByText('scorecard.results.biggestLeakBadge')
      ).not.toBeInTheDocument()
    })

    it('says the rails keep up when they score higher than the AI share', () => {
      render(<Scorecard />)
      startQuiz()
      answerAll(BEST_ANSWERS)
      finishChecks()

      expect(screen.getByText('scorecard.results.keepUpTitle')).toBeVisible()
    })

    it('names the weakest rail when every rail holds but the score is not perfect', () => {
      render(<Scorecard />)
      startQuiz()
      answerAll(HEALTHY_ANSWERS)
      finishChecks()

      expect(screen.getByText('scorecard.results.holdTitle')).toBeVisible()
      expect(
        screen.getByText(
          'scorecard.results.holdBody healthy=80 name=scorecard.pillars.measurement.name score=83'
        )
      ).toBeVisible()
      expect(screen.getByText('scorecard.results.costTitle')).toBeVisible()
    })

    it('fires a burst of sparks when motion is allowed', () => {
      prefersReducedMotion(false)
      vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
        canvasContext as unknown as CanvasRenderingContext2D
      )
      render(<Scorecard />)
      startQuiz()
      answerAll(BEST_ANSWERS)
      finishChecks()

      advance(4_000)

      expect(screen.getByText('scorecard.results.perfectTitle')).toBeVisible()
    })

    it('still shows a healthy report when the browser cannot draw sparks', () => {
      prefersReducedMotion(false)
      render(<Scorecard />)
      startQuiz()
      answerAll(HEALTHY_ANSWERS)
      finishChecks()

      advance(4_000)

      expect(screen.getByText('scorecard.results.holdTitle')).toBeVisible()
    })
  })

  describe('after the report', () => {
    it('retakes the scorecard from the start', () => {
      render(<Scorecard />)
      openSampleReport()
      finishChecks()

      fireEvent.click(
        screen.getByRole('button', { name: 'scorecard.results.restart' })
      )
      startQuiz()

      expect(
        screen.getByRole('progressbar', { name: 'scorecard.quiz.progress' })
      ).toHaveAttribute('aria-valuenow', '1')
    })

    it('shares the report with the native share sheet when available', async () => {
      const share = vi.fn().mockResolvedValue(undefined)
      vi.stubGlobal('navigator', { ...navigator, share })
      render(<Scorecard />)
      openSampleReport()
      finishChecks()

      await act(async () => {
        fireEvent.click(
          screen.getByRole('button', { name: 'scorecard.results.share' })
        )
      })

      expect(share).toHaveBeenCalledWith({
        title: 'scorecard.results.shareTitle',
        url: window.location.href,
      })
    })

    it('stays on the report when the visitor cancels the share sheet', async () => {
      const share = vi.fn().mockRejectedValue(new Error('AbortError'))
      vi.stubGlobal('navigator', { ...navigator, share })
      render(<Scorecard />)
      openSampleReport()
      finishChecks()

      await act(async () => {
        fireEvent.click(
          screen.getByRole('button', { name: 'scorecard.results.share' })
        )
      })

      expect(
        screen.getByRole('button', { name: 'scorecard.results.share' })
      ).toBeVisible()
    })

    it('copies the report link when the browser has no share sheet', async () => {
      const writeText = vi.fn().mockResolvedValue(undefined)
      vi.stubGlobal('navigator', {
        ...navigator,
        share: undefined,
        clipboard: { writeText },
      })
      render(<Scorecard />)
      openSampleReport()
      finishChecks()

      await act(async () => {
        fireEvent.click(
          screen.getByRole('button', { name: 'scorecard.results.share' })
        )
      })

      expect(writeText).toHaveBeenCalledWith(window.location.href)
      expect(
        screen.getByRole('button', { name: 'scorecard.results.linkCopied' })
      ).toBeVisible()
    })
  })
})
