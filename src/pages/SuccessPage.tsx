import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/animations/PageTransition'
import { PrimaryCTA } from '@/components/shared/PrimaryCTA'
import { Check } from 'lucide-react'
import { SavingScreen } from '@/components/success/SavingScreen'
import { SavedScreen } from '@/components/success/SavedScreen'
import { FlowA } from '@/components/success/FlowA'
import { FlowB } from '@/components/success/FlowB'
import { FlowC } from '@/components/success/FlowC'
import type { ModuleCompletionState } from '@/types'

type SuccessStep = 'saving' | 'saved' | 'flow'

function determineFlow(state: ModuleCompletionState): 'A' | 'B' | 'C' {
  if (state.moduleNumber === 1) return 'A'
  if (state.moduleNumber === 2 && !state.starEarned) return 'B'
  return 'C'
}

export function SuccessPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const completionState = location.state as ModuleCompletionState | null
  const [step, setStep] = useState<SuccessStep>('saving')

  // Auto-advance through saving → saved → flow
  useEffect(() => {
    if (step === 'saving') {
      const timer = setTimeout(() => setStep('saved'), 2000)
      return () => clearTimeout(timer)
    }
    if (step === 'saved') {
      const timer = setTimeout(() => setStep('flow'), 1500)
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
            <h2 className="font-display text-2xl font-semibold text-foreground">Module Complete!</h2>
            <p className="text-sm text-muted-foreground">
              Your progress has been saved.
            </p>
          </div>
          <PrimaryCTA onClick={() => navigate('/home')} className="mt-4 max-w-[260px]">
            Return Home
          </PrimaryCTA>
        </div>
      </PageTransition>
    )
  }

  const flow = determineFlow(completionState)

  // All flows take over the full screen (own background/layout)
  if (step === 'flow') {
    return (
      <PageTransition>
        {flow === 'A' && <FlowA completionState={completionState} />}
        {flow === 'B' && <FlowB completionState={completionState} />}
        {flow === 'C' && <FlowC completionState={completionState} />}
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="flex h-full flex-col items-center justify-center bg-[var(--lm-bg-primary)] px-6">
        <AnimatePresence mode="wait">
          {step === 'saving' && <SavingScreen />}
          {step === 'saved' && <SavedScreen />}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
