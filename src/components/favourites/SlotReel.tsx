import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { FavouritesCategory } from '@/types/favourites'

const ITEM_HEIGHT = 60
const VISIBLE_ITEMS = 5
const ANGLE_PER_ROW = 22
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
  // Start in the 2nd copy so categories appear above the highlight
  const initialY = -(totalItems * ITEM_HEIGHT)

  // useMotionValue as explicit source, useSpring follows with physics
  const rawY = useMotionValue(initialY)
  const springY = useSpring(rawY, {
    stiffness: 35,
    damping: 22,
    mass: 1.6,
  })

  // Track the final landing position for completion detection
  const landingRef = useRef(initialY)

  // Ensure correct initial position on mount
  useEffect(() => {
    rawY.jump(initialY)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isSpinning) {
      completedRef.current = false
      setHasSpun(true)

      // Reset both rawY and springY to a clean starting position.
      // The strip repeats, so jumping to the equivalent position in the
      // 2nd copy is visually identical — no visible jump.
      const stripLen = totalItems * ITEM_HEIGHT
      const currentY = springY.get()
      const offset = ((-currentY % stripLen) + stripLen) % stripLen
      const startY = -(stripLen + offset)
      rawY.jump(startY)
      springY.jump(startY)

      // Land on targetIndex, 3 full rotations ahead of startY
      const landingY = startY - (3 * stripLen) - (targetIndex * ITEM_HEIGHT - offset)
      landingRef.current = landingY

      // One smooth set — spring decelerates naturally to the target
      rawY.set(landingY)
    }
  }, [isSpinning, targetIndex, totalItems, rawY, springY])

  // Detect when spring settles near landing position
  useEffect(() => {
    if (!hasSpun) return
    const unsub = springY.on('change', (v) => {
      if (
        !completedRef.current &&
        Math.abs(v - landingRef.current) < 0.5
      ) {
        completedRef.current = true
        onSpinComplete()
      }
    })
    return unsub
  }, [hasSpun, springY, onSpinComplete])

  // Fallback: fire onSpinComplete after animation time
  useEffect(() => {
    if (isSpinning) {
      const timer = setTimeout(() => {
        if (!completedRef.current) {
          completedRef.current = true
          onSpinComplete()
        }
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [isSpinning, onSpinComplete])

  // Build repeated items — 6 copies for enough room during 3 full rotations
  const repeatedCategories = [
    ...categories, ...categories, ...categories,
    ...categories, ...categories, ...categories,
  ]

  const translateY = useTransform(springY, (v) => v + centreOffset * ITEM_HEIGHT)

  // The pixel center of the viewport
  const viewportCentre = centreOffset * ITEM_HEIGHT + ITEM_HEIGHT / 2

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: VIEWPORT_HEIGHT, perspective: 280 }}
    >
      {/* Highlight band behind active row */}
      <div
        className="pointer-events-none absolute left-0 right-0 z-10 rounded-lg border border-lm-green/20 bg-lm-green/8"
        style={{
          top: centreOffset * ITEM_HEIGHT,
          height: ITEM_HEIGHT,
        }}
      />


      {/* Reel strip */}
      <motion.div style={{ y: translateY }}>
        {repeatedCategories.map((cat, i) => (
          <ReelItem
            key={`${cat.id}-${i}`}
            emoji={cat.emoji}
            name={cat.name}
            index={i}
            springY={springY}
            itemHeight={ITEM_HEIGHT}
            centreOffset={centreOffset}
            viewportCentre={viewportCentre}
          />
        ))}
      </motion.div>
    </div>
  )
}

interface ReelItemProps {
  emoji: string
  name: string
  index: number
  springY: ReturnType<typeof useSpring>
  itemHeight: number
  centreOffset: number
  viewportCentre: number
}

function ReelItem({ emoji, name, index, springY, itemHeight, centreOffset, viewportCentre }: ReelItemProps) {
  // Item's pixel position in the viewport as the reel scrolls
  const itemScreenY = useTransform(springY, (v) => {
    const yOffset = v + centreOffset * itemHeight
    return index * itemHeight + yOffset + itemHeight / 2
  })

  // Barrel transforms — matching birthday picker wheel
  const offset = useTransform(itemScreenY, (y) => (y - viewportCentre) / itemHeight)

  const rotateX = useTransform(offset, (o) => -o * ANGLE_PER_ROW)

  const scale = useTransform(offset, (o) => 1 - Math.abs(o) * 0.04)

  const opacity = useTransform(offset, (o) => {
    const abs = Math.abs(o)
    return abs > 2.5 ? 0.2 : 1 - abs * 0.18
  })

  return (
    <motion.div
      className="flex items-center gap-3 px-4"
      style={{
        height: itemHeight,
        rotateX,
        scale,
        opacity,
        transformOrigin: 'center center',
      }}
    >
      <span className="text-[28px]">{emoji}</span>
      <span className="text-[16px] font-bold leading-[1.2] text-foreground">
        {name}
      </span>
    </motion.div>
  )
}
