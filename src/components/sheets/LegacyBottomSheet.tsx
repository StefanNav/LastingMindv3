import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Check, Plus } from 'lucide-react'
import {
  BookOpen, Eye, Users, Sparkles, Heart, Mail, Mic, Video,
  Flag, ScrollText, BookHeart, FileText, Puzzle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { availableLegacyItems } from '@/data/phase4Data'
import type { LegacyItem } from '@/types'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Eye, Users, Sparkles, Heart, Mail, Mic, Video,
  Flag, ScrollText, BookHeart, FileText, PuzzlePiece: Puzzle,
}

const DRAG_CLOSE_THRESHOLD = 100

interface LegacyBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  addedItemIds: string[]
  onAddItem: (id: string) => void
}

export function LegacyBottomSheet({ isOpen, onClose, addedItemIds, onAddItem }: LegacyBottomSheetProps) {
  const shouldReduceMotion = useReducedMotion()
  const [toastMessage, setToastMessage] = useState<string | null>(null)

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

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

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

  const handleAdd = useCallback((item: LegacyItem) => {
    onAddItem(item.id)
    setToastMessage('Added to your Legacy section')
  }, [onAddItem])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="legacy-backdrop"
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
            key="legacy-panel"
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
            <div className="relative flex shrink-0 items-center justify-center px-4 pb-4 pt-4">
              <div className="h-[3px] w-10 rounded-full bg-foreground/30" />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 flex size-6 items-center justify-center"
              >
                <X className="size-5 text-foreground/60" />
              </button>
            </div>

            {/* Header */}
            <div className="flex flex-col gap-2 px-6 pb-6 pt-2">
              <p className="font-display text-[22px] font-normal leading-[1.2] text-foreground">
                What would you like to leave behind?
              </p>
              <p className="text-sm leading-snug text-[var(--lm-text-secondary)]">
                Choose what to add. Each one will appear in your Legacy section for you to complete.
              </p>
            </div>

            {/* Scrollable item list */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-10">
              <div className="flex flex-col gap-3">
                {availableLegacyItems.map((item) => {
                  const isAdded = addedItemIds.includes(item.id)
                  const IconComponent = ICON_MAP[item.icon]

                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-[10px] bg-lm-bg-card/40 px-4 py-3.5 shadow-card backdrop-blur-sm"
                    >
                      {/* Icon or Image */}
                      {item.image ? (
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg overflow-hidden">
                          <img src={item.image} alt="" className="size-10 object-contain" />
                        </div>
                      ) : (
                        <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-lg', item.iconColor)}>
                          {IconComponent ? (
                            <IconComponent className="size-5" />
                          ) : (
                            <Sparkles className="size-5" />
                          )}
                        </div>
                      )}

                      {/* Text */}
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <p className="text-[14px] font-semibold leading-tight text-foreground">
                          {item.name}
                        </p>
                        <p className="text-[12px] leading-snug text-[var(--lm-text-secondary)]">
                          {item.description}
                        </p>
                      </div>

                      {/* Add / Added button */}
                      {isAdded ? (
                        <div className="flex shrink-0 items-center gap-1 rounded-full bg-lm-green/10 px-3 py-1.5">
                          <Check className="size-3.5 text-lm-green" />
                          <span className="text-[12px] font-medium text-lm-green">Added</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAdd(item)}
                          className="flex shrink-0 items-center gap-1 rounded-full border border-lm-green/30 bg-transparent px-3 py-1.5 transition-colors hover:bg-lm-green/5 active:scale-[0.95]"
                        >
                          <Plus className="size-3.5 text-lm-green" />
                          <span className="text-[12px] font-medium text-lm-green">Add</span>
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Toast */}
              <AnimatePresence>
                {toastMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 flex items-center justify-center rounded-lg bg-lm-green/10 px-4 py-2.5"
                  >
                    <p className="text-[13px] font-medium text-lm-green">{toastMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
