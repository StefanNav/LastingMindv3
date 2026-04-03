import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition } from '@/animations/PageTransition'
import { Share2 } from 'lucide-react'
import type { FavouritesAnswer } from '@/types/favourites'
import type { ModuleCompletionState } from '@/types'

interface LocationState {
  answers: FavouritesAnswer[]
}

export function FavouritesMilestonePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as LocationState | null
  const answers = locationState?.answers ?? []

  const handleKeepGoing = () => {
    const completionState: ModuleCompletionState = {
      categoryId: 'cat-favourites',
      moduleNumber: 1,
      moduleTitle: 'Your Favourite Things',
      categoryLabel: 'Favourites',
      starEarned: false,
      totalStars: 0,
      totalStarsNeeded: 6,
    }
    navigate('/success', { state: completionState })
  }

  const handleShare = async () => {
    const text = answers
      .map((a) => `${a.emoji} ${a.categoryName}: ${a.answer}`)
      .join('\n')

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Favourites — LastingMind',
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
    <PageTransition>
      <div className="relative flex h-full flex-col bg-background">
        {/* Scrollable content */}
        <div className="flex flex-1 flex-col overflow-y-auto px-4 pb-48 pt-[72px]">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-6 text-center"
          >
            <h1 className="font-display text-[26px] font-normal leading-[1.2] text-foreground">
              Your LastingMind now knows what you love.
            </h1>
            <p className="mt-2 text-[14px] font-semibold text-[var(--lm-text-secondary)]">
              Here&apos;s your personality card
            </p>
          </motion.div>

          {/* Personality Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto w-full max-w-[340px] overflow-hidden rounded-2xl border border-[var(--lm-border)] bg-[var(--lm-bg-card)]"
            style={{
              boxShadow: '0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            {/* Card header */}
            <div className="bg-lm-green px-5 py-4">
              <p className="text-center font-display text-[18px] font-semibold leading-[1.2] text-white">
                My Favourite Things
              </p>
              <p className="mt-0.5 text-center text-[12px] font-medium text-white/70">
                LastingMind
              </p>
            </div>

            {/* Card body — emoji + answer pairs */}
            <div className="flex flex-col divide-y divide-[var(--lm-border-subtle)]">
              {answers.map((answer, i) => (
                <motion.div
                  key={answer.categoryId}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.4 + i * 0.06 }}
                  className="flex items-start gap-3 px-5 py-3"
                >
                  <span className="mt-0.5 text-[18px]">{answer.emoji}</span>
                  <div className="flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--lm-text-secondary)]">
                      {answer.categoryName}
                    </p>
                    <p className="mt-0.5 text-[13px] leading-[1.35] text-foreground">
                      {answer.answer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTAs */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 border-t border-[var(--lm-border-subtle)] bg-background/95 px-4 pb-[50px] pt-4 backdrop-blur-sm">
          <button
            type="button"
            onClick={handleKeepGoing}
            className="flex w-full items-center justify-center rounded-[4px] bg-lm-green px-10 py-4"
          >
            <span className="text-[16px] font-medium leading-[1.2] text-white">
              Keep going
            </span>
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="flex w-full items-center justify-center gap-[10px] rounded-[10px] bg-[#e7ebd9] px-5 py-4"
          >
            <Share2 className="size-6 text-[#283227]" />
            <span className="text-[16px] font-medium leading-[1.2] text-[#283227]">
              Share my card
            </span>
          </button>
        </div>
      </div>
    </PageTransition>
  )
}
