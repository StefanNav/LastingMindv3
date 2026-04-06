import { motion, AnimatePresence } from 'framer-motion'
import { CardFlipAnimation } from './CardFlipAnimation'
import type { CoreValuesCategory } from '@/types/coreValues'

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

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Card stack container */}
      <div className="relative">
        {/* Background stack cards for depth effect */}
        {Array.from({ length: stackDepth }, (_, i) => {
          const offset = (i + 1) * 4
          const scale = 1 - (i + 1) * 0.02
          return (
            <motion.div
              key={`stack-${i}`}
              className="absolute left-1/2 top-0"
              style={{
                transform: `translateX(-50%) translateY(${offset}px) scale(${scale})`,
                zIndex: -1 - i,
              }}
              animate={{
                translateY: offset,
              }}
            >
              {/* Simplified stack card — just the shape */}
              <div
                className="h-[360px] w-[260px] rounded-2xl border border-[var(--lm-border)] bg-[#f0ede8]"
                style={{
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              />
            </motion.div>
          )
        })}

        {/* Top card — interactive */}
        {remainingCards > 0 && (
          <CardFlipAnimation
            card={currentCard}
            isShuffling={isShuffling}
            isFlipping={isFlipping}
            isRevealed={isRevealed}
            onShuffleComplete={onShuffleComplete}
            onFlipComplete={onFlipComplete}
            onTap={onTap}
          />
        )}
      </div>

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
