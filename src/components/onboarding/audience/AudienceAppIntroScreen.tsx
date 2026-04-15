import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { ThinkingDots } from '@/components/ui/ThinkingDots'
import { Button } from '@/components/ui/button'

interface QAPair {
  question: string
  answer: string
}

const QA_PAIRS: QAPair[] = [
  {
    question: 'What is LastingMind?',
    answer: 'A place where people capture their stories, memories, and wisdom — and share them with the people they love.',
  },
  {
    question: 'How does it work?',
    answer: 'The person who invited you has been recording their life. LastingMind uses everything they\'ve shared to let you explore it — and even have a conversation with it.',
  },
  {
    question: 'What can I do?',
    answer: 'Ask questions, browse their story, or send them something to answer. It\'s all here whenever you\'re ready.',
  },
]

// Timing constants (ms)
const INITIAL_DELAY = 800
const PAUSE_BEFORE_RESPONSE = 600
const TYPING_DURATION = 1200
const WORD_STAGGER_MS = 45         // delay between each word appearing
const PAUSE_AFTER_ANSWER = 2800
const PAUSE_BEFORE_NEXT_Q = 1400

// ---------------------------------------------------------------------------
// RevealText — words appear left-to-right with staggered fade
// ---------------------------------------------------------------------------
function RevealText({ text, onRevealComplete }: { text: string; onRevealComplete?: () => void }) {
  const words = text.split(' ')
  const totalDuration = words.length * WORD_STAGGER_MS

  useEffect(() => {
    if (onRevealComplete) {
      const t = setTimeout(onRevealComplete, totalDuration + 300)
      return () => clearTimeout(t)
    }
  }, [onRevealComplete, totalDuration])

  return (
    <span className="text-[15px] leading-[1.5] text-foreground">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.3,
            delay: i * (WORD_STAGGER_MS / 1000),
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline"
        >
          {word}{i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  )
}

// ---------------------------------------------------------------------------
// ResponseBubble — single persistent bubble: dots → text reveal
// ---------------------------------------------------------------------------
function ResponseBubble({
  text,
  onFullyRevealed,
  skipAnimation = false,
}: {
  text: string
  onFullyRevealed?: () => void
  skipAnimation?: boolean
}) {
  const [phase, setPhase] = useState<'typing' | 'revealing'>(skipAnimation ? 'revealing' : 'typing')

  useEffect(() => {
    if (skipAnimation) return
    const t = setTimeout(() => setPhase('revealing'), TYPING_DURATION)
    return () => clearTimeout(t)
  }, [skipAnimation])

  return (
    <div className="max-w-[78%] rounded-2xl rounded-bl-md bg-lm-bg-card px-3.5 py-2.5 shadow-card overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 'typing' ? (
          <motion.div
            key="dots"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.25 }}
            className="flex items-center py-0.5"
          >
            <ThinkingDots />
          </motion.div>
        ) : (
          <motion.div
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            <RevealText text={text} onRevealComplete={onFullyRevealed} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Item types — no more separate typing/answer, just question + response
// ---------------------------------------------------------------------------
type AnimationItem =
  | { type: 'question'; index: number }
  | { type: 'response'; index: number }

interface AudienceAppIntroScreenProps {
  onComplete: () => void
  onBack?: () => void
}

export function AudienceAppIntroScreen({ onComplete, onBack }: AudienceAppIntroScreenProps) {
  const [items, setItems] = useState<AnimationItem[]>([])
  const [showCTA, setShowCTA] = useState(false)
  const [revealedCount, setRevealedCount] = useState(0)
  const [skipped, setSkipped] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const cancelledRef = useRef(false)

  const handleSkip = useCallback(() => {
    cancelledRef.current = true
    const allItems: AnimationItem[] = []
    for (let i = 0; i < QA_PAIRS.length; i++) {
      allItems.push({ type: 'question', index: i })
      allItems.push({ type: 'response', index: i })
    }
    setItems(allItems)
    setSkipped(true)
    setShowCTA(true)
  }, [])

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    })
  }, [])

  // Scroll whenever items change or text reveals progress
  useEffect(() => {
    scrollToBottom()
  }, [items, revealedCount, scrollToBottom])

  // Sequenced animation
  useEffect(() => {
    cancelledRef.current = false
    setItems([])
    setShowCTA(false)
    setRevealedCount(0)

    const timers: ReturnType<typeof setTimeout>[] = []

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = setTimeout(() => {
          if (!cancelledRef.current) resolve()
        }, ms)
        timers.push(t)
      })

    async function runSequence() {
      await wait(INITIAL_DELAY)

      for (let i = 0; i < QA_PAIRS.length; i++) {
        if (cancelledRef.current) return

        // Show question bubble
        setItems((prev) => [...prev, { type: 'question', index: i }])
        await wait(150)
        scrollToBottom()
        await wait(PAUSE_BEFORE_RESPONSE)

        if (cancelledRef.current) return

        // Show response bubble (starts with typing dots, auto-transitions to text)
        setItems((prev) => [...prev, { type: 'response', index: i }])
        await wait(150)
        scrollToBottom()

        // Wait for dots phase + word reveal to finish
        const wordCount = QA_PAIRS[i].answer.split(' ').length
        const revealTime = TYPING_DURATION + (wordCount * WORD_STAGGER_MS) + 400
        await wait(revealTime)

        if (cancelledRef.current) return

        // Pause so user can read, then think before next question
        if (i < QA_PAIRS.length - 1) {
          await wait(PAUSE_AFTER_ANSWER)
          if (cancelledRef.current) return
          await wait(PAUSE_BEFORE_NEXT_Q)
        }
      }

      if (!cancelledRef.current) {
        await wait(2000)
        setShowCTA(true)
      }
    }

    runSequence()

    return () => {
      cancelledRef.current = true
      timers.forEach(clearTimeout)
    }
  }, [scrollToBottom])

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[var(--lm-bg-primary)]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/images/onboarding/OnboardingBackground.png"
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
      </div>

      {/* Header bar */}
      <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-border/50 bg-[var(--lm-bg-primary)]/80 px-4 pb-3 pt-[62px] backdrop-blur-sm">
        {onBack ? (
          <button type="button" onClick={onBack} className="flex items-center gap-1.5 rounded-[4px] bg-lm-neutral-warm p-1.5" aria-label="Go back">
            <ArrowLeft className="size-5 text-white" />
          </button>
        ) : (
          <div className="w-8" />
        )}

        <p className="font-display text-[18px] font-semibold leading-[1.2] text-foreground">
          Welcome to LastingMind
        </p>

        <button
          type="button"
          onClick={handleSkip}
          className="font-sans text-[14px] font-medium text-[var(--lm-text-secondary)] transition-colors hover:text-foreground"
        >
          Skip
        </button>
      </div>

      {/* Chat thread */}
      <div
        ref={scrollRef}
        className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-4 pt-8"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((item, idx) => {
          const key = `${item.type}-${item.index}-${idx}`

          if (item.type === 'question') {
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="mb-3 flex justify-end"
              >
                <div className="max-w-[78%] rounded-2xl rounded-br-md bg-lm-green px-3.5 py-2.5">
                  <p className="text-[15px] leading-[1.5] text-white">
                    {QA_PAIRS[item.index].question}
                  </p>
                </div>
              </motion.div>
            )
          }

          if (item.type === 'response') {
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="mb-3 flex justify-start"
              >
                <ResponseBubble
                  text={QA_PAIRS[item.index].answer}
                  onFullyRevealed={() => setRevealedCount((c) => c + 1)}
                  skipAnimation={skipped}
                />
              </motion.div>
            )
          }

          return null
        })}
      </div>

      {/* Start exploring CTA */}
      <AnimatePresence>
        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 border-t border-border/50 bg-[var(--lm-bg-primary)] px-4 pb-[50px] pt-3"
          >
            <Button
              onClick={onComplete}
              className="h-[54px] w-full rounded-[4px] bg-lm-green text-[18px] font-medium text-white transition-transform active:scale-[0.97] active:brightness-90"
            >
              Start exploring
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
