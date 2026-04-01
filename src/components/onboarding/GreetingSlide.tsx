import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface GreetingSlideProps {
  firstName: string
  onComplete: () => void
  delay?: number
}

export function GreetingSlide({ firstName, onComplete, delay = 2500 }: GreetingSlideProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, delay)
    return () => clearTimeout(timer)
  }, [onComplete, delay])

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-end px-4 pb-6 pt-14 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-[26px] font-semibold leading-[1.2] tracking-tight text-foreground"
        >
          {firstName}, it's great to meet you
        </motion.h1>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative min-h-0 flex-1 w-full overflow-hidden"
      >
        <img
          src="/images/onboarding/sprount-2.png"
          alt=""
          className="absolute bottom-0 left-0 w-full object-cover object-bottom"
        />
      </motion.div>
    </div>
  )
}
