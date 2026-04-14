import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useApp } from '@/app/AppProvider'

export function HomeHeader() {
  const { foundationStars, streak } = useApp()
  const [showStreakModal, setShowStreakModal] = useState(false)
  const [showStarsModal, setShowStarsModal] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between px-6 pb-[10px] pt-[54px]">
        {/* Streak badge — top left */}
        <button
          type="button"
          onClick={() => setShowStreakModal(true)}
          className="flex items-center gap-1.5"
        >
          <img src="/images/Leaf.svg" alt="" className="h-[18px] w-[16px]" />
          <p className="text-[13px] font-semibold leading-none text-lm-text-primary">
            {streak}
          </p>
        </button>

        {/* Stars badge — top right */}
        <button
          type="button"
          onClick={() => setShowStarsModal(true)}
          className="flex items-center gap-1.5"
        >
          <img src="/images/Star.svg" alt="" className="h-[18px] w-[19px]" />
          <p className="text-[13px] font-semibold leading-none text-lm-text-primary">
            {foundationStars}
          </p>
        </button>
      </div>

      {/* ── Streak modal ── */}
      <AnimatePresence>
        {showStreakModal && (
          <>
            <motion.div
              key="streak-backdrop"
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStreakModal(false)}
            />
            <motion.div
              key="streak-modal"
              className="fixed inset-x-6 top-1/2 z-50 -translate-y-1/2 rounded-[14px] bg-[var(--lm-bg-primary)] p-5 shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-foreground">Your Daily Streak</h3>
                <button type="button" onClick={() => setShowStreakModal(false)}>
                  <X className="size-5 text-muted-foreground" />
                </button>
              </div>

              {/* Big number */}
              <div className="mb-4 flex items-center justify-center gap-2 rounded-[10px] bg-foreground/[0.03] py-4">
                <img src="/images/Leaf.svg" alt="" className="h-7 w-6" />
                <span className="text-3xl font-bold text-foreground">{streak}</span>
                <span className="text-sm text-muted-foreground">{streak === 1 ? 'day' : 'days'}</span>
              </div>

              {/* Explanation */}
              <div className="flex flex-col gap-3">
                <p className="text-sm leading-relaxed text-foreground font-medium">
                  What is a streak?
                </p>
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  Your streak counts how many days <span className="font-semibold text-foreground">in a row</span> you've opened LastingMind and completed at least one entry — like answering a question or writing a reflection.
                </p>

                <div className="rounded-[10px] bg-foreground/[0.03] px-4 py-3">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">How it works</p>
                  <ul className="flex flex-col gap-2 text-[13px] leading-relaxed text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-lg leading-none">📝</span>
                      <span>Complete <span className="font-semibold text-foreground">one entry each day</span> to keep your streak going.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-lg leading-none">🔥</span>
                      <span>The number goes up by one <span className="font-semibold text-foreground">every day</span> you come back.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-lg leading-none">💤</span>
                      <span>If you miss a day, your streak <span className="font-semibold text-foreground">resets to zero</span> — but you can always start again!</span>
                    </li>
                  </ul>
                </div>

                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  Even a few minutes a day helps build a meaningful record of who you are. Small steps add up over time.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Stars modal ── */}
      <AnimatePresence>
        {showStarsModal && (
          <>
            <motion.div
              key="home-stars-backdrop"
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStarsModal(false)}
            />
            <motion.div
              key="home-stars-modal"
              className="fixed inset-x-6 top-1/2 z-50 -translate-y-1/2 rounded-[14px] bg-[var(--lm-bg-primary)] p-5 shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-foreground">Your Stars</h3>
                <button type="button" onClick={() => setShowStarsModal(false)}>
                  <X className="size-5 text-muted-foreground" />
                </button>
              </div>

              {/* Big number */}
              <div className="mb-4 flex items-center justify-center gap-2 rounded-[10px] bg-foreground/[0.03] py-4">
                <img src="/images/Star.svg" alt="" className="h-7 w-7" />
                <span className="text-3xl font-bold text-foreground">{foundationStars}</span>
                <span className="text-sm text-muted-foreground">{foundationStars === 1 ? 'star' : 'stars'}</span>
              </div>

              {/* Explanation */}
              <div className="flex flex-col gap-3">
                <p className="text-sm leading-relaxed text-foreground font-medium">
                  What are stars?
                </p>
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  Stars show <span className="font-semibold text-foreground">how much progress</span> you've made across your categories. The more entries you complete, the more stars you earn.
                </p>

                <div className="rounded-[10px] bg-foreground/[0.03] px-4 py-3">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">How you earn stars</p>
                  <ul className="flex flex-col gap-2 text-[13px] leading-relaxed text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-lg leading-none">⭐</span>
                      <span>Each category (like Values, Career, Family) can earn <span className="font-semibold text-foreground">up to 3 stars</span>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-lg leading-none">📖</span>
                      <span>You earn stars by <span className="font-semibold text-foreground">completing modules</span> — guided sets of questions about your life.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-lg leading-none">🌳</span>
                      <span>More stars means your LastingMind knows you <span className="font-semibold text-foreground">more deeply</span>, so the people you love can feel closer to who you are.</span>
                    </li>
                  </ul>
                </div>

                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  You can see a detailed breakdown of your stars on the <span className="font-semibold text-foreground">Profile</span> page.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
