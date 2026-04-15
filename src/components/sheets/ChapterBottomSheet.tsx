import { useCallback, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Star, Lock, Circle, CheckCircle2, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LifeChapter } from '@/types'

interface ChapterBottomSheetProps {
  isOpen: boolean
  chapter: LifeChapter | null
  onClose: () => void
  onBeginStep: (chapterId: string, stepType: 'conversation' | 'deeper') => void
}

const STAR_COUNT = 3
const DRAG_CLOSE_THRESHOLD = 100

const CHAPTER_IMAGE = '/images/Life chapters 2.png'

function statusLabel(ch: LifeChapter): string {
  if (ch.starsEarned >= 3) return 'Complete'
  if (ch.step1Status === 'complete' || ch.step2Status !== 'not_started') return 'Started'
  if (ch.step1Status !== 'not_started') return 'Started'
  return 'Not Started'
}

export function ChapterBottomSheet({ isOpen, chapter, onClose, onBeginStep }: ChapterBottomSheetProps) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const main = document.querySelector('main')
    if (!main) return
    if (isOpen) {
      main.style.overflow = 'hidden'
    } else {
      main.style.overflow = ''
    }
    return () => { main.style.overflow = '' }
  }, [isOpen])

  const sheetVariants = useMemo(() => ({
    hidden: {
      y: '100%',
      opacity: shouldReduceMotion ? 0 : 1,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: 'spring' as const, stiffness: 300, damping: 30 },
    },
    exit: {
      y: '100%',
      opacity: shouldReduceMotion ? 0 : 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.25, ease: 'easeIn' as const },
    },
  }), [shouldReduceMotion])

  const backdropVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.2 },
    },
  }), [shouldReduceMotion])

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
      if (info.offset.y > DRAG_CLOSE_THRESHOLD || info.velocity.y > 500) {
        onClose()
      }
    },
    [onClose],
  )

  if (!chapter) return null

  const step1Complete = chapter.step1Status === 'complete'
  const step2Locked = chapter.step1Status !== 'complete'
  const step2Complete = chapter.step2Status === 'complete'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="ch-sheet-backdrop"
            className="fixed inset-0 z-40 bg-black/50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{ willChange: 'opacity' }}
          />

          {/* Sheet */}
          <motion.div
            key="ch-sheet-panel"
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85%] flex-col overflow-hidden rounded-t-[20px] bg-[var(--lm-bg-primary)]"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ willChange: 'transform' }}
          >
            {/* Drag handle + close */}
            <div className="relative flex shrink-0 items-center justify-center px-4 pb-2 pt-4">
              <div className="h-[3px] w-10 rounded-full bg-foreground/30" />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 flex size-6 items-center justify-center"
              >
                <X className="size-5 text-foreground/60" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain pb-10 pt-2">
              <div className="flex flex-col gap-8">
                {/* ── Header ── */}
                <div className="flex flex-col items-center gap-2.5 px-5">
                  <div className="h-[100px] w-[160px] overflow-hidden">
                    <img
                      src={CHAPTER_IMAGE}
                      alt={chapter.title}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <p className="text-center font-display text-[22px] font-normal leading-[1.2] text-foreground">
                    {chapter.title}
                  </p>

                  {/* Star row */}
                  <div className="flex flex-col items-center gap-[2px]">
                    <div className="flex items-center gap-4">
                      {Array.from({ length: STAR_COUNT }).map((_, i) => (
                        <Star
                          key={i}
                          className="size-5"
                          fill={i < chapter.starsEarned ? 'var(--lm-gold-star)' : 'none'}
                          stroke={i < chapter.starsEarned ? 'var(--lm-gold-star)' : 'var(--lm-text-tertiary)'}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                    <p className="text-center text-[13px] font-medium leading-[1.2] text-[var(--lm-text-tertiary)]">
                      {statusLabel(chapter)}
                    </p>
                  </div>

                  <p className="text-center text-sm text-muted-foreground">
                    A chapter of your life
                  </p>
                </div>

                {/* ── Step 1 ── */}
                <div className="flex flex-col gap-2 px-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground px-1">
                    Step 1 of 2
                  </p>
                  <div className="flex flex-col gap-3 rounded-[10px] bg-lm-bg-card/40 px-4 py-4 shadow-card backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      {step1Complete ? (
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-lm-green" />
                      ) : (
                        <Circle className="mt-0.5 size-5 shrink-0 text-[var(--lm-text-tertiary)]" />
                      )}
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <p className={cn(
                            'text-[15px] font-semibold leading-tight',
                            step1Complete ? 'text-muted-foreground' : 'text-lm-green-dark',
                          )}>
                            Conversation about {chapter.title}
                          </p>
                          <p className="shrink-0 text-[12px] text-muted-foreground">15 min</p>
                        </div>
                        <p className="text-[13px] leading-snug text-muted-foreground">
                          Talk through the memories and turning points that define {chapter.title} in your story.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onBeginStep(chapter.id, 'conversation')}
                      className={cn(
                        'flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold transition-all active:scale-[0.98]',
                        step1Complete
                          ? 'bg-lm-bg-card border border-lm-border text-foreground'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90',
                      )}
                    >
                      {step1Complete ? 'Revisit' : "Let's Begin"}
                    </button>
                  </div>
                </div>

                {/* ── Step 2 ── */}
                <div className="flex flex-col gap-2 px-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground px-1">
                    Step 2 of 2
                  </p>
                  <div className={cn(
                    'flex flex-col gap-3 rounded-[10px] bg-lm-bg-card/40 px-4 py-4 shadow-card backdrop-blur-sm',
                    step2Locked && 'opacity-60',
                  )}>
                    <div className="flex items-start gap-3">
                      {step2Locked ? (
                        <Lock className="mt-0.5 size-5 shrink-0 text-lm-neutral-warm" />
                      ) : step2Complete ? (
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-lm-green" />
                      ) : (
                        <Circle className="mt-0.5 size-5 shrink-0 text-[var(--lm-text-tertiary)]" />
                      )}
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <p className={cn(
                            'text-[15px] font-semibold leading-tight',
                            (step2Locked || step2Complete) ? 'text-muted-foreground' : 'text-lm-green-dark',
                          )}>
                            Diving deeper into {chapter.title}
                          </p>
                          <p className="shrink-0 text-[12px] text-muted-foreground">15 min</p>
                        </div>
                        <p className="text-[13px] leading-snug text-muted-foreground">
                          Go further into the feelings, people, and lessons from {chapter.title}.
                        </p>
                      </div>
                    </div>
                    {!step2Locked && (
                      <button
                        type="button"
                        onClick={() => onBeginStep(chapter.id, 'deeper')}
                        className={cn(
                          'flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold transition-all active:scale-[0.98]',
                          step2Complete
                            ? 'bg-lm-bg-card border border-lm-border text-foreground'
                            : 'bg-primary text-primary-foreground hover:bg-primary/90',
                        )}
                      >
                        {step2Complete ? 'Revisit' : "Let's Begin"}
                      </button>
                    )}
                  </div>
                </div>

                {/* ── More Ways to Grow — only after both steps complete ── */}
                {step1Complete && step2Complete && <div className="flex flex-col gap-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-lm-gold/30" />
                    <p className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-lm-gold">
                      More Ways to Grow
                    </p>
                    <div className="h-px flex-1 bg-lm-gold/30" />
                  </div>

                  <button
                    type="button"
                    onClick={() => onBeginStep(chapter.id, 'conversation')}
                    className="flex items-center justify-between rounded-[10px] bg-lm-bg-card/40 px-4 py-3.5 shadow-card backdrop-blur-sm transition-colors active:bg-lm-bg-card/60"
                  >
                    <p className="text-[14px] font-medium text-foreground">
                      Conversation about {chapter.title}
                    </p>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onBeginStep(chapter.id, 'deeper')}
                    className="flex items-center justify-between rounded-[10px] bg-lm-bg-card/40 px-4 py-3.5 shadow-card backdrop-blur-sm transition-colors active:bg-lm-bg-card/60"
                  >
                    <p className="text-[14px] font-medium text-foreground">
                      Diving deeper into {chapter.title}
                    </p>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                  </button>
                </div>}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
