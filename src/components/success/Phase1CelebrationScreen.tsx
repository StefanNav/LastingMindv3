import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface Phase1CelebrationScreenProps {
  totalEntries?: number
  onContinue: () => void
}

export function Phase1CelebrationScreen({
  totalEntries = 12,
  onContinue,
}: Phase1CelebrationScreenProps) {
  return (
    <motion.div
      key="phase1-celebration"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex h-full flex-col items-center bg-[var(--lm-bg-primary)]"
      style={{
        backgroundImage: 'url(/images/bg-texture.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Spacer */}
      <div className="flex-1" />

      {/* Content */}
      <div className="flex flex-col items-center gap-6 px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-display text-[28px] font-semibold leading-[1.2] text-foreground text-center"
        >
          Your Foundation is complete.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-[18px] font-medium leading-[1.4] tracking-[0.5px] text-[var(--lm-text-secondary)] text-center"
        >
          Your family now knows who shaped your life, what you value, and where you've been. That's a gift most people never give.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-[16px] font-semibold leading-[1.2] tracking-[0.5px] text-[#c48312] text-center"
        >
          6 stars earned · {totalEntries} stories captured
        </motion.p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Reserve space for the absolute button */}
      <div className="h-[120px] shrink-0" />

      {/* Continue button */}
      <div className="absolute inset-x-0 bottom-0 px-4 py-[30px]">
        <motion.button
          type="button"
          onClick={onContinue}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          className="flex w-full flex-col items-center gap-[10px] rounded-[10px] bg-lm-green px-10 py-4"
        >
          <ArrowRight className="size-6 text-white" />
          <span className="text-[18px] font-medium leading-[1.2] text-white">
            Continue
          </span>
        </motion.button>
      </div>
    </motion.div>
  )
}
