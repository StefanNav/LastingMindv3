import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function SavedScreen() {
  return (
    <motion.div
      key="saved"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col items-center gap-5"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
      >
        <div className="flex size-14 items-center justify-center rounded-full bg-lm-green">
          <Check className="size-8 text-white" />
        </div>
      </motion.div>
      <p className="text-center font-display text-2xl font-semibold leading-tight text-foreground">
        Saved. Your LastingMind is growing.
      </p>
    </motion.div>
  )
}
