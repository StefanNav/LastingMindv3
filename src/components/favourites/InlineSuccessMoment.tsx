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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 26,
          mass: 0.9,
        }}
        className="flex w-full max-w-[400px] flex-col items-center gap-4 rounded-xl border border-[var(--lm-border)] bg-[var(--lm-bg-card)] px-5 py-8"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-lm-green">
            <Check className="size-7 text-white" />
          </div>
        </motion.div>

        <p className="text-[18px] font-semibold text-lm-green">Saved!</p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[14px] text-[var(--lm-text-secondary)]"
        >
          {answeredCount} of {totalQuestions} — keep going
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
