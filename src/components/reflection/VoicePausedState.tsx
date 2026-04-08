import { motion } from 'framer-motion'

interface VoicePausedStateProps {
  onContinue: () => void
  onDone: () => void
}

export function VoicePausedState({ onContinue, onDone }: VoicePausedStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-1 flex-col items-center justify-center gap-6"
    >
      <p className="text-[16px] font-medium text-foreground">
        Recording paused
      </p>
      <div className="flex w-full max-w-[280px] flex-col gap-3">
        <button
          type="button"
          onClick={onContinue}
          className="flex w-full items-center justify-center rounded-lg border border-border bg-transparent px-6 py-3.5 text-[16px] font-semibold text-foreground transition-colors hover:bg-muted/50 active:scale-[0.98]"
        >
          Continue speaking
        </button>
        <button
          type="button"
          onClick={onDone}
          className="flex w-full items-center justify-center rounded-lg bg-lm-green px-6 py-3.5 text-[16px] font-semibold text-white transition-transform active:scale-[0.98]"
        >
          Done
        </button>
      </div>
    </motion.div>
  )
}
