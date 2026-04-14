import { useState, useRef, useCallback, useMemo } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { EarnedRewardCard } from '@/types'

interface RewardCardCarouselProps {
  cards: EarnedRewardCard[]
}

const CARD_GAP = 12
const SIDE_PADDING = 24

export function RewardCardCarousel({ cards }: RewardCardCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  // Card width = container width - side padding * 2
  const getCardWidth = useCallback(() => {
    if (containerRef.current) {
      return containerRef.current.offsetWidth - SIDE_PADDING * 2
    }
    return 300
  }, [])

  const snapPoints = useMemo(() => {
    const w = getCardWidth()
    return cards.map((_, i) => -i * (w + CARD_GAP))
  }, [cards, getCardWidth])

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      const cardWidth = getCardWidth()
      const threshold = cardWidth * 0.2
      let newIndex = activeIndex

      if (info.offset.x < -threshold || info.velocity.x < -300) {
        newIndex = Math.min(activeIndex + 1, cards.length - 1)
      } else if (info.offset.x > threshold || info.velocity.x > 300) {
        newIndex = Math.max(activeIndex - 1, 0)
      }

      setActiveIndex(newIndex)
      const target = snapPoints[newIndex] ?? 0
      animate(x, target, { type: 'spring', stiffness: 300, damping: 30 })
    },
    [activeIndex, cards.length, getCardWidth, snapPoints, x],
  )

  // Opacity per card based on distance from active
  const cardOpacity = useCallback(
    (index: number) => {
      return useTransform(x, (latest) => {
        const cardWidth = getCardWidth()
        const center = -index * (cardWidth + CARD_GAP)
        const distance = Math.abs(latest - center)
        return Math.max(0.4, 1 - distance / (cardWidth * 1.5))
      })
    },
    [getCardWidth, x],
  )

  const cardScale = useCallback(
    (index: number) => {
      return useTransform(x, (latest) => {
        const cardWidth = getCardWidth()
        const center = -index * (cardWidth + CARD_GAP)
        const distance = Math.abs(latest - center)
        return Math.max(0.92, 1 - distance / (cardWidth * 6))
      })
    },
    [getCardWidth, x],
  )

  if (cards.length === 0) return null

  return (
    <div className="flex flex-col gap-4">
      {/* Carousel container */}
      <div ref={containerRef} className="relative overflow-hidden">
        <motion.div
          className="flex"
          style={{ x, gap: CARD_GAP, paddingLeft: SIDE_PADDING, paddingRight: SIDE_PADDING }}
          drag="x"
          dragConstraints={{
            left: -(cards.length - 1) * (getCardWidth() + CARD_GAP),
            right: 0,
          }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              className="shrink-0"
              style={{
                width: `calc(100vw - ${SIDE_PADDING * 2}px)`,
                maxWidth: `calc(430px - ${SIDE_PADDING * 2}px)`,
                opacity: cardOpacity(i),
                scale: cardScale(i),
              }}
            >
              <StaticRewardCard card={card} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dot indicators */}
      {cards.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {cards.map((card, i) => (
            <button
              key={card.id}
              type="button"
              onClick={() => {
                setActiveIndex(i)
                animate(x, snapPoints[i] ?? 0, { type: 'spring', stiffness: 300, damping: 30 })
              }}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === activeIndex ? 'w-6 bg-lm-green' : 'w-1.5 bg-foreground/20',
              )}
              aria-label={`Card ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Static reward card (no CTA, display-only) ──────────────────────────────

export function StaticRewardCard({ card }: { card: EarnedRewardCard }) {
  return (
    <div className="reward-card flex flex-col gap-[24px] items-center px-4 pb-5 pt-6">
      {/* Overlay layers */}
      <div className="reward-card-noise" />
      <div className="reward-card-glass" />
      <div className="reward-card-shimmer" />
      <div className="reward-card-shimmer-sharp" />

      {/* Category image + label + module title */}
      <div className="relative z-10 flex w-full flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="h-[80px] w-[76px] overflow-hidden">
            <img
              src={card.categoryImage}
              alt={card.categoryLabel}
              className="h-full w-full object-contain"
            />
          </div>
          <p className="gold-emboss-warm text-[13px] font-semibold leading-tight">
            {card.categoryLabel}
          </p>
        </div>
        <div className="mt-2 flex w-full flex-col items-center gap-2">
          <p className="font-display text-xl font-normal leading-tight text-foreground text-center">
            {card.moduleTitle}
          </p>
        </div>
      </div>

      {/* Item grid */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 w-full">
        {card.items.map((item) => (
          <div key={item.id} className="flex flex-col items-center gap-1.5">
            <div className="flex size-9 items-center justify-center overflow-hidden rounded-full border border-lm-green bg-background">
              <p className="font-display text-[17px] font-bold leading-none text-lm-green">
                {item.initial}
              </p>
            </div>
            <div className="flex flex-col items-center gap-[1px] text-center">
              <p className="text-[14px] font-bold leading-none text-foreground">
                {item.label}
              </p>
              {item.sublabel && (
                <p className="text-[11px] font-medium leading-tight text-muted-foreground/60">
                  {item.sublabel}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="relative z-10 flex w-full items-center border-t border-[#d4a94a]/30 pt-3">
        <p className="gold-emboss-warm flex-1 text-[10px] font-medium uppercase tracking-wider opacity-70">
          {card.itemCountLabel}
        </p>
        <p className="gold-emboss-warm text-[11px] font-normal opacity-60">
          {card.date}
        </p>
      </div>
    </div>
  )
}
