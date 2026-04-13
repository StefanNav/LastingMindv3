import { useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Users, UserRound, Briefcase, GraduationCap, Heart, Shield } from 'lucide-react'

interface SuggestedCategoriesSheetProps {
  isOpen: boolean
  onClose: () => void
  onSelectQuestion: (question: string) => void
}

const DRAG_CLOSE_THRESHOLD = 100

const categories = [
  { icon: Users, label: 'Family', question: 'Tell me about your family' },
  { icon: UserRound, label: 'Friends', question: 'Who are your closest friends?' },
  { icon: Briefcase, label: 'Career', question: 'What shaped your career?' },
  { icon: GraduationCap, label: 'Education', question: 'Tell me about your education' },
  { icon: Heart, label: 'Favorites', question: 'What are your favorite things?' },
  { icon: Shield, label: 'Core Values', question: 'What are your core values?' },
]

export function SuggestedCategoriesSheet({ isOpen, onClose, onSelectQuestion }: SuggestedCategoriesSheetProps) {
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
      {isOpen && (
        <>
          <motion.div
            key="categories-backdrop"
            className="fixed inset-0 z-40 bg-black/50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{ willChange: 'opacity' }}
          />

          <motion.div
            key="categories-panel"
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col overflow-hidden rounded-t-[20px] bg-[var(--lm-bg-primary)]"
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

            <p className="px-6 pb-3 pt-1 font-display text-lg font-semibold text-foreground">
              What can I ask?
            </p>

            <div className="flex flex-col pb-10">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => {
                    onClose()
                    onSelectQuestion(cat.question)
                  }}
                  className="flex items-center gap-3 px-6 py-3.5 text-left transition-colors hover:bg-muted active:bg-muted"
                >
                  <cat.icon className="size-5 text-primary/70" />
                  <div className="flex flex-col">
                    <span className="text-[15px] font-medium text-foreground">{cat.label}</span>
                    <span className="text-[13px] text-muted-foreground">{cat.question}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
