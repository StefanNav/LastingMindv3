import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ThinkingDots } from '@/components/ui/ThinkingDots'

interface PreparingSlideProps {
  onComplete: () => void
  delay?: number
}

export function PreparingSlide({ onComplete, delay = 3000 }: PreparingSlideProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, delay)
    return () => clearTimeout(timer)
  }, [onComplete, delay])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-display text-[26px] font-semibold tracking-tight text-foreground"
      >
        Preparing your foundation
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <ThinkingDots size="md" />
      </motion.div>
    </div>
  )
}
