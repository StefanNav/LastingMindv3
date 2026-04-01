import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ProgressBar } from './ProgressBar'

interface FeatureTourSlideProps {
  heading: string
  progressStep: number
  totalProgressSteps: number
  children: ReactNode
  onBack?: () => void
  onNext: () => void
  nextLabel?: string
  showBack?: boolean
}

export function FeatureTourSlide({
  heading,
  progressStep,
  totalProgressSteps,
  children,
  onBack,
  onNext,
  nextLabel = 'Next',
  showBack = true,
}: FeatureTourSlideProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="pt-14">
        <ProgressBar currentStep={progressStep} totalSteps={totalProgressSteps} />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-4 px-4 font-display text-[28px] font-semibold leading-[1.15] tracking-tight text-foreground text-center"
      >
        {heading}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex flex-1 items-center justify-center overflow-hidden px-4"
      >
        {children}
      </motion.div>

      <div className="flex gap-3 px-4 pb-4 pt-2">
        {showBack && onBack ? (
          <>
            <button
              type="button"
              onClick={onBack}
              className="flex h-[56px] flex-1 items-center justify-center gap-2 rounded-xl border border-lm-border bg-background font-sans text-[15px] font-semibold text-foreground transition-transform active:scale-[0.97] active:brightness-90"
            >
              <ArrowLeft className="size-5" />
              Back
            </button>
            <button
              type="button"
              onClick={onNext}
              className="flex h-[56px] flex-1 items-center justify-center gap-2 rounded-xl bg-lm-green font-sans text-[15px] font-semibold text-white transition-transform active:scale-[0.97] active:brightness-90"
            >
              {nextLabel}
              <ArrowRight className="size-5" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="flex h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-lm-green font-sans text-[15px] font-semibold text-white transition-transform active:scale-[0.97] active:brightness-90"
          >
            {nextLabel}
            <ArrowRight className="size-5" />
          </button>
        )}
      </div>
    </div>
  )
}
