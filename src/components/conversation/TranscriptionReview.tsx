import { motion } from 'framer-motion'
import { Mic, ChevronRight } from 'lucide-react'

interface TranscriptionReviewProps {
  onSayMore: () => void
  onContinue: () => void
}

export function TranscriptionReview({ onSayMore, onContinue }: TranscriptionReviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-5 border-t border-border/50 bg-[var(--lm-bg-primary)] px-4 pb-8 pt-4"
    >
      {/* Action buttons */}
      <div className="flex w-full gap-2">
        <button
          type="button"
          onClick={onSayMore}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/50 active:scale-[0.98]"
        >
          <Mic className="size-5" />
          Say more
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
        >
          Continue
          <ChevronRight className="size-5" />
        </button>
      </div>
    </motion.div>
  )
}
