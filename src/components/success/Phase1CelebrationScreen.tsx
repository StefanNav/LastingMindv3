import { motion } from 'framer-motion'
import { RewardPrimaryCTA } from './RewardCTAs'

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
      className="flex h-full flex-col items-center bg-[var(--lm-bg-primary)]"
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
          className="font-display text-2xl font-semibold leading-tight text-foreground text-center"
        >
          Your Foundation is complete.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-[15px] font-medium leading-snug text-muted-foreground text-center"
        >
          Your family now knows who shaped your life, what you value, and where you've been. That's a gift most people never give.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-[13px] font-semibold leading-tight text-lm-gold text-center"
        >
          6 stars earned · {totalEntries} stories captured
        </motion.p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.2 }}
        className="w-full px-4 pb-[30px] pt-4 mt-auto"
      >
        <RewardPrimaryCTA label="Continue" onClick={onContinue} />
      </motion.div>
    </motion.div>
  )
}
