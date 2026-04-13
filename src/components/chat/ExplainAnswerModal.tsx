import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Mic } from 'lucide-react'

interface ExplainAnswerModalProps {
  isOpen: boolean
  onClose: () => void
  excerpts: { source: string; text: string }[]
  onToast: (message: string) => void
}

const DRAG_CLOSE_THRESHOLD = 100

export function ExplainAnswerModal({ isOpen, onClose, excerpts, onToast }: ExplainAnswerModalProps) {
  const shouldReduceMotion = useReducedMotion()
  const [additionText, setAdditionText] = useState('')

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
    setAdditionText('')
    onClose()
    onToast('Your response has been saved')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="explain-backdrop"
            className="fixed inset-0 z-40 bg-black/50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{ willChange: 'opacity' }}
          />

          <motion.div
            key="explain-panel"
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
                Where this came from
              </p>

              {/* Intro line */}
              <p className="text-[14px] leading-[1.5] text-muted-foreground">
                This answer was shaped by things you've shared. Here are the relevant excerpts.
              </p>

              {/* Excerpt cards */}
              <div className="flex flex-col gap-3">
                {excerpts.map((excerpt, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1.5 rounded-[10px] bg-lm-bg-card p-4 shadow-card"
                  >
                    <p className="text-[12px] font-semibold uppercase tracking-wide text-lm-gold">
                      {excerpt.source}
                    </p>
                    <p className="text-[14px] leading-[1.5] text-foreground">
                      {excerpt.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-border/50" />

              {/* Add more section */}
              <div className="flex flex-col gap-2">
                <p className="text-[15px] font-semibold text-foreground">
                  Want to add to this answer?
                </p>
                <p className="text-[13px] leading-[1.5] text-muted-foreground">
                  If something is missing or you'd like to give more detail, you can add to it here. Your response will be saved and used to improve future answers.
                </p>
              </div>

              {/* Text area + mic */}
              <div className="flex flex-col gap-3">
                <textarea
                  value={additionText}
                  onChange={(e) => setAdditionText(e.target.value)}
                  placeholder="Type your addition here…"
                  rows={3}
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
                    disabled={!additionText.trim()}
                    className="flex flex-1 items-center justify-center rounded-[10px] bg-lm-green px-5 py-3 text-[15px] font-semibold text-white transition-colors disabled:opacity-40"
                  >
                    Save
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
