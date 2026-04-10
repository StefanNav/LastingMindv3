import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { containerVariants, dissolveVariants } from './animations'

interface WelcomeSlideProps {
  firstName: string
  onComplete: () => void
  delay?: number
}

export function WelcomeSlide({ firstName, onComplete, delay = 3000 }: WelcomeSlideProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, delay)
    return () => clearTimeout(timer)
  }, [onComplete, delay])

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col items-center px-4 pt-44 text-center">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.h1
            variants={dissolveVariants}
            className="font-display text-[28px] font-semibold leading-[1.15] tracking-tight text-foreground"
          >
            Welcome to your LastingMind, {firstName}
          </motion.h1>
        </motion.div>
      </div>
      <motion.div
        variants={dissolveVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative min-h-0 flex-[1.5] w-full overflow-hidden"
      >
        <img
          src="/images/Tree 1.png"
          alt=""
          className="absolute bottom-0 left-1/2 h-full -translate-x-1/2 object-contain object-bottom"
        />
      </motion.div>
    </div>
  )
}
