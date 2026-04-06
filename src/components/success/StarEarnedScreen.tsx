import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { CategoryNodeCard } from '@/components/cards/CategoryNodeCard'
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
      className="relative flex h-full flex-col bg-[var(--lm-bg-primary)]"
      style={{
        backgroundImage: 'url(/images/bg-texture.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Headline */}
      <div className="px-4 pt-[80px]">
        <p className="font-display text-[28px] font-semibold leading-[1.2] text-foreground text-center">
          {headline}
        </p>
        <p className="mt-4 text-[18px] font-medium leading-[1.2] tracking-[0.5px] text-foreground text-center">
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

      {/* Reserve space equal to the button area so the card centers between title and button */}
      <div className="h-[120px] shrink-0" />

      {/* Continue button — absolutely positioned so it doesn't shift the card */}
      <AnimatePresence>
        {animationDone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-x-0 bottom-0 px-4 pb-[30px]"
          >
            <button
              type="button"
              onClick={onContinue}
              className="flex w-full flex-col items-center justify-center gap-[10px] rounded-[10px] bg-lm-green px-10 py-4"
            >
              <ArrowRight className="size-6 text-white" />
              <span className="text-[18px] font-medium leading-[1.2] text-white">
                Continue
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
