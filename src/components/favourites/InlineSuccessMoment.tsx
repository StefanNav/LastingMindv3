import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface InlineSuccessMomentProps {
  answeredCount: number
  totalQuestions: number
  onDone: () => void
}

export function InlineSuccessMoment({ answeredCount, totalQuestions, onDone }: InlineSuccessMomentProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1600)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col items-center gap-3 py-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-lm-green">
          <Check className="size-6 text-white" />
        </div>
      </motion.div>

      <p className="text-[14px] font-semibold text-lm-green">Saved!</p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-[13px] text-[var(--lm-text-secondary)]"
      >
        {answeredCount} of {totalQuestions} — keep going
      </motion.p>
    </motion.div>
  )
}
