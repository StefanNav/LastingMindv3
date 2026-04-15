import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageShell } from '@/components/shared/PageShell'
import { PrimaryCTA } from '@/components/shared/PrimaryCTA'
import { SecondaryCTA } from '@/components/shared/SecondaryCTA'
import { StickyFooter } from '@/components/shared/StickyFooter'
import { Share2 } from 'lucide-react'
import { module2IntroData } from '@/data/mock'
import { useApp } from '@/app/AppProvider'
import type { FavoritesAnswer } from '@/types/favorites'
import type { ModuleCompletionState, RewardCardData } from '@/types'

interface LocationState {
  answers: FavoritesAnswer[]
}

export function FavoritesMilestonePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { markModule1Complete } = useApp()
  const locationState = location.state as LocationState | null
  const answers = locationState?.answers ?? []

  const mod2 = module2IntroData['cat-favorites']

  const handleKeepGoing = () => {
    const rewardCardData: RewardCardData = {
      categoryImage: '/images/Favorites 2.png',
      categoryLabel: 'Favorites',
      moduleTitle: 'Your Favorite Things',
      items: answers.map((a) => ({
        id: a.categoryId,
        initial: a.emoji,
        label: a.categoryName,
        sublabel: a.answer,
      })),
      itemCountLabel: `${answers.length} favorites recorded`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    }

    const completionState: ModuleCompletionState = {
      categoryId: 'cat-favorites',
      moduleNumber: 1,
      moduleTitle: 'Your Favorite Things',
      categoryLabel: 'Favorites',
      starEarned: false,
      totalStars: 0,
      totalStarsNeeded: 6,
      rewardCardData,
      nextModule: mod2
        ? { title: mod2.moduleTitle, description: mod2.description, duration: '5min' }
        : undefined,
    }
    markModule1Complete('cat-favorites')
    navigate('/success', { state: completionState })
  }

  const handleShare = async () => {
    const text = answers
      .map((a) => `${a.emoji} ${a.categoryName}: ${a.answer}`)
      .join('\n')

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Favorites — LastingMind',
          text,
        })
      } catch {
        // User cancelled or share failed
      }
    } else {
      alert('Sharing is not supported on this device.')
    }
  }

  return (
    <PageShell>
      <div className="relative z-10 flex h-full flex-col">
        {/* Scrollable content */}
        <div className="flex flex-1 flex-col overflow-y-auto px-4 pb-48 pt-16">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-6 text-center"
          >
            <h1 className="font-display text-2xl font-semibold leading-tight text-foreground">
              Your LastingMind now knows what you love.
            </h1>
            <p className="mt-2 text-sm font-semibold text-muted-foreground">
              Here&apos;s your personality card
            </p>
          </motion.div>

          {/* Personality Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto w-full max-w-[340px] overflow-hidden rounded-[10px] bg-lm-bg-card/40 shadow-card backdrop-blur-sm"
          >
            {/* Card header */}
            <div className="bg-primary px-5 py-4">
              <p className="text-center font-display text-lg font-semibold leading-tight text-primary-foreground">
                My Favorite Things
              </p>
              <p className="mt-0.5 text-center text-xs font-medium text-primary-foreground/70">
                LastingMind
              </p>
            </div>

            {/* Card body — emoji + answer pairs */}
            <div className="flex flex-col divide-y divide-border/50">
              {answers.map((answer, i) => (
                <motion.div
                  key={answer.categoryId}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.4 + i * 0.06 }}
                  className="flex items-start gap-3 px-5 py-3"
                >
                  <span className="mt-0.5 text-lg">{answer.emoji}</span>
                  <div className="flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                      {answer.categoryName}
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-foreground">
                      {answer.answer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTAs */}
        <StickyFooter className="absolute inset-x-0 bottom-0 flex flex-col gap-3">
          <PrimaryCTA onClick={handleKeepGoing}>
            Keep going
          </PrimaryCTA>
          <SecondaryCTA onClick={handleShare}>
            <Share2 className="size-5" />
            Share my card
          </SecondaryCTA>
        </StickyFooter>
      </div>
    </PageShell>
  )
}
