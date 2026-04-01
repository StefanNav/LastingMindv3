import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface TransitionSlideProps {
  heading: string
  subtitle: string
  imageSrc?: string
  onComplete: () => void
  delay?: number
}

export function TransitionSlide({
  heading,
  subtitle,
  imageSrc = '/images/onboarding/sprount-2.png',
  onComplete,
  delay = 2000,
}: TransitionSlideProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, delay)
    return () => clearTimeout(timer)
  }, [onComplete, delay])

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col justify-end px-4 pb-6 pt-14 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-display text-[28px] font-semibold leading-[1.15] tracking-tight text-foreground text-center"
        >
          {heading}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-4 font-sans text-[15px] leading-relaxed text-[var(--lm-text-secondary)]"
        >
          {subtitle}
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative min-h-0 flex-1 w-full overflow-hidden"
      >
        <img
          src={imageSrc}
          alt=""
          className="absolute bottom-0 left-0 w-full object-cover object-bottom"
        />
      </motion.div>
    </div>
  )
}
