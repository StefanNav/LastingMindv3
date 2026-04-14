import { motion } from 'framer-motion'
import { Mic, ArrowRight } from 'lucide-react'

interface ConfirmTranscriptProps {
  onSayMore: () => void
  onSaveAndFinish: () => void
}

export function ConfirmTranscript({ onSayMore, onSaveAndFinish }: ConfirmTranscriptProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col items-center gap-3 border-t border-border/50 bg-[var(--lm-bg-primary)] px-4 pb-8 pt-4"
    >
      <p className="text-center text-base font-normal leading-tight text-foreground">
        Here's what I captured. Does it look right?
      </p>

      <button
        type="button"
        onClick={onSayMore}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary p-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
      >
        Press to Say More
        <Mic className="size-5" />
      </button>

      <button
        type="button"
        onClick={onSaveAndFinish}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-transparent p-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/50 active:scale-[0.98]"
      >
        Save & Finish
        <ArrowRight className="size-5" />
      </button>
    </motion.div>
  )
}
