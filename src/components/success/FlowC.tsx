import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { RewardCard } from './RewardCard'
import { StarEarnedScreen } from './StarEarnedScreen'
import { FoundationMapScreen } from './FoundationMapScreen'
import { NextStepScreen } from './NextStepScreen'
import { FlowD } from './FlowD'
import { Phase1CelebrationScreen } from './Phase1CelebrationScreen'
import { FoundationUnlockSummaryScreen } from './FoundationUnlockSummaryScreen'
import { useApp } from '@/app/AppProvider'
import type { ModuleCompletionState, Category } from '@/types'

type FlowCStep = 'reward_card' | 'star_earned' | 'flow_d' | 'map' | 'next_step' | 'celebration' | 'unlock_summary'

const starEarnedHeadlines: Record<string, string> = {
  'cat-family': "You earned your first star!",
  'cat-friends': "You earned your Friends star!",
  'cat-career': "You earned your Career star!",
  'cat-education': "You earned your Education star!",
  'cat-favorites': "You earned your Favorites star!",
  'cat-core-values': "You earned your Core Values star!",
}

const starEarnedSubheadlines: Record<string, string> = {
  'cat-family': "You've added meaningful depth to your Family stories.",
  'cat-friends': "You've added meaningful depth to your Friends stories.",
  'cat-career': "You've added meaningful depth to your Career stories.",
  'cat-education': "You've added meaningful depth to your Education stories.",
  'cat-favorites': "You've added meaningful depth to your Favorites stories.",
  'cat-core-values': "You've added meaningful depth to your Core Values stories.",
}

interface MapCopy { headline: string; subheadline: string }

const mapCopyByStars: Record<number, MapCopy> = {
  1: {
    headline: "Your first star.",
    subheadline: "Five more stars to the next growth stage. You've started something that will last.",
  },
  2: {
    headline: "Two down. You're finding your rhythm.",
    subheadline: "Your LastingMind is learning more about you with every session.",
  },
  3: {
    headline: "Halfway there.",
    subheadline: "Three stars earned. Your family is getting a picture of who you really are.",
  },
  4: {
    headline: "Four stars. You're in the final stretch.",
    subheadline: "Two more and Phase 2 unlocks — where your real story gets told.",
  },
  5: {
    headline: "One star left.",
    subheadline: "You're one category away from unlocking the next chapter of your LastingMind.",
  },
  6: {
    headline: "All six stars. Your tree is ready to grow.",
    subheadline: "Your Foundation is complete. Phase 2 and Phase 3 are now unlocked.",
  },
}

const DEFAULT_MAP_COPY: MapCopy = {
  headline: "Star earned!",
  subheadline: "Keep going to grow your tree.",
}

interface FlowCProps {
  completionState: ModuleCompletionState
}

export function FlowC({ completionState }: FlowCProps) {
  const [step, setStep] = useState<FlowCStep>('reward_card')
  const navigate = useNavigate()
  const { categoryDetails, homePhases, module1Completions, treeImage } = useApp()

  const { categoryId, categoryLabel, rewardCardData, totalStars } = completionState

  const hasFlowD = totalStars === 1 || totalStars === 6

  // Skip reward card if data is missing
  useEffect(() => {
    if (step === 'reward_card' && !rewardCardData) {
      setStep('star_earned')
    }
  }, [step, rewardCardData])

  const earnedHeadline = starEarnedHeadlines[categoryId] ?? "You earned a star!"
  const earnedSubheadline = starEarnedSubheadlines[categoryId] ?? `You've added meaningful depth to your ${categoryLabel} stories.`

  const mapCopy = mapCopyByStars[totalStars] ?? DEFAULT_MAP_COPY

  // Build category object for StarEarnedScreen
  const earnedCategory: Category = {
    id: categoryId,
    title: categoryLabel,
    image: rewardCardData?.categoryImage ?? '',
    status: 'growing',
    totalModules: 2,
  }

  return (
    <AnimatePresence mode="wait">
      {step === 'reward_card' && rewardCardData && (
        <RewardCard
          headline={`${categoryLabel} Story Added!`}
          subheadline="You've added another meaningful piece to your LastingMind."
          categoryImage={rewardCardData.categoryImage}
          categoryLabel={rewardCardData.categoryLabel}
          moduleTitle={rewardCardData.moduleTitle}
          items={rewardCardData.items}
          itemCountLabel={rewardCardData.itemCountLabel}
          date={rewardCardData.date}
          onContinue={() => setStep('star_earned')}
        />
      )}

      {step === 'star_earned' && (
        <StarEarnedScreen
          headline={earnedHeadline}
          subheadline={earnedSubheadline}
          category={earnedCategory}
          onContinue={() => setStep(hasFlowD ? 'flow_d' : 'map')}
        />
      )}

      {step === 'flow_d' && (
        <FlowD
          variant={totalStars === 1 ? 'first_star' : 'final_star'}
          completionState={completionState}
          onComplete={() => setStep('map')}
        />
      )}

      {step === 'map' && (
        <FoundationMapScreen
          headline={mapCopy.headline}
          subheadline={mapCopy.subheadline}
          earnedCategoryId={categoryId}
          onContinue={() => setStep(totalStars === 6 ? 'celebration' : 'next_step')}
        />
      )}

      {step === 'celebration' && (
        <Phase1CelebrationScreen onContinue={() => setStep('unlock_summary')} />
      )}

      {step === 'unlock_summary' && (
        <FoundationUnlockSummaryScreen
          onStartLifeChapters={() => navigate('/home')}
          onDone={() => navigate('/home')}
        />
      )}

      {step === 'next_step' && (() => {
        // Current category's completed modules
        const detail = categoryDetails[categoryId]
        const completedModules = detail
          ? detail.modules.map((m) => ({ title: m.title, status: 'Complete' }))
          : []

        // Find next suggested category (first Foundation category the user hasn't started yet)
        const foundationCats = homePhases[0]?.categories ?? []
        const nextCat = foundationCats.find(
          (c) => c.id !== categoryId && c.status !== 'locked' && !module1Completions[c.id],
        )
        const nextDetail = nextCat ? categoryDetails[nextCat.id] : undefined
        const nextMod = nextDetail?.modules?.[0]

        const suggestedModule = nextCat && nextMod
          ? {
              categoryId: nextCat.id,
              moduleId: nextMod.id,
              title: nextMod.title,
              description: nextMod.description,
              duration: nextMod.duration,
            }
          : undefined

        return (
          <NextStepScreen
            headline="Keep going to grow your tree!"
            treeImage={treeImage}
            completedModules={completedModules}
            suggestedModule={suggestedModule}
            progressNote="Keep adding entries to earn your next star"
            onStartModule={(catId) => navigate(`/intro/${catId}`)}
            onDone={() => navigate('/home')}
          />
        )
      })()}
    </AnimatePresence>
  )
}
