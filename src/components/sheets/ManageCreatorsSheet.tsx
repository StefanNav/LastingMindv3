import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Trash2 } from 'lucide-react'
import type { LovedOneCreator } from '@/types'

interface ManageCreatorsSheetProps {
  isOpen: boolean
  onClose: () => void
  creators: LovedOneCreator[]
  onRemove: (creatorId: string) => void
}

const DRAG_CLOSE_THRESHOLD = 100

export function ManageCreatorsSheet({ isOpen, onClose, creators, onRemove }: ManageCreatorsSheetProps) {
  const shouldReduceMotion = useReducedMotion()
  const [confirmingId, setConfirmingId] = useState<string | null>(null)

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
        setConfirmingId(null)
      }
    },
    [onClose],
  )

  const handleRemove = (creatorId: string) => {
    onRemove(creatorId)
    setConfirmingId(null)
    if (creators.length <= 1) {
      onClose()
    }
  }

  const handleClose = () => {
    setConfirmingId(null)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="manage-creators-backdrop"
            className="fixed inset-0 z-40 bg-black/50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
            style={{ willChange: 'opacity' }}
          />

          <motion.div
            key="manage-creators-panel"
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[80vh] flex-col overflow-hidden rounded-t-[20px] bg-[var(--lm-bg-primary)]"
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
                onClick={handleClose}
                className="absolute right-4 top-4 flex size-6 items-center justify-center"
              >
                <X className="size-5 text-foreground/60" />
              </button>
            </div>

            {/* Title */}
            <div className="px-6 pb-3 pt-1">
              <p className="font-display text-lg font-semibold text-foreground">
                Manage Legacy Creators
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                Remove a Legacy Creator to stop seeing their content.
              </p>
            </div>

            {/* Creator list */}
            <div className="flex flex-col gap-0 overflow-y-auto pb-10" style={{ scrollbarWidth: 'none' }}>
              {creators.map((creator) => {
                const initial = creator.name.charAt(0).toUpperCase()
                const isConfirming = confirmingId === creator.id

                return (
                  <div
                    key={creator.id}
                    className="flex items-center gap-3 border-t border-border/30 px-6 py-4"
                  >
                    {/* Avatar */}
                    {creator.avatarUrl ? (
                      <img
                        src={creator.avatarUrl}
                        alt={creator.name}
                        className="size-10 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-bold text-primary">{initial}</span>
                      </div>
                    )}

                    {/* Name + relationship */}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="text-[15px] font-medium text-foreground">{creator.name}</p>
                      <p className="text-[12px] text-muted-foreground">{creator.relationship}</p>
                    </div>

                    {/* Remove / Confirm */}
                    <AnimatePresence mode="wait">
                      {isConfirming ? (
                        <motion.div
                          key="confirm"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center gap-2"
                        >
                          <button
                            type="button"
                            onClick={() => setConfirmingId(null)}
                            className="rounded-lg px-3 py-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-muted"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemove(creator.id)}
                            className="rounded-lg bg-red-500/10 px-3 py-1.5 text-[12px] font-semibold text-red-600 transition-colors hover:bg-red-500/20 active:scale-[0.97]"
                          >
                            Remove
                          </button>
                        </motion.div>
                      ) : (
                        <motion.button
                          key="trash"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.15 }}
                          type="button"
                          onClick={() => setConfirmingId(creator.id)}
                          className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
                          aria-label={`Remove ${creator.name}`}
                        >
                          <Trash2 className="size-4" />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}

              {creators.length === 0 && (
                <div className="px-6 py-8 text-center">
                  <p className="text-[14px] text-muted-foreground">No Legacy Creators to manage.</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
