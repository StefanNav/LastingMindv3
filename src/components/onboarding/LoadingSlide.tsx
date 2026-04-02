import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ThinkingDots } from '@/components/ui/ThinkingDots'
import { dissolveVariants } from './animations'

interface LoadingSlideProps {
  onComplete: () => void
  delay?: number
  imageSrc?: string
}

export function LoadingSlide({ onComplete, delay = 2000, imageSrc = '/images/onboarding/sprount-2.png' }: LoadingSlideProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, delay)
    return () => clearTimeout(timer)
  }, [onComplete, delay])

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          variants={dissolveVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ThinkingDots size="md" />
        </motion.div>
      </div>
      <div className="relative min-h-0 flex-1 w-full overflow-hidden">
        <img
          src={imageSrc}
          alt=""
          className="absolute bottom-0 left-0 w-full object-cover object-bottom"
        />
      </div>
    </div>
  )
}
