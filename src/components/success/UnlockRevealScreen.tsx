import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Users, Sparkles } from 'lucide-react'
import { RewardPrimaryCTA } from './RewardCTAs'

interface Unlock {
  icon: React.ReactNode
  headline: string
  supporting: string
}

const unlocks: Unlock[] = [
  {
    icon: <Mic className="size-10 text-lm-green" />,
    headline: 'Give your LastingMind your voice.',
    supporting: 'Your family will hear your stories the way only you can tell them.',
  },
  {
    icon: <Users className="size-10 text-lm-green" />,
    headline: 'Your family is ready to meet your LastingMind.',
    supporting: 'Invite them to start asking questions.',
  },
  {
    icon: <Sparkles className="size-10 text-lm-green" />,
    headline: "Now let's tell your story.",
    supporting: 'Your life chapters, your wisdom, your legacy — it all starts here.',
  },
]

interface UnlockRevealScreenProps {
  onComplete: () => void
}

export function UnlockRevealScreen({ onComplete }: UnlockRevealScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    if (currentIndex < unlocks.length - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      onComplete()
    }
  }

  const unlock = unlocks[currentIndex]
  const isLast = currentIndex === unlocks.length - 1

  return (
    <motion.div
      key="unlock-reveal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex h-full flex-col items-center bg-[var(--lm-bg-primary)]"
      style={{
        backgroundImage: 'url(/images/bg-texture.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Progress dots */}
      <div className="flex items-center gap-2 pt-[60px]">
        {unlocks.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'w-6 bg-lm-green' : 'w-2 bg-lm-green/30'
            }`}
          />
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Unlock content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center gap-6 px-8"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex size-20 items-center justify-center rounded-full bg-[#e7ebd9]"
          >
            {unlock.icon}
          </motion.div>

          {/* Headline */}
          <p className="font-display text-2xl font-semibold leading-tight text-foreground text-center">
            {unlock.headline}
          </p>

          {/* Supporting */}
          <p className="text-[15px] font-medium leading-snug text-muted-foreground text-center">
            {unlock.supporting}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Button */}
      <div className="w-full px-4 pb-[30px] pt-4 mt-auto">
        <RewardPrimaryCTA label={isLast ? 'Continue' : 'Next'} onClick={handleNext} />
      </div>
    </motion.div>
  )
}
