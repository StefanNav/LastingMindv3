import { useState, useRef, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThinkingDots } from '@/components/ui/ThinkingDots'
import { containerVariants, dissolveVariants } from './animations'

// ---------------------------------------------------------------------------
// Birthday picker helpers (from BirthdayPickerSlide)
// ---------------------------------------------------------------------------

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)
const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 91 }, (_, i) => CURRENT_YEAR - 20 - i)

const ROW_HEIGHT = 34
const VISIBLE_ROWS = 5
const PICKER_HEIGHT = ROW_HEIGHT * VISIBLE_ROWS
const LOOP_COPIES = 5
const MIDDLE_COPY = Math.floor(LOOP_COPIES / 2)
const ANGLE_PER_ROW = 22 // degrees of rotation per row away from center

function ScrollColumn({
  items,
  defaultIndex,
  onChange,
  renderItem,
  loop = false,
}: {
  items: readonly (string | number)[]
  defaultIndex: number
  onChange: (index: number) => void
  renderItem: (item: string | number) => string
  loop?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemCount = items.length
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)
  const [scrollY, setScrollY] = useState(0)
  const isScrolling = useRef(false)
  const scrollTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const isResetting = useRef(false)

  // In loop mode, offset to the middle copy so user can scroll both directions
  const startOffset = loop ? MIDDLE_COPY * itemCount : 0

  const scrollToIndex = useCallback((index: number, smooth = true) => {
    const el = containerRef.current
    if (!el) return
    const scrollIndex = loop ? startOffset + index : index
    el.scrollTo({
      top: scrollIndex * ROW_HEIGHT,
      behavior: smooth ? 'smooth' : 'instant',
    })
  }, [loop, startOffset])

  useEffect(() => {
    scrollToIndex(defaultIndex, false)
    // Also set initial scrollY for correct 3D positioning on mount
    const scrollIndex = loop ? startOffset + defaultIndex : defaultIndex
    setScrollY(scrollIndex * ROW_HEIGHT)
  }, [defaultIndex, scrollToIndex, loop, startOffset])

  const handleScroll = useCallback(() => {
    if (isResetting.current) return
    const el = containerRef.current
    if (!el) return

    // Update scrollY immediately for smooth 3D wheel visuals
    setScrollY(el.scrollTop)

    isScrolling.current = true

    if (scrollTimer.current) clearTimeout(scrollTimer.current)
    scrollTimer.current = setTimeout(() => {
      isScrolling.current = false
      const rawIndex = Math.round(el.scrollTop / ROW_HEIGHT)

      if (loop) {
        const originalIndex = ((rawIndex - startOffset) % itemCount + itemCount) % itemCount
        setSelectedIndex(originalIndex)
        onChange(originalIndex)
        // Silently reset to middle copy so user can keep scrolling indefinitely
        const targetIndex = startOffset + originalIndex
        if (rawIndex !== targetIndex) {
          isResetting.current = true
          el.scrollTo({ top: targetIndex * ROW_HEIGHT, behavior: 'instant' })
          requestAnimationFrame(() => { isResetting.current = false })
        }
      } else {
        const clamped = Math.max(0, Math.min(itemCount - 1, rawIndex))
        setSelectedIndex(clamped)
        onChange(clamped)
        scrollToIndex(clamped)
      }
    }, 80)
  }, [itemCount, onChange, scrollToIndex, loop, startOffset])

  const paddingRows = Math.floor(VISIBLE_ROWS / 2)

  // Build rendered items — repeated for loop mode, single for normal
  const renderedItems: (string | number)[] = loop
    ? Array.from({ length: LOOP_COPIES }, () => [...items]).flat()
    : [...items]

  // Center of the visible viewport in scroll-content coordinates
  const viewportCenter = scrollY + PICKER_HEIGHT / 2

  return (
    <div className="relative flex-1" style={{ height: PICKER_HEIGHT, perspective: 280 }}>
      <div
        className="pointer-events-none absolute left-0 right-0 z-10 rounded-md bg-lm-green/10 border-y border-lm-green/20"
        style={{
          top: paddingRows * ROW_HEIGHT,
          height: ROW_HEIGHT,
        }}
      />
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto scrollbar-none"
        style={{
          scrollSnapType: 'y mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {Array.from({ length: paddingRows }).map((_, i) => (
          <div key={`pad-top-${i}`} style={{ height: ROW_HEIGHT }} />
        ))}
        {renderedItems.map((item, i) => {
          const origIdx = loop ? i % itemCount : i
          // Distance from center in rows (fractional)
          const itemCenter = paddingRows * ROW_HEIGHT + i * ROW_HEIGHT + ROW_HEIGHT / 2
          const offset = (itemCenter - viewportCenter) / ROW_HEIGHT
          const angle = offset * ANGLE_PER_ROW
          const absOffset = Math.abs(offset)
          const scale = 1 - absOffset * 0.04
          const opacity = absOffset > 2.5 ? 0.2 : 1 - absOffset * 0.18

          return (
            <div
              key={i}
              className="flex items-center justify-center font-sans text-[15px]"
              style={{
                height: ROW_HEIGHT,
                scrollSnapAlign: 'center',
                transform: `rotateX(${-angle}deg) scale(${scale})`,
                opacity,
                color: origIdx === selectedIndex ? 'var(--lm-text-primary)' : 'var(--lm-text-secondary)',
                fontWeight: origIdx === selectedIndex ? 600 : 400,
                willChange: 'transform, opacity',
              }}
            >
              {renderItem(item)}
            </div>
          )
        })}
        {Array.from({ length: paddingRows }).map((_, i) => (
          <div key={`pad-bot-${i}`} style={{ height: ROW_HEIGHT }} />
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// PostNamePhase — loading → greeting → birthday with persistent plant
// ---------------------------------------------------------------------------

interface PostNamePhaseProps {
  firstName: string
  onComplete: (month: number, day: number, year: number) => void
  onBack?: () => void
}

export function PostNamePhase({ firstName, onComplete, onBack }: PostNamePhaseProps) {
  const [stage, setStage] = useState(0) // 0 = loading, 1 = greeting, 2 = birthday
  const [monthIdx, setMonthIdx] = useState(2)
  const [dayIdx, setDayIdx] = useState(14)
  const [yearIdx, setYearIdx] = useState(30)

  // Auto-advance: loading → greeting
  useEffect(() => {
    if (stage === 0) {
      const t = setTimeout(() => setStage(1), 2000)
      return () => clearTimeout(t)
    }
  }, [stage])

  // Auto-advance: greeting → birthday
  useEffect(() => {
    if (stage === 1) {
      const t = setTimeout(() => setStage(2), 4500)
      return () => clearTimeout(t)
    }
  }, [stage])

  const handleSubmit = useCallback(() => {
    onComplete(monthIdx + 1, DAYS[dayIdx], YEARS[yearIdx])
  }, [onComplete, monthIdx, dayIdx, yearIdx])

  const isBirthdayStage = stage === 2

  return (
    <div className="flex h-full flex-col">
      {onBack && isBirthdayStage && (
        <div className="absolute top-[62px] left-4 z-20">
          <button type="button" onClick={onBack} className="flex items-center gap-1.5 rounded-[4px] bg-lm-neutral-warm p-1.5" aria-label="Go back">
            <ArrowLeft className="size-6 text-white" />
          </button>
        </div>
      )}
      {/* ---- Content area (crossfades between stages) ---- */}
      <div className="flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex h-full flex-col"
          >
            {stage === 0 && (
              <div className="flex h-full items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
                >
                  <ThinkingDots size="md" />
                </motion.div>
              </div>
            )}

            {stage === 1 && (
              <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                <motion.h1
                  variants={dissolveVariants}
                  className="font-display text-[26px] font-semibold leading-[1.2] tracking-tight text-foreground"
                >
                  {firstName}, it&apos;s great to meet you
                </motion.h1>
              </div>
            )}

            {stage === 2 && (
              <div className="flex h-full flex-col">
                <div className="px-4 pt-32 text-center">
                  <motion.h1
                    variants={dissolveVariants}
                    className="font-display text-[26px] font-semibold leading-[1.2] tracking-tight text-foreground text-center"
                  >
                    When is your birthday, {firstName}?
                  </motion.h1>
                  <motion.p
                    variants={dissolveVariants}
                    className="mt-3 font-sans text-[15px] leading-relaxed text-[var(--lm-text-secondary)]"
                  >
                    This places your memories within the timeline of your life.
                  </motion.p>
                </div>

                <motion.div
                  variants={dissolveVariants}
                  className="mt-6 px-4"
                >
                  <p className="mb-3 font-sans text-[15px] font-medium text-foreground">
                    Select your birthday
                  </p>
                  <div className="flex gap-2 overflow-hidden rounded-xl border border-lm-border bg-background">
                    <ScrollColumn
                      items={MONTHS}
                      defaultIndex={monthIdx}
                      onChange={setMonthIdx}
                      renderItem={(item) => String(item)}
                      loop
                    />
                    <ScrollColumn
                      items={DAYS}
                      defaultIndex={dayIdx}
                      onChange={setDayIdx}
                      renderItem={(item) => String(item).padStart(2, '0')}
                      loop
                    />
                    <ScrollColumn
                      items={YEARS}
                      defaultIndex={yearIdx}
                      onChange={setYearIdx}
                      renderItem={(item) => String(item)}
                    />
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---- Persistent plant (same position as NarrativePhase canvas) ---- */}
      <div className="relative flex items-end justify-center overflow-visible">
        <img
          src="/images/onboarding/sprount-2.png"
          alt=""
          style={{
            width: '100%',
            maxWidth: 340,
            height: 'auto',
          }}
        />
      </div>

      {/* ---- Button below plant (matches NarrativePhase layout) ---- */}
      <div className="px-4 pb-4 pt-2">
        <AnimatePresence>
          {isBirthdayStage && (
            <motion.div
              key="continue-btn"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] as const }}
            >
              <Button
                onClick={handleSubmit}
                className="h-[54px] w-full rounded-xl bg-lm-green text-[16px] font-semibold text-white transition-transform active:scale-[0.97] active:brightness-90"
              >
                Continue
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        {!isBirthdayStage && <div className="h-[54px]" />}
      </div>
    </div>
  )
}
