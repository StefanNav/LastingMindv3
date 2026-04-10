import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { RewardCard } from './RewardCard'
import { EncouragementScreen } from './EncouragementScreen'
import { SummaryScreen } from './SummaryScreen'
import { useApp } from '@/app/AppProvider'
import type { ModuleCompletionState, CategoryModule } from '@/types'

type FlowAStep = 'reward_card' | 'encouragement' | 'summary'

const encouragementCopy: Record<string, string> = {
  'cat-family': "Family lays the foundation for everything that follows",
  'cat-friends': "The friends who shaped you are now part of your lasting story",
  'cat-career': "Your career journey is now part of the legacy you're building",
  'cat-education': "The places you learned have shaped who you became",
  'cat-favorites': "The things you love say so much about who you are",
  'cat-core-values': "The values you stand for are the heart of your legacy",
}

const DEFAULT_ENCOURAGEMENT = "You just added the first piece. Everything you share becomes part of something your family will treasure."

interface FlowAProps {
  completionState: ModuleCompletionState
}

export function FlowA({ completionState }: FlowAProps) {
  const [step, setStep] = useState<FlowAStep>('reward_card')
  const navigate = useNavigate()
  const { treeImage } = useApp()

  const { categoryId, categoryLabel, rewardCardData, nextModule } = completionState

  // Skip reward card if data is missing
  useEffect(() => {
    if (step === 'reward_card' && !rewardCardData) {
      setStep('encouragement')
    }
  }, [step, rewardCardData])

  const headline = encouragementCopy[categoryId] ?? DEFAULT_ENCOURAGEMENT

  // Build module data for the SummaryScreen
  const completedModule: CategoryModule = {
    id: `${categoryId}-mod-1`,
    title: completionState.moduleTitle,
    description: '',
    duration: '5min',
    completed: true,
    locked: false,
  }

  const nextModuleCard: CategoryModule = {
    id: `${categoryId}-mod-2`,
    title: nextModule?.title ?? 'Module 2',
    description: nextModule?.description ?? '',
    duration: nextModule?.duration ?? '5min',
    completed: false,
    locked: false,
  }

  return (
    <AnimatePresence mode="wait">
      {step === 'reward_card' && rewardCardData && (
        <RewardCard
          headline="Module Complete!"
          subheadline="You've added this to your LastingMind"
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
          headline={headline}
          treeImage={treeImage}
          onContinue={() => setStep('summary')}
        />
      )}

      {step === 'summary' && (
        <SummaryScreen
          headline="Keep going to grow your tree!"
          treeImage={treeImage}
          completedModule={completedModule}
          nextModule={nextModuleCard}
          categoryLabel={categoryLabel}
          onStartNext={() => navigate(`/intro2/${categoryId}`)}
          onDone={() => navigate('/home')}
        />
      )}
    </AnimatePresence>
  )
}
