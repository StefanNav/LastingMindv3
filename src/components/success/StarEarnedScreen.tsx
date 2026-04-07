import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CategoryNodeCard } from '@/components/cards/CategoryNodeCard'
import { RewardPrimaryCTA } from './RewardCTAs'
import type { Category } from '@/types'

interface StarEarnedScreenProps {
  headline: string
  subheadline: string
  category: Category
  onContinue: () => void
}

export function StarEarnedScreen({
  headline,
  subheadline,
  category,
  onContinue,
}: StarEarnedScreenProps) {
  const [animationDone, setAnimationDone] = useState(false)

  return (
    <motion.div
      key="star-earned"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex h-full flex-col bg-[var(--lm-bg-primary)]"
      style={{
        backgroundImage: 'url(/images/bg-texture.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Headline */}
      <div className="px-6 pt-[80px]">
        <p className="font-display text-2xl font-semibold leading-tight text-foreground text-center">
          {headline}
        </p>
        <p className="mt-3 text-[15px] font-medium leading-snug text-muted-foreground text-center">
          {subheadline}
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Category card with star animation */}
      <div className="flex justify-center px-7">
        <div className="w-full max-w-[346px]">
          <CategoryNodeCard
            category={category}
            earnedStarIndex={0}
            starSize={28}
            interactive={false}
            onStarEarned={() => setAnimationDone(true)}
          />
        </div>
      </div>

      {/* Spacer — matches top spacer */}
      <div className="flex-1" />

      {/* Continue button */}
      <AnimatePresence>
        {animationDone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="px-4 pb-[30px] pt-4 mt-auto"
          >
            <RewardPrimaryCTA label="Continue" onClick={onContinue} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
