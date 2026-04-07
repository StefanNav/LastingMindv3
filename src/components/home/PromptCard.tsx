import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DemoPromptCard } from '@/types'

interface PromptCardCarouselProps {
  cards: DemoPromptCard[]
  onCardTap: (card: DemoPromptCard) => void
}

const SWIPE_THRESHOLD = 50

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    rotate: direction > 0 ? 4 : -4,
  }),
  center: {
    x: 0,
    opacity: 1,
    rotate: 0,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    rotate: direction > 0 ? -4 : 4,
  }),
}

export function PromptCard({ cards, onCardTap }: PromptCardCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const isDragging = useRef(false)

  // Reset index when cards change (e.g. demo state switch)
  useEffect(() => {
    setActiveIndex(0)
    setDirection(0)
  }, [cards])

  const paginate = useCallback(
    (newDirection: number) => {
      const next = activeIndex + newDirection
      if (next < 0 || next >= cards.length) return
      setDirection(newDirection)
      setActiveIndex(next)
    },
    [activeIndex, cards.length],
  )

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      const { offset, velocity } = info
      const swipe = Math.abs(offset.x) * velocity.x
      if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
        paginate(1)
      } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
        paginate(-1)
      }
      // Allow tap detection after a short delay
      requestAnimationFrame(() => {
        isDragging.current = false
      })
    },
    [paginate],
  )

  const handleCardTap = useCallback(() => {
    if (isDragging.current) return
    const card = cards[activeIndex]
    if (card) onCardTap(card)
  }, [cards, activeIndex, onCardTap])

  if (cards.length === 0) return null

  const activeCard = cards[activeIndex]

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Fixed-height wrapper — prevents layout shift during swipe */}
      <div
        className="relative w-full h-[148px] overflow-hidden"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleCardTap()
          if (e.key === 'ArrowRight') paginate(1)
          if (e.key === 'ArrowLeft') paginate(-1)
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          {/* Each card is a self-contained visual unit that swipes as a whole */}
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag={cards.length > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            whileDrag={{ scale: 0.97, cursor: 'grabbing' }}
            whileTap={{ scale: 0.98 }}
            onDragStart={() => { isDragging.current = true }}
            onDragEnd={handleDragEnd}
            onClick={handleCardTap}
            className="absolute inset-0 flex flex-col items-center justify-between rounded-[10px] bg-lm-bg-card/80 px-5 py-4 cursor-grab"
          >
            {/* Category tag */}
            <div className="flex w-full items-center gap-1">
              <p className="text-[10px] font-bold uppercase leading-none tracking-[1px] text-lm-gold">
                {activeCard.categoryTag}
              </p>
            </div>
            {/* Question — clamped to 2 lines */}
            <p className="w-full text-center text-[16px] font-medium leading-[1.3] text-foreground pointer-events-none line-clamp-2">
              {activeCard.question}
            </p>
            {/* Arrow affordance */}
            <div className="flex items-center justify-center gap-1.5 text-[13px] font-medium text-primary pointer-events-none">
              <span>Start Module</span>
              <ArrowRight className="size-3.5 shrink-0" strokeWidth={2} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      {cards.length > 1 && (
        <div className="flex items-center justify-center gap-2.5">
          {cards.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to prompt ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation()
                setDirection(i > activeIndex ? 1 : -1)
                setActiveIndex(i)
              }}
              className={cn(
                'rounded-full transition-all duration-200',
                i === activeIndex
                  ? 'h-1.5 w-5 bg-lm-green'
                  : 'size-1.5 bg-lm-neutral-warm/35',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
