import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CardBack } from './CardBack'
import { CardFront } from './CardFront'
import type { CoreValuesCategory } from '@/types/coreValues'

interface CardFlipAnimationProps {
  card: CoreValuesCategory | null
  isFlipping: boolean
  isRevealed: boolean
  onFlipComplete: () => void
  onTap: () => void
  disabled?: boolean
}

export function CardFlipAnimation({
  card,
  isFlipping,
  isRevealed,
  onFlipComplete,
  onTap,
  disabled,
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

  const isBusy = disabled || isFlipping || isRevealed

  return (
    <div style={{ perspective: 1000 }} className="relative">
      <motion.div
        className="cursor-pointer"
        onClick={!isBusy ? onTap : undefined}
        animate={{
          scale: isFlipping ? 1.05 : 1,
          y: isFlipping ? -12 : 0,
        }}
        transition={{
          scale: { duration: 0.2, ease: 'easeOut' },
          y: { duration: 0.2, ease: 'easeOut' },
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
