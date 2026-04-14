import { motion, AnimatePresence } from 'framer-motion'
import { Trash2 } from 'lucide-react'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  name: string
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmationModal({ isOpen, name, onConfirm, onCancel }: DeleteConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={onCancel}
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
                Remove {name}?
              </p>
              <p className="text-[15px] leading-[1.5] text-muted-foreground">
                This will remove them from your summary. You can always add them back later.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="flex flex-1 items-center justify-center rounded-[10px] border border-black/20 px-5 py-3.5"
              >
                <span className="text-[16px] font-medium leading-[1.2] text-muted-foreground">
                  Cancel
                </span>
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="flex flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#d40016] px-5 py-3.5"
              >
                <Trash2 className="size-4 text-white" />
                <span className="text-[16px] font-medium leading-[1.2] text-white">
                  Remove
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
