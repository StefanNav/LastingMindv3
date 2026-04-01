import { useRef, useEffect, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface BirthdayPickerSlideProps {
  firstName: string
  onNext: (month: number, day: number, year: number) => void
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)
const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 91 }, (_, i) => CURRENT_YEAR - 20 - i)

const ROW_HEIGHT = 34
const VISIBLE_ROWS = 5
const PICKER_HEIGHT = ROW_HEIGHT * VISIBLE_ROWS

function ScrollColumn({
  items,
  defaultIndex,
  onChange,
  renderItem,
}: {
  items: readonly (string | number)[]
  defaultIndex: number
  onChange: (index: number) => void
  renderItem: (item: string | number) => string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)
  const isScrolling = useRef(false)
  const scrollTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const scrollToIndex = useCallback((index: number, smooth = true) => {
    const el = containerRef.current
    if (!el) return
    const padding = (VISIBLE_ROWS - 1) / 2 * ROW_HEIGHT
    el.scrollTo({
      top: index * ROW_HEIGHT - padding + ROW_HEIGHT / 2,
      behavior: smooth ? 'smooth' : 'instant',
    })
  }, [])

  useEffect(() => {
    scrollToIndex(defaultIndex, false)
  }, [defaultIndex, scrollToIndex])

  const handleScroll = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    isScrolling.current = true

    if (scrollTimer.current) clearTimeout(scrollTimer.current)
    scrollTimer.current = setTimeout(() => {
      isScrolling.current = false
      const padding = (VISIBLE_ROWS - 1) / 2 * ROW_HEIGHT
      const scrollCenter = el.scrollTop + padding
      const index = Math.round((scrollCenter - ROW_HEIGHT / 2) / ROW_HEIGHT)
      const clamped = Math.max(0, Math.min(items.length - 1, index))
      setSelectedIndex(clamped)
      onChange(clamped)
      scrollToIndex(clamped)
    }, 80)
  }, [items.length, onChange, scrollToIndex])

  const paddingRows = Math.floor(VISIBLE_ROWS / 2)

  return (
    <div className="relative flex-1" style={{ height: PICKER_HEIGHT }}>
      <div
        className="pointer-events-none absolute left-0 right-0 z-10 border-y border-lm-border/60"
        style={{
          top: paddingRows * ROW_HEIGHT,
          height: ROW_HEIGHT,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
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
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-center font-sans text-[15px] transition-colors"
            style={{
              height: ROW_HEIGHT,
              scrollSnapAlign: 'center',
              color: i === selectedIndex ? 'var(--lm-text-primary)' : 'var(--lm-text-secondary)',
              fontWeight: i === selectedIndex ? 600 : 400,
            }}
          >
            {renderItem(item)}
          </div>
        ))}
        {Array.from({ length: paddingRows }).map((_, i) => (
          <div key={`pad-bot-${i}`} style={{ height: ROW_HEIGHT }} />
        ))}
      </div>
    </div>
  )
}

export function BirthdayPickerSlide({ firstName, onNext }: BirthdayPickerSlideProps) {
  const [monthIdx, setMonthIdx] = useState(2)
  const [dayIdx, setDayIdx] = useState(14)
  const [yearIdx, setYearIdx] = useState(30)

  return (
    <div className="flex h-full flex-col">
      <div className="px-4 pt-36 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-display text-[26px] font-semibold leading-[1.2] tracking-tight text-foreground text-center"
        >
          When is your birthday, {firstName}?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-3 font-sans text-[15px] leading-relaxed text-[var(--lm-text-secondary)]"
        >
          This places your memories within the timeline of your life.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
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
          />
          <ScrollColumn
            items={DAYS}
            defaultIndex={dayIdx}
            onChange={setDayIdx}
            renderItem={(item) => String(item).padStart(2, '0')}
          />
          <ScrollColumn
            items={YEARS}
            defaultIndex={yearIdx}
            onChange={setYearIdx}
            renderItem={(item) => String(item)}
          />
        </div>

        <Button
          onClick={() => onNext(monthIdx + 1, DAYS[dayIdx], YEARS[yearIdx])}
          className="mt-4 h-[54px] w-full rounded-xl bg-lm-green text-[16px] font-semibold text-white transition-transform active:scale-[0.97] active:brightness-90"
        >
          Continue
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative min-h-0 flex-1 w-full overflow-hidden"
      >
        <img
          src="/images/onboarding/sprount-2.png"
          alt=""
          className="absolute bottom-0 left-0 w-full object-cover object-bottom"
        />
      </motion.div>
    </div>
  )
}
