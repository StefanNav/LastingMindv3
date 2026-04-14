import { useCallback, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Lock } from 'lucide-react'

export interface LockedFeature {
  id: string
  image: string
  title: string
  description: string
  unlockMessage: string
  unlocked?: boolean
  unlockedDescription?: string
  ctaLabel?: string
}

interface LockedFeatureSheetProps {
  isOpen: boolean
  feature: LockedFeature | null
  onClose: () => void
  onAction?: (featureId: string) => void
}

const DRAG_CLOSE_THRESHOLD = 100

export function LockedFeatureSheet({ isOpen, feature, onClose, onAction }: LockedFeatureSheetProps) {
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
      {isOpen && feature && (
        <>
          {/* Backdrop */}
          <motion.div
            key="locked-feature-backdrop"
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
            key="locked-feature-panel"
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
                {/* Feature image + optional lock badge */}
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-[22px] px-4">
                  <div className="flex flex-col items-center gap-2.5">
                    <div className="h-[100px] w-[100px] overflow-hidden">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    {!feature.unlocked && (
                      <div className="flex size-[52px] items-center justify-center rounded-full bg-lm-bg-card shadow-card">
                        <Lock className="size-[26px] text-lm-neutral-warm" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center gap-3 text-center">
                    <p className="font-display text-[22px] font-normal leading-[1.2] text-foreground">
                      {feature.title}
                    </p>
                    <p className="text-sm leading-snug text-muted-foreground">
                      {feature.unlocked ? feature.unlockedDescription : feature.description}
                    </p>
                  </div>
                </motion.div>

                {feature.unlocked ? (
                  <motion.div variants={itemVariants} className="px-6">
                    <button
                      type="button"
                      onClick={() => onAction?.(feature.id)}
                      className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3.5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
                    >
                      {feature.ctaLabel || 'Get Started'}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div variants={itemVariants} className="px-6">
                    <div className="flex flex-col items-center gap-3 rounded-[10px] bg-lm-bg-card/40 p-5 text-center shadow-card backdrop-blur-sm">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-lm-gold">
                        How to unlock
                      </p>
                      <p className="text-sm leading-snug text-muted-foreground">
                        {feature.unlockMessage}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
