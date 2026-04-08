import { AnimatePresence, motion } from 'framer-motion'

interface ReflectionExitSheetProps {
  isOpen: boolean
  onSaveAndExit: () => void
  onKeepGoing: () => void
}

export function ReflectionExitSheet({ isOpen, onSaveAndExit, onKeepGoing }: ReflectionExitSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={onKeepGoing}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-[var(--lm-bg-primary)] px-6 pb-10 pt-6 shadow-xl"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />

            <h3 className="font-display text-[20px] font-semibold leading-tight text-foreground">
              Leave this reflection?
            </h3>
            <p className="mt-2 text-[14px] leading-[1.5] text-muted-foreground">
              What you've shared so far is saved. You can come back and continue.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={onSaveAndExit}
                className="flex w-full items-center justify-center rounded-lg bg-lm-green px-6 py-3.5 text-[16px] font-semibold text-white transition-transform active:scale-[0.98]"
              >
                Save and exit
              </button>
              <button
                type="button"
                onClick={onKeepGoing}
                className="flex w-full items-center justify-center rounded-lg border border-border bg-transparent px-6 py-3.5 text-[16px] font-semibold text-foreground transition-colors hover:bg-muted/50 active:scale-[0.98]"
              >
                Keep going
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
