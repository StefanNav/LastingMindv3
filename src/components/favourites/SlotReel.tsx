import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import type { FavouritesCategory } from '@/types/favourites'

const ITEM_HEIGHT = 52
const VISIBLE_ITEMS = 5
const VIEWPORT_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS

interface SlotReelProps {
  categories: FavouritesCategory[]
  targetIndex: number
  isSpinning: boolean
  onSpinComplete: () => void
}

export function SlotReel({ categories, targetIndex, isSpinning, onSpinComplete }: SlotReelProps) {
  const [hasSpun, setHasSpun] = useState(false)
  const completedRef = useRef(false)
  const totalItems = categories.length

  // Centre offset so target item sits in the middle row
  const centreOffset = Math.floor(VISIBLE_ITEMS / 2)
  const targetY = -(targetIndex * ITEM_HEIGHT)

  // Spring-based y position
  const springY = useSpring(0, {
    stiffness: 60,
    damping: 18,
    mass: 1.2,
  })

  useEffect(() => {
    if (isSpinning) {
      completedRef.current = false
      setHasSpun(true)
      // Spin far past then settle on target
      const extraSpins = totalItems * 3
      const overshoot = -((extraSpins + targetIndex) * ITEM_HEIGHT)

      // Phase 1: fast spin
      springY.set(overshoot - ITEM_HEIGHT * 4)

      // Phase 2: settle on target after delay
      const timer = setTimeout(() => {
        springY.set(targetY)
      }, 1200)

      return () => clearTimeout(timer)
    }
  }, [isSpinning, targetIndex, targetY, totalItems, springY])

  // Detect when spring settles
  useEffect(() => {
    if (!hasSpun) return
    const unsub = springY.on('change', (v) => {
      if (
        !completedRef.current &&
        !isSpinning === false &&
        Math.abs(v - targetY) < 0.5
      ) {
        completedRef.current = true
        onSpinComplete()
      }
    })
    return unsub
  }, [hasSpun, springY, targetY, onSpinComplete, isSpinning])

  // Fallback: fire onSpinComplete after animation time
  useEffect(() => {
    if (isSpinning) {
      const timer = setTimeout(() => {
        if (!completedRef.current) {
          completedRef.current = true
          onSpinComplete()
        }
      }, 2400)
      return () => clearTimeout(timer)
    }
  }, [isSpinning, onSpinComplete])

  // Build repeated items for infinite-scroll illusion
  const repeatedCategories = [...categories, ...categories, ...categories, ...categories]

  const translateY = useTransform(springY, (v) => v + centreOffset * ITEM_HEIGHT)

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: VIEWPORT_HEIGHT }}
    >
      {/* Highlight band behind active row */}
      <div
        className="pointer-events-none absolute left-0 right-0 z-10 rounded-lg border border-lm-green/20 bg-lm-green/8"
        style={{
          top: centreOffset * ITEM_HEIGHT,
          height: ITEM_HEIGHT,
        }}
      />

      {/* Top/bottom gradient fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-[var(--lm-bg-card)] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-[var(--lm-bg-card)] to-transparent" />

      {/* Reel strip */}
      <motion.div style={{ y: translateY }}>
        {repeatedCategories.map((cat, i) => {
          const globalIndex = i
          return (
            <ReelItem
              key={`${cat.id}-${globalIndex}`}
              emoji={cat.emoji}
              name={cat.name}
              index={globalIndex}
              centreIndex={targetIndex + centreOffset}
              springY={springY}
              itemHeight={ITEM_HEIGHT}
            />
          )
        })}
      </motion.div>
    </div>
  )
}

interface ReelItemProps {
  emoji: string
  name: string
  index: number
  centreIndex: number
  springY: ReturnType<typeof useSpring>
  itemHeight: number
}

function ReelItem({ emoji, name, itemHeight }: ReelItemProps) {
  return (
    <div
      className="flex items-center gap-3 px-4"
      style={{ height: itemHeight }}
    >
      <span className="text-[24px]">{emoji}</span>
      <span className="text-[16px] font-semibold leading-[1.2] text-foreground">
        {name}
      </span>
    </div>
  )
}
