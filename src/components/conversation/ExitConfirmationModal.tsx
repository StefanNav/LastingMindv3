import { motion, AnimatePresence } from 'framer-motion'
import { LogOut } from 'lucide-react'

interface ExitConfirmationModalProps {
  isOpen: boolean
  onStay: () => void
  onLeave: () => void
}

export function ExitConfirmationModal({ isOpen, onStay, onLeave }: ExitConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={onStay}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-6 flex w-full max-w-[340px] flex-col gap-5 rounded-[16px] bg-[var(--lm-bg-primary)] p-6 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2">
              <p className="font-display text-[22px] font-semibold leading-[1.3] text-foreground">
                Leave conversation?
              </p>
              <p className="text-[15px] leading-[1.5] text-muted-foreground">
                Your progress hasn't been saved yet. If you leave now, your responses will be lost.
              </p>
            </div>

            <div className="flex flex-col gap-[10px]">
              <button
                type="button"
                onClick={onStay}
                className="flex w-full items-center justify-center gap-[10px] rounded-[10px] bg-lm-green px-5 py-4"
              >
                <span className="text-[18px] font-medium leading-[1.2] text-white">
                  Stay
                </span>
              </button>
              <button
                type="button"
                onClick={onLeave}
                className="flex w-full items-center justify-center gap-[10px] rounded-[10px] border border-[#d40016]/30 px-5 py-4"
              >
                <LogOut className="size-5 text-[#d40016]" />
                <span className="text-[18px] font-medium leading-[1.2] text-[#d40016]">
                  Leave
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
