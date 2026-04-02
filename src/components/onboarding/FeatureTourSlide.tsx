import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ProgressBar } from './ProgressBar'
import { containerVariants, dissolveVariants } from './animations'

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

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="mt-4 px-4 text-center"
      >
        <motion.h1
          variants={dissolveVariants}
          className="font-display text-[28px] font-semibold leading-[1.15] tracking-tight text-foreground text-center"
        >
          {heading}
        </motion.h1>
      </motion.div>

      <motion.div
        variants={dissolveVariants}
        initial="initial"
        animate="animate"
        exit="exit"
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
