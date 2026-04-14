import { useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import type { PersonEntry } from '@/types'

interface PersonDetailSheetProps {
  isOpen: boolean
  person: PersonEntry | null
  categoryLabel: string
  onClose: () => void
}

const DRAG_CLOSE_THRESHOLD = 100

export function PersonDetailSheet({ isOpen, person, categoryLabel, onClose }: PersonDetailSheetProps) {
  const shouldReduceMotion = useReducedMotion()

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

  return (
    <AnimatePresence>
      {isOpen && person && (
        <>
          {/* Backdrop */}
          <motion.div
            key="person-detail-backdrop"
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
            key="person-detail-panel"
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

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 pb-10 pt-2">
              {/* Category label */}
              <h3 className="font-display text-xl font-semibold text-foreground">
                {categoryLabel}
              </h3>

              {/* Person info */}
              <div className="mt-3 flex flex-col gap-1">
                <h2 className="font-display text-2xl font-semibold leading-tight text-foreground">
                  {person.fullName ?? person.name}
                </h2>
                <p className="text-sm font-medium text-lm-gold-muted">
                  {person.dateLabel ?? person.relationshipLabel}
                </p>
              </div>

              {/* First-person bio */}
              {person.firstPersonBio && (
                <p className="mt-5 text-base leading-relaxed text-foreground/80">
                  {person.firstPersonBio}
                </p>
              )}

              {/* Fallback if no bio */}
              {!person.firstPersonBio && (
                <p className="mt-5 text-sm text-muted-foreground italic">
                  No stories shared about {person.name} yet.
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
