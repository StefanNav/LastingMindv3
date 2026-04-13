import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CardFlipAnimation } from './CardFlipAnimation'
import type { CoreValuesCategory } from '@/types/coreValues'

/* ── Fanned-stack positions (mimic the example's opposing rotations) ── */
const STACK_OFFSETS = [
  { rotate: -4, x: -8, y: 6 },
  { rotate: 3, x: 6, y: -2 },
]

interface CardDeckProps {
  remainingCards: number
  currentCard: CoreValuesCategory | null
  isShuffling: boolean
  isFlipping: boolean
  isRevealed: boolean
  hasEverTapped: boolean
  onTap: () => void
  onShuffleComplete: () => void
  onFlipComplete: () => void
}

export function CardDeck({
  remainingCards,
  currentCard,
  isShuffling,
  isFlipping,
  isRevealed,
  hasEverTapped,
  onTap,
  onShuffleComplete,
  onFlipComplete,
}: CardDeckProps) {
  // Number of stacked cards visible behind the top card (max 2)
  const stackDepth = Math.min(remainingCards - 1, 2)

  // Shuffle timer — fires onShuffleComplete after the deck shake ends
  useEffect(() => {
    if (isShuffling) {
      const timer = setTimeout(onShuffleComplete, 450)
      return () => clearTimeout(timer)
    }
  }, [isShuffling, onShuffleComplete])

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Deck wrapper — handles the shuffle shake for the whole deck */}
      <motion.div
        className="relative"
        style={{ isolation: 'isolate' }}
        animate={
          isShuffling
            ? {
                x: [0, -4, 4, -4, 4, -2, 2, 0],
                rotate: [0, -3, 3, -2, 2, -1, 1, 0],
              }
            : { x: 0, rotate: 0 }
        }
        transition={
          isShuffling
            ? { duration: 0.45, ease: [0.36, 0.07, 0.19, 0.97] }
            : { duration: 0.15 }
        }
      >
        {/* Blurred deck shadow */}
        <div className="absolute -bottom-4 left-4 right-4 h-8 rounded-full bg-black/10 blur-xl" />

        {/* Background stack cards — fanned with opposing rotations */}
        {Array.from({ length: stackDepth }, (_, i) => {
          const { rotate, x, y } = STACK_OFFSETS[i]
          return (
            <motion.div
              key={`stack-${i}`}
              className="absolute inset-0"
              initial={false}
              animate={{ rotate, x, y }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ zIndex: stackDepth - i }}
            >
              <div
                className="flex h-[360px] w-[260px] flex-col overflow-hidden rounded-2xl border border-[var(--lm-border)] bg-[var(--lm-bg-card)]"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              >
                <div className="flex h-[72px] shrink-0 items-center justify-center bg-lm-green">
                  <p className="font-display text-[16px] font-semibold leading-[1.2] tracking-wide text-white">
                    LastingMind
                  </p>
                </div>
                <div className="relative flex-1 overflow-hidden">
                  <img
                    src="/images/onboarding/OnboardingBackground.png"
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* Top card — interactive, highest z-index */}
        <div className="relative" style={{ zIndex: stackDepth + 1 }}>
          {remainingCards > 0 && (
            <CardFlipAnimation
              card={currentCard}
              isFlipping={isFlipping}
              isRevealed={isRevealed}
              onFlipComplete={onFlipComplete}
              onTap={onTap}
              disabled={isShuffling}
            />
          )}
        </div>
      </motion.div>

      {/* Prompt text — shown only before first tap */}
      <AnimatePresence>
        {!hasEverTapped && remainingCards > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="text-center text-[13px] text-[var(--lm-text-secondary)]"
          >
            Tap the card to reveal your question
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
