import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/animations/PageTransition'
import { Star, Loader2, Check, ArrowRight } from 'lucide-react'
import type { ModuleCompletionState } from '@/types'

type SuccessStep = 'saving' | 'saved' | 'result'

export function SuccessPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const completionState = location.state as ModuleCompletionState | null
  const [step, setStep] = useState<SuccessStep>('saving')

  // Auto-advance through saving → saved → result
  useEffect(() => {
    if (step === 'saving') {
      const timer = setTimeout(() => setStep('saved'), 2000)
      return () => clearTimeout(timer)
    }
    if (step === 'saved') {
      const timer = setTimeout(() => setStep('result'), 1500)
      return () => clearTimeout(timer)
    }
  }, [step])

  // Fallback for direct navigation without state
  if (!completionState) {
    return (
      <PageTransition>
        <div className="flex h-full flex-col items-center justify-center gap-6 p-6 text-center">
          <Check className="size-16 text-lm-green" />
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-[26px] font-normal text-foreground">Module Complete!</h2>
            <p className="text-[14px] text-[var(--lm-text-secondary)]">
              Your progress has been saved.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="mt-4 flex items-center justify-center rounded-[4px] bg-lm-green px-10 py-4"
          >
            <span className="text-[18px] font-medium leading-[1.2] text-white">Return Home</span>
          </button>
        </div>
      </PageTransition>
    )
  }

  const { categoryId, categoryLabel } = completionState

  return (
    <PageTransition>
      <div className="flex h-full flex-col items-center justify-center bg-[var(--lm-bg-primary)] px-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Saving */}
          {step === 'saving' && (
            <motion.div
              key="saving"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center gap-5"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              >
                <Loader2 className="size-12 text-lm-green" />
              </motion.div>
              <p className="font-display text-[22px] font-normal leading-[1.3] text-foreground">
                Saving your story…
              </p>
            </motion.div>
          )}

          {/* Step 2: Saved */}
          {step === 'saved' && (
            <motion.div
              key="saved"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center gap-5"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
              >
                <div className="flex size-14 items-center justify-center rounded-full bg-lm-green">
                  <Check className="size-8 text-white" />
                </div>
              </motion.div>
              <p className="text-center font-display text-[22px] font-normal leading-[1.3] text-foreground">
                Saved. Your LastingMind is growing.
              </p>
            </motion.div>
          )}

          {/* Step 3: Result — Flow 1 (Module 1, no star) */}
          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex w-full flex-col items-center gap-8"
            >
              {/* Progress indicator */}
              <div className="flex flex-col items-center gap-3">
                <p className="font-display text-[26px] font-normal leading-[1.2] text-foreground">
                  Module Complete
                </p>
                <p className="text-[16px] font-semibold leading-[1.2] text-[var(--lm-text-secondary)]">
                  1 of 2 modules complete
                </p>
              </div>

              {/* Faint empty star */}
              <div className="flex flex-col items-center gap-3">
                <Star className="size-16 text-[var(--lm-border)] opacity-40" strokeWidth={1.2} />
                <p className="max-w-[260px] text-center text-[14px] font-semibold leading-[1.4] text-[var(--lm-text-secondary)]">
                  Complete {categoryLabel} Module 2 to earn your star
                </p>
              </div>

              {/* CTAs */}
              <div className="flex w-full flex-col gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(`/intro2/${categoryId}`)}
                  className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-lm-green px-10 py-4"
                >
                  <span className="text-[18px] font-medium leading-[1.2] text-white">
                    Begin Module 2
                  </span>
                  <ArrowRight className="size-5 text-white" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/home')}
                  className="flex w-full items-center justify-center rounded-[4px] border border-[var(--lm-border)] bg-transparent px-10 py-4"
                >
                  <span className="text-[18px] font-medium leading-[1.2] text-foreground">
                    Choose another category
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
