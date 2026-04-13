import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Mic } from 'lucide-react'

interface ProvideNewAnswerModalProps {
  isOpen: boolean
  onClose: () => void
  onToast: (message: string) => void
}

const DRAG_CLOSE_THRESHOLD = 100

export function ProvideNewAnswerModal({ isOpen, onClose, onToast }: ProvideNewAnswerModalProps) {
  const shouldReduceMotion = useReducedMotion()
  const [answerText, setAnswerText] = useState('')

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

  const handleSave = () => {
    setAnswerText('')
    onClose()
    onToast('New answer saved')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="new-answer-backdrop"
            className="fixed inset-0 z-40 bg-black/50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{ willChange: 'opacity' }}
          />

          <motion.div
            key="new-answer-panel"
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col overflow-hidden rounded-t-[20px] bg-[var(--lm-bg-primary)]"
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

            <div className="flex flex-col gap-5 overflow-y-auto px-6 pb-10 pt-1" style={{ scrollbarWidth: 'none' }}>
              {/* Header */}
              <p className="font-display text-lg font-semibold text-foreground">
                Provide a new answer
              </p>

              {/* Context line */}
              <p className="text-[14px] leading-[1.5] text-muted-foreground">
                Not happy with that answer? Give your own. This will be used the next time this question is asked.
              </p>

              {/* Text area + mic */}
              <div className="flex flex-col gap-3">
                <textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Type your answer here…"
                  rows={4}
                  className="w-full resize-none rounded-[10px] border border-border bg-white px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-lm-green/40"
                />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lm-green transition-transform active:scale-95"
                    aria-label="Record voice input"
                  >
                    <Mic className="size-4.5 text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={!answerText.trim()}
                    className="flex flex-1 items-center justify-center rounded-[10px] bg-lm-green px-5 py-3 text-[15px] font-semibold text-white transition-colors disabled:opacity-40"
                  >
                    Save answer
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
