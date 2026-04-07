import { motion } from 'framer-motion'
import { ThinkingDots } from '@/components/ui/ThinkingDots'

export function SavingScreen() {
  return (
    <motion.div
      key="saving"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col items-center gap-5"
    >
      <ThinkingDots size="md" />
      <p className="font-display text-2xl font-semibold leading-tight text-foreground">
        Saving your story…
      </p>
    </motion.div>
  )
}
