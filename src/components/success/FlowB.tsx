import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { RewardCard } from './RewardCard'
import { EncouragementScreen } from './EncouragementScreen'
import { StarTeaserScreen } from './StarTeaserScreen'
import { useApp } from '@/app/AppProvider'
import type { ModuleCompletionState, Category, CategoryModule } from '@/types'

type FlowBStep = 'reward_card' | 'encouragement' | 'star_teaser'

const encouragementCopy: Record<string, string> = {
  'cat-family': "What you share today becomes part of what your loved ones may one day ask about.",
  'cat-friends': "The people you call friends say everything about who you are.",
  'cat-career': "Your work shaped you in ways your family deserves to understand.",
  'cat-education': "Where you learned is part of who you became.",
  'cat-favorites': "The things you love tell a story all their own.",
  'cat-core-values': "What you stand for is the most lasting thing you can leave behind.",
}

const DEFAULT_ENCOURAGEMENT = "What you share today becomes part of what your loved ones may one day ask about."

const starTeaserHeadlines: Record<string, string> = {
  'cat-family': "You're one story away from your first star",
  'cat-friends': "You're one story away from your Friends star",
  'cat-career': "You're one story away from your Career star",
  'cat-education': "You're one story away from your Education star",
  'cat-favorites': "You're one story away from your Favorites star",
  'cat-core-values': "You're one story away from your Core Values star",
}

const DEFAULT_TEASER_HEADLINE = "You're one step away from earning your star"

interface FlowBProps {
  completionState: ModuleCompletionState
}

export function FlowB({ completionState }: FlowBProps) {
  const [step, setStep] = useState<FlowBStep>('reward_card')
  const navigate = useNavigate()
  const { treeImage } = useApp()

  const { categoryId, categoryLabel, rewardCardData, nextModule } = completionState

  // Skip reward card if data is missing
  useEffect(() => {
    if (step === 'reward_card' && !rewardCardData) {
      setStep('encouragement')
    }
  }, [step, rewardCardData])

  const encouragement = encouragementCopy[categoryId] ?? DEFAULT_ENCOURAGEMENT
  const teaserHeadline = starTeaserHeadlines[categoryId] ?? DEFAULT_TEASER_HEADLINE

  // Build category object for CategoryNodeCard
  const teaserCategory: Category = {
    id: categoryId,
    title: categoryLabel,
    image: rewardCardData?.categoryImage ?? '',
    status: 'started',
    totalModules: 2,
  }

  // Build next module card
  const nextModuleCard: CategoryModule = {
    id: `${categoryId}-mod-2`,
    title: nextModule?.title ?? 'Module 2',
    description: nextModule?.description ?? '',
    duration: nextModule?.duration ?? '5min',
    completed: false,
    locked: false,
  }

  const ctaLabel = `Tell Another ${categoryLabel} Story`

  return (
    <AnimatePresence mode="wait">
      {step === 'reward_card' && rewardCardData && (
        <RewardCard
          headline={`First ${categoryLabel} Story Complete!`}
          subheadline="You've added another meaningful piece to your Lasting Mind."
          categoryImage={rewardCardData.categoryImage}
          categoryLabel={rewardCardData.categoryLabel}
          moduleTitle={rewardCardData.moduleTitle}
          items={rewardCardData.items}
          itemCountLabel={rewardCardData.itemCountLabel}
          date={rewardCardData.date}
          onContinue={() => setStep('encouragement')}
        />
      )}

      {step === 'encouragement' && (
        <EncouragementScreen
          headline={encouragement}
          treeImage={treeImage}
          onContinue={() => setStep('star_teaser')}
        />
      )}

      {step === 'star_teaser' && (
        <StarTeaserScreen
          headline={teaserHeadline}
          category={teaserCategory}
          nextModule={nextModuleCard}
          categoryLabel={categoryLabel}
          ctaLabel={ctaLabel}
          onStartNext={() => navigate(`/reflection/${categoryId}`)}
          onDone={() => navigate('/home')}
        />
      )}
    </AnimatePresence>
  )
}
