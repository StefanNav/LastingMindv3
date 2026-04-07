import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { TreeGrowthScreen } from './TreeGrowthScreen'
import { FinalStarAnimation } from './FinalStarAnimation'
import type { ModuleCompletionState } from '@/types'

// ─── Final Star Steps ────────────────────────────────────────────────────────
type FinalStarStep = 'final_stars' | 'tree_growth'

interface FlowDProps {
  variant: 'first_star' | 'final_star'
  completionState: ModuleCompletionState
  onComplete: () => void
}

export function FlowD({ variant, onComplete }: FlowDProps) {
  if (variant === 'first_star') {
    return (
      <TreeGrowthScreen
        headline="Your first star sparked new growth!"
        imagePaths={['/images/TreeStage1_V2.png', '/images/TreeStage2_V2.png']}
        onComplete={onComplete}
      />
    )
  }

  return <FinalStarFlow onComplete={onComplete} />
}

// ─── Final Star Flow (pre-map: final star animation + tree growth) ───────────

function FinalStarFlow({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<FinalStarStep>('final_stars')

  return (
    <AnimatePresence mode="wait">
      {step === 'final_stars' && (
        <FinalStarAnimation onComplete={() => setStep('tree_growth')} />
      )}

      {step === 'tree_growth' && (
        <TreeGrowthScreen
          headline="You've met the core foundation requirements. Your family now has roots to hold onto."
          imagePaths={['/images/TreeStage2_V2.png', '/images/TreeStage3_V2.png']}
          onComplete={onComplete}
        />
      )}
    </AnimatePresence>
  )
}
