import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const STAR_COUNT = 6

const categoryLabels = [
  'Family',
  'Friends',
  'Career',
  'Education',
  'Favorites',
  'Core Values',
]

interface FinalStarAnimationProps {
  onComplete: () => void
}

export function FinalStarAnimation({ onComplete }: FinalStarAnimationProps) {
  const staggerDelay = 0.4
  const totalAnimDuration = STAR_COUNT * staggerDelay + 1.5 // stagger + settle
  const pauseBeat = 1.5

  useEffect(() => {
    const timer = setTimeout(onComplete, (totalAnimDuration + pauseBeat) * 1000)
    return () => clearTimeout(timer)
  }, [onComplete, totalAnimDuration])

  return (
    <motion.div
      key="final-star-animation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="flex h-full flex-col items-center justify-center bg-[var(--lm-bg-primary)]"
      style={{
        backgroundImage: 'url(/images/bg-texture.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Headline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12 px-6 font-display text-2xl font-semibold leading-tight text-foreground text-center"
      >
        All six stars.
      </motion.p>

      {/* 3×2 star grid */}
      <div className="grid grid-cols-3 gap-x-10 gap-y-8 px-6">
        {Array.from({ length: STAR_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.4 + i * staggerDelay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <motion.div
              className="relative flex items-center justify-center"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{
                duration: 1,
                delay: 0.6 + i * staggerDelay,
                ease: 'easeInOut',
              }}
            >
              {/* Glow */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 56,
                  height: 56,
                  background: 'radial-gradient(circle, var(--lm-gold-star) 0%, transparent 70%)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0.25] }}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + i * staggerDelay,
                  ease: 'easeInOut',
                }}
              />
              <Star
                className="relative size-7"
                fill="var(--lm-gold-star)"
                stroke="var(--lm-gold-star)"
                strokeWidth={1.5}
              />
            </motion.div>
            <p className="text-[13px] font-semibold leading-tight text-muted-foreground">
              {categoryLabels[i]}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
