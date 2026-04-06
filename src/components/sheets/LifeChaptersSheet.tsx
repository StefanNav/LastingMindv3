import { useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, BookOpen } from 'lucide-react'
import { useApp } from '@/app/AppProvider'
import type { Category } from '@/types'
import { CategorySheetHeader } from './CategorySheetHeader'

interface LifeChaptersSheetProps {
  isOpen: boolean
  category: Category | null
  onClose: () => void
}

const DRAG_CLOSE_THRESHOLD = 100

export function LifeChaptersSheet({ isOpen, category, onClose }: LifeChaptersSheetProps) {
  const navigate = useNavigate()
  const { hasDefinedChapters, lifeChapters } = useApp()
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

  const handleGetStarted = useCallback(() => {
    onClose()
    navigate('/life-chapters/define')
  }, [onClose, navigate])

  const handleViewChapters = useCallback(() => {
    onClose()
    navigate('/life-chapters')
  }, [onClose, navigate])

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07 },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && category && (
        <>
          {/* Backdrop */}
          <motion.div
            key="lc-sheet-backdrop"
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
            key="lc-sheet-panel"
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
              <motion.div
                className="flex flex-col gap-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Header */}
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-[22px]">
                  <CategorySheetHeader category={category} />

                  <div className="flex flex-col items-center gap-3 px-5 text-center">
                    <p className="font-display text-[22px] font-normal leading-[1.2] text-foreground">
                      {hasDefinedChapters ? 'Your Life Chapters' : 'Define Your Life Chapters'}
                    </p>
                    <p className="text-sm leading-snug text-[var(--lm-text-secondary)]">
                      {hasDefinedChapters
                        ? `You've defined ${lifeChapters.length} chapter${lifeChapters.length === 1 ? '' : 's'}. Each one becomes a storytelling session.`
                        : 'Map out the chapters of your life — the moments and stages that made you who you are.'}
                    </p>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div variants={itemVariants} className="flex flex-col gap-4 px-4">
                  {hasDefinedChapters ? (
                    <>
                      {/* Chapter summary */}
                      <div className="flex flex-col gap-2">
                        {lifeChapters.map((ch, i) => (
                          <div
                            key={ch.id}
                            className="flex items-center gap-3 rounded-[10px] bg-lm-bg-card/40 px-4 py-3 shadow-card backdrop-blur-sm"
                          >
                            <BookOpen className="size-4 shrink-0 text-muted-foreground" />
                            <div className="flex flex-col">
                              <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                                Ch. {i + 1}
                              </p>
                              <p className="text-sm font-medium leading-tight text-foreground">
                                {ch.title}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={handleViewChapters}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
                      >
                        View Chapters
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleGetStarted}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
                    >
                      Get Started
                    </button>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
