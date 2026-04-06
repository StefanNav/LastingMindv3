import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CardBack } from './CardBack'
import { CardFront } from './CardFront'
import type { CoreValuesCategory } from '@/types/coreValues'

interface CardFlipAnimationProps {
  card: CoreValuesCategory | null
  isShuffling: boolean
  isFlipping: boolean
  isRevealed: boolean
  onShuffleComplete: () => void
  onFlipComplete: () => void
  onTap: () => void
}

export function CardFlipAnimation({
  card,
  isShuffling,
  isFlipping,
  isRevealed,
  onShuffleComplete,
  onFlipComplete,
  onTap,
}: CardFlipAnimationProps) {
  const [showFront, setShowFront] = useState(false)

  const handleFlipStart = () => {
    // Switch to front face at the midpoint of the flip
    setTimeout(() => {
      setShowFront(true)
    }, 300)
  }

  const handleFlipEnd = () => {
    onFlipComplete()
  }

  // Reset front face when back to idle
  useEffect(() => {
    if (!isFlipping && !isRevealed && showFront) {
      setShowFront(false)
    }
  }, [isFlipping, isRevealed, showFront])

  // Shuffle animation — rapid x oscillation then call onShuffleComplete
  useEffect(() => {
    if (isShuffling) {
      const timer = setTimeout(onShuffleComplete, 600)
      return () => clearTimeout(timer)
    }
  }, [isShuffling, onShuffleComplete])

  const isBusy = isShuffling || isFlipping || isRevealed

  return (
    <div style={{ perspective: 1000 }} className="relative">
      <motion.div
        className="cursor-pointer"
        onClick={!isBusy ? onTap : undefined}
        // Lift + shuffle wobble
        animate={{
          scale: isShuffling ? 1.02 : isFlipping ? 1.05 : 1,
          y: isFlipping ? -12 : 0,
          x: isShuffling ? [0, -14, 12, -10, 8, -4, 0] : 0,
          rotate: isShuffling ? [0, -3, 2.5, -2, 1.5, -0.5, 0] : 0,
        }}
        transition={
          isShuffling
            ? { duration: 0.55, ease: 'easeInOut' }
            : {
                scale: { duration: 0.2, ease: 'easeOut' },
                y: { duration: 0.2, ease: 'easeOut' },
                x: { duration: 0.15 },
                rotate: { duration: 0.15 },
              }
        }
        style={{
          filter: isFlipping
            ? 'drop-shadow(0 16px 32px rgba(0,0,0,0.18))'
            : isShuffling
              ? 'drop-shadow(0 12px 24px rgba(0,0,0,0.14))'
              : 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))',
        }}
      >
        <motion.div
          animate={{
            rotateY: isFlipping || isRevealed ? 180 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          onAnimationStart={isFlipping ? handleFlipStart : undefined}
          onAnimationComplete={isFlipping ? handleFlipEnd : undefined}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Back face */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              position: showFront ? 'absolute' : 'relative',
              inset: 0,
            }}
          >
            <CardBack />
          </div>

          {/* Front face */}
          {card && (
            <div
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                position: showFront ? 'relative' : 'absolute',
                inset: 0,
              }}
            >
              <CardFront card={card} />
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
